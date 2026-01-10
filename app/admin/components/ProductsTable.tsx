"use client";

import { Category } from './CategoryForm';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string | null;
  category: Category | null;
  imageUrl: string | null;
  available: boolean;
  createdAt: string;
};

type ProductsTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  isDeleting: string | null;
};

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
  isDeleting,
}: Readonly<ProductsTableProps>) {
  if (products.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No products found. Add your first product above!
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
              Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {product.name}
                </div>
                {product.description && (
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {product.description}
                  </div>
                )}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.category?.name ?? "—"}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {product.available ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product)}
                  disabled={isDeleting === product.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {isDeleting === product.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
