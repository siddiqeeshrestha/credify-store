import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, DocumentDuplicateIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimumAmount?: number;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  applicableCategories?: string[];
}

interface CouponFormData {
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minimumAmount: number;
  usageLimit: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  applicableCategories: string[];
}

export const CouponsManagementPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: '1',
      code: 'WELCOME10',
      name: 'Welcome Discount',
      description: '10% off for new customers',
      type: 'percentage',
      value: 10,
      minimumAmount: 50,
      usageLimit: 100,
      usedCount: 23,
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      createdAt: '2024-01-01T00:00:00Z',
      applicableCategories: ['Gaming', 'Entertainment']
    },
    {
      id: '2',
      code: 'SAVE25',
      name: 'Fixed Discount',
      description: '$25 off on orders over $100',
      type: 'fixed',
      value: 25,
      minimumAmount: 100,
      usageLimit: 50,
      usedCount: 45,
      isActive: true,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      createdAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '3',
      code: 'EXPIRED20',
      name: 'Expired Coupon',
      description: '20% off - expired campaign',
      type: 'percentage',
      value: 20,
      minimumAmount: 30,
      usageLimit: 200,
      usedCount: 180,
      isActive: false,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      createdAt: '2023-12-01T00:00:00Z'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<CouponFormData>({
    code: '',
    name: '',
    description: '',
    type: 'percentage',
    value: 0,
    minimumAmount: 0,
    usageLimit: 1,
    isActive: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    applicableCategories: []
  });

  const categories = ['Gaming', 'Entertainment', 'Shopping', 'Food & Dining'];

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  const handleOpenModal = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        name: coupon.name,
        description: coupon.description,
        type: coupon.type,
        value: coupon.value,
        minimumAmount: coupon.minimumAmount || 0,
        usageLimit: coupon.usageLimit,
        isActive: coupon.isActive,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
        applicableCategories: coupon.applicableCategories || []
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: '',
        name: '',
        description: '',
        type: 'percentage',
        value: 0,
        minimumAmount: 0,
        usageLimit: 1,
        isActive: true,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        applicableCategories: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCoupon) {
      setCoupons(coupons.map(coupon => 
        coupon.id === editingCoupon.id 
          ? { ...coupon, ...formData }
          : coupon
      ));
    } else {
      const newCoupon: Coupon = {
        id: Date.now().toString(),
        ...formData,
        usedCount: 0,
        createdAt: new Date().toISOString(),
        minimumAmount: formData.minimumAmount > 0 ? formData.minimumAmount : undefined,
        applicableCategories: formData.applicableCategories.length > 0 ? formData.applicableCategories : undefined
      };
      setCoupons([...coupons, newCoupon]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (couponId: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    }
  };

  const handleToggleStatus = (couponId: string) => {
    setCoupons(coupons.map(coupon =>
      coupon.id === couponId 
        ? { ...coupon, isActive: !coupon.isActive }
        : coupon
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const duplicateCoupon = (coupon: Coupon) => {
    const newCoupon: Coupon = {
      ...coupon,
      id: Date.now().toString(),
      code: coupon.code + '_COPY',
      name: coupon.name + ' (Copy)',
      usedCount: 0,
      createdAt: new Date().toISOString()
    };
    setCoupons([...coupons, newCoupon]);
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const getStatusColor = (coupon: Coupon) => {
    if (!coupon.isActive) return 'bg-red-100 text-red-800';
    if (isExpired(coupon.endDate)) return 'bg-gray-100 text-gray-800';
    if (coupon.usedCount >= coupon.usageLimit) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (coupon: Coupon) => {
    if (!coupon.isActive) return 'Inactive';
    if (isExpired(coupon.endDate)) return 'Expired';
    if (coupon.usedCount >= coupon.usageLimit) return 'Used Up';
    return 'Active';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create and manage discount coupons for your customers
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Coupon
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardDocumentIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Coupons</dt>
                  <dd className="text-lg font-medium text-gray-900">{coupons.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Coupons</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {coupons.filter(c => c.isActive && !isExpired(c.endDate) && c.usedCount < c.usageLimit).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 bg-red-500 rounded-full"></div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Expired</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {coupons.filter(c => isExpired(c.endDate)).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 bg-blue-500 rounded-full"></div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Uses</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coupon Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valid Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <code className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                          {coupon.code}
                        </code>
                        <button
                          onClick={() => copyToClipboard(coupon.code)}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          title="Copy code"
                        >
                          <DocumentDuplicateIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-900 mt-1 font-medium">{coupon.name}</div>
                      <div className="text-sm text-gray-500">{coupon.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `$${coupon.value} OFF`}
                    </div>
                    {coupon.minimumAmount && (
                      <div className="text-sm text-gray-500">Min. ${coupon.minimumAmount}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {coupon.usedCount} / {coupon.usageLimit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{formatDate(coupon.startDate)}</div>
                    <div>to {formatDate(coupon.endDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(coupon)}`}>
                      {getStatusText(coupon)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenModal(coupon)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit Coupon"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => duplicateCoupon(coupon)}
                        className="text-green-600 hover:text-green-900"
                        title="Duplicate Coupon"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(coupon.id)}
                        className={`${coupon.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        title={coupon.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {coupon.isActive ? '❌' : '✅'}
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Coupon"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coupon Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Coupon Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                        Coupon Code
                      </label>
                      <div className="mt-1 flex">
                        <input
                          type="text"
                          id="code"
                          required
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                          className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                        />
                        <button
                          type="button"
                          onClick={generateCouponCode}
                          className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm hover:bg-gray-100"
                        >
                          Generate
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        required
                        rows={2}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Discount Type
                      </label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount ($)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                        Discount Value
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">
                            {formData.type === 'percentage' ? '%' : '$'}
                          </span>
                        </div>
                        <input
                          type="number"
                          id="value"
                          required
                          min="0"
                          step={formData.type === 'percentage' ? '1' : '0.01'}
                          max={formData.type === 'percentage' ? '100' : undefined}
                          value={formData.value}
                          onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                          className="pl-7 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="minimumAmount" className="block text-sm font-medium text-gray-700">
                        Minimum Amount ($) <span className="text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="number"
                        id="minimumAmount"
                        step="0.01"
                        min="0"
                        value={formData.minimumAmount}
                        onChange={(e) => setFormData({ ...formData, minimumAmount: parseFloat(e.target.value) || 0 })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700">
                        Usage Limit
                      </label>
                      <input
                        type="number"
                        id="usageLimit"
                        required
                        min="1"
                        value={formData.usageLimit}
                        onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 1 })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Applicable Categories <span className="text-gray-500">(optional)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map(category => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.applicableCategories.includes(category)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({
                                    ...formData,
                                    applicableCategories: [...formData.applicableCategories, category]
                                  });
                                } else {
                                  setFormData({
                                    ...formData,
                                    applicableCategories: formData.applicableCategories.filter(c => c !== category)
                                  });
                                }
                              }}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-900">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                          Active coupon
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingCoupon ? 'Update' : 'Create'} Coupon
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};