import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import EditPostClient from './EditPostClient';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }
  return <EditPostClient params={{ slug }} />;
} 