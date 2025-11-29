import React, { useState } from 'react';
import { useRoute } from 'wouter';
import { useAdminOrders, useUpdateOrderStatus, useUpdateOrderAssets } from '../../lib/api';

export const OrderDetailPage: React.FC = () => {
  const [, params] = useRoute('/admin/orders/:orderId');
  const orderId = params?.orderId;
  const { data: ordersData, isLoading, error } = useAdminOrders();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [accounts, setAccounts] = useState('');
  const [redeemCodes, setRedeemCodes] = useState('');
  
  const updateStatusMutation = useUpdateOrderStatus();
  const updateAssetsMutation = useUpdateOrderAssets();

  const order = ordersData?.orders?.find(o => o.id === orderId);

  const formatCurrency = (amount: any) => {
    if (typeof amount === 'number') {
      return `$${amount.toFixed(2)}`;
    }
    const numValue = parseFloat(amount || '0');
    return `$${isNaN(numValue) ? '0.00' : numValue.toFixed(2)}`;
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus || !orderId) return;
    try {
      await updateStatusMutation.mutateAsync({ id: orderId, status: selectedStatus });
      setSelectedStatus(''); // Reset selection
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleProvideAssets = async () => {
    if (!orderId) return;
    try {
      await updateAssetsMutation.mutateAsync({ 
        id: orderId, 
        accounts: accounts || undefined, 
        redeemCodes: redeemCodes || undefined 
      });
      setAccounts('');
      setRedeemCodes('');
    } catch (error) {
      console.error('Failed to provide assets:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-2">Error loading order</div>
            <button 
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-gray-600 text-lg mb-2">No order ID provided</div>
            <button 
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-gray-600 text-lg mb-2">Order not found</div>
            <div className="text-sm text-gray-500 mb-4">Order ID: {orderId}</div>
            <button 
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusOptions = [
    'pending',
    'confirmed', 
    'processing',
    'shipped',
    'delivered',
    'cancelled'
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-600">Order #{order.orderNumber}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
          <button 
            onClick={() => window.history.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="mt-1">
                  {order.userFirstName && order.userLastName 
                    ? `${order.userFirstName} ${order.userLastName}`
                    : 'Unknown Customer'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{order.userEmail || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">{order.userPhone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Order Date</p>
                <p className="mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                        <div className="text-sm text-gray-500">ID: {item.productId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.productPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(item.productPrice * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
              <div className="text-sm text-gray-600">
                {order.billingAddress ? (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(order.billingAddress, null, 2)}</pre>
                ) : (
                  'No billing address provided'
                )}
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="text-sm text-gray-600">
                {order.shippingAddress ? (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(order.shippingAddress, null, 2)}</pre>
                ) : (
                  'No shipping address provided'
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Actions & Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{formatCurrency(order.shipping)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Existing Assets */}
          {(order.accounts || order.redeemCodes) && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Provided Assets</h2>
              {order.accounts && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Account Details</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">{order.accounts}</pre>
                  </div>
                </div>
              )}
              {order.redeemCodes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Redeem Codes</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">{order.redeemCodes}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Update Order Status */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Update Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Status
                </label>
                <select
                  value={selectedStatus || order.status}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleStatusUpdate}
                disabled={updateStatusMutation.isPending || !selectedStatus || selectedStatus === order.status}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>

          {/* Provide Accounts/Redeem Codes */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Provide Assets</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Details
                </label>
                <textarea
                  value={accounts}
                  onChange={(e) => setAccounts(e.target.value)}
                  placeholder="Enter account details (username, password, etc.)"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Redeem Codes
                </label>
                <textarea
                  value={redeemCodes}
                  onChange={(e) => setRedeemCodes(e.target.value)}
                  placeholder="Enter redeem codes (one per line)"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleProvideAssets}
                disabled={updateAssetsMutation.isPending || (!accounts && !redeemCodes)}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {updateAssetsMutation.isPending ? 'Providing...' : 'Provide Assets'}
              </button>
            </div>
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Order Notes</h2>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};