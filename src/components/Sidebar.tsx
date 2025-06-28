import Link from 'next/link';
import { HomeIcon, UserIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/dashboard', label: 'Dashboard', icon: Squares2X2Icon },
  { href: '/profile', label: 'Profile', icon: UserIcon },
];

export default function Sidebar() {
  return (
    <aside className="hidden sm:flex sm:flex-col w-64 bg-white shadow h-screen sticky top-0">
      <div className="p-4 font-bold text-xl">Codex</div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center space-x-2 p-2 rounded hover:bg-violet-50">
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
