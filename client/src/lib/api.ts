import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// API Base URL
const API_BASE = '/api';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice?: string;
  stock: number;
  categoryId?: string;
  images: string[];
  featured: boolean;
  isActive: boolean;
  sku?: string;
  weight?: string;
  dimensions?: any;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductOption {
  id: string;
  productId: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  billingAddress: any;
  shippingAddress: any;
  notes?: string;
  accounts?: string;
  redeemCodes?: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  userPhone?: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

// API Functions
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    // Throw the actual error message from the server
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: async (credentials: { username: string; password: string }) => {
    return apiRequest<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) => {
    return apiRequest<{ user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  },

  me: async () => {
    return apiRequest<{ user: User }>('/auth/me');
  },

  updateProfile: async (profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar?: string;
  }) => {
    return apiRequest<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Products API
export const productsApi = {
  getAll: async () => {
    return apiRequest<{ products: Product[] }>('/products');
  },

  getById: async (id: string) => {
    return apiRequest<{ product: Product }>(`/products/${id}`);
  },

  getFeatured: async () => {
    return apiRequest<{ products: Product[] }>('/products/featured');
  },

  search: async (query: string) => {
    return apiRequest<{ products: Product[] }>(`/products/search?q=${encodeURIComponent(query)}`);
  },

  getByCategory: async (categoryId: string) => {
    return apiRequest<{ products: Product[] }>(`/categories/${categoryId}/products`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: async () => {
    return apiRequest<{ categories: Category[] }>('/categories');
  },

  getById: async (id: string) => {
    return apiRequest<{ category: Category }>(`/categories/${id}`);
  },
};

// Cart API
export const cartApi = {
  get: async () => {
    return apiRequest<{ cart: Cart }>('/cart');
  },

  add: async (productId: string, quantity: number = 1) => {
    return apiRequest<{ cart: Cart }>('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  update: async (productId: string, quantity: number) => {
    return apiRequest<{ cart: Cart }>('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  remove: async (productId: string) => {
    return apiRequest<{ cart: Cart }>(`/cart/remove/${productId}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: {
    items: { productId: string; quantity: number }[];
    shippingAddress?: any;
    paymentMethod?: string;
    notes?: string;
  }) => {
    return apiRequest<{ order: Order }>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiRequest<{ orders: Order[] }>('/orders');
  },

  getById: async (id: string) => {
    return apiRequest<{ order: Order }>(`/orders/${id}`);
  },
};

// Admin API
export const adminApi = {
  // Product management
  products: {
    create: async (productData: Partial<Product>) => {
      return apiRequest<{ product: Product }>('/admin/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    },

    update: async (id: string, productData: Partial<Product>) => {
      return apiRequest<{ product: Product }>(`/admin/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
    },

    delete: async (id: string) => {
      return apiRequest<{ message: string }>(`/admin/products/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Category management
  categories: {
    create: async (categoryData: Partial<Category>) => {
      return apiRequest<{ category: Category }>('/admin/categories', {
        method: 'POST',
        body: JSON.stringify(categoryData),
      });
    },

    update: async (id: string, categoryData: Partial<Category>) => {
      return apiRequest<{ category: Category }>(`/admin/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(categoryData),
      });
    },

    delete: async (id: string) => {
      return apiRequest<{ message: string }>(`/admin/categories/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Order management
  orders: {
    getAll: async () => {
      return apiRequest<{ orders: Order[] }>('/admin/orders');
    },

    updateStatus: async (id: string, status: string) => {
      return apiRequest<{ order: Order }>(`/admin/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    },

    updateAssets: async (id: string, accounts?: string, redeemCodes?: string) => {
      return apiRequest<{ order: Order }>(`/admin/orders/${id}/assets`, {
        method: 'PUT',
        body: JSON.stringify({ accounts, redeemCodes }),
      });
    },
  },

  // User management
  users: {
    getAll: async () => {
      return apiRequest<{ users: User[] }>('/admin/users');
    },

    updateRole: async (id: string, role: string) => {
      return apiRequest<{ user: User }>(`/admin/users/${id}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role }),
      });
    },

    delete: async (id: string) => {
      return apiRequest<{ message: string }>(`/admin/users/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

// React Query Hooks

// Auth hooks
export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

// Product hooks
export function useProducts(categorySlug?: string) {
  return useQuery({
    queryKey: categorySlug ? ['products', 'category', categorySlug] : ['products'],
    queryFn: async () => {
      const endpoint = categorySlug 
        ? `/products?categorySlug=${encodeURIComponent(categorySlug)}`
        : `/products`;
      return apiRequest<{ products: Product[] }>(endpoint);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productsApi.getFeatured,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productsApi.search(query),
    enabled: !!query && query.length > 2,
  });
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => productsApi.getByCategory(categoryId),
    enabled: !!categoryId,
  });
}

export function useProductOptions(productId: string) {
  return useQuery({
    queryKey: ['productOptions', productId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/products/${productId}/options`);
      if (!response.ok) {
        throw new Error('Failed to fetch product options');
      }
      return response.json();
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Category hooks
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
}

// Cart hooks
export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.get,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity?: number }) =>
      cartApi.add(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.update(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => cartApi.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// Order hooks
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on authentication errors
      if (error?.message?.includes('authenticated') || 
          error?.message?.includes('401')) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// Admin hooks
export function useAdminOrders() {
  return useQuery({
    queryKey: ['admin', 'orders'],
    queryFn: adminApi.orders.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminApi.users.getAll,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.products.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      adminApi.products.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.products.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.categories.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) =>
      adminApi.categories.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.categories.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.orders.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderAssets() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, accounts, redeemCodes }: { id: string; accounts?: string; redeemCodes?: string }) =>
      adminApi.orders.updateAssets(id, accounts, redeemCodes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      adminApi.users.updateRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminApi.users.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}