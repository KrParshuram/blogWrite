import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Container from '../components/Container'
import PostForm from '../components/post-form/postForm'

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          console.log("Fetched post from EditPost component:", post)
          setPost(post)
        } else {
          navigate('/')
        }
      })
    }
  }, [slug, navigate])

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 lg:px-12 min-h-screen  text-gray-900  dark:text-gray-100 transition-colors duration-300">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost
