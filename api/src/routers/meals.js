import express from "express";
import knex from "../database_client.js";
import asyncHandler from "./error_handler.js";

const mealsRouter = express.Router();

mealsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await knex("Meal").orderBy("id");
    res.json({ result });
  })
);

mealsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, description, location, meal_when, max_reservations, price } =
      req.body;
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

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (location) updateData.location = location;
    if (meal_when) updateData.meal_when = meal_when;
    if (max_reservations) updateData.max_reservations = max_reservations;
    if (price) updateData.price = price;
    if (created_date) updateData.created_date = created_date;

    const update = await knex("Meal").where({ id }).update(updateData);

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
    const { id } = req.params;
    const deletedData = await knex("Meal").where({ id }).del();

    if (deletedData) {
      res.json({ message: `Meal with id ${id} was deleted successfully.` });
    } else {
      res.status(404).json({ error: `Meal with id ${id} was not found.` });
    }
  })
);

export default mealsRouter;
