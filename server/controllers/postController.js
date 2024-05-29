import { postCreateValidation } from "../validations/validations.js";
import PostModel from "../models/post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user", "fullName").exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching the posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    );

    if (!doc) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching the post by id",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findOneAndDelete({
      _id: postId,
    });
    if (!doc) {
      return res.status(404).json({
        message: "Error deleting the post, not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting the post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    console.log(doc);

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating the post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    )

    res.json({
      success: true
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the post",
    });
  }
}