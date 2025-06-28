import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import BalanceCard from './BalanceCard';
import ActivityList, { ActivityItem } from './ActivityList';
import TopCategories from './TopCategories';

interface MainLayoutProps {
  children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
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
      <Sidebar />
      <div className="flex-1 flex flex-col lg:flex-row">
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
