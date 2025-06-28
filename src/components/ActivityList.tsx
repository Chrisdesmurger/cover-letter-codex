export interface ActivityItem {
  id: number;
  text: string;
}

interface ActivityListProps {
  items: ActivityItem[];
}

export default function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold mb-2">Recent Activity</h3>
      <ul className="text-sm space-y-1">
        {items.map((item) => (
          <li key={item.id} className="text-gray-600">
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
