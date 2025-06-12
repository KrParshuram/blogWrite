import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import Container from '../components/Container';
import PostCard from '../components/PostCard';

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
    <div className="w-full py-8">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-lg sm:text-xl font-medium">
            No posts available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post, index) => (
              <div
                key={post.$id}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
