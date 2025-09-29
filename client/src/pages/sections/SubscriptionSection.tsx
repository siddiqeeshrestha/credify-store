import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export const SubscriptionSection = (): JSX.Element => {
  const gameCards = [
    {
      id: 1,
      image: "/figmaAssets/image-20.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 2,
      image: "/figmaAssets/image-20.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 3,
      image: "/figmaAssets/image-20.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 4,
      image: "/figmaAssets/image-20.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
    {
      id: 5,
      image: "/figmaAssets/image-20.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button-4.svg",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 w-full">
      <div className="flex flex-col max-w-[1240px] w-full items-start gap-12">
        <header className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-1.5 items-start">
            <h2 className="[font-family:'Roboto',Helvetica] font-semibold text-[#1e1e1e] text-xl tracking-[0] leading-[25px] whitespace-nowrap">
              HUGE COLLECTIONS
            </h2>
            <h1 className="[font-family:'Roboto',Helvetica] font-bold text-[#1e1e1e] text-3xl tracking-[0] leading-[25px] whitespace-nowrap">
              GAMES
            </h1>
          </div>

          <Button className="w-[140px] h-10 bg-[#98042d] hover:bg-[#98042d]/90 rounded-xl shadow-[0px_2px_2px_#00000099] [font-family:'Manrope',Helvetica] font-extrabold text-[#ffffff] text-sm">
            View more
          </Button>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {gameCards.map((card) => (
            <Link key={card.id} href={`/product/${card.id}`} className="cursor-pointer hover:scale-[1.02] transition-transform">
              <Card
                className="flex flex-col items-start justify-end gap-[18px] p-4 bg-white rounded-2xl overflow-hidden border-[1.75px] border-solid border-[#d8d9e0] shadow-[0px_4px_4px_#0000000d] w-full"
              >
              <CardContent className="p-0 w-full">
                <img
                  className="w-full aspect-square rounded-2xl object-cover mb-2"
                  alt="Game image"
                  src={card.image}
                />

                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex flex-col items-start gap-[10.49px] px-2.5 py-0 w-full">
                    <h3 className="[font-family:'Roboto',Helvetica] font-semibold text-[#0e0d11] text-lg tracking-[0] leading-[21.6px]">
                      {card.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-0 w-full">
                    <div className="flex flex-col items-start gap-1.5">
                      <div className="[font-family:'Roboto',Helvetica] font-semibold text-[#0e0d11] text-base tracking-[0] leading-[19.2px]">
                        {card.price}
                      </div>
                    </div>

                    <img
                      className="w-10 h-10"
                      alt="Primary button"
                      src={card.buttonSrc}
                    />
                  </div>
                </div>
              </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
