import express from "express";
import knex from "../database_client.js";
import asyncHandler from "./error_handler.js";

const reservationsRouter = express.Router();

reservationsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await knex("Reservation").orderBy("id");
    res.json({ result });
  })
);
const validateReservation = (data) => {
  const errors = [];

  if (data.number_of_guests !== undefined) {
    const numberOfGuests = Number(data.number_of_guests);
    if (!Number.isInteger(numberOfGuests) || numberOfGuests < 1) {
      errors.push("number of guests must be a positive integer");
    }
  }
  if (data.meal_id !== undefined) {
    const mealId = Number(data.meal_id);

    if (!Number.isInteger(mealId) || mealId < 1) {
      errors.push("meal id must be a positive integer.");
    }
  }
  if (
    data.contact_name !== undefined &&
    (!data.contact_name || typeof data.contact_name !== "string")
  ) {
    errors.push("contact name is required and must be non-empty");
  }

  if (data.contact_phonenumber !== undefined) {
    if (!data.contact_phonenumber) {
      errors.push("phone number is required");
    } else if (!/^[\+\-\(\)\d\s]{8,15}$/.test(data.contact_phonenumber)) {
      errors.push("phone number is required and must be valid");
    }
  }

  if (
    data.contact_email !== undefined &&
    (!data.contact_email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact_email))
  ) {
    errors.push("email is required and must be valid.");
  }
  return errors;
};

reservationsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = req.body;

    const errors = validateReservation(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const meal = await knex("Meal")
      .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
      .select("Meal.id", "Meal.max_reservations")
      .count("Reservation.id as total_reserved")
      .where("Meal.id", meal_id)
      .groupBy("Meal.id", "Meal.max_reservations")
      .first();

    console.log(meal);

    if (!meal) {
      errors.push(`meal with id ${meal_id} does not exists.`);
    }

    const totalReserved = parseInt(meal.total_reserved, 10) || 0;
    const availableSpots = meal.max_reservations - totalReserved;

    if (number_of_guests > availableSpots) {
      return res.status(400).json({
        errors: [
          `Reservation exceeds available spots. Only ${availableSpots} spots left.`,
        ],
      });
    }
    const newReservation = await knex("Reservation").insert({
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    });
    res
      .status(201)
      .json({ status: "success", "id of the new reservation": newReservation });
  })
);

reservationsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const reservation = await knex("Reservation").where({ id }).first();
    if (!reservation) {
      res.status(404).send("Reservation not found");
    } else {
      res.json(reservation);
    }
  })
);

reservationsRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const {
      number_of_guests,
      meal_id,
      created_date,
      contact_phonenumber,
      contact_name,
      contact_email,
    } = req.body;

    const currentReservation = await knex("Reservation").where({ id }).first();

    if (!currentReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const dataToUpdate = {};
    if (number_of_guests) dataToUpdate.number_of_guests = number_of_guests;
    if (meal_id) dataToUpdate.meal_id = meal_id;
    if (created_date) dataToUpdate.created_date = created_date;
    if (contact_phonenumber)
      dataToUpdate.contact_phonenumber = contact_phonenumber;
    if (contact_name) dataToUpdate.contact_name = contact_name;
    if (contact_email) dataToUpdate.contact_email = contact_email;

    const errors = validateReservation(dataToUpdate);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    if (meal_id || number_of_guests) {
      const newMealId = meal_id || currentReservation.meal_id;
      const newGuestCount =
        number_of_guests || currentReservation.number_of_guests;

      const meal = await knex("Meal")
        .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
        .select("Meal.id", "Meal.max_reservations")
        .count("Reservation.id as total_reserved")
        .where("Meal.id", newMealId)
        .groupBy("Meal.id", "Meal.max_reservations")
        .first();

      if (!meal) {
        return res
          .status(400)
          .json({ error: `Meal with id ${newMealId} does not exists` });
      }

      const totalReserved = parseInt(meal.total_reserved, 10) || 0;
      const availableSpots = meal.max_reservations - totalReserved;

      const guestDifference =
        newGuestCount - currentReservation.number_of_guests;

      if (guestDifference > availableSpots) {
        return res
          .status(400)
          .json({ error: "Reservation exceeds available spots." });
      }
    }
    const update = await knex("Reservation").where({ id }).update(updateData);

    if (update.length === 0) {
      res.status(404).send("Reservation not found");
    }
    const updatedReservation = await knex("Reservation").where({ id }).first();
    res.status(200).json(updatedReservation);
  })
);

reservationsRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const deletedData = await knex("Reservation").where({ id }).del();

    if (deletedData > 0) {
      res.json({
        message: `Reservation with id ${id} was deleted successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ error: `Reservation with id ${id} was not found.` });
    }
  })
);

reservationsRouter.get(
  "/availability/:meal_id",
  asyncHandler(async (req, res) => {
    const mealId = Number(req.params.meal_id);

    if (isNaN(mealId) || mealId < 1) {
      return res.status(400).json({ error: "Invalid meal id" });
    }

    const meal = await knex("Meal")
      .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
      .select(
        "Meal.id",
        "Meal.max_reservations",
        knex.raw(
          "COALESCE(SUM(Reservation.number_of_guests), 0) AS total_reserved"
        )
      )

      .where("Meal.id", mealId)
      .groupBy("Meal.id", "Meal.max_reservations")
      .first();

    if (!meal) {
      return res
        .status(404)
        .json({ error: `Meal with id ${mealId} does not exists` });
    }

    const totalReserved = parseInt(meal.total_reserved, 10) || 0;
    const availableSpots = meal.max_reservations - totalReserved;

    res.json({ available_spots: availableSpots });
  })
);

export default reservationsRouter;
