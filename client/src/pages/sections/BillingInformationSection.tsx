import {
  EditIcon,
  GiftIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const navigationTabs = [
  {
    id: "profile",
    label: "Profile Information",
    icon: UserIcon,
    isActive: true,
    bgColor: "bg-[#98042d]",
    textColor: "text-white",
  },
  {
    id: "orders",
    label: "Order History",
    icon: ShoppingBagIcon,
    isActive: false,
    bgColor: "bg-white",
    textColor: "text-black",
  },
  {
    id: "redeem",
    label: "Redeem Code",
    icon: GiftIcon,
    isActive: false,
    bgColor: "bg-white",
    textColor: "text-[#0e0d11]",
  },
  {
    id: "settings",
    label: "Profile Settings",
    icon: SettingsIcon,
    isActive: false,
    bgColor: "bg-white",
    textColor: "text-[#0e0d11]",
  },
];

const billingInfo = [
  {
    icon: EditIcon,
    label: "Account Name",
  },
  {
    icon: MapPinIcon,
    label: "Block-E, Bashundhara R/A, Apollo Hospitals,",
  },
  {
    icon: MailIcon,
    label: "credify@gmail.com",
  },
  {
    icon: PhoneIcon,
    label: "+880-17063837",
  },
];

export const BillingInformationSection = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center pt-0 pb-16 px-0 relative self-stretch w-full flex-[0_0_auto] bg-white">
      <div className="items-center gap-8 pt-0 pb-16 px-0 self-stretch w-full flex flex-col relative flex-[0_0_auto]">
        <div className="inline-flex items-start justify-center gap-8 relative flex-[0_0_auto]">
          <div className="inline-flex items-start justify-center gap-8 relative flex-[0_0_auto]">
            {navigationTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  className={`flex w-[200px] px-8 py-2.5 ${tab.bgColor} rounded-[32px] shadow-[0px_2px_2px_#00000099] items-center justify-center gap-1.5 relative h-auto`}
                  variant="ghost"
                >
                  <IconComponent className="relative w-6 h-6" />
                  <div
                    className={`relative flex items-center justify-center mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold ${tab.textColor} text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap`}
                  >
                    {tab.label}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <Card className="flex flex-col w-[1040px] items-start gap-8 p-8 relative flex-[0_0_auto] bg-white rounded-2xl shadow-[0px_2px_2px_#00000099]">
        <CardContent className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto] p-0">
          <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-black text-xl tracking-[0.20px] leading-8">
              Profile Information
            </div>

            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#cccccc]">
              <div className="relative w-[100px] h-[3px] bg-[#d80027]" />
            </div>
          </div>

          <div className="flex flex-col w-[388px] items-start gap-[19px] relative flex-[0_0_auto]">
            <div className="relative w-96 mt-[-1.00px] [font-family:'Poppins',Helvetica] font-semibold text-black text-xl tracking-[0.60px] leading-5">
              BILLING ADDRESS
            </div>

            <div className="w-[388px] items-start gap-3 flex flex-col relative flex-[0_0_auto]">
              {billingInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]"
                  >
                    <IconComponent className="relative w-6 h-6" />
                    <div className="relative w-fit [font-family:'Roboto',Helvetica] font-medium text-[#191919] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="self-stretch [font-family:'Poppins',Helvetica] relative font-medium text-[#191919] text-base tracking-[0] leading-6">
              EditIcon Address
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
