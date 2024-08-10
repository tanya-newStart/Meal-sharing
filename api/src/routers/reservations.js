import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

reservationsRouter.get("/", (req, res) => {
  res.json({ message: "Hello reservation router" });
});

export default reservationsRouter;
