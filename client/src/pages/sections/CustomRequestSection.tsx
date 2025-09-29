import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonialData = [
  {
    name: "★★★★★",
    avatar: "/figmaAssets/avatar1.png",
    rating: "★★★★★",
  },
  {
    name: "★★★★★",
    avatar: "/figmaAssets/avatar2.png",
    rating: "★★★★★",
  },
  {
    name: "★★★★★",
    avatar: "/figmaAssets/avatar3.png",
    rating: "★★★★★",
  },
  {
    name: "★★★★★",
    avatar: "/figmaAssets/avatar4.png",
    rating: "★★★★★",
  },
  {
    name: "★★★★★",
    avatar: "/figmaAssets/avatar5.png",
    rating: "★★★★★",
  },
];

export const CustomRequestSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-16 pt-8 pb-24 px-4 md:px-0 relative self-stretch w-full flex-[0_0_auto]">
      <img
        className="relative self-stretch w-full flex-[0_0_auto]"
        alt="Testimonials"
        src="/figmaAssets/testimonials.png"
      />

      <Card className="w-full max-w-[1240px] bg-[#f1f1f1] rounded-2xl shadow-[0px_2px_2px_#00000099] border-0">
        <CardContent className="flex flex-col items-center gap-8 px-[100px] py-16">
          <div className="flex gap-4 self-stretch w-full flex-[0_0_auto] flex-col items-start relative">
            <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-[#001514] text-[40px] text-center tracking-[0] leading-[normal]">
              CUSTOM PRODUCT REQUEST
            </h2>

            <p className="relative self-stretch [font-family:'Roboto',Helvetica] font-normal text-[#001514] text-xl text-center tracking-[0] leading-[normal]">
              Is There Something You&#39;re Looking For That You Can&#39;t Find
              In Our Store? We&#39;d Love To Hear Your Suggestions Or A Custom
              Product Request.
            </p>
          </div>

          <div className="flex w-[262px] items-center gap-[18px] relative flex-[0_0_auto]">
            <Button className="flex w-[262px] items-center justify-center gap-1.5 px-4 py-2.5 bg-[#98042d] rounded-xl shadow-[0px_2px_2px_#00000099] hover:bg-[#98042d]/90 h-auto">
              <span className="relative flex items-center justify-center flex-1 h-7 mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-[#ffffff] text-[15px] text-center tracking-[0] leading-[27.8px] whitespace-nowrap">
                CUSTOM PRODUCT REQUEST
              </span>

              <SearchIcon className="relative w-4 h-4 text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
