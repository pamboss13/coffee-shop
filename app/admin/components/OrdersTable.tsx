"use client";

// Type definitions
type User = {
  id: string;
  email: string;
  name: string | null;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
};

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: Product;
};

export type Order = {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  items: OrderItem[];
};

type OrdersTableProps = {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
  onDelete: (order: Order) => void;
  isDeleting: string | null;
  isUpdatingStatus: string | null;
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrdersTable({
  orders,
  onViewDetails,
  onStatusChange,
  onDelete,
  isDeleting,
  isUpdatingStatus,
}: Readonly<OrdersTableProps>) {
  if (orders.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No orders found. Orders will appear here when customers make purchases.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-mono text-gray-900" title={order.id}>
                  {order.id.substring(0, 8)}...
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {order.user.name || "No name"}
                </div>
                <div className="text-sm text-gray-500">
                  {order.user.email}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                  {order.items.length} {order.items.length === 1 ? "item" : "items"}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${order.total.toFixed(2)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onViewDetails(order)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                    disabled={isUpdatingStatus === order.id}
                    className="text-sm text-green-500 border border-gray-300 rounded px-2 py-1 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {isUpdatingStatus === order.id ? "Updating..." : option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => onDelete(order)}
                    disabled={isDeleting === order.id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    {isDeleting === order.id ? "..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
