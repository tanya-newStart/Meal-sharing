import express from "express";
import knex from "../database_client.js";
import asyncHandler from "./error_handler.js";

const mealsRouter = express.Router();

mealsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const {
      limit,
      maxPrice,
      title,
      availableReservations,
      dateAfter,
      dateBefore,
      sortKey,
      sortDir,
    } = req.query;

    let mealQuery = knex("Meal")
      .select(
        "Meal.id",
        "Meal.title",
        "Meal.description",
        "Meal.price",
        "Meal.max_reservations",
        "Meal.meal_when",
        "Meal.image_url",
        knex.raw("coalesce(sum(r.number_of_guests),0) as total_reserved")
      )
      .leftJoin("Reservation as r", "Meal.id", "r.meal_id")
      .groupBy("Meal.id");

    if (limit) {
      const limitValue = Number(limit);
      if (!isNaN(limitValue) && limitValue > 0) {
        mealQuery.limit(limitValue);
      }
    }

    if (maxPrice) {
      const maxPriceValue = Number(maxPrice);
      if (!isNaN(maxPriceValue) && maxPrice > 0) {
        mealQuery.where("price", "<=", maxPriceValue);
      }
    }

    if (title && typeof title === "string") {
      mealQuery.where("title", "like", `%${title}%`);
    }

    if (availableReservations === "true") {
      mealQuery.havingRaw(
        "coalesce(sum(r.number_of_guests),0) < Meal.max_reservations"
      );
    } else if (availableReservations === "false") {
      mealQuery.havingRaw(
        "coalesce(sum(r.number_of_guests),0) >= Meal.max_reservations"
      );
    }

    if (dateAfter) {
      const dateAfterValue = dateAfter ? new Date(dateAfter) : null;
      mealQuery.where("Meal.meal_when", ">", dateAfterValue.toISOString());
    }

    if (dateBefore) {
      const dateBeforeValue = dateBefore ? new Date(dateBefore) : null;
      mealQuery.where("Meal.meal_when", "<", dateBeforeValue.toISOString());
    }

    if (sortKey) {
      const validSortKeys = ["meal_when", "max_reservations", "price"];
      if (validSortKeys.includes(sortKey)) {
        const direction = sortDir && sortDir === "desc" ? "desc" : "asc";
        mealQuery.orderBy(sortKey, direction);
      }
    }

    const results = await mealQuery;
    res.status(200).json({ data: results });
  })
);

const validateMeal = (data) => {
  const errors = [];

  if (
    data.title !== undefined &&
    (!data.title || typeof data.title !== "string" || data.title.trim() === "")
  ) {
    errors.push("Title is required and must be a non-empty string");
  }

  if (
    data.description !== undefined &&
    (!data.description ||
      typeof data.description !== "string" ||
      data.description.trim() === "")
  ) {
    errors.push("Description is required and must be a non-empty string.");
  }

  if (
    data.location !== undefined &&
    (!data.location ||
      typeof data.location !== "string" ||
      data.location.trim() === "")
  ) {
    errors.push("Location is required and must be a non-empty string.");
  }

  if (
    data.meal_when !== undefined &&
    (!data.meal_when || isNaN(Date.parse(data.meal_when)))
  ) {
    errors.push("Meal_when must be a valid date.");
  }

  if (data.max_reservations !== undefined) {
    const maxReservations = Number(data.max_reservations);
    if (!Number.isInteger(maxReservations) || maxReservations < 1) {
      errors.push("Max reservations must be a positive integer.");
    }
  }

  if (data.price !== undefined) {
    const price = Number(data.price);
    if (typeof price !== "number" || price <= 0) {
      errors.push("Price must be a positive number.");
    }
  }

  return errors;
};

mealsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, description, location, meal_when, max_reservations, price } =
      req.body;
    const data = {
      title,
      description,
      location,
      meal_when,
      max_reservations: Number(max_reservations),
      price: Number(price),
    };
    const errors = validateMeal(data);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const newMeal = await knex("Meal").insert({
      title,
      description,
      location,
      meal_when,
      max_reservations,
      price,
    });

    res.status(201).json({ status: "success", "id of the new meal": newMeal });
  })
);

mealsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const meal = await knex("Meal").where({ id }).first();
    if (!meal) {
      res.status(404).send("Meal not found");
    } else {
      res.json(meal);
    }
  })
);

mealsRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const {
      title,
      description,
      location,
      meal_when,
      max_reservations,
      price,
      created_date,
    } = req.body;

    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (description) dataToUpdate.description = description;
    if (location) dataToUpdate.location = location;
    if (meal_when) dataToUpdate.meal_when = meal_when;
    if (max_reservations)
      dataToUpdate.max_reservations = Number(max_reservations);
    if (price) dataToUpdate.price = Number(price);
    if (created_date) dataToUpdate.created_date = created_date;

    const errors = validateMeal(dataToUpdate);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const update = await knex("Meal").where({ id }).update(dataToUpdate);

    if (update.length === 0) {
      res.status(404).send("Meal not found");
    }
    const updatedMeal = await knex("Meal").where({ id }).first();
    res.status(200).json(updatedMeal);
  })
);

mealsRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const deletedData = await knex("Meal").where({ id }).del();

    if (deletedData > 0) {
      res.json({ message: `Meal with id ${id} was deleted successfully.` });
    } else {
      res.status(404).json({ error: `Meal with id ${id} was not found.` });
    }
  })
);

mealsRouter.get(
  "/:meal_id/reviews",
  asyncHandler(async (req, res) => {
    const mealId = req.params.meal_id;
    const meal = await knex("Meal").where("Meal.id", mealId).first();
    if (!meal) return res.status(404).json({ message: "Meal not found" });

    const result = await knex("Review")
      .join("Meal", "Review.meal_id", "=", "Meal.id")
      .where("Meal.id", mealId)
      .select("Review.*");

    if (result.length === 0)
      return res
        .status(404)
        .json({ message: "No reviews found for this meal" });
    res.status(200).json(result);
  })
);

export default mealsRouter;
