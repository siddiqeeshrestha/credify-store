import React, { useState } from 'react';
import { EyeIcon, CheckCircleIcon, ClockIcon, XCircleIcon, TruckIcon } from '@heroicons/react/24/outline';

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orderDate: string;
  deliveryDate?: string;
  trackingNumber?: string;
  notes?: string;
}

export const OrdersManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      customerPhone: '+1-234-567-8900',
      status: 'processing',
      paymentStatus: 'paid',
      totalAmount: 125.50,
      items: [
        {
          id: '1',
          productName: 'Steam Gift Card',
          quantity: 2,
          price: 50.00,
          image: '/api/placeholder/100/100'
        },
        {
          id: '2',
          productName: 'Netflix Premium',
          quantity: 1,
          price: 25.50,
          image: '/api/placeholder/100/100'
        }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      orderDate: '2024-01-15T10:30:00Z',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '+1-234-567-8901',
      status: 'pending',
      paymentStatus: 'pending',
      totalAmount: 89.99,
      items: [
        {
          id: '3',
          productName: 'Amazon Gift Card',
          quantity: 3,
          price: 29.99,
          image: '/api/placeholder/100/100'
        }
      ],
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      orderDate: '2024-01-14T15:45:00Z'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Davis',
      customerEmail: 'mike.davis@email.com',
      customerPhone: '+1-234-567-8902',
      status: 'delivered',
      paymentStatus: 'paid',
      totalAmount: 234.75,
      items: [
        {
          id: '4',
          productName: 'PlayStation Store Card',
          quantity: 1,
          price: 100.00,
          image: '/api/placeholder/100/100'
        },
        {
          id: '5',
          productName: 'Xbox Game Pass',
          quantity: 2,
          price: 67.25,
          image: '/api/placeholder/100/100'
        }
      ],
      shippingAddress: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      orderDate: '2024-01-10T09:15:00Z',
      deliveryDate: '2024-01-13T14:30:00Z',
      trackingNumber: 'TRK987654321'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <div className="h-5 w-5 bg-blue-500 rounded-full animate-spin border-2 border-white border-t-transparent" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track and manage customer orders and deliveries
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">
            {filteredOrders.length} of {orders.length} orders
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.id}</div>
                    {order.trackingNumber && (
                      <div className="text-sm text-gray-500">Tracking: {order.trackingNumber}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">${order.totalAmount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{order.items.length} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedOrder(null)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Order Details - {selectedOrder.id}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedOrder.status)}
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Customer Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div><span className="font-medium">Name:</span> {selectedOrder.customerName}</div>
                        <div><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</div>
                        <div><span className="font-medium">Phone:</span> {selectedOrder.customerPhone}</div>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900">Shipping Address</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-1">
                        <div>{selectedOrder.shippingAddress.street}</div>
                        <div>
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                        </div>
                        <div>{selectedOrder.shippingAddress.country}</div>
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Order Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div><span className="font-medium">Order Date:</span> {formatDate(selectedOrder.orderDate)}</div>
                        {selectedOrder.deliveryDate && (
                          <div><span className="font-medium">Delivery Date:</span> {formatDate(selectedOrder.deliveryDate)}</div>
                        )}
                        {selectedOrder.trackingNumber && (
                          <div><span className="font-medium">Tracking:</span> {selectedOrder.trackingNumber}</div>
                        )}
                        <div>
                          <span className="font-medium">Payment Status:</span>
                          <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                            {selectedOrder.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <img className="h-10 w-10 rounded object-cover" src={item.image} alt={item.productName} />
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${item.price.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">Total:</td>
                          <td className="px-4 py-3 text-sm font-bold text-gray-900">${selectedOrder.totalAmount.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Print Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};