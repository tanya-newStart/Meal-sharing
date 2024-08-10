import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
  const result = await knex.raw("Select * from Meal order by id");
  const data = result[0];
  res.json({ data });
});

mealsRouter.post("/", async (req, res) => {
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
});

mealsRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const meal = await knex("Meal").where({ id }).first();
  if (!meal) {
    res.status(404).send("Meal not found");
  } else {
    res.json(meal);
  }
});

export default mealsRouter;
