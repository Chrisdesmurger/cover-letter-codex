import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { supabase } from '../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { validateEmail } from '../../utils/validateEmail';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    const hashed = await bcrypt.hash(password, 10);
    const { error } = await supabase.from('users').insert({
      email,
      password: hashed,
    });

    if (!error) {
      // Automatically authenticate the newly created user
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      router.push('/dashboard');
    } else {
      console.error('Registration error', error);
    }
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleRegister}>
      <h1 className="text-xl mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}
