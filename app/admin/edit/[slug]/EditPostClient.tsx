'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import slugify from 'slugify';

// Dynamically import React-Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

import 'react-quill/dist/quill.snow.css';

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface EditPostClientProps {
  params: {
    slug: string;
  };
}

export default function EditPostClient({ params }: EditPostClientProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [titleChanged, setTitleChanged] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.slug}`);
      if (!response.ok) {
        throw new Error('Post not found');
      }
      const data = await response.json();
      setPost(data.post);
      setTitle(data.post.title);
      setContent(data.post.content);
      setSlug(data.post.slug);
      setOriginalTitle(data.post.title);
    } catch (err) {
      setError('Failed to load post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug when title changes
  useEffect(() => {
    if (title !== originalTitle && title.trim()) {
      setTitleChanged(true);
      const generatedSlug = slugify(title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });
      setSlug(generatedSlug);
    } else if (title === originalTitle) {
      setTitleChanged(false);
    }
  }, [title, originalTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/posts/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update post');
      }

      const data = await response.json();
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'blockquote', 'code-block'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image', 'blockquote', 'code-block'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading post...</div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <button
          onClick={() => router.push('/admin')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Admin
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <p className="text-gray-600 mt-2">
            Update your blog post using the rich text editor below.
          </p>
        </div>

        <form id="edit-post-form" onSubmit={handleSubmit} className="space-y-6 pb-32">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter post title..."
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug {titleChanged && <span className="text-orange-600">(Will be updated)</span>}
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              readOnly
              className={`w-full px-3 py-2 border rounded-md shadow-sm cursor-not-allowed ${
                titleChanged 
                  ? 'border-orange-300 bg-orange-50 text-orange-700' 
                  : 'border-gray-300 bg-gray-50 text-gray-600'
              }`}
              placeholder="Slug will be generated from title..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {titleChanged 
                ? 'The slug will be updated to match the new title for SEO consistency.'
                : 'The slug is automatically generated from the title and will be used in the URL.'
              }
            </p>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <div className="border border-gray-300 rounded-md">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your post content..."
                style={{ height: '400px' }}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="text-red-800">{error}</div>
            </div>
          )}
        </form>
        {/* Fixed button row at the bottom of the page */}
        <div className="fixed left-0 bottom-0 w-full bg-white shadow-md py-4 px-4 flex justify-end space-x-4 z-50">
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-post-form"
            disabled={saving || !title.trim() || !content.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
} 