import React from 'react'
import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/Container'
import PostCard from "../components/PostCard"

window.appwriteService = appwriteService;

function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
    console.log("Returned posts from Appwrite:", posts);
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap ">
          <h1>there is no post you have created</h1>
        </div>
      </Container>
    </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/3" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home;