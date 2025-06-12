import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import Container from '../components/Container';
import PostCard from '../components/PostCard';
import { motion } from 'framer-motion';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      console.log('Returned posts from Appwrite:', posts);
      if (posts) setPosts(posts.documents);
    });
  }, []);

  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="w-full py-12 min-h-[70vh]  transition-colors duration-300">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-300 dark:text-gray-300">
            <h1 className="text-xl md:text-2xl font-semibold mb-2">No Posts Found</h1>
            <p className="text-sm">You haven't created any posts yet.</p>
            
            <h1>Sign up Or Login Fastttt</h1>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {posts.map((post, index) => (
              <motion.div key={post.$id} variants={fadeVariant} custom={index}>
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  );
}

export default Home;
