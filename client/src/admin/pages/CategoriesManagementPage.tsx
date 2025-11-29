import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  type Category
} from '../../lib/api';
import { ImageUpload } from '../components/ImageUpload';

interface CategoryFormData {
  name: string;
  description: string;
  image: string;
  icon: string;
}

export const CategoriesManagementPage: React.FC = () => {
  const { data: categoriesData, isLoading, error } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const categories = categoriesData?.categories || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    image: '',
    icon: '',
  });

  const handleEdit = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        image: category.image || '',
        icon: category.icon || '',
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        image: '',
        icon: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleView = (category: Category) => {
    setViewingCategory(category);
  };

  const handleCloseView = () => {
    setViewingCategory(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          id: editingCategory.id,
          data: formData
        });
      } else {
        await createCategoryMutation.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving category:', error);
      // Show the actual error message from the server
      const errorMessage = error?.message || 'Failed to save category. Please try again.';
      alert(errorMessage);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await deleteCategoryMutation.mutateAsync(categoryId);
      } catch (error: any) {
        console.error('Error deleting category:', error);
        // Show the actual error message from the server
        const errorMessage = error?.response?.data?.message || error?.message || 'Failed to delete category. Please try again.';
        alert(errorMessage);
      }
    }
  };

  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-red-600">Error loading categories</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Categories Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage product categories with icons and images for your store.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => handleEdit()}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Categories Stats */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-medium">{categories.length}</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Categories</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {categories.length} {categories.length === 1 ? 'category' : 'categories'}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 hover:shadow-md transition-shadow"
          >
            {/* Category Image/Icon */}
            <div className="w-full flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
              {category.image ? (
                <img
                  className="h-24 w-24 rounded-lg object-cover shadow-sm"
                  src={category.image}
                  alt={category.name}
                />
              ) : category.icon ? (
                <div className="h-24 w-24 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl">{category.icon}</span>
                </div>
              ) : (
                <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Category Info */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 truncate">{category.name}</h3>
              {category.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{category.description}</p>
              )}
              <div className="mt-3 flex items-center text-xs text-gray-400">
                <span>Created {new Date(category.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="px-6 py-3 bg-gray-50 rounded-b-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleView(category)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <EyeIcon className="h-3 w-3 mr-1" />
                  View
                </button>
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-3 w-3 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-3 w-3 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
          <div className="mt-6">
            <button
              onClick={() => handleEdit()}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category Name *
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Enter category name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Describe this category"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Category Icon (Emoji)
                            </label>
                            <input
                              type="text"
                              value={formData.icon}
                              onChange={(e) => handleInputChange('icon', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="📱"
                              maxLength={2}
                            />
                            <p className="mt-1 text-xs text-gray-500">Use an emoji as category icon</p>
                          </div>

                          <div>
                            <ImageUpload
                              currentImage={formData.image}
                              onImageChange={(imageUrl) => handleInputChange('image', imageUrl)}
                              label="Category Image"
                            />
                          </div>
                        </div>

                        {/* Category Preview */}
                        {(formData.name || formData.icon) && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category Preview</label>
                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              {formData.icon ? (
                                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                                  <span className="text-xl">{formData.icon}</span>
                                </div>
                              ) : (
                                <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                  <PhotoIcon className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{formData.name || 'Category Name'}</p>
                                <p className="text-sm text-gray-500">{formData.description || 'Category description'}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending || !formData.name.trim()}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  >
                    {createCategoryMutation.isPending || updateCategoryMutation.isPending ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewingCategory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseView}></div>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Category Details
                  </h3>
                  <button
                    onClick={handleCloseView}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Category Image/Icon */}
                  <div className="flex justify-center">
                    {viewingCategory.image ? (
                      <img
                        className="h-32 w-32 rounded-lg object-cover shadow-sm"
                        src={viewingCategory.image}
                        alt={viewingCategory.name}
                      />
                    ) : viewingCategory.icon ? (
                      <div className="h-32 w-32 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <span className="text-4xl">{viewingCategory.icon}</span>
                      </div>
                    ) : (
                      <div className="h-32 w-32 rounded-lg bg-gray-200 flex items-center justify-center">
                        <PhotoIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-gray-900">{viewingCategory.name}</h4>
                    {viewingCategory.description && (
                      <p className="mt-2 text-gray-600">{viewingCategory.description}</p>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Created</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(viewingCategory.createdAt).toLocaleDateString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Updated</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {new Date(viewingCategory.updatedAt).toLocaleDateString()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => {
                      handleCloseView();
                      handleEdit(viewingCategory);
                    }}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleCloseView();
                      handleDelete(viewingCategory.id);
                    }}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
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