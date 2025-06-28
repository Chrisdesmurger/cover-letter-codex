import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import BalanceCard from './BalanceCard';
import ActivityList, { ActivityItem } from './ActivityList';
import TopCategories from './TopCategories';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activities: ActivityItem[] = [
    { id: 1, text: 'Generated a letter' },
    { id: 2, text: 'Updated profile information' },
  ];

  const categories = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Finance' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:flex-row">
        <header className="sm:hidden p-2 border-b flex items-center">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
              />
            </svg>
          </button>
        </header>
        <main className="flex-1 p-4">
          {children || <p className="text-gray-600">Welcome</p>}
        </main>
        <aside className="w-full lg:w-80 p-4 space-y-4">
          <BalanceCard remaining={3} />
          <ActivityList items={activities} />
          <TopCategories categories={categories} />
        </aside>
      </div>
    </div>
  );
}
