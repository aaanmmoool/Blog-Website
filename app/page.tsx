import Link from 'next/link';
import CreatePostButton from '@/components/CreatePostButton';
import PostsGrid from '@/components/PostsGrid';

interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Create New Post button */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 mt-6">
              Welcome to Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover our latest articles, insights, and stories. We share knowledge, experiences, and ideas that matter.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                No posts yet
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We're working on creating amazing content for you. Check back soon for new articles!
              </p>
            </div>
          ) : (
            <>
              {/* Posts Count */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Latest Posts ({posts.length})
                </h2>
                <p className="text-gray-600">
                  Explore our collection of articles and insights
                </p>
              </div>

              {/* Posts Grid */}
              <PostsGrid posts={posts} />

              {/* Footer */}
              <div className="mt-16 text-center">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Stay Updated
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Get notified when we publish new articles and insights.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 