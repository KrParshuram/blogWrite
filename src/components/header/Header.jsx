import React, { useState } from 'react'
import Container from "../Container"
import { Link, useNavigate } from "react-router-dom"
import LogoutBtn from './LogOutBtn'
import { useSelector } from 'react-redux'
import { Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  const handleNavigate = (slug) => {
    navigate(slug)
    setMenuOpen(false)
  }

  return (
    <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-black shadow-xl shadow-blue-500/20">
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-2xl hover:text-yellow-300 transition">
            BlogWrite
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigate(item.slug)}
                      className="text-white px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-indigo-900 transition"
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

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white focus:outline-none z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Fullscreen Overlay Menu for Mobile */}
          {menuOpen && (
            <div className="fixed inset-0 z-40 bg-gradient-to-br from-gray-900 via-blue-900 to-black flex flex-col items-center justify-center space-y-6 transition-all duration-300">
              {navItems.map(
                (item) =>
                  item.active && (
                    <button
                      key={item.name}
                      onClick={() => handleNavigate(item.slug)}
                      className="text-white text-xl px-6 py-3 rounded-full hover:bg-yellow-300 hover:text-indigo-900 transition"
                    >
                      {item.name}
                    </button>
                  )
              )}
              {authStatus && <LogoutBtn />}
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Header
