import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

import appwriteService from '../appwrite/config';
import Container from '../components/Container';

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((postData) => {
        postData ? setPost(postData) : navigate('/');
      });
    }
  }, [slug, navigate]);

  const isAuthor = post && userData?.$id === post.userID;

  const deletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await appwriteService.deletePost(post.$id);
      await appwriteService.deleteFile(post.FeaturedImage);
      navigate('/');
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const tagColorMap = {
    react: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    css: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    html: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    node: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  };

  const fadeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  const imageUrl = appwriteService.getFileView(post.FeaturedImage);
  const formattedDate = new Date(post.$createdAt).toLocaleDateString();
  const authorName = post?.username || 'Author';
  const tags = post?.tags || [];

  return (
    <motion.section
      className=" text-gray-800 py-8 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <Container>
        <motion.article
          className=" max-w-4xl mx-auto rounded-2xl shadow-md overflow-hidden  "
        >
          {/* Header Image */}
          <motion.div
            className="relative"
            variants={fadeVariant}
            custom={0}
          >
            <img
              src={imageUrl}
              alt={post.Title}
              className="w-full h-64 sm:h-96 object-cover"
              loading="lazy"
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-gray-300">
                <Link to={`/edit-post/${post.$id}`} title="Edit this post">
                  <FaEdit className="text-indigo-600 hover:text-indigo-800 transition" />
                </Link>
                <button onClick={deletePost} title="Delete this post">
                  <FaTrash className="text-red-500 hover:text-red-700 transition" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Main Content */}
          <div className="px-0 sm:px-10 py-8">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold mb-4 text-black"
              variants={fadeVariant}
              custom={1}
            >
              {post.Title}
            </motion.h1>

            <motion.div
              className="text-sm text-black flex flex-wrap gap-3 items-center mb-6"
              variants={fadeVariant}
              custom={2}
            >
              <span>👤 <strong>{authorName}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>{formattedDate}</span>
              {tags.length > 0 && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tagColorMap[tag.toLowerCase()] || tagColorMap.default
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* HTML Content */}
            <motion.div
                className="
    prose prose-base md:prose-lg lg:prose-xl max-w-none
     dark:bg-gray-900 text-gray-800 dark:text-gray-200
    p-5 md:p-8 rounded-xl shadow-md leading-relaxed tracking-wide
    transition-all duration-300 ease-in-out overflow-x-auto

    dark:prose-invert

    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-blue-600 dark:[&_h1]:text-blue-400
    [&_h2]:text-2xl [&_h2]:text-indigo-600 dark:[&_h2]:text-indigo-400
    [&_h3]:text-xl [&_h3]:text-purple-600 dark:[&_h3]:text-purple-400

    [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_p]:leading-loose

    [&_pre]:bg-gray-100 dark:[&_pre]:bg-zinc-800
    [&_pre]:text-sm [&_pre]:rounded-md [&_pre]:px-4 [&_pre]:py-3
    [&_pre]:overflow-auto [&_pre]:shadow-inner

    [&_code]:font-mono [&_code]:text-green-600 dark:[&_code]:text-green-400
    [&_code]:bg-gray-200 dark:[&_code]:bg-zinc-700 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md

    [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:marker:text-blue-600 dark:[&_ul]:marker:text-blue-400
    [&_li]:mb-1 [&_li]:leading-relaxed

    [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic
    [&_blockquote]:text-gray-600 dark:[&_blockquote]:text-gray-300 [&_blockquote]:border-blue-300 dark:[&_blockquote]:border-blue-600
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
