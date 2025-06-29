import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import slugify from 'slugify';
import DOMPurify from 'isomorphic-dompurify';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Generate slug from title
    let slug = slugify(title, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });

    // Check if slug already exists and make it unique
    let existingPost = await Post.findOne({ slug });
    let counter = 1;
    while (existingPost) {
      slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    // Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(content);

    const post = new Post({
      title: title.trim(),
      content: sanitizedContent,
      slug
    });

    await post.save();

    return NextResponse.json(
      { 
        success: true, 
        post: {
          id: post._id,
          title: post.title,
          content: post.content,
          slug: post.slug,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 