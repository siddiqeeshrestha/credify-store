import React from 'react';
import { 
  UsersIcon, 
  ShoppingBagIcon, 
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType, icon: Icon }) => (
  <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <div className={`flex items-center text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          {changeType === 'positive' ? (
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
          )}
          {change}
        </div>
        <span className="text-sm text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  </div>
);

interface RecentOrderProps {
  id: string;
  customer: string;
  amount: string;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
}

const RecentOrder: React.FC<RecentOrderProps> = ({ id, customer, amount, status, date }) => {
  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-sm font-medium text-gray-900">#{id}</p>
          <p className="text-sm text-gray-500">{customer}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
          {status}
        </span>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{amount}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};

export const AdminDashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: ClipboardDocumentListIcon,
    },
    {
      title: 'Total Products',
      value: '456',
      change: '+5.1%',
      changeType: 'positive' as const,
      icon: ShoppingBagIcon,
    },
    {
      title: 'Total Users',
      value: '2,345',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: UsersIcon,
    },
  ];

  const recentOrders: RecentOrderProps[] = [
    {
      id: '1001',
      customer: 'John Smith',
      amount: '$125.00',
      status: 'completed',
      date: '2 hours ago',
    },
    {
      id: '1002',
      customer: 'Sarah Johnson',
      amount: '$89.50',
      status: 'pending',
      date: '4 hours ago',
    },
    {
      id: '1003',
      customer: 'Mike Davis',
      amount: '$234.75',
      status: 'completed',
      date: '6 hours ago',
    },
    {
      id: '1004',
      customer: 'Emily Brown',
      amount: '$67.25',
      status: 'cancelled',
      date: '8 hours ago',
    },
    {
      id: '1005',
      customer: 'David Wilson',
      amount: '$156.80',
      status: 'completed',
      date: '10 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sales Chart Placeholder */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
            <div className="h-80 bg-gray-50 rounded-md flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Chart will be implemented here</p>
                <p className="text-xs text-gray-500">Using Chart.js or similar library</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <a href="/admin/orders" className="text-sm text-indigo-600 hover:text-indigo-900">
                View all
              </a>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <RecentOrder key={index} {...order} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <ShoppingBagIcon className="h-5 w-5 mr-2 text-gray-400" />
              Add Product
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-gray-400" />
              View Orders
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
              Manage Users
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};