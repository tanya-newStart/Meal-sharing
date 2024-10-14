import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import { Server } from "socket.io";
import http from "http";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("message", (msg) => {
    console.log("message: " + msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("reserve", (data) => {
    io.emit("updateAvailableSpots", data.avaliableSpots);
  });
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
apiRouter.use("/meals", mealsRouter);

apiRouter.use("/reservations", reservationsRouter);

apiRouter.use("/reviews", reviewsRouter);

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "An unexpected error occurred" });
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
