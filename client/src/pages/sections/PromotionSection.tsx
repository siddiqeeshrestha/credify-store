import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export const PromotionSection = (): JSX.Element => {
  const gameItems = [
    {
      id: 1,
      title: "Valorant Points",
      price: "350৳",
      image: "/figmaAssets/image-20.png",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 2,
      title: "Valorant Points",
      price: "350৳",
      image: "/figmaAssets/image-20.png",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 3,
      title: "Valorant Points",
      price: "350৳",
      image: "/figmaAssets/image-20.png",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 4,
      title: "Valorant Points",
      price: "350৳",
      image: "/figmaAssets/image-20.png",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 5,
      title: "Valorant Points",
      price: "350৳",
      image: "/figmaAssets/image-20.png",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 w-full">
      <div className="flex flex-col w-full max-w-[1240px] items-start gap-12">
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-4">
          <div className="flex max-w-full sm:max-w-[500px] gap-1.5 flex-col items-start">
            <div className="mt-[-1.00px] font-semibold text-lg sm:text-xl h-auto [font-family:'Roboto',Helvetica] text-[#1e1e1e] tracking-[0] leading-[25px]">
              Game Currency
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl h-auto [font-family:'Roboto',Helvetica] text-[#1e1e1e] tracking-[0] leading-[25px]">
              GAME TOPUP
            </h1>
          </div>

          <Button className="w-[140px] h-10 bg-[#98042d] rounded-xl shadow-[0px_2px_2px_#00000099] [font-family:'Manrope',Helvetica] font-extrabold text-[#ffffff] text-sm hover:bg-[#98042d]/90 h-auto">
            View more
          </Button>
        </header>

        <div className="flex flex-col items-center gap-16 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-[1240px]">
            {gameItems.map((item) => (
            <Link key={item.id} href={`/product/${item.id}`} className="cursor-pointer hover:scale-[1.02] transition-transform">
                <Card
                  className="inline-flex flex-col items-start justify-end gap-[18px] p-4 bg-white rounded-2xl overflow-hidden border-[1.75px] border-solid border-[#d8d9e0] shadow-[0px_4px_4px_#0000000d] w-full"
                >
                <CardContent className="p-0 flex flex-col gap-[18px] w-full">
                  <img
                    className="w-full aspect-square rounded-2xl object-cover"
                    alt="Game currency image"
                    src={item.image}
                  />

                  <div className="flex flex-col items-start gap-2 w-full">
                    <div className="flex flex-col items-start gap-[10.49px] px-2.5 py-0 w-full">
                      <h3 className="mt-[-1.75px] [font-family:'Roboto',Helvetica] font-semibold text-[#0e0d11] text-lg tracking-[0] leading-[21.6px]">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between px-2.5 py-0 w-full">
                      <div className="inline-flex flex-col items-start gap-1.5">
                        <div className="mt-[-1.75px] [font-family:'Roboto',Helvetica] font-semibold text-[#0e0d11] text-base tracking-[0] leading-[19.2px]">
                          {item.price}
                        </div>
                      </div>

                      <img
                        className="w-10 h-10"
                        alt="Primary button"
                        src={item.buttonSrc}
                      />
                    </div>
                  </div>
                </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
