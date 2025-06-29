import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import EditPostClient from './EditPostClient';

export default async function EditPostPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }
  return <EditPostClient params={params} />;
} 