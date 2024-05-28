import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerValidation } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserserController from "./controllers/userController.js";

dotenv.config();

// console.log(process.env.MONGODB_CONNECT)
mongoose
  .connect(process.env.MONGODB_BLOG_CONNECT)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post("/auth/login", UserserController.login);

app.post("/auth/register", registerValidation, UserserController.register);

app.get("/auth/me", checkAuth, UserserController.getMe);

app.get("/", (req, res) => {
    res.send("Hello World");
    console.log("Hello World from console");
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("Server OK");
});

