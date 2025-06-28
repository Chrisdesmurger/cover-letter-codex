interface Category {
  id: number;
  name: string;
}

interface TopCategoriesProps {
  categories: Category[];
}

export default function TopCategories({ categories }: TopCategoriesProps) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold mb-2">Top Categories</h3>
      <ul className="text-sm space-y-1">
        {categories.map((c) => (
          <li key={c.id} className="text-gray-600">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
