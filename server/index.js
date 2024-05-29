import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';

dotenv.config();

// console.log(process.env.MONGODB_CONNECT)
mongoose
  .connect(process.env.MONGODB_BLOG_CONNECT)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    fs.mkdirsSync('uploads');
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  console.log(req.file.path)
  res.json({
    url: `uploads/${req.file.originalname}`
  })
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);
app.delete('/posts/:id', checkAuth, PostController.remove);


const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server running on ${port}`);
});

