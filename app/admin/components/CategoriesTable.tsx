"use client";

import { Category } from './CategoryForm';

type CategoriesTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting: string | null;
};

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
  isDeleting,
}: Readonly<CategoriesTableProps>) {
  if (categories.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No categories found. Add your first category above!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {category.name}
                </div>
                {category.description && (
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {category.description}
                  </div>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(category)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(category)}
                  disabled={isDeleting === category.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {isDeleting === category.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

