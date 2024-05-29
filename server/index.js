import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerValidation, loginValidation } from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/userController.js";
import * as PostController from "./controllers/postController.js";

dotenv.config();

// console.log(process.env.MONGODB_CONNECT)
mongoose
  .connect(process.env.MONGODB_BLOG_CONNECT)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

// app.get("/posts", PostController.getAll);
// app.get("/posts/:id", PostController.getOne);
app.post("/posts", PostController.create);
// app.delete("/posts/:id", PostController.remove);
// app.patch("/posts", PostController.update);

// app.get("/", (req, res) => {
//     res.send("Hello World");
//     console.log("Hello World from console");
// });

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("Server OK");
});

