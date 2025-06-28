import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { validateEmail } from '../../utils/validateEmail';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    // authenticate using the Credentials provider
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      setSuccess('Login successful');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleLogin}>
      <h1 className="text-xl mb-4">Login</h1>
      {success && <p className="text-green-600 mb-2">{success}</p>}
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
        Login
      </button>
    </form>
  );
}
