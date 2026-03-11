import express from "express";
const app = express();
export default app;

import morgan from "morgan";
app.use(morgan("dev"));

app.use(express.json());

import getUserFromToken from "#middleware/getUserFromToken";
app.use(getUserFromToken);

import cors from "cors";
app.use(cors({ origin: /localhost/ }));

import usersRouter from "#api/users";
app.use("/users", usersRouter);

import departmentsRouter from "#api/departments";
app.use("/departments", departmentsRouter);

import professorsRouter from "#api/professors";
app.use("/professors", professorsRouter);

app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
