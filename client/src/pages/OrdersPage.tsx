import React, { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useOrders } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const OrdersPage: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: ordersData, isLoading, error, refetch } = useOrders();
  const [, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, authLoading, setLocation]);

  // Handle authentication errors from the orders API
  useEffect(() => {
    if (error && error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes('authenticated') || errorMessage.includes('401')) {
        setLocation('/login');
      }
    }
  }, [error, setLocation]);
  
  const orders = ordersData?.orders || [];

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#f9e8e8] flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#f9e8e8] flex items-center justify-center">
          <div className="text-lg">Redirecting to login...</div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#f9e8e8] flex items-center justify-center">
          <div className="text-lg">Loading orders...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#f9e8e8] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading orders</h2>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'Please try again later.'}
            </p>
            <Button
              onClick={() => refetch()}
              className="bg-[#98042d] text-white px-6 py-3 rounded-lg hover:bg-[#98042d]/90"
            >
              Retry
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#f9e8e8] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Button
              onClick={() => setLocation('/')}
              className="bg-[#98042d] text-white px-6 py-3 rounded-lg hover:bg-[#98042d]/90"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'confirmed': return 'text-blue-600';
      case 'processing': return 'text-purple-600';
      case 'shipped': return 'text-indigo-600';
      case 'delivered': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: string | number | undefined) => {
    if (!amount) return '$0.00';
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `$${numAmount.toFixed(2)}`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f9e8e8] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col items-center gap-2.5 pt-0 pb-16 px-0 relative w-full bg-white rounded-2xl">
            <Card className="w-full max-w-[1040px] bg-white rounded-2xl border border-solid border-[#6c7174] shadow-[0px_2px_2px_#000000]">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-8">
                  <h2 className="[font-family:'Neology-Bold-Bold',Helvetica] font-bold text-[#191919] text-xl tracking-[0] leading-[30px]">
                    Recent Order History
                  </h2>
                  {orders.length > 10 && (
                    <Button className="w-[140px] h-10 bg-[#98042d] rounded-[36px] shadow-[0px_2px_2px_#00000099] hover:bg-[#98042d]/90 h-auto">
                      <span className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-center leading-6 text-sm tracking-[0]">
                        View All
                      </span>
                    </Button>
                  )}
                </div>

                <div className="w-full">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 border border-solid border-[#6c7174]">
                        <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                          ORDER ID
                        </TableHead>
                        <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                          DATE
                        </TableHead>
                        <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                          TOTAL
                        </TableHead>
                        <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                          STATUS
                        </TableHead>
                        <TableHead className="[font-family:'Roboto',Helvetica] font-bold text-black text-sm tracking-[0.42px] leading-[14px] px-6 py-4">
                          ACTION
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 10).map((order, index) => (
                        <React.Fragment key={order.id}>
                          <TableRow>
                            <TableCell className="px-6 py-3">
                              <div className="flex items-center">
                                <span className="[font-family:'Poppins',Helvetica] font-normal text-[#333333] text-sm tracking-[0] leading-[21px]">
                                  #
                                </span>
                                <span className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[21px]">
                                  {order.orderNumber || order.id.slice(0, 8)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="px-6 py-3">
                              <span className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[21px]">
                                {formatDate(order.createdAt)}
                              </span>
                            </TableCell>
                            <TableCell className="px-6 py-3">
                              <span className="[font-family:'Roboto',Helvetica] font-medium text-[#333333] text-sm tracking-[0] leading-[21px]">
                                {formatCurrency((order as any).total)} ({order.items?.length || 0} Product{(order.items?.length || 0) !== 1 ? 's' : ''})
                              </span>
                            </TableCell>
                            <TableCell className="px-6 py-3">
                              <span className={`[font-family:'Roboto',Helvetica] font-medium text-sm tracking-[0] leading-[21px] ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="px-6 py-3">
                              <button 
                                onClick={() => setLocation(`/order/${order.id}`)}
                                className="[font-family:'Roboto',Helvetica] font-medium text-[#98042d] text-sm tracking-[0] leading-[21px] hover:underline"
                              >
                                View Details
                              </button>
                            </TableCell>
                          </TableRow>
                          {index < orders.slice(0, 10).length - 1 && (
                            <TableRow>
                              <TableCell colSpan={5} className="p-0">
                                <div className="h-px bg-[#6c7174]" />
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};