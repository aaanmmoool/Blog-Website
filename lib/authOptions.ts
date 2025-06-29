import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Auth attempt with credentials:', { username: credentials?.username, password: credentials?.password ? '[HIDDEN]' : 'undefined' });
        
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '';
        
        console.log('Environment variables:', { 
          adminUsername, 
          adminPasswordHash: adminPasswordHash ? '[HASHED]' : 'undefined',
          hasSecret: !!process.env.NEXTAUTH_SECRET,
          hasUrl: !!process.env.NEXTAUTH_URL
        });
        
        if (!credentials) {
          console.log('No credentials provided');
          return null;
        }
        
        const { username, password } = credentials;
        
        if (username === adminUsername) {
          console.log('Username matches, checking password...');
          if (adminPasswordHash) {
            const passwordValid = await compare(password, adminPasswordHash);
            console.log('Password validation result:', passwordValid);
            if (passwordValid) {
              return { id: 'admin', name: 'Admin', email: 'admin@blog.com' };
            }
          } else {
            console.log('No password hash, using fallback password check');
            if (password === 'admin') {
              return { id: 'admin', name: 'Admin', email: 'admin@blog.com' };
            }
          }
        }
        
        console.log('Authentication failed');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}; 