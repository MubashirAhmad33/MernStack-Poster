import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = ({ onClose, fetchPosts, deletePost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/posts", {
        title,
        description,
      });
      setMessage("Post created successfully!");
      toast.success(" successful Saved In Database!"); // Show success toast

      fetchPosts();
      deletePost();
      setTitle("");
      setDescription("");
      navigate("/home");
    } catch (error) {
      setMessage("Error creating post");
    }
  };

  return (
    <div>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="max-w-md w-full bg-blue-900 shadow-lg p-6 rounded-lg">
          <div className="flex justify-between items-center p-2">
            <h1 className="text-lg font-bold  text-center text-white">
              New Post
            </h1>
            <button onClick={onClose} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <hr className="mb-2 mt-2" />
          <form onSubmit={handleSubmit} className="space-y-4 py-5">
            <div>
              <label className="block text-white">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded  outline-none"
                placeholder="Post title"
              />
            </div>
            <div>
              <label className="block text-white">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded outline-none"
                placeholder="Post description"
                rows="5"
              ></textarea>
            </div>
            <button
              type="submit"
              className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
            {message && <p className="mt-4 text-center">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
