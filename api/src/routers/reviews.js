import express from "express";
import knex from "../database_client.js";
import asyncHandler from "./error_handler.js";

const reviewsRouter = express.Router();

reviewsRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await knex("Review").orderBy("id");
    res.status(200).json(result);
  })
);

reviewsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await knex("Review").where({ id }).first();

    if (!result)
      return res.status(404).json({ error: `Review with id ${id} not found` });

    res.status(200).json(result);
  })
);

function validateReviewData(data) {
  const errors = [];
  if (
    data.title !== undefined &&
    (typeof data.title !== "string" || data.title.trim().length === 0)
  )
    errors.push("Title is required");

  if (
    data.description !== undefined &&
    (typeof data.description !== "string" ||
      data.description.trim().length === 0)
  )
    errors.push("Description is required");
  if (
    data.meal_id !== undefined &&
    (isNaN(data.meal_id) || data.meal_id < 1 || !Number.isInteger(data.meal_id))
  )
    errors.push("Meal_id must be a positive whole number");

  if (
    data.stars !== undefined &&
    (isNaN(data.stars) || data.stars < 1 || data.stars > 5)
  )
    errors.push("Stars must be a number between 1 and 5");

  return errors;
}

reviewsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, description, meal_id, stars } = req.body;

    const data = {
      title,
      description,
      meal_id: Number(meal_id),
      stars: Number(stars),
    };

    const errors = validateReviewData(data);
    if (errors.length > 0) return res.status(400).json({ errors });

    const result = await knex("Review").insert({
      title,
      description,
      meal_id,
      stars,
    });
    res.status(201).json({
      success: `The review with id ${result} was created successfully`,
    });
  })
);

reviewsRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, description, meal_id, stars } = req.body;

    const currentReview = await knex("Review").where({ id }).first();
    if (!currentReview)
      return res.status(404).json({ error: `Review with id ${id} not found` });

    const dataToUpdate = {};

    if (title !== undefined) dataToUpdate.title = title;
    if (description !== undefined) dataToUpdate.description = description;
    if (meal_id !== undefined) dataToUpdate.meal_id = Number(meal_id);
    if (stars !== undefined) dataToUpdate.stars = Number(stars);

    const errors = validateReviewData(dataToUpdate);

    if (errors.length > 0) return res.status(400).json({ errors });

    const result = await knex("Review").where({ id }).update(dataToUpdate);

    if (!result)
      return res.status(404).json({ error: `Review with id ${id} not found` });

    res
      .status(200)
      .json({ success: `Review with id ${id} was updated successfully` });
  })
);

reviewsRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await knex("Review").where({ id }).delete();

    if (!result)
      return res.status(404).json({ error: `Review with id ${id} not found` });

    res
      .status(200)
      .json({ message: `Review with id ${id} was deleted successfully` });
  })
);

export default reviewsRouter;
