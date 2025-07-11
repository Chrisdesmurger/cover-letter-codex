import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '../../../lib/supabaseClient';
import bcrypt from 'bcryptjs';

export const authOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !data) {
          return null;
        }

        const valid = await bcrypt.compare(credentials.password, data.password);
        if (!valid) {
          return null;
        }

        // return the full user record to NextAuth
        return {
          id: data.id,
          email: data.email,
        } as any;
      },
    }),
  ],
};

export default NextAuth(authOptions);
