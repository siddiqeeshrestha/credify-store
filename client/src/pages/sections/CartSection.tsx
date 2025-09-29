import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export const CartSection = (): JSX.Element => {
  const cartItems = [
    {
      id: 1,
      name: "Valorant Points Malaysia",
      region: "All Regions",
      price: 560,
      quantity: 2,
      image: "/figmaAssets/image-20.png",
    },
    {
      id: 2,
      name: "Valorant Points Malaysia",
      region: "All Regions",
      price: 1200,
      quantity: 1,
      image: "/figmaAssets/image-20.png",
    },
  ];

  const orderSteps = [
    { number: 1, title: "Your Cart", active: true },
    { number: 2, title: "Information", active: false },
    { number: 3, title: "Payment", active: false },
    { number: 4, title: "Confirmed", active: false },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <section className="flex flex-col items-center gap-8 px-4 py-8 w-full">
      <div className="w-full max-w-[1200px]">
        {/* Order Steps */}
        <div className="flex items-center justify-center gap-8 mb-8">
          {orderSteps.map((step) => (
            <div key={step.number} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step.active ? 'bg-[#98042d] text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step.number}
              </div>
              <span className={`text-sm font-medium ${
                step.active ? 'text-[#98042d]' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {step.number < orderSteps.length && (
                <div className="w-12 h-0.5 bg-gray-200 ml-3"></div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <CardContent className="p-0">
                <h2 className="text-xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        className="w-16 h-16 rounded-lg object-cover"
                        alt={item.name}
                        src={item.image}
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.region}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                              +
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-[#98042d]">৳{item.price * item.quantity}</p>
                            <p className="text-xs text-gray-500">৳{item.price} each</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-6 border-t">
                  <Link href="/categories">
                    <Button variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <CardContent className="p-0">
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>৳{tax}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  
                  <hr className="my-3" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-[#98042d]">৳{total}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Link href="/order-confirmed">
                    <Button className="w-full bg-[#98042d] hover:bg-[#98042d]/90">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">We accept:</p>
                    <img
                      className="mx-auto"
                      alt="Payment methods"
                      src="/figmaAssets/payment-method.svg"
                    />
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mt-6">
                  <Label htmlFor="promoCode" className="text-sm font-medium">
                    Promo Code
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      id="promoCode"
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border rounded-md text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
