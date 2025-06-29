"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.name === "Admin";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-50 via-white to-blue-100 shadow-md border-b transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left: Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-extrabold text-blue-700 tracking-tight hover:scale-105 transition-transform">
                Blog Website
              </Link>
            </div>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks isAdmin={isAdmin} />
              {!isAdmin && (
                <Link href="/admin/login" className="px-3 py-1 rounded text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 transition">
                  Admin Login
                </Link>
              )}
              {status === "loading" && <Spinner />}
              {isAdmin && <Avatar />}
            </div>
            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex items-center px-2 py-1 border rounded text-blue-700 border-blue-300 hover:bg-blue-50 focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden mt-2 bg-white rounded shadow p-4 flex flex-col space-y-2 animate-fade-in">
              <NavLinks isAdmin={isAdmin} mobile onClick={() => setMobileOpen(false)} />
              {!isAdmin && (
                <Link href="/admin/login" className="px-3 py-1 rounded text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 transition">
                  Admin Login
                </Link>
              )}
              {status === "loading" && <Spinner />}
              {isAdmin && <Avatar />}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

function NavLinks({ isAdmin, mobile = false, onClick }: { isAdmin: boolean; mobile?: boolean; onClick?: () => void }) {
  const linkClass =
    "relative px-3 py-1 text-gray-700 font-medium transition hover:text-blue-700 focus:text-blue-700 focus:outline-none group";
  const underline =
    "absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200";
  return (
    <>
      <Link href="/" className={linkClass} onClick={onClick}>
        Home
        <span className={underline}></span>
      </Link>
      {isAdmin && (
        <>
          <Link href="/admin" className={linkClass} onClick={onClick}>
            Dashboard
            <span className={underline}></span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 focus:ring-2 focus:ring-red-200 transition font-medium"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
}

function Avatar() {
  return (
    <div className="ml-4 flex items-center">
      <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold shadow-inner">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <span className="ml-2 text-blue-800 font-semibold hidden sm:inline">Admin</span>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-6 w-6 text-blue-500 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  );
}

// Add fade-in animation for mobile menu
// In globals.css, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.2s ease; } 