import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';
import { useOrder } from '../lib/api';

export const CheckoutConfirmedPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const { data: orderData, isLoading } = useOrder(orderId || '');

  useEffect(() => {
    // Get order data from session storage
    const savedOrderData = sessionStorage.getItem('orderConfirmation');
    if (savedOrderData) {
      const orderData = JSON.parse(savedOrderData);
      setOrderId(orderData.id);
      // Clean up session storage
      sessionStorage.removeItem('orderConfirmation');
    } else {
      // Redirect to home if no order data
      setLocation('/');
    }
  }, [setLocation]);

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  if (isLoading || !orderId) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#f9e8e8] flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  const order = orderData?.order;

  const calculateTotal = () => {
    if (!order?.items) return 0;
    return order.items.reduce((total: number, item: any) => {
      return total + (parseFloat(item.product?.price || '0') * item.quantity);
    }, 0);
  };

  return (
    <Layout>
      <section className="min-h-screen bg-[#f9e8e8] flex flex-col items-center relative">
        {/* Header */}
        <div className="w-full bg-white flex flex-col items-center relative">
          <header className="flex flex-col items-center relative w-full bg-[#191a23]">
            <div className="flex flex-col max-w-[1240px] w-full items-center gap-4 px-4 py-[50px] relative">
              <div className="flex flex-col items-start relative w-full">
                <h1 className="w-full font-bold text-[32px] leading-[48px] relative flex items-center justify-center mt-[-1.00px] [font-family:'Roboto',Helvetica] text-white tracking-[0]">
                  Order Confirmed
                </h1>
              </div>
            </div>
          </header>
        </div>

        <div className="py-16 px-4 max-w-[1240px] w-full">
          {/* Success Message */}
          <div className="flex flex-col items-center gap-8 mb-12">
            <div className="flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#191a23] mb-4">
                Thank You for Your Order!
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Your order has been successfully placed and is being processed.
              </p>
              {order && (
                <p className="text-base text-gray-500">
                  Order Number: <span className="font-medium text-[#98042d]">{order.orderNumber}</span>
                </p>
              )}
            </div>
          </div>

          {/* Order Status Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="font-medium text-green-600">Order Placed</span>
                <div className="w-16 h-px bg-gray-300 ml-4" />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#98042d] flex items-center justify-center text-white">
                  <Package className="w-4 h-4" />
                </div>
                <span className="font-medium text-[#98042d]">Processing</span>
                <div className="w-16 h-px bg-gray-300 ml-4" />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-medium text-gray-400">Shipped</span>
                <div className="w-16 h-px bg-gray-300 ml-4" />
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  ✓
                </div>
                <span className="font-medium text-gray-400">Delivered</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1200px] mx-auto">
            {/* Order Details */}
            <Card className="flex flex-col items-start gap-6 p-6 relative bg-white rounded-2xl border border-solid border-[#e6e6e6] shadow-[0px_2px_2px_#00000099]">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-gray-900 text-xl">Order Details</h3>
                <Badge className="bg-[#98042d] hover:bg-[#98042d]">
                  <span className="text-white font-medium">
                    {order?.status?.toUpperCase() || 'PENDING'}
                  </span>
                </Badge>
              </div>
              
              <div className="w-full space-y-4">
                {order?.items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${((parseFloat(item.product?.price || '0')) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No items found</p>
                )}
              </div>

              <div className="w-full pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">Total:</p>
                  <p className="text-lg font-bold text-[#98042d]">${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
            </Card>

            {/* Delivery Information */}
            <Card className="flex flex-col items-start gap-6 p-6 relative bg-white rounded-2xl border border-solid border-[#e6e6e6] shadow-[0px_2px_2px_#00000099]">
              <h3 className="font-bold text-gray-900 text-xl">Delivery Information</h3>
              
              <div className="w-full space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Estimated Delivery</p>
                    <p className="text-sm text-blue-700">
                      3-5 business days
                    </p>
                  </div>
                </div>

                {order?.shippingAddress && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Shipping Address:</h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Contact Information:</h4>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {order?.shippingAddress?.email && (
                      <p>Email: {order.shippingAddress.email}</p>
                    )}
                    {order?.shippingAddress?.phone && (
                      <p>Phone: {order.shippingAddress.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <Button 
              onClick={() => setLocation('/orders')}
              variant="outline"
              className="px-8 py-3 border-[#98042d] text-[#98042d] hover:bg-[#98042d] hover:text-white"
            >
              View Order History
            </Button>
            
            <Button 
              onClick={() => setLocation('/')}
              className="px-8 py-3 bg-[#98042d] text-white hover:bg-[#98042d]/90"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Additional Information */}
          <div className="flex justify-center mt-12">
            <Card className="max-w-[600px] p-6 bg-yellow-50 border border-yellow-200">
              <div className="text-center">
                <h4 className="font-bold text-yellow-900 mb-2">What's Next?</h4>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p>• You will receive an email confirmation shortly</p>
                  <p>• Track your order status in your order history</p>
                  <p>• We'll notify you when your order ships</p>
                  <p>• Contact support if you have any questions</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};