import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts()
      .then((data) => {
        setPosts(data?.documents || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {posts.map((post) => {
        const imageUrl = post.FeaturedImage
          ? appwriteService.getFileView(post.FeaturedImage)
          : '';

        return (
          <div
            key={post.$id}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt={post.Title}
                className="w-full md:w-56 h-48 object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
              />
            )}
            <div className="flex-1 p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.Title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.Content || 'No description available.'}
              </p>
              <Link
                to={`/post/${post.$id}`}
                className="inline-block mt-4 text-sm text-blue-600 font-medium hover:underline"
              >
                Read more →
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
