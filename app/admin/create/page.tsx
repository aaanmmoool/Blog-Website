import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import CreatePostClient from './CreatePostClient';

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }
  return <CreatePostClient />;
} 