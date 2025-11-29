import React from 'react';
import { Route, Switch } from 'wouter';
import { useAdmin } from './contexts/AdminContext';
import { AdminProvider } from './contexts/AdminContext';
import { AdminLayout } from './components/AdminLayout';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CategoriesManagementPage } from './pages/CategoriesManagementPage';
import { ProductsManagementPage } from './pages/ProductsManagementPage';
import { OrdersManagementPage } from './pages/OrdersManagementPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { CouponsManagementPage } from './pages/CouponsManagementPage';
import { UsersManagementPage } from './pages/UsersManagementPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

const AdminRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboardPage} />
        <Route path="/admin/dashboard" component={AdminDashboardPage} />
        <Route path="/admin/categories" component={CategoriesManagementPage} />
        <Route path="/admin/products" component={ProductsManagementPage} />
        <Route path="/admin/orders/:orderId" component={OrderDetailPage} />
        <Route path="/admin/orders" component={OrdersManagementPage} />
        <Route path="/admin/coupons" component={CouponsManagementPage} />
        <Route path="/admin/users" component={UsersManagementPage} />
        <Route path="/admin/analytics" component={AnalyticsPage} />
        <Route path="/admin/settings" component={AdminSettingsPage} />
        <Route>
          <AdminDashboardPage />
        </Route>
      </Switch>
    </AdminLayout>
  );
};

export const AdminApp: React.FC = () => {
  return (
    <AdminProvider>
      <AdminRoutes />
    </AdminProvider>
  );
};