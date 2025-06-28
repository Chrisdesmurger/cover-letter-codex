import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header className="p-4 border-b mb-4 space-x-4">
        <Link href="/">Home</Link>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/register">Register</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/modern-webapp">Modern Webapp</Link>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
