import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ProfileContentSection = (): JSX.Element => {
  const navigationTabs = [
    {
      id: "profile-info",
      label: "Profile Information",
      icon: "/figmaAssets/iconamoon-profile.svg",
      isActive: false,
      bgColor: "bg-white",
      textColor: "text-[#0e0d11]",
    },
    {
      id: "order-history",
      label: "Order History",
      icon: "/figmaAssets/lsicon-order-done-outline.svg",
      isActive: true,
      bgColor: "bg-[#98042d]",
      textColor: "text-white",
    },
    {
      id: "redeem-code",
      label: "Redeem Code",
      icon: "/figmaAssets/material-symbols-light-redeem.svg",
      isActive: false,
      bgColor: "bg-white",
      textColor: "text-[#0e0d11]",
    },
    {
      id: "profile-settings",
      label: "Profile Settings",
      icon: "/figmaAssets/solar-settings-outline.svg",
      isActive: false,
      bgColor: "bg-white",
      textColor: "text-[#0e0d11]",
    },
  ];

  return (
    <section className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] [background:url(../figmaAssets/frame.png)_50%_50%_/_cover]">
      <div className="flex flex-col items-center justify-center gap-8 pt-16 pb-8 px-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col w-[730px] items-center gap-[18px] relative flex-[0_0_auto]">
          <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
            <h1 className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
              MANAGE YOUR
            </h1>

            <Badge className="inline-flex h-[50px] items-center justify-center px-[7px] py-0 relative flex-[0_0_auto] bg-[#98042d] rounded-lg hover:bg-[#98042d]">
              <span className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
                PROFILE
              </span>
            </Badge>
          </div>

          <p className="relative flex items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-medium text-[#191a23] text-base text-center tracking-[0] leading-3">
            You can update your email, password, phone number, check the status
            of your order, and much more.
          </p>
        </div>

        <Card className="flex w-[1024px] h-[200px] items-center justify-between relative rounded-lg overflow-hidden shadow-[0px_2px_2px_#00000099] [background:url(../figmaAssets/profile.png)_50%_50%_/_cover] border-0">
          <CardContent className="flex w-[432px] items-center gap-3 px-8 py-0 relative">
            <div className="inline-flex items-center gap-8 relative flex-[0_0_auto]">
              <Avatar className="relative w-[120px] h-[120px]">
                <AvatarImage
                  src="/figmaAssets/ellipse-5.svg"
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>

              <div className="inline-flex flex-col h-[90px] items-start justify-center gap-3 relative flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-0.5 relative self-stretch w-full flex-[0_0_auto] rounded-lg">
                  <h2 className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-[#191919] text-xl text-center tracking-[0] leading-[30px] whitespace-nowrap">
                    Mister Smith
                  </h2>

                  <p className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-[#7f7f7f] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                    Customer
                  </p>
                </div>

                <Button
                  variant="link"
                  className="relative w-fit [font-family:'Roboto',Helvetica] font-medium text-[#191919] text-base text-center tracking-[0] leading-6 whitespace-nowrap p-0 h-auto"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>

          <div className="inline-flex items-center gap-[18px] pl-0 pr-8 py-0 relative flex-[0_0_auto]">
            <Button className="flex w-[150px] gap-1.5 px-4 py-2.5 bg-[#98042d] rounded-xl items-center justify-center relative hover:bg-[#98042d]/90 h-auto">
              <img
                className="relative w-6 h-6"
                alt="Material symbols"
                src="/figmaAssets/material-symbols-logout.svg"
              />

              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
                Logout
              </span>
            </Button>
          </div>
        </Card>
      </div>

      <nav className="flex flex-col items-center gap-8 pt-0 pb-16 px-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex items-start justify-center gap-8 relative flex-[0_0_auto]">
          <div className="inline-flex items-start justify-center gap-8 relative flex-[0_0_auto]">
            {navigationTabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex w-[200px] gap-1.5 px-8 py-2.5 ${tab.bgColor} rounded-[32px] shadow-[0px_2px_2px_#00000099] items-center justify-center relative hover:${tab.bgColor}/90 h-auto`}
              >
                <img
                  className={`relative w-6 h-6 ${tab.id === "profile-info" ? "ml-[-16.00px]" : tab.id === "profile-settings" ? "ml-[-3.00px]" : ""}`}
                  alt={tab.label}
                  src={tab.icon}
                />

                <span
                  className={`relative flex items-center justify-center ${tab.id === "profile-info" ? "w-[138px] mr-[-16.00px]" : tab.id === "profile-settings" ? "w-28 mr-[-3.00px]" : "w-fit"} h-7 mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold ${tab.textColor} text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap`}
                >
                  {tab.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </section>
  );
};
