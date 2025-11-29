import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from '../lib/api';
import { useQueryClient } from '@tanstack/react-query';

interface ShippingInfo {
  fullname: string;
  email: string;
  phone: string;
}

export const CheckoutPaymentPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { data: cartData } = useCart();

  useEffect(() => {
    // Load shipping information from session storage
    const savedShippingInfo = sessionStorage.getItem('checkoutShippingInfo');
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    } else {
      // Redirect back to information page if no shipping info
      setLocation('/checkout/information');
    }
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!cartData?.cart?.items || cartData.cart.items.length === 0) {
      console.log('Cart data:', cartData);
      alert('Your cart is empty');
      return;
    }

    console.log('Cart items:', cartData.cart.items);
    console.log('Shipping info:', shippingInfo);

    setIsSubmitting(true);

    try {
      // Create order with cart items, shipping information and payment method
      const orderData = {
        items: cartData.cart.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: shippingInfo,
        paymentMethod: selectedPaymentMethod,
        notes: ''
      };

      console.log('Order data being sent:', orderData);

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const { order } = await response.json();
        // Store order ID for confirmation page
        sessionStorage.setItem('orderConfirmation', JSON.stringify(order));
        // Clear shipping info from session
        sessionStorage.removeItem('checkoutShippingInfo');
        // Invalidate cart and orders queries
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        // Navigate to confirmation page
        setLocation('/checkout/confirmed');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert(`Failed to process order: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    {
      id: 'bkash',
      name: 'bKash',
      description: 'Pay securely with bKash',
      icon: '/figmaAssets/image-1.png'
    },
    {
      id: 'nagad',
      name: 'Nagad',
      description: 'Pay securely with Nagad',
      icon: '/figmaAssets/image-2.png'
    }
  ];

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  if (!shippingInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <section className="gap-16 w-full [background:url(/figmaAssets/banner.png)_50%_50%_/_cover] flex flex-col items-center relative min-h-screen bg-white">
        <div className="inline-flex flex-col items-center gap-[18px] relative pt-16 px-4">
          <div className="flex flex-col md:flex-row items-center gap-3 relative">
            <h2 className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-2xl md:text-[32px] tracking-[0] leading-[35.2px] text-center">
              PRODUCT DELIVERY
            </h2>

            <Badge className="inline-flex h-[40px] md:h-[50px] items-center justify-center px-[7px] py-0 relative bg-[#98042d] rounded-lg hover:bg-[#98042d]">
              <span className="relative w-fit text-white text-2xl md:text-[32px] leading-[35.2px] whitespace-nowrap [font-family:'Roboto',Helvetica] font-bold tracking-[0]">
                PAYMENT
              </span>
            </Badge>
          </div>

          <p className="relative flex items-center justify-center [font-family:'Roboto',Helvetica] font-medium text-[#191a23] text-sm md:text-base text-center tracking-[0] leading-3 max-w-md">
            Choose your preferred payment method to complete your order.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 md:gap-8 w-full overflow-x-auto">
            {/* Step 1 - Your Cart */}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-shrink-0">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-full bg-green-600 flex items-center justify-center">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-green-600 text-center whitespace-nowrap">Cart</span>
            </div>

            {/* Connector Line */}
            <div className="w-4 md:w-16 h-px bg-green-600 flex-shrink-0"></div>

            {/* Step 2 - Information */}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-shrink-0">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-full bg-green-600 flex items-center justify-center">
                <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-bold text-green-600 text-center whitespace-nowrap">Info</span>
            </div>

            {/* Connector Line */}
            <div className="w-4 md:w-16 h-px bg-[#98042d] flex-shrink-0"></div>

            {/* Step 3 - Payment */}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-shrink-0">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-full bg-[#98042d] flex items-center justify-center">
                <img
                  className="w-3 h-3 md:w-6 md:h-6 filter brightness-0 invert"
                  alt="Payment Icon"
                  src="/figmaAssets/ic-outline-payments.svg"
                />
              </div>
              <span className="text-xs md:text-sm font-bold text-[#98042d] text-center whitespace-nowrap">Payment</span>
            </div>

            {/* Connector Line */}
            <div className="w-4 md:w-16 h-px bg-gray-300 flex-shrink-0"></div>

            {/* Step 4 - Confirmed */}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-shrink-0">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-full bg-gray-300 flex items-center justify-center">
                <img
                  className="w-3 h-3 md:w-6 md:h-6"
                  alt="Confirmed Icon"
                  src="/figmaAssets/mdi-tick-circle-outline.svg"
                />
              </div>
              <span className="text-xs md:text-sm font-bold text-gray-400 text-center whitespace-nowrap">Done</span>
            </div>
          </div>
        </div>

        <Card className="flex flex-col w-full max-w-[629px] mx-auto items-center gap-[13px] px-4 md:px-0 py-8 relative bg-white rounded-2xl border border-solid border-[#e6e6e6] shadow-[0px_2px_2px_#00000099]">
          <CardContent className="flex flex-col w-full max-w-[428px] items-center gap-6 relative p-0">
            <div className="inline-flex flex-col items-center justify-center gap-2.5 relative">
              <h3 className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scalegray-900 text-xl md:text-2xl tracking-[0] leading-9 whitespace-nowrap text-center">
                Payment Method
              </h3>

              <div className="relative w-[250px] md:w-[300px] h-0.5 bg-[#191a23] rounded-[10px]" />
            </div>

            <form onSubmit={handleSubmit} className="inline-flex flex-col items-center gap-6 md:gap-9 relative w-full">
              <RadioGroup 
                value={selectedPaymentMethod} 
                onValueChange={setSelectedPaymentMethod}
                className="flex flex-col w-full items-start gap-4 relative px-4 md:px-0"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex w-full h-[60px] items-center gap-4 p-4 relative bg-white rounded-lg border border-solid border-[#e6e6e6] hover:border-[#98042d] transition-colors">
                    <RadioGroupItem 
                      value={method.id} 
                      id={method.id}
                      className="flex-shrink-0"
                    />
                    
                    <img
                      className="relative w-10 h-10 object-contain"
                      alt={method.name}
                      src={method.icon}
                    />
                    
                    <Label 
                      htmlFor={method.id}
                      className="flex flex-col flex-1 cursor-pointer"
                    >
                      <span className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-sm md:text-base tracking-[0] leading-5">
                        {method.name}
                      </span>
                      <span className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-[#606060] text-xs md:text-sm tracking-[0] leading-[18.2px]">
                        {method.description}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Button 
                type="submit"
                disabled={isSubmitting || !selectedPaymentMethod}
                className="flex w-full max-w-[300px] items-center justify-center gap-2 px-[26px] py-2.5 relative bg-[#98042d] rounded-lg hover:bg-[#98042d] h-auto disabled:opacity-50"
              >
                <span className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-extrabold text-white text-base md:text-lg text-center tracking-[-0.40px] leading-8 whitespace-nowrap">
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex w-full max-w-[644px] mx-auto items-center justify-center gap-2.5 pt-0 pb-16 px-4 relative">
          <p className="relative w-full mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-sm md:text-base text-center tracking-[0] leading-[normal]">
            By completing your order, you agree to our Terms of Service and Privacy
            Policy. Your payment information is secure and encrypted. If you
            encounter any issues, please contact our support team.
          </p>
        </div>
      </section>
    </Layout>
  );
};