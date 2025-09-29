import {
  GiftIcon,
  LogOutIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Link } from "wouter";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export const RedeemCodeSection = (): JSX.Element => {
  const navigationItems = [
    {
      icon: UserIcon,
      label: "Profile Information",
      isActive: false,
      className: "bg-white text-black",
    },
    {
      icon: PackageIcon,
      label: "Order History",
      isActive: false,
      className: "bg-white text-[#0e0d11]",
    },
    {
      icon: GiftIcon,
      label: "Redeem Code",
      isActive: true,
      className: "bg-[#98042d] text-white",
    },
    {
      icon: SettingsIcon,
      label: "Profile Settings",
      isActive: false,
      className: "bg-white text-[#0e0d11]",
    },
  ];

  return (
    <section className="flex flex-col items-start relative w-full [background:url(../figmaAssets/frame.png)_50%_50%_/_cover]">
      <div className="flex flex-col items-center justify-center gap-8 pt-16 pb-8 px-0 relative w-full">
        <div className="flex flex-col w-[730px] items-center gap-[18px] relative">
          <div className="inline-flex items-center gap-3 relative">
            <h1 className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
              MANAGE YOUR
            </h1>

            <Badge className="inline-flex h-[50px] items-center justify-center px-[7px] py-0 relative bg-[#98042d] rounded-lg hover:bg-[#98042d]">
              <span className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
                PROFILE
              </span>
            </Badge>
          </div>

          <p className="relative flex items-center justify-center text-center [font-family:'Roboto',Helvetica] font-medium text-[#191a23] text-base tracking-[0] leading-3">
            You can update your email, password, phone number, check the status
            of your order, and much more.
          </p>
        </div>

        <Card className="flex w-[1024px] h-[200px] items-center justify-between relative rounded-lg overflow-hidden shadow-[0px_2px_2px_#00000099] [background:url(../figmaAssets/profile.png)_50%_50%_/_cover] border-0">
          <CardContent className="flex w-[432px] items-center gap-3 px-8 py-0">
            <div className="inline-flex items-center gap-8 relative">
              <Avatar className="relative w-[120px] h-[120px]">
                <AvatarImage
                  src="/figmaAssets/ellipse-5.svg"
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>

              <div className="inline-flex flex-col h-[90px] items-start justify-center gap-3 relative">
                <div className="flex flex-col items-start gap-0.5 relative w-full rounded-lg">
                  <h2 className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-[#191919] text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
                    Mister Smith
                  </h2>

                  <p className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-[#7f7f7f] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                    Customer
                  </p>
                </div>

                <button className="relative w-fit [font-family:'Roboto',Helvetica] font-medium text-[#191919] text-base text-center tracking-[0] leading-6 whitespace-nowrap cursor-pointer">
                  Edit Profile
                </button>
              </div>
            </div>
          </CardContent>

          <div className="inline-flex items-center gap-[18px] pl-0 pr-8 py-0 relative">
            <Button className="flex w-[150px] px-4 py-2.5 bg-[#98042d] rounded-xl items-center justify-center gap-1.5 relative h-auto hover:bg-[#98042d]/90">
              <LogOutIcon className="relative w-6 h-6" />
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
                Logout
              </span>
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex flex-col items-center gap-8 pt-0 pb-16 px-0 relative w-full">
        <nav className="inline-flex items-start justify-center gap-8 relative">
          <div className="inline-flex items-start justify-center gap-8 relative">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={index}
                  className={`flex w-[200px] px-8 py-2.5 rounded-[32px] shadow-[0px_2px_2px_#00000099] items-center justify-center gap-1.5 relative h-auto ${item.className} hover:${item.className}`}
                >
                  <IconComponent className="relative w-6 h-6" />
                  <span className="relative flex items-center justify-center mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
};
