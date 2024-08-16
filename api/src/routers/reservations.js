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
    } else if (!/^[0-9\-+]{9,15}$/.test(data.contact_phonenumber)) {
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

    const meal = await knex("Meal").where({ id: meal_id }).first();
    if (!meal) {
      errors.push(`meal with id ${meal_id} does not exists.`);
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
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

    const updateData = {};
    if (number_of_guests) updateData.number_of_guests = number_of_guests;
    if (meal_id) updateData.meal_id = meal_id;
    if (created_date) updateData.created_date = created_date;
    if (contact_phonenumber)
      updateData.contact_phonenumber = contact_phonenumber;
    if (contact_name) updateData.contact_name = contact_name;
    if (contact_email) updateData.contact_email = contact_email;

    const errors = validateReservation(updateData);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
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

export default reservationsRouter;
