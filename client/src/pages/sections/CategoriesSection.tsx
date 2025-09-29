import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CategoriesSection = (): JSX.Element => {
  const categories = [
    {
      icon: "/figmaAssets/simple-icons-valorant-1.svg",
      label: "Valorant Points",
      iconClass: "relative self-stretch w-full flex-[0_0_auto]",
    },
    {
      icon: "/figmaAssets/simple-icons-valorant-2.svg",
      label: "Topup",
      iconClass: "w-[90px] relative flex-[0_0_auto]",
    },
    {
      icon: "/figmaAssets/streamline-subscription-cashflow.svg",
      label: "Subscription",
      iconClass: "relative w-6 h-6",
    },
    {
      icon: "/figmaAssets/simple-icons-valorant.svg",
      label: "Games",
      iconClass: "self-stretch w-full relative flex-[0_0_auto]",
    },
    {
      icon: "/figmaAssets/fluent-gift-card-20-regular.svg",
      label: "Giftcard",
      iconClass: "relative w-6 h-6",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col items-center gap-12 relative flex-[0_0_auto] w-full max-w-[1240px]">
        <header className="flex w-full items-center justify-between relative flex-[0_0_auto]">
          <h2 className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#1e1e1e] text-2xl tracking-[0.24px] leading-8 whitespace-nowrap">
            Browse By Category
          </h2>

          <Button className="flex flex-col w-[140px] h-10 items-center justify-center relative bg-[#98042d] rounded-xl shadow-[0px_2px_2px_#00000099] hover:bg-[#98042d]/90 h-auto">
            <span className="relative flex items-center justify-center w-fit [font-family:'Manrope',Helvetica] font-extrabold text-[#ffffff] text-sm text-center tracking-[0] leading-6 whitespace-nowrap">
              View more
            </span>
          </Button>
        </header>

        <div className="inline-flex items-center gap-8 relative flex-[0_0_auto]">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="flex w-[120px] h-[120px] items-center justify-center gap-2.5 relative bg-[#f1f1f1] rounded-xl overflow-hidden shadow-[0px_2px_2px_#00000099] border-0 cursor-pointer hover:bg-[#e8e8e8] transition-colors"
            >
              <CardContent className="inline-flex flex-col items-center justify-center gap-2 relative flex-[0_0_auto] p-0">
                <img
                  className={category.iconClass}
                  alt={`${category.label} icon`}
                  src={category.icon}
                />

                <div className="inline-flex flex-col items-center gap-0.5 relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-xs tracking-[0] leading-[18px] whitespace-nowrap">
                    {category.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
