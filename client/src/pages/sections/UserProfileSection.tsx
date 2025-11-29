import { LogOutIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "wouter";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const navigationTabs = [
  {
    id: "profile",
    label: "Profile Information",
    icon: "/figmaAssets/iconamoon-profile.svg",
    href: "/profile",
    active: true,
  },
  {
    id: "orders",
    label: "Order History",
    icon: "/figmaAssets/lsicon-order-done-outline.svg",
    href: "/orders",
    active: false,
  },
  {
    id: "redeem",
    label: "Redeem Code",
    icon: "/figmaAssets/material-symbols-light-redeem.svg",
    href: "/redeem-code",
    active: false,
  },
  {
    id: "settings",
    label: "Profile Settings",
    icon: "/figmaAssets/solar-settings-outline.svg",
    href: "/profile/settings",
    active: false,
  },
];

export const UserProfileSection = (): JSX.Element => {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 pt-16 pb-12 px-0 relative w-full [background:url(../figmaAssets/profile.png)_50%_50%_/_cover]">
      <div className="flex flex-col w-full max-w-[730px] items-center gap-[18px] relative">
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

        <p className="relative flex items-center justify-center w-full [font-family:'Roboto',Helvetica] font-medium text-[#191a23] text-base text-center tracking-[0] leading-3">
          You can update your email, password, phone number, check the status of
          your order, and much more.
        </p>
      </div>

      <Card className="flex w-full max-w-[1040px] h-[200px] items-center justify-between relative rounded-lg overflow-hidden shadow-[0px_2px_2px_#00000099] [background:url(../figmaAssets/profile-1.png)_50%_50%_/_cover] border-0">
        <CardContent className="flex w-[432px] items-center gap-3 px-8 py-0 relative">
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
                  {user?.name || "User"}
                </h2>

                <p className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-[#7f7f7f] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                  {user?.email || "customer@example.com"}
                </p>
              </div>

              <Link href="/profile/settings">
                <button className="w-fit [font-family:'Roboto',Helvetica] text-center whitespace-nowrap relative font-medium text-[#191919] text-base tracking-[0] leading-6 bg-transparent border-none cursor-pointer hover:text-[#98042d]">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </CardContent>

        <div className="inline-flex items-center gap-[18px] pl-0 pr-8 py-0 relative">
          <Button 
            onClick={handleLogout}
            className="flex w-[150px] px-4 py-2.5 bg-[#98042d] rounded-xl items-center justify-center gap-1.5 relative h-auto hover:bg-[#98042d]/90"
          >
            <LogOutIcon className="relative w-6 h-6" />

            <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-white text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
              Logout
            </span>
          </Button>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <nav className="flex flex-col items-center gap-8 pt-8 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="inline-flex items-start justify-center gap-8 relative flex-[0_0_auto]">
          <div className="inline-flex items-start justify-center gap-8 relative flex-[0_0_auto]">
            {navigationTabs.map((tab) => (
              <Link key={tab.id} href={tab.href}>
                <Button
                  variant={tab.active ? "default" : "secondary"}
                  className={`flex w-[200px] px-8 py-2.5 rounded-[32px] shadow-[0px_2px_2px_#00000099] items-center justify-center gap-1.5 relative h-auto ${
                    tab.active
                      ? "bg-[#98042d] hover:bg-[#98042d]/90 text-white"
                      : "bg-white hover:bg-gray-50 text-black"
                  }`}
                >
                  <img
                    className={`relative w-6 h-6 ${tab.id === "profile" ? "ml-[-16.00px]" : tab.id === "settings" ? "ml-[-3.00px]" : ""}`}
                    alt={tab.label}
                    src={tab.icon}
                  />

                  <span
                    className={`relative flex items-center justify-center h-7 mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-base text-center tracking-[0] leading-[27.8px] whitespace-nowrap ${
                      tab.id === "profile"
                        ? "w-[138px] mr-[-16.00px]"
                        : tab.id === "redeem"
                          ? "flex-1"
                          : tab.id === "settings"
                            ? "w-28 mr-[-3.00px]"
                            : "w-fit"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </section>
  );
};
