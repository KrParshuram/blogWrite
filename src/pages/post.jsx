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
      className="bg-gray-10 py-12 min-h-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Container>
        <motion.article
          className="bg-gray rounded-3xl shadow-2xl max-w-5xl mx-auto overflow-hidden "
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
            className="w-full h-[20rem] md:h-[30rem] object-fill rounded-t-3xl"
            loading="lazy"
            initial={{ scale: 1.5, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {isAuthor && (
            <motion.div
              className="absolute top-4 right-4 flex flex-wrap gap-4  backdrop-blur-lg rounded-full px-4 py-2 shadow-lg border border-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <Link to={`/edit-post/${post.$id}`}>
                <button
                  className="text-green-600 hover:text-green-700 hover:scale-110 transition duration-200"
                  title="Edit Post"
                >
                  <FaEdit size={18} />
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="text-red-600 hover:text-red-700 hover:scale-110 transition duration-200"
                title="Delete Post"
              >
                <FaTrash size={18} />
              </button>
            </motion.div>
          )}
        </motion.div>


          {/* Content */}
          <div className="px-6 md:px-10 py-10">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight dark:text-gray-100"
              variants={fadeVariant}
              custom={1}
            >
              {post.Title}
            </motion.h1>

            <motion.div
              className="flex flex-wrap items-center gap-3 text-gray-600 text-sm md:text-base mb-6 dark:text-gray-100"
              variants={fadeVariant}
              custom={2}
            >
              <span className="flex items-center gap-1 ">👤 <strong>{authorName}</strong></span>
              <span className="hidden md:inline dark:text-gray-100">•</span>
              <span className="text-gray-500 dark:text-gray-100">{formattedDate}</span>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2 mb-8 dark:text-gray-100"
              variants={fadeVariant}
              custom={2.5}
            >
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-600/10 text-blue-800 text-sm font-medium px-3 py-1 rounded-xl shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>

           <motion.div
  className="
    prose prose-lg md:prose-xl max-w-none 
    prose-slate dark:prose-invert 
    text-gray-800 dark:text-gray-100 
    leading-relaxed transition-colors duration-300 
    bg-white dark:bg-gray-900 
    p-4 md:p-6 rounded-2xl shadow-lg 
    overflow-x-auto 
    scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent

    [&_pre]:bg-gray-100 dark:[&_pre]:bg-zinc-800 
    [&_pre]:text-sm [&_pre]:rounded-lg [&_pre]:px-4 [&_pre]:py-3 [&_pre]:overflow-x-auto 
    [&_pre]:shadow-inner

    [&_code]:text-green-600 dark:[&_code]:text-green-400 [&_code]:font-semibold

    [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:pl-4 [&_ul]:marker:text-blue-600 dark:[&_ul]:marker:text-blue-400
    [&_li]:mb-1
  "
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
