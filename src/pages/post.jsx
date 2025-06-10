import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

import appwriteService from '../appwrite/config';
import Button from '../components/Button';
import Container from '../components/Container';

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate]);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  const deletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const postDeleted = await appwriteService.deletePost(post.$id);
      if (postDeleted) {
        await appwriteService.deleteFile(post.FeaturedImage);
        navigate('/');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  const imageUrl = appwriteService.getFileView(post.FeaturedImage);
  const formattedDate = new Date(post.$createdAt).toLocaleDateString();
  const authorName = post?.username || 'Author';
  const tags = post?.tags || [];

  const fadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <motion.section
      className="bg-gray-50 py-10 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Container>
        <motion.article
          className="bg-white rounded-3xl shadow-xl max-w-5xl mx-auto overflow-hidden"
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
          {/* Cover Image */}
          <motion.div
            className="relative"
            variants={fadeVariant}
            custom={0}
          >
            <motion.img
              src={imageUrl}
              alt={post.Title}
              className="w-full h-[22rem] object-cover"
              loading="lazy"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            />

            {isAuthor && (
              <motion.div
                className="absolute top-4 right-4 flex gap-3 backdrop-blur-lg bg-white/80 rounded-full px-3 py-2 shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <Link to={`/edit-post/${post.$id}`}>
                  <button className="text-green-600 hover:text-green-700 hover:scale-110 transition-transform">
                    <FaEdit size={18} />
                  </button>
                </Link>
                <button
                  onClick={deletePost}
                  className="text-red-600 hover:text-red-700 hover:scale-110 transition-transform"
                >
                  <FaTrash size={18} />
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={fadeVariant}
              custom={1}
            >
              {post.Title}
            </motion.h1>

            <motion.div
              className="flex gap-4 text-gray-500 text-sm mb-4 flex-wrap"
              variants={fadeVariant}
              custom={2}
            >
              <span>👤 {authorName}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              variants={fadeVariant}
              custom={2.5}
            >
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="prose prose-lg max-w-none text-gray-800"
              variants={fadeVariant}
              custom={3}
            >
              {typeof post.Content === 'string' ? parse(post.Content) : null}
            </motion.div>
          </div>
        </motion.article>
      </Container>
    </motion.section>
  );
}

export default Post;
