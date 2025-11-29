import React from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/lib/api";

export const HeaderSection = (): JSX.Element => {
  const { user, isAuthenticated, logout } = useAuth();
  const { data: cartData, isLoading: cartLoading } = useCart();
  
  // Calculate cart totals
  const cart = cartData?.cart;
  const cartItems = cart?.items || [];
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);
  const topBarItems = [
    {
      icon: "/figmaAssets/group-1.svg",
      text: "To Be Up To Date With Our Notices Keep Eyes On Facebook Page",
    },
  ];

  const rightTopBarItems = [
    {
      text: "Eng",
      icon: "/figmaAssets/group-2.svg",
      type: "select",
    },
    {
      text: "USD",
      icon: "/figmaAssets/group.png",
      type: "select",
    },
    {
      icon: "/figmaAssets/mdi-clock-outline.svg",
      text: "10 AM - 2 AM",
      type: "info",
    },
    {
      icon: "/figmaAssets/alert-circle-1.svg",
      text: "Need Support",
      type: "info",
    },
  ];

  const navigationItems = [
    "Valorant",
    "Gametop",
    "Games",
    "Software",
    "Subscription",
  ];

  return (
    <header className="flex flex-col items-center w-full bg-transparent">
      {/* Top Bar - Hide on mobile */}
      <div className="hidden md:flex h-[45px] items-center justify-center px-4 lg:px-[100px] py-3.5 w-full bg-[#0e0d11]">
        <div className="flex w-full max-w-[1240px] items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-4 h-4">
              <img
                className="absolute w-[66.67%] h-[45.83%] top-[20.31%] left-[11.98%]"
                alt="Group"
                src="/figmaAssets/group-1.svg"
              />
            </div>
            <div className="[font-family:'Roboto',Helvetica] font-bold text-white text-[13px] tracking-[0] leading-[14.3px]">
              To Be Up To Date With Our Notices Keep Eyes On Facebook Page
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex items-center gap-1.5">
              <div className="mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scaleswhite text-[13px] text-center tracking-[0] leading-[16.9px] whitespace-nowrap">
                Eng
              </div>
              <img
                className="w-2 h-[4.5px] mr-[-0.50px]"
                alt="Group"
                src="/figmaAssets/group-2.svg"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <div className="mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scaleswhite text-[13px] text-center tracking-[0] leading-[16.9px] whitespace-nowrap">
                USD
              </div>
              <img
                className="w-2 h-[4.5px] mr-[-0.50px]"
                alt="Group"
                src="/figmaAssets/group.png"
              />
            </div>

            <div className="flex items-start gap-1.5">
              <img
                className="w-[18px] h-[18px]"
                alt="Mdi clock outline"
                src="/figmaAssets/mdi-clock-outline.svg"
              />
              <div className="mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scaleswhite text-[13px] text-center tracking-[0] leading-[16.9px] whitespace-nowrap">
                10 AM - 2 AM
              </div>
            </div>

            <div className="flex items-start gap-1.5">
              <img
                className="w-4 h-4"
                alt="Alert circle"
                src="/figmaAssets/alert-circle-1.svg"
              />
              <div className="mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scaleswhite text-[13px] text-center tracking-[0] leading-[16.9px] whitespace-nowrap">
                Need Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Responsive */}
      <div className="flex min-h-[76px] items-center justify-center px-4 md:px-6 lg:px-24 py-3.5 w-full bg-white">
        <div className="flex w-full max-w-[1240px] items-center justify-between">
          <div className="flex items-center gap-4 md:gap-10">
            <Link href="/" className="cursor-pointer">
              <div className="h-8 md:h-12 w-[120px] md:w-[200px] [background:url(../figmaAssets/logo.png)_50%_50%_/_cover] bg-contain bg-no-repeat" />
            </Link>
          </div>

          {/* Navigation - Hidden on mobile, show hamburger menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-0 [font-family:'Roboto',Helvetica] font-bold text-[#1e1e1e] text-base text-center tracking-[0] leading-[27.8px] hover:bg-transparent"
              >
                {item}
              </Button>
            ))}
          </nav>

          {/* Right side - Cart and Login */}
          <div className="flex items-center justify-center gap-3 md:gap-6">
            <Link href="/cart">
              <div className="flex items-center cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="relative w-[28px] h-[28px] md:w-[34px] md:h-[34px]">
                    <img
                      className="absolute w-[88.24%] top-1 left-0 h-[24px] md:h-[30px]"
                      alt="Mdi cart outline"
                      src="/figmaAssets/mdi-cart-outline.svg"
                    />
                    {totalItems > 0 && (
                      <Badge className="absolute top-[-3px] left-[14px] md:left-[17px] w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-[#98042d] rounded-2xl border border-white text-[8px] md:text-[10px] p-0">
                        {totalItems > 99 ? '99+' : totalItems}
                      </Badge>
                    )}
                  </div>
                  <div className="hidden md:flex flex-col items-start gap-1">
                    <div className="w-[61px] mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-[#0e0d11] text-[11px] tracking-[0] leading-[13.2px]">
                      Credify Cart
                    </div>
                    <div className="[font-family:'Roboto',Helvetica] text-black leading-[14px] font-medium text-sm tracking-[0] whitespace-nowrap">
                      {cartLoading ? "Loading..." : `৳${Math.floor(totalAmount)}`}
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-[18px]">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link href="/profile">
                    <Button className="h-auto flex items-center justify-center gap-1.5 px-2 md:px-4 py-2 md:py-2.5 bg-[#98042d] rounded-xl hover:bg-[#98042d]/90">
                      <span className="flex items-center justify-center h-7 mt-[-1.00px] [font-family:'Exo_2',Helvetica] font-bold text-white text-[12px] md:text-[15px] text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
                        <span className="hidden sm:inline">Hi, {user?.name}</span>
                        <span className="sm:hidden">Profile</span>
                      </span>
                      <img
                        className="w-3 h-3 md:w-4 md:h-4"
                        alt="User profile"
                        src="/figmaAssets/material-symbols-login.svg"
                      />
                    </Button>
                  </Link>
                  <Button 
                    onClick={logout}
                    variant="outline"
                    className="h-auto px-2 md:px-3 py-2 text-[12px] md:text-[14px] border-[#98042d] text-[#98042d] hover:bg-[#98042d] hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="h-auto flex items-center justify-center gap-1.5 px-2 md:px-4 py-2 md:py-2.5 bg-[#98042d] rounded-xl hover:bg-[#98042d]/90">
                    <span className="flex items-center justify-center h-7 mt-[-1.00px] [font-family:'Exo_2',Helvetica] font-bold text-white text-[12px] md:text-[15px] text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
                      <span className="hidden sm:inline">Login | Register</span>
                      <span className="sm:hidden">Login</span>
                    </span>
                    <img
                      className="w-3 h-3 md:w-4 md:h-4"
                      alt="Material symbols"
                      src="/figmaAssets/material-symbols-login.svg"
                    />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
