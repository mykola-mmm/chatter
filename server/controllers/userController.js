import UserModel from "../models/user.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "registration failed",
    });
  }
};

export const login = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email});
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        })
      }
  
      const isPassValid = await bcrypt.compare(req.body.password, user._doc.passwordHash)
      if (!isPassValid) {
        return res.status(400).json({
          message: "Login/Password is incorrect"
        })
      }
  
      const token = jwt.sign({
        _id: user._id
      }, 'secret123', {
        expiresIn: '30d'
      })
  
      const { passwordHash, ...userData } = user._doc
  
      res.json({
        ...userData,
        token
      })
  
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Authorization failed"
      })
    }
  }

export const getMe = async (req, res) => {
  console.log("/auth/me")
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found in DB"
      })
    }
    console.log(user)

    const { passwordHash, ...userData } = user._doc

    res.json({...userData});
  } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Error"
      })
  }
}
