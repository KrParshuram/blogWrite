import React from "react";
import Container from "../components/Container";
import PostForm from "../components/post-form/postForm";

function AddPost() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 px-4">
      <Container>
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md p-6 sm:p-10 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Create a New Post ✍️
          </h1>
          <PostForm />
        </div>
      </Container>
    </section>
  );
}

export default AddPost;
