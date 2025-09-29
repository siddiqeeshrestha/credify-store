import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

interface ChartData {
  labels: string[];
  values: number[];
}

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data - in real app, this would come from API
  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      changeType: 'positive',
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Total Orders',
      value: '1,429',
      change: '+12.5%',
      changeType: 'positive',
      icon: ShoppingBagIcon,
    },
    {
      title: 'New Customers',
      value: '892',
      change: '+5.4%',
      changeType: 'positive',
      icon: UsersIcon,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.8%',
      changeType: 'negative',
      icon: ChartBarIcon,
    },
  ];

  const revenueData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [12000, 15000, 13000, 18000, 16000, 20000],
  };

  const ordersData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [245, 312, 278, 389, 334, 456],
  };

  const topProducts = [
    { name: 'Steam Gift Card $50', sales: 234, revenue: 11700 },
    { name: 'Netflix Premium', sales: 189, revenue: 2835 },
    { name: 'Amazon Gift Card $25', sales: 156, revenue: 3900 },
    { name: 'PlayStation Store Card', sales: 134, revenue: 6700 },
    { name: 'Xbox Game Pass', sales: 98, revenue: 1470 },
  ];

  const topCategories = [
    { name: 'Gaming', percentage: 45, color: 'bg-blue-500' },
    { name: 'Entertainment', percentage: 25, color: 'bg-green-500' },
    { name: 'Shopping', percentage: 20, color: 'bg-purple-500' },
    { name: 'Food & Dining', percentage: 10, color: 'bg-yellow-500' },
  ];

  const recentActivity = [
    { type: 'order', message: 'New order #1234 placed', time: '5 minutes ago', amount: '$125.00' },
    { type: 'user', message: 'New user registration', time: '12 minutes ago', amount: null },
    { type: 'refund', message: 'Refund processed for order #1230', time: '18 minutes ago', amount: '-$89.50' },
    { type: 'order', message: 'Order #1233 completed', time: '25 minutes ago', amount: '$67.25' },
    { type: 'coupon', message: 'Coupon SAVE25 used', time: '32 minutes ago', amount: '-$25.00' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return '📦';
      case 'user':
        return '👤';
      case 'refund':
        return '💸';
      case 'coupon':
        return '🎫';
      default:
        return '📊';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-green-600';
      case 'user':
        return 'text-blue-600';
      case 'refund':
        return 'text-red-600';
      case 'coupon':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const SimpleBarChart: React.FC<{ data: ChartData; title: string; color: string }> = ({ data, title, color }) => {
    const maxValue = Math.max(...data.values);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.labels.map((label, index) => (
            <div key={label} className="flex items-center">
              <div className="w-12 text-sm text-gray-600">{label}</div>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${color}`}
                    style={{ width: `${(data.values[index] / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-20 text-sm font-medium text-gray-900 text-right">
                {title.includes('Revenue') ? `$${data.values[index].toLocaleString()}` : data.values[index].toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor your business performance and growth
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{metric.title}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{metric.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className={`flex items-center text-sm ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {metric.change}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">from last period</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart 
          data={revenueData} 
          title="Monthly Revenue" 
          color="bg-blue-500" 
        />
        <SimpleBarChart 
          data={ordersData} 
          title="Monthly Orders" 
          color="bg-green-500" 
        />
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {index + 1}. {product.name}
                  </p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ${product.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  <span className="text-sm text-gray-500">{category.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 text-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${getActivityColor(activity.type)}`}>
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                {activity.amount && (
                  <div className={`text-sm font-medium ${
                    activity.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {activity.amount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-indigo-600">2,847</div>
          <div className="text-sm text-gray-600">Total Page Views</div>
          <div className="text-xs text-green-600 mt-1">↗ +8.2% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">67.8%</div>
          <div className="text-sm text-gray-600">Customer Retention</div>
          <div className="text-xs text-green-600 mt-1">↗ +3.1% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">$45.67</div>
          <div className="text-sm text-gray-600">Average Order Value</div>
          <div className="text-xs text-red-600 mt-1">↘ -2.4% from last month</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">4.2</div>
          <div className="text-sm text-gray-600">Average Rating</div>
          <div className="text-xs text-green-600 mt-1">↗ +0.3% from last month</div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Performance Overview</h3>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDaysIcon className="h-4 w-4 mr-1" />
            Updated 5 minutes ago
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
            <div className="text-sm text-gray-600">Uptime</div>
            <div className="text-xs text-green-600 mt-1">Excellent</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">1.2s</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
            <div className="text-xs text-green-600 mt-1">Good</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">0.05%</div>
            <div className="text-sm text-gray-600">Error Rate</div>
            <div className="text-xs text-green-600 mt-1">Excellent</div>
          </div>
        </div>
      </div>

      {/* Note about charts */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ChartBarIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This analytics dashboard shows mock data for demonstration purposes. 
              In a production environment, this would be connected to real analytics APIs like Google Analytics, 
              Chart.js, or D3.js for interactive charts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};