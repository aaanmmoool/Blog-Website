"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CreatePostButton() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.name === "Admin";
  if (!isAdmin) return null;
  return (
    <Link
      href="/admin/create"
      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition font-semibold text-lg"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Create New Post
    </Link>
  );
} 