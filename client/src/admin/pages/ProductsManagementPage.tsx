import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon, EyeIcon } from '@heroicons/react/24/outline';
import { 
  useProducts, 
  useCategories,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useProductOptions,
  type Product,
  type Category
} from '../../lib/api';
import { ImageUpload } from '../components/ImageUpload';
import { ProductOptionsManager } from '../components/ProductOptionsManager';

interface ProductFormData {
  name: string;
  categoryId: string;
  price: string;
  originalPrice?: string;
  description: string;
  images: string[];
  stock: number;
  isActive: boolean;
  featured: boolean;
  sku?: string;
  weight?: string;
  tags?: string[];
  options: {
    id?: string;
    productId?: string;
    type: 'select' | 'input' | 'checkbox';
    name: string;
    key: string;
    required: boolean;
    placeholder?: string;
    options: {
      label: string;
      value: string;
      priceModifier?: number;
      description?: string;
    }[];
    sortOrder: number;
    isActive: boolean;
  }[];
}

export const ProductsManagementPage: React.FC = () => {
  // React Query hooks
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categoriesData } = useCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();
  
  const products = productsData?.products || [];
  const categories = categoriesData?.categories || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    categoryId: '',
    price: '',
    originalPrice: '',
    description: '',
    images: [],
    stock: 0,
    isActive: true,
    featured: false,
    sku: '',
    weight: '',
    tags: [],
    options: [],
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        categoryId: product.categoryId || '',
        price: product.price,
        originalPrice: product.originalPrice || '',
        description: product.description || '',
        images: product.images || [''],
        stock: product.stock,
        isActive: product.isActive,
        featured: product.featured,
        sku: product.sku || '',
        weight: product.weight || '',
        tags: product.tags || [],
        options: [], // TODO: Load from API
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        categoryId: '',
        price: '',
        originalPrice: '',
        description: '',
        images: [],
        stock: 0,
        isActive: true,
        featured: false,
        sku: '',
        weight: '',
        tags: [],
        options: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        alert('Product name is required');
        return;
      }
      
      if (!formData.categoryId) {
        alert('Please select a category');
        return;
      }
      
      if (!formData.price || parseFloat(formData.price) <= 0) {
        alert('Please enter a valid price');
        return;
      }

      // Extract options from formData to manage them separately
      const { options, ...productData } = formData;
      
      // Clean up the product data
      const cleanedProductData = {
        ...productData,
        originalPrice: productData.originalPrice || undefined,
        images: productData.images.filter(img => img && img.trim()), // Remove empty images
        price: productData.price.toString(),
        stock: Number(productData.stock),
        description: productData.description.trim() || undefined,
        sku: productData.sku?.trim() || undefined,
        weight: productData.weight?.trim() || undefined,
      };
      
      console.log('Submitting product data:', cleanedProductData);
      
      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          data: cleanedProductData
        });
      } else {
        await createProductMutation.mutateAsync(cleanedProductData);
      }
      handleCloseModal();
    } catch (error: any) {
      console.error('Error saving product:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Unknown error occurred';
      alert(`Failed to save product: ${errorMessage}`);
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductMutation.mutateAsync(productId);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleToggleStatus = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      try {
        await updateProductMutation.mutateAsync({
          id: productId,
          data: { isActive: !product.isActive }
        });
      } catch (error) {
        console.error('Error updating product status:', error);
        alert('Failed to update product status. Please try again.');
      }
    }
  };

  const handleToggleFeatured = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      try {
        await updateProductMutation.mutateAsync({
          id: productId,
          data: { featured: !product.featured }
        });
      } catch (error) {
        console.error('Error updating product featured status:', error);
        alert('Failed to update product featured status. Please try again.');
      }
    }
  };

  if (productsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading products. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your product catalog and inventory
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
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
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        {product.images?.[0] ? (
                          <img className="h-12 w-12 rounded-lg object-cover" src={product.images[0]} alt={product.name} />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                            <PhotoIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          {product.featured && (
                            <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {categories.find(cat => cat.id === product.categoryId)?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.stock > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setViewingProduct(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit Product"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(product.id)}
                        className={`${product.featured ? 'text-yellow-600 hover:text-yellow-900' : 'text-gray-400 hover:text-yellow-600'}`}
                        title={product.featured ? 'Remove from Featured' : 'Add to Featured'}
                      >
                        ⭐
                      </button>
                      <button
                        onClick={() => handleToggleStatus(product.id)}
                        className={`${product.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        title={product.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {product.isActive ? '❌' : '✅'}
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Product"
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

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleCloseModal}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name
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
                      <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="categoryId"
                        required
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        id="stock"
                        min="0"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        id="price"
                        step="0.01"
                        min="0"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">
                        Original Price ($) <span className="text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="number"
                        id="originalPrice"
                        step="0.01"
                        min="0"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <ImageUpload
                        currentImage={formData.images[0] || ''}
                        onImageChange={(imageUrl) => {
                          // Only add image if it's not empty
                          if (imageUrl && imageUrl.trim()) {
                            setFormData({ ...formData, images: [imageUrl] });
                          } else {
                            setFormData({ ...formData, images: [] });
                          }
                        }}
                        label="Product Image (Optional)"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
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
                      />
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                          Active
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                          Featured
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Options */}
                  <ProductOptionsManager
                    productId={editingProduct?.id}
                    options={formData.options}
                    onChange={(options) => setFormData({ ...formData, options })}
                    className="mt-6"
                  />
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingProduct ? 'Update' : 'Create'} Product
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

      {/* Product Details Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setViewingProduct(null)}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
                
                <div className="space-y-4">
                  <div className="text-center">
                    {viewingProduct.images?.[0] ? (
                      <img className="h-40 w-40 mx-auto rounded-lg object-cover" src={viewingProduct.images[0]} alt={viewingProduct.name} />
                    ) : (
                      <div className="h-40 w-40 mx-auto rounded-lg bg-gray-200 flex items-center justify-center">
                        <PhotoIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">{viewingProduct.name}</h4>
                    <p className="text-sm text-gray-600">{viewingProduct.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span> {categories.find(cat => cat.id === viewingProduct.categoryId)?.name || 'Uncategorized'}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> ${viewingProduct.price}
                      {viewingProduct.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through">${viewingProduct.originalPrice}</span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Stock:</span> {viewingProduct.stock}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {viewingProduct.isActive ? 'Active' : 'Inactive'}
                    </div>
                    <div>
                      <span className="font-medium">Featured:</span> {viewingProduct.featured ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {viewingProduct.createdAt}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => setViewingProduct(null)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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