import React from 'react'
import Container from "../components/Container"
import PostForm from '../components/post-form/postForm'

function AddPost() {
  return (
    <div className='py-6'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost;