import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';
import DOMPurify from 'isomorphic-dompurify';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post: {
        id: post._id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Generate new slug if title changed
    let newSlug = slug;
    if (title !== post.title) {
      newSlug = slugify(title, { 
        lower: true, 
        strict: true,
        remove: /[*+~.()'"!:@]/g
      });

      // Check if new slug already exists
      let existingPost = await Post.findOne({ slug: newSlug });
      let counter = 1;
      while (existingPost && existingPost._id.toString() !== post._id.toString()) {
        newSlug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
        existingPost = await Post.findOne({ slug: newSlug });
        counter++;
      }
    }

    // Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(content);

    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      {
        title: title.trim(),
        content: sanitizedContent,
        slug: newSlug
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      post: {
        id: updatedPost._id,
        title: updatedPost.title,
        content: updatedPost.content,
        slug: updatedPost.slug,
        createdAt: updatedPost.createdAt,
        updatedAt: updatedPost.updatedAt
      }
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    const { slug } = await params;

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    await Post.findByIdAndDelete(post._id);

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
} 