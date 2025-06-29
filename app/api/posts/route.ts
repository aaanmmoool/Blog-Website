import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(request: NextRequest) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');

    console.log('Fetching posts...');
    const posts = await Post.find({})
      .select('title slug createdAt updatedAt')
      .sort({ createdAt: -1 });
    console.log(`Found ${posts.length} posts`);

    return NextResponse.json({
      success: true,
      posts: posts.map(post => ({
        id: post._id,
        title: post.title,
        slug: post.slug,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }))
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // Return more detailed error information for debugging
    return NextResponse.json(
      { 
        error: 'Failed to fetch posts',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 