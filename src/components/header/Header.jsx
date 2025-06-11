import React from 'react'
import Container from "../Container"
import { Link, useNavigate } from "react-router-dom"
import LogoutBtn from './LogOutBtn'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]
// bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 shadow-md
  return (
    <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-black shadow-xl shadow-blue-500/20 transition-all duration-300 hover:brightness-125
">
      <Container>
        <nav className="flex items-center py-3">
          <div className="mr-6">
            <Link to="/" className="text-white font-bold text-2xl hover:text-yellow-300 transition">
              BlogWrite
            </Link>
          </div>
          <ul className="flex ml-auto space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-white px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-indigo-900 transition focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
