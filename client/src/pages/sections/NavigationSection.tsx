import {
  AlertCircleIcon,
  ClockIcon,
  LogInIcon,
  ShoppingCartIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const topBarItems = [
  {
    type: "language",
    label: "Eng",
    icon: "/figmaAssets/group-1.svg",
  },
  {
    type: "currency",
    label: "USD",
    icon: "/figmaAssets/group.png",
  },
  {
    type: "hours",
    label: "10 AM - 2 AM",
    icon: "clock",
  },
  {
    type: "support",
    label: "Need Support",
    icon: "alert",
  },
];

const navigationItems = [
  "Valorant",
  "Gametop",
  "Games",
  "Software",
  "Subscription",
];

export const NavigationSection = (): JSX.Element => {
  return (
    <header className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-transparent">
      <div className="flex h-[45px] items-center justify-around gap-[798px] px-[100px] py-3.5 relative self-stretch w-full bg-[#0e0d11]">
        <div className="flex w-[1240px] items-center justify-between relative mt-[-0.50px] mb-[-0.50px]">
          <div className="items-center gap-2 inline-flex relative flex-[0_0_auto]">
            <div className="relative w-4 h-4">
              <img
                className="absolute w-[66.67%] h-[45.83%] top-[20.31%] left-[11.98%]"
                alt="Group"
                src="/figmaAssets/group-2.svg"
              />
            </div>

            <div className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-white text-[13px] tracking-[0] leading-[14.3px] whitespace-nowrap">
              To Be Up To Date With Our Notices Keep Eyes On Facebook Page
            </div>
          </div>

          <div className="items-start gap-6 inline-flex relative flex-[0_0_auto]">
            {topBarItems.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1.5 relative flex-[0_0_auto]"
              >
                {item.type === "hours" && (
                  <ClockIcon className="relative w-[18px] h-[18px] text-gray-scaleswhite" />
                )}
                {item.type === "support" && (
                  <AlertCircleIcon className="relative w-4 h-4 text-gray-scaleswhite" />
                )}

                <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scaleswhite text-[13px] text-center tracking-[0] leading-[16.9px] whitespace-nowrap">
                  {item.label}
                </div>

                {(item.type === "language" || item.type === "currency") && (
                  <img
                    className="relative w-2 h-[4.5px] mr-[-0.50px]"
                    alt="Group"
                    src={item.icon}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex h-[76px] items-center justify-center gap-[478px] px-24 py-3.5 relative self-stretch w-full bg-white">
        <div className="flex w-[1240px] items-center justify-between relative">
          <div className="flex w-[200px] items-center gap-10 relative">
            <div className="h-12 [background:url(../figmaAssets/logo.png)_50%_50%_/_cover] relative w-[200px]" />
          </div>

          <nav className="inline-flex items-center gap-8 relative self-stretch flex-[0_0_auto]">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="relative flex items-center justify-center w-fit [font-family:'Roboto',Helvetica] font-bold text-[#1e1e1e] text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap h-auto p-0 hover:bg-transparent"
              >
                {item}
              </Button>
            ))}
          </nav>

          <div className="inline-flex items-center justify-center gap-6 relative flex-[0_0_auto]">
            <div className="inline-flex items-center relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <div className="relative w-[34px] h-[34px]">
                  <ShoppingCartIcon className="absolute w-[88.24%] top-1 left-0 h-[30px] text-[#1e1e1e]" />

                  <Badge className="absolute top-[-3px] left-[17px] w-5 h-5 flex items-center justify-center bg-[#98042d] rounded-2xl overflow-hidden border border-solid border-white p-0">
                    <div className="mt-[-3px] h-2.5 -ml-0.5 w-1.5 [font-family:'Poppins',Helvetica] font-medium text-gray-scalewhite text-[10px] text-center tracking-[0] leading-[10px] whitespace-nowrap">
                      2
                    </div>
                  </Badge>
                </div>

                <div className="inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]">
                  <div className="relative w-[61px] mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-[#0e0d11] text-[11px] tracking-[0] leading-[13.2px]">
                    Credify Cart
                  </div>

                  <div className="relative w-fit [font-family:'Roboto',Helvetica] font-medium text-black text-sm tracking-[0] leading-[14px] whitespace-nowrap">
                    ৳1120.00
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-[18px] relative flex-[0_0_auto]">
              <Button className="inline-flex px-4 py-2.5 flex-[0_0_auto] bg-[#98042d] rounded-xl items-center justify-center gap-1.5 relative h-auto hover:bg-[#98042d]/90">
                <div className="relative flex items-center justify-center w-[122px] h-7 mt-[-1.00px] [font-family:'Exo_2',Helvetica] font-bold text-white text-[15px] text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
                  Login | Register
                </div>

                <LogInIcon className="relative w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
