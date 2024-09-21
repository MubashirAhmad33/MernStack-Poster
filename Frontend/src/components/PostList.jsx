import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import ViewModal from "./ViewModal";
import { toast } from "react-toastify";

import axios from "axios";

const PostList = () => {
  const [modal, setModal] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set to true
  const [viewPost, setViewPost] = useState(null); // State to store the selected post for viewing

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
      console.log(res.data);
      setLoading(false); // Set loading to false once posts are fetched
    } catch (err) {
      console.log("Error fetching posts:", err);
      setLoading(false); // Ensure loading is set to false in case of error as well
    }
  };

  // Delete a post
  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
      toast.success("Deleted Successfully!");
      // Remove deleted post from state
    } catch (err) {
      console.log("Error deleting post:", err);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between p-5 text-white ">
        <div className="flex gap-5 items-center">
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
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <h2 className="text-2xl font-thin ">Mern Poster</h2>
        </div>
        <div className="flex gap-3 items-center bg-white p-2  rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="black"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <button
            className=" font-thin text-black"
            onClick={() => setModal("createPost")}
          >
            Create Post
          </button>
        </div>
      </div>

      <hr className="p-2" />
      <div className=" w-full mx-auto p-5 ">
        {modal === "createPost" && (
          <PostForm
            onClose={() => setModal("")}
            fetchPosts={fetchPosts}
            deletePost={deletePost}
          />
        )}
        {modal === "view" && (
          <ViewModal onClose={() => setModal("")} viewPost={viewPost} />
        )}

        {/* Display loading message while fetching posts */}
        {loading ? (
          <p className="text-center mt-4">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center mt-4">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md p-4 relative"
              >
                <h3
                  className="font-semibold text-gray-800 mb-2"
                  onClick={() => {
                    setViewPost(post);
                    setModal("view");
                  }}
                >
                  {post.title}
                </h3>

                <p className="text-gray-600  italic">
                  {post.description.length > 200
                    ? post.description.substring(0, 200) + "..."
                    : post.description}
                </p>

                <div className="absolute top-3 right-3 flex gap-5">
                  <button className="" onClick={() => deletePost(post._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      class="size-4"
                    >
                      <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                  </button>

                  {/* Additional buttons can go here */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
