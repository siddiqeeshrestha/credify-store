import React, { useState } from 'react';
import { EyeIcon, PencilIcon, TrashIcon, UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'customer' | 'vip' | 'admin';
  joinDate: string;
  lastLogin?: string;
  totalOrders: number;
  totalSpent: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'customer' | 'vip' | 'admin';
}

export const UsersManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-234-567-8900',
      avatar: '/api/placeholder/100/100',
      status: 'active',
      role: 'vip',
      joinDate: '2023-06-15T10:30:00Z',
      lastLogin: '2024-01-15T14:20:00Z',
      totalOrders: 15,
      totalSpent: 1250.75,
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-234-567-8901',
      status: 'active',
      role: 'customer',
      joinDate: '2023-08-20T09:15:00Z',
      lastLogin: '2024-01-14T11:45:00Z',
      totalOrders: 8,
      totalSpent: 450.25,
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      }
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1-234-567-8902',
      status: 'inactive',
      role: 'customer',
      joinDate: '2023-12-01T16:00:00Z',
      lastLogin: '2023-12-25T13:30:00Z',
      totalOrders: 3,
      totalSpent: 125.50,
      address: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      }
    },
    {
      id: '4',
      name: 'Emily Brown',
      email: 'emily.brown@email.com',
      status: 'suspended',
      role: 'customer',
      joinDate: '2023-11-10T12:00:00Z',
      lastLogin: '2023-12-20T10:15:00Z',
      totalOrders: 12,
      totalSpent: 980.00,
    },
    {
      id: '5',
      name: 'Admin User',
      email: 'admin@credify.com',
      status: 'active',
      role: 'admin',
      joinDate: '2023-01-01T00:00:00Z',
      lastLogin: '2024-01-15T16:00:00Z',
      totalOrders: 0,
      totalSpent: 0,
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    role: 'customer'
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        status: user.status,
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'active',
        role: 'customer'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0
      };
      setUsers([...users, newUser]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(user =>
      user.id === userId 
        ? { ...user, status: newStatus }
        : user
    ));
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'vip':
        return 'bg-yellow-100 text-yellow-800';
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.phone && user.phone.includes(searchTerm));
    return matchesStatus && matchesRole && matchesSearch;
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

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const vipUsers = users.filter(u => u.role === 'vip').length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage customer accounts and user data
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <UserIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalUsers}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{activeUsers}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">VIP Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{vipUsers}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900">${totalRevenue.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="vip">VIP</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center text-sm text-gray-500">
                          <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>Joined: {formatDate(user.joinDate)}</div>
                    {user.lastLogin && (
                      <div>Last login: {formatDate(user.lastLogin)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{user.totalOrders} orders</div>
                    <div className="text-gray-500">${user.totalSpent.toFixed(2)} spent</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit User"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                        className="text-xs border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete User"
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

      {/* User Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingUser ? 'Edit User' : 'Add New User'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
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
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="customer">Customer</option>
                        <option value="vip">VIP</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingUser ? 'Update' : 'Create'} User
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedUser(null)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">User Details</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Personal Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center">
                        {selectedUser.avatar ? (
                          <img className="h-12 w-12 rounded-full" src={selectedUser.avatar} alt={selectedUser.name} />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                            <UserIcon className="h-8 w-8 text-gray-600" />
                          </div>
                        )}
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{selectedUser.name}</div>
                          <div className="text-sm text-gray-500">ID: {selectedUser.id}</div>
                        </div>
                      </div>
                      <div><span className="font-medium">Email:</span> {selectedUser.email}</div>
                      {selectedUser.phone && (
                        <div><span className="font-medium">Phone:</span> {selectedUser.phone}</div>
                      )}
                    </div>

                    {selectedUser.address && (
                      <>
                        <h4 className="font-medium text-gray-900">Address</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-1">
                            <div>{selectedUser.address.street}</div>
                            <div>
                              {selectedUser.address.city}, {selectedUser.address.state} {selectedUser.address.zipCode}
                            </div>
                            <div>{selectedUser.address.country}</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Account Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div><span className="font-medium">Join Date:</span> {formatDate(selectedUser.joinDate)}</div>
                      {selectedUser.lastLogin && (
                        <div><span className="font-medium">Last Login:</span> {formatDate(selectedUser.lastLogin)}</div>
                      )}
                      <div><span className="font-medium">Total Orders:</span> {selectedUser.totalOrders}</div>
                      <div><span className="font-medium">Total Spent:</span> ${selectedUser.totalSpent.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Close
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