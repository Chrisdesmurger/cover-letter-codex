import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '../../../lib/supabaseClient';

export default NextAuth({
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
          .select('id, email, password')
          .eq('email', credentials.email)
          .single();

        if (error || !data) {
          return null;
        }

        if (data.password !== credentials.password) {
          return null;
        }

        return { id: data.id, email: data.email } as any;
      },
    }),
  ],
});
