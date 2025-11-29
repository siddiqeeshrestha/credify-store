import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { useAdminOrders } from '../../lib/api';

export const OrdersManagementPage: React.FC = () => {
  const { data: ordersData, isLoading, error } = useAdminOrders();
  const orders = ordersData?.orders || [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    
    const term = searchTerm.toLowerCase();
    return orders.filter(order => 
      order.orderNumber?.toLowerCase().includes(term) ||
      order.id?.toString().includes(term) ||
      order.userEmail?.toLowerCase().includes(term) ||
      order.userFirstName?.toLowerCase().includes(term) ||
      order.userLastName?.toLowerCase().includes(term) ||
      order.userPhone?.includes(term) ||
      `${order.userFirstName} ${order.userLastName}`.toLowerCase().includes(term)
    );
  }, [orders, searchTerm]);

  if (isLoading) {
    return <div className="p-6">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error loading orders</div>;
  }

  const formatCurrency = (amount: any) => {
    if (typeof amount === 'number') {
      return `$${amount.toFixed(2)}`;
    }
    const numValue = parseFloat(amount || '0');
    return `$${isNaN(numValue) ? '0.00' : numValue.toFixed(2)}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by order #, email, name, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
          />
          <div className="absolute left-3 top-2.5 h-5 w-5 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm ? `No orders found matching "${searchTerm}"` : 'No orders found'}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.orderNumber}</div>
                    <div className="text-sm text-gray-500">ID: {order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.userFirstName && order.userLastName 
                        ? `${order.userFirstName} ${order.userLastName}`
                        : 'Unknown Customer'
                      }
                    </div>
                    <div className="text-sm text-gray-500">{order.userEmail}</div>
                    {order.userPhone && (
                      <div className="text-sm text-gray-500">{order.userPhone}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items.length} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link href={`/admin/orders/${order.id}`}>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};