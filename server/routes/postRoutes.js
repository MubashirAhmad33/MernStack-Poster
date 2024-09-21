const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Create a new post
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newPost = new Post({ title, description });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Fetch all posts (GET route)

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});
// Delete a post by id
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("id of dleet", postId);
  try {
    const deletedPost = await Post.findByIdAndDelete(postId); // Delete the post by its id
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = router;
