"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

function Navbar() {
  const ActiveLink = usePathname();
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0a0f1a] flex shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo & Hamburger */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-3xl font-extrabold text-cyan-400 tracking-tight hover:text-cyan-300 transition"
          >
            Softex
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyan-400"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className=""
          >
            Documentation
          </Link>
          <Link
            href="/source"
            className={`text-sm font-medium text-gray-300 hover:text-cyan-400 transition ${
              ActiveLink === "/source" ? "text-cyan-400" : ""
            }`}
          >
            Source
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium text-gray-300 hover:text-cyan-400 transition ${
              ActiveLink === "/about" ? "text-cyan-400" : ""
            }`}
          >
            Manage
          </Link>
        </div>

        {/* Search Form */}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-sm text-gray-400 font-medium">
                {`${session.user?.name}`}
              </span>
              <Link
                href="/profile"
                className="text-sm font-medium px-4 py-1.5 rounded-full text-cyan-400 border border-cyan-500 hover:bg-cyan-500/10 transition"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium px-4 py-1.5 rounded-full text-cyan-400 border border-cyan-500 hover:bg-cyan-500/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-1.5 mx-8 rounded text-cyan-400 border border-cyan-500 hover:bg-cyan-500/10 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d1117]/90 backdrop-blur-sm px-4 pb-6 pt-4 shadow-xl border-t border-[#1f2937] text-white space-y-4 rounded-b-xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-700 rounded-full text-sm bg-[#1f2937] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm"
          />
          <Link
            href="/courses"
            className="block text-sm font-medium text-gray-300 hover:text-cyan-400 transition"
          >
            Courses
          </Link>
          <Link
            href="/about"
            className="block text-sm font-medium text-gray-300 hover:text-cyan-400 transition"
          >
            About
          </Link>
          <Link
            href="/careers"
            className="block text-sm font-medium text-gray-300 hover:text-cyan-400 transition"
          >
            Careers
          </Link>

          {session ? (
            <>
              <span className="block text-sm font-medium text-gray-400">{`Hi, ${session.user?.name}`}</span>
              <Link
                href="/profile"
                className="block text-sm font-medium text-cyan-400 hover:underline transition"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="block text-sm font-medium text-cyan-400 hover:underline transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="block text-sm font-medium text-cyan-400 hover:underline transition"
            >
              Sign In with GitHub
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
