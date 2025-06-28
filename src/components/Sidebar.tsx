import Link from 'next/link';
import {
  HomeIcon,
  UserIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/dashboard', label: 'Dashboard', icon: Squares2X2Icon },
  { href: '/profile', label: 'Profile', icon: UserIcon },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <Fragment>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity sm:hidden ${open ? '' : 'hidden'}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow transform transition-transform sm:static sm:translate-x-0 sm:flex sm:flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b sm:justify-center">
          <span className="font-bold text-xl">Codex</span>
          <button className="sm:hidden" onClick={onClose} aria-label="Close sidebar">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center space-x-2 p-2 rounded hover:bg-violet-50">
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </Fragment>
  );
}
