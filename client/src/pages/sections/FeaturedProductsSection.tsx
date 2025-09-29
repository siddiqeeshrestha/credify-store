import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturedProductsSection = (): JSX.Element => {
  const products = [
    {
      id: 1,
      image: "/figmaAssets/image-1.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button.svg",
    },
    {
      id: 2,
      image: "/figmaAssets/image-2.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button.svg",
    },
    {
      id: 3,
      image: "/figmaAssets/image-3.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button.svg",
    },
    {
      id: 4,
      image: "/figmaAssets/image-4.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button.svg",
    },
    {
      id: 5,
      image: "/figmaAssets/image-5.png",
      title: "Valorant Points",
      price: "350৳",
      buttonSrc: "/figmaAssets/primary-button.svg",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col w-full max-w-[1240px] items-start gap-12 relative flex-[0_0_auto]">
        <header className="flex items-end justify-between relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex gap-1.5 flex-[0_0_auto] flex-col items-start relative">
            <h3 className="relative w-[233px] h-[27px] mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-[#1e1e1e] text-xl tracking-[0] leading-[25px] whitespace-nowrap">
              New Arrival
            </h3>

            <h2 className="w-[233px] h-[27px] font-bold text-[#1e1e1e] text-3xl leading-[25px] whitespace-nowrap relative [font-family:'Roboto',Helvetica] tracking-[0]">
              Credify Deal
            </h2>
          </div>

          <Button className="flex flex-col w-[140px] h-10 items-center justify-center relative bg-[#98042d] rounded-xl shadow-[0px_2px_2px_#00000099] hover:bg-[#98042d]/90 h-auto">
            <Link href="/categories" className="w-full h-full flex items-center justify-center">
              <span className="relative flex items-center justify-center w-fit [font-family:'Manrope',Helvetica] font-extrabold text-[#ffffff] text-sm text-center tracking-[0] leading-6 whitespace-nowrap">
                View more
              </span>
            </Link>
          </Button>
        </header>

        <div className="flex flex-col items-center gap-16 relative self-stretch w-full flex-[0_0_auto]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card
                  className="inline-flex flex-col items-start justify-end gap-6 p-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border-[1.75px] border-solid border-[#d8d9e0] shadow-[0px_4px_4px_#0000000d] cursor-pointer hover:shadow-lg transition-shadow w-full"
                >
                <CardContent className="p-0 flex flex-col gap-6 w-full">
                  <img
                    className="relative w-full aspect-square rounded-2xl object-cover"
                    alt="Product image"
                    src={product.image}
                  />

                  <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-[10.49px] px-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
                      <h4 className="[font-family:'Inter',Helvetica] text-lg leading-[21.6px] relative self-stretch mt-[-1.75px] font-semibold text-[#0e0d11] tracking-[0]">
                        {product.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between px-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
                        <div className="relative self-stretch mt-[-1.75px] [font-family:'Inter',Helvetica] font-semibold text-[#0e0d11] text-xl md:text-2xl tracking-[0] leading-[28.8px]">
                          {product.price}
                        </div>
                      </div>

                      <img
                        className="relative w-10 h-10 md:w-12 md:h-12"
                        alt="Primary button"
                        src={product.buttonSrc}
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
