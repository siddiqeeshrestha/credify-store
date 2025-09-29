import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  isActive: boolean;
  createdAt: string;
}

interface CategoryFormData {
  name: string;
  description: string;
  image: string;
  isActive: boolean;
}

export const CategoriesManagementPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Gaming',
      description: 'Gaming gift cards and vouchers',
      image: '/api/placeholder/200/150',
      productCount: 15,
      isActive: true,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Food & Dining',
      description: 'Restaurant and food delivery vouchers',
      image: '/api/placeholder/200/150',
      productCount: 8,
      isActive: true,
      createdAt: '2024-01-10',
    },
    {
      id: '3',
      name: 'Shopping',
      description: 'Retail and e-commerce gift cards',
      image: '/api/placeholder/200/150',
      productCount: 22,
      isActive: false,
      createdAt: '2024-01-05',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    image: '',
    isActive: true,
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        image: category.image,
        isActive: category.isActive,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        image: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      // Create new category
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCategories([...categories, newCategory]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const handleToggleStatus = (categoryId: string) => {
    setCategories(categories.map(cat =>
      cat.id === categoryId 
        ? { ...cat, isActive: !cat.isActive }
        : cat
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your product categories and organize your store
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
            <div className="h-48 bg-gray-200">
              {category.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={category.image}
                  alt={category.name}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <PhotoIcon className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  category.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{category.productCount} products</span>
                <span>Created {category.createdAt}</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </button>
                
                <button
                  onClick={() => handleToggleStatus(category.id)}
                  className={`flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    category.isActive
                      ? 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500'
                      : 'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500'
                  }`}
                >
                  {category.isActive ? 'Deactivate' : 'Activate'}
                </button>
                
                <button
                  onClick={() => handleDelete(category.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Category Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter category name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter category description"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image URL
                      </label>
                      <input
                        type="url"
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                        Active category
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingCategory ? 'Update' : 'Create'} Category
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