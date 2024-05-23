import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// console.log(process.env.MONGODB_CONNECT)
mongoose
    .connect(process.env.MONGODB_CONNECT)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
    console.log("Hello World from console");
});

app.post("/auth/login", (req, res) => {
    // console.log(req)
    // console.log(req.body)
    const token = jwt.sign(
        {
            email: req.body.email,
            password: req.body.password,
        },
        "secret",
        { expiresIn: "1h" }
    );

    res.json({
        login: true,
        message: "Login success",
        token: token,
    });
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }

    console.log("Server OK");
});
