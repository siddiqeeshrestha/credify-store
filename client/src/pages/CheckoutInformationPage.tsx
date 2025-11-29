import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface ShippingInfo {
  fullname: string;
  email: string;
  phone: string;
}

export const CheckoutInformationPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullname: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save shipping information to session storage
      sessionStorage.setItem('checkoutShippingInfo', JSON.stringify(shippingInfo));
      
      // Navigate to payment page
      setLocation('/checkout/payment');
    } catch (error) {
      console.error('Error saving shipping information:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      id: "fullname",
      label: "Full name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "email",
      label: "Email",
      placeholder: "Enter your email address here",
      required: true,
    },
    {
      id: "phone",
      label: "Phone",
      placeholder: "Enter your phone number here",
      required: true,
    },
  ];

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
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
                INFORMATION
              </span>
            </Badge>
          </div>

          <p className="relative flex items-center justify-center [font-family:'Roboto',Helvetica] font-medium text-[#191a23] text-sm md:text-base text-center tracking-[0] leading-3 max-w-md">
            Please provide your details below to process your order.
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
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-full bg-[#98042d] flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-base">2</span>
              </div>
              <span className="text-xs md:text-sm font-bold text-[#98042d] text-center whitespace-nowrap">Info</span>
            </div>

            {/* Connector Line */}
            <div className="w-4 md:w-16 h-px bg-gray-300 flex-shrink-0"></div>

            {/* Step 3 - Payment */}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-shrink-0">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-full bg-gray-300 flex items-center justify-center">
                <img
                  className="w-3 h-3 md:w-6 md:h-6"
                  alt="Payment Icon"
                  src="/figmaAssets/ic-outline-payments.svg"
                />
              </div>
              <span className="text-xs md:text-sm font-bold text-gray-400 text-center whitespace-nowrap">Payment</span>
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
                Delivery Information
              </h3>

              <div className="relative w-[250px] md:w-[300px] h-0.5 bg-[#191a23] rounded-[10px]" />
            </div>

            <form onSubmit={handleSubmit} className="inline-flex flex-col items-center gap-6 md:gap-9 relative w-full">
              <div className="flex flex-wrap w-full items-start gap-4 md:gap-[16px_16px] relative px-4 md:px-0">
                {formFields.map((field) => (
                  <div
                    key={field.id}
                    className="flex flex-col w-full items-start gap-2 relative"
                  >
                    <Label
                      htmlFor={field.id}
                      className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-gray-scalegray-900 text-sm tracking-[0] leading-[14px]"
                    >
                      <span className="font-semibold text-[#191919] leading-[0.1px]">
                        {field.label}{" "}
                      </span>
                      {field.required && (
                        <span className="font-semibold text-[#ea4335] leading-[21px]">
                          *
                        </span>
                      )}
                    </Label>

                    <div className="relative w-full h-[49px]">
                      <Input
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        value={shippingInfo[field.id as keyof ShippingInfo]}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full h-[49px] bg-gray-scalewhite rounded-md border border-solid border-[#191a23] px-4 py-3.5 [font-family:'Roboto',Helvetica] font-normal text-[#606060] text-sm tracking-[0] leading-[18.2px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="flex w-full max-w-[300px] items-center justify-center gap-2 px-[26px] py-2.5 relative bg-[#98042d] rounded-lg hover:bg-[#98042d] h-auto"
              >
                <span className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-extrabold text-white text-base md:text-lg text-center tracking-[-0.40px] leading-8 whitespace-nowrap">
                  {isSubmitting ? 'Processing...' : 'Continue'}
                </span>
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex w-full max-w-[644px] mx-auto items-center justify-center gap-2.5 pt-0 pb-16 px-4 relative">
          <p className="relative w-full mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-sm md:text-base text-center tracking-[0] leading-[normal]">
            By clicking "Continue," you agree to our Terms of Service and Privacy
            Policy. Your use of our services indicates your acceptance of these
            terms. If you have any questions, please contact us before placing
            your order.
          </p>
        </div>
      </section>
    </Layout>
  );
};