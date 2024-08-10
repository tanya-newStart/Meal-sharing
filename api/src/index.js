import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import nestedRouter from "./routers/nested.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.get("/my-route", (req, res) => {
  res.send("Hi friend");
});

// You can delete this route once you add your own routes
apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});

apiRouter.get("/past-meals", async (req, res) => {
  const result = await knex.raw("Select * from Meal where meal_when < Now()");
  const data = result[0];
  if (data.length === 0) {
    res.json({});
  } else {
    res.json({ data });
  }
});

apiRouter.get("/future-meals", async (req, res) => {
  const result = await knex.raw("Select * from Meal where meal_when > Now()");
  const data = result[0];
  if (data.length === 0) {
    res.json({});
  } else {
    res.json({ data });
  }
});

apiRouter.get("/all-meals", async (req, res) => {
  const result = await knex.raw("Select * from Meal order by id");
  const data = result[0];
  res.json({ data });
});

apiRouter.get("/first-meal", async (req, res) => {
  const result = await knex.raw("Select * from Meal order by id asc limit 1");
  const data = result[0];
  if (data.length === 0) {
    res.status(404).send("There are no meals yet");
  } else {
    res.json({ data });
  }
});

apiRouter.get("/last-meal", async (req, res) => {
  const result = await knex.raw("Select * from Meal order by id desc limit 1");
  const data = result[0];
  if (data.length === 0) {
    res.status(404).send("There are no meals yet");
  } else {
    res.json({ data });
  }
});
// This nested router example can also be replaced with your own sub-router
apiRouter.use("/nested", nestedRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
