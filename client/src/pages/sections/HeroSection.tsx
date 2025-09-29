import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const HeroSection = (): JSX.Element => {
  const features = [
    {
      icon: "/figmaAssets/box.png",
      title: "Automated Delivery",
      description: "Instant - 120 Mintues",
      iconClass: "w-[46px] h-[46px]",
    },
    {
      icon: "/figmaAssets/headphones-1.svg",
      title: "Customer Support 24/7",
      description: "We are ready to help!",
      iconClass: "w-10 h-10",
    },
    {
      icon: "/figmaAssets/shopping-bag.svg",
      title: "Safe & Secure Payment",
      description: "We ensure your money is save",
      iconClass: "w-10 h-10",
    },
    {
      icon: "/figmaAssets/iconamoon-discount-thin.svg",
      title: "Regular Discounts",
      description: "Enjoy weekly offers",
      iconClass: "w-10 h-10",
    },
  ];

  return (
    <section className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] [background:url(..//figmaAssets/banner.png)_50%_50%_/_cover]">
      <div className="flex flex-col items-center justify-center gap-12 px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative w-[1240px] h-[450px] rounded-[32px] shadow-[0px_2px_2px_#00000099] [background:url(..//figmaAssets/image.png)_50%_50%_/_cover]" />

        <Card className="w-[1240px] bg-gray-scalewhite rounded-2xl shadow-[0px_2px_2px_#00000099]">
          <CardContent className="flex items-center justify-around gap-[61px] px-0 py-10">
            <div className="flex items-center justify-center gap-16 relative flex-1 grow">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center justify-center gap-4 relative flex-[0_0_auto]"
                >
                  <img
                    className={`relative ${feature.iconClass}`}
                    alt={feature.title}
                    src={feature.icon}
                  />

                  <div className="inline-flex flex-col items-start justify-center gap-2 relative flex-[0_0_auto]">
                    <div className="relative self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-sm tracking-[0] leading-[21px]">
                      {feature.title}
                    </div>

                    <div className="relative self-stretch [font-family:'Roboto',Helvetica] font-medium text-[#5f5f5f] text-sm tracking-[0] leading-[21px]">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
