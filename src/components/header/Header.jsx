import React, { useState } from 'react';
import Container from '../Container';
import { Link, useNavigate } from 'react-router-dom';
import LogoutBtn from './LogOutBtn';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const handleNavigate = (slug) => {
    navigate(slug);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-200 shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-neutral-900 tracking-tight">
            Blog<span className="text-teal-500">Write</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigate(item.slug)}
                      className="text-sm text-neutral-700 hover:text-teal-500 transition-colors"
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

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-neutral-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="fixed inset-0 z-40 bg-white px-6 py-12 flex flex-col items-center gap-6 text-lg font-medium text-neutral-800 shadow-lg transition-all">
              {navItems.map(
                (item) =>
                  item.active && (
                    <button
                      key={item.name}
                      onClick={() => handleNavigate(item.slug)}
                      className="hover:text-teal-500 transition-colors"
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
  );
}

export default Header;
