import React from "react";
import Container from "../components/Container";
import PostForm from "../components/post-form/postForm";

function AddPost() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center  px-4">
      <Container>
        <div className=" w-full  rounded-2xl  p-6 sm:p-10 ">
          <h1 className="text-3xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Create a New Post ✍️
          </h1>
          <PostForm />
        </div>
      </Container>
    </section>
  );
}

export default AddPost;
