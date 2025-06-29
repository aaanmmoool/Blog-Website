"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function PostsGrid({ posts }: { posts: any[] }) {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const isAdmin = session?.user?.name === "Admin";
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="max-w-5xl mx-auto w-full mb-8">
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-lg"
            tabIndex={-1}
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isAdmin && !search && (
          <Link
            href="/admin/create"
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md border-2 border-dashed border-blue-400 hover:border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[220px] text-blue-600 text-lg font-semibold group"
          >
            <svg className="w-10 h-10 mb-2 text-blue-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Post
          </Link>
        )}
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
                {post.updatedAt !== post.createdAt && (
                  <>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs">Updated</span>
                  </>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                <Link 
                  href={`/post/${post.slug}`}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h3>
              <Link
                href={`/post/${post.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
              >
                Read full article
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
} 