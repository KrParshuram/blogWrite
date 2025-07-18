import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import Container from '../components/Container';
import PostForm from '../components/post-form/postForm';

export default function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const fetchedPost = await appwriteService.getPost(slug);
        if (fetchedPost) {
          console.log('Fetched post in EditPost:', fetchedPost);
          setPost(fetchedPost);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        navigate('/');
      }
    };

    fetchPost();
  }, [slug, navigate]);

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 lg:px-12 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}
