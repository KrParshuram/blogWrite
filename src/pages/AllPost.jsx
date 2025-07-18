import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/Container";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 px-4">
      <Container>
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Latest Posts
        </h1>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-xl font-medium py-24">
            No posts available yet 🫤
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <div
                key={post.$id}
                className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:scale-[1.01] duration-200 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 60}ms`,
                  animationFillMode: "both",
                }}
              >
                <PostCard {...post} layout="row" />
              </div>
            ))}
          </div>
        )}

        {/* See More Button */}
        {posts.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link
              to="/all-posts"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              See More Posts
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export default AllPosts;
