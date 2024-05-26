import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";
import UserModel from "./models/user.js";

dotenv.config();

// console.log(process.env.MONGODB_CONNECT)
mongoose
  .connect(process.env.MONGODB_BLOG_CONNECT)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: passwordHash,
    });

    const user = await doc.save()

    res.json({
        user
    })
});

app.get("/", (req, res) => {
    res.send("Hello World");
    console.log("Hello World from console");
});

// app.post("/auth/login", (req, res) => {

//     const token = jwt.sign(
//         {
//             email: req.body.email,
//             password: req.body.password,
//         },
//         "secret",
//         { expiresIn: "1h" }
//     );

//     res.json({
//         login: true,
//         message: "Login success",
//         token: token,
//     });

//     console.log(req.body);
// });

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }

  console.log("Server OK");
});
