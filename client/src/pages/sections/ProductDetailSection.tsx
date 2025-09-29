import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const ProductDetailSection = (): JSX.Element => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const vpAmounts = [
    { id: 0, amount: "475 VP", selected: true },
    { id: 1, amount: "475 VP", selected: false },
    { id: 2, amount: "475 VP", selected: false },
    { id: 3, amount: "475 VP", selected: false },
    { id: 4, amount: "475 VP", selected: false },
    { id: 5, amount: "475 VP", selected: false },
    { id: 6, amount: "475 VP", selected: false },
    { id: 7, amount: "475 VP", selected: false },
    { id: 8, amount: "475 VP", selected: false },
    { id: 9, amount: "475 VP", selected: false },
  ];

  const reviewData = [
    { label: "Excellent", count: 100, width: "w-full" },
    { label: "Good", count: 11, width: "w-[118px]" },
    { label: "Average", count: 3, width: "w-[5px]" },
    { label: "Below Average", count: 8, width: "w-5" },
    { label: "Poor", count: 1, width: "w-px" },
  ];

  const stars = [
    { src: "/figmaAssets/star-3.svg", alt: "Star" },
    { src: "/figmaAssets/star-3.svg", alt: "Star" },
    { src: "/figmaAssets/star-3.svg", alt: "Star" },
    { src: "/figmaAssets/star-3.svg", alt: "Star" },
    { src: "/figmaAssets/star-5.svg", alt: "Star" },
  ];

  return (
    <div className="flex flex-col items-center gap-16 relative self-stretch w-full flex-[0_0_auto]">
      <section className="flex items-start justify-center gap-[100px] px-0 py-16 relative self-stretch w-full flex-[0_0_auto] [background:url(../figmaAssets/product.png)_50%_50%_/_cover]">
        <img
          className="relative flex-[0_0_auto] mt-[-19.00px]"
          alt="Frame"
          src="/figmaAssets/frame-176.svg"
        />

        <div className="w-[549px] items-start gap-[135px] flex relative">
          <div className="flex-col items-start gap-4 flex-1 grow flex relative">
            <header className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col h-[30px] items-start pl-0 pr-[200px] py-0 relative self-stretch w-full">
                <h1 className="mr-[-71.00px] [font-family:'Exo',Helvetica] font-bold text-[#363636] text-4xl leading-[30px] relative flex items-center justify-center w-fit mt-[-1.00px] tracking-[0] whitespace-nowrap">
                  Valorant Points Malaysia
                </h1>
              </div>

              <div className="inline-flex items-center relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <Badge
                    variant="secondary"
                    className="flex items-center justify-center mt-[-1.00px] [font-family:'Exo',Helvetica] font-bold text-[#8b8b8b] leading-6 relative w-fit text-sm tracking-[0] whitespace-nowrap bg-transparent border-0 p-0"
                  >
                    Game currency
                  </Badge>
                </div>

                <img
                  className="relative flex-[0_0_auto]"
                  alt="Margin"
                  src="/figmaAssets/margin.svg"
                />

                <div className="pl-2 pr-0 py-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Exo',Helvetica] font-bold text-[#8b8b8b] text-xs tracking-[0] leading-6 whitespace-nowrap">
                    (5)
                  </div>
                </div>
              </div>
            </header>

            <div className="items-center justify-center gap-2.5 pl-0 pr-2.5 py-0 inline-flex relative flex-[0_0_auto]">
              <img
                className="relative flex-[0_0_auto]"
                alt="Mdi thunder circle"
                src="/figmaAssets/mdi-thunder-circle.svg"
              />

              <div className="relative w-fit [font-family:'Exo',Helvetica] font-medium text-[#363636] text-[13px] tracking-[0] leading-[normal]">
                Delivery Time : Instant - 120 mintue
              </div>
            </div>

            <div className="flex flex-col w-[545px] items-start gap-8 relative flex-[0_0_auto]">
              <div className="flex flex-col h-[171px] items-start gap-2 relative self-stretch w-full">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]">
                  Select Amount &gt;
                </div>

                <div className="grid grid-cols-4 grid-rows-3 w-[475px] h-[125px] gap-5 absolute top-8 left-0">
                  {vpAmounts.map((vp, index) => (
                    <div
                      key={vp.id}
                      className={`relative ${
                        index === 9
                          ? "row-[3_/_4] col-[2_/_3]"
                          : index === 8
                            ? "row-[3_/_4] col-[1_/_2]"
                            : index === 7
                              ? "row-[2_/_3] col-[4_/_5]"
                              : index === 6
                                ? "row-[2_/_3] col-[3_/_4]"
                                : index === 5
                                  ? "row-[2_/_3] col-[2_/_3]"
                                  : index === 4
                                    ? "row-[2_/_3] col-[1_/_2]"
                                    : index === 3
                                      ? "row-[1_/_2] col-[4_/_5]"
                                      : index === 2
                                        ? "row-[1_/_2] col-[3_/_4]"
                                        : index === 1
                                          ? "row-[1_/_2] col-[2_/_3]"
                                          : "row-[1_/_2] col-[1_/_2]"
                      } w-[108px] h-[38px] flex flex-col items-start pt-2.5 pb-0 px-0`}
                    >
                      <Button
                        variant="outline"
                        className={`flex flex-col w-[108px] h-8 items-center justify-center px-[21px] py-px relative mb-[-4.00px] rounded-[200px] border border-solid border-[#dbdbdb] shadow-[0px_1px_2px_#0000000d] ${
                          vp.selected
                            ? "bg-[#98042d] text-[#ffffff]"
                            : "bg-[#ffffff] text-[#000000d9]"
                        }`}
                        onClick={() => setSelectedAmount(vp.id)}
                      >
                        <div className="relative flex items-center justify-center w-fit [font-family:'Roboto',Helvetica] font-normal text-sm text-center tracking-[0] leading-[26px] whitespace-nowrap">
                          {vp.amount}
                        </div>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]">
                  IGN#TAG &gt;
                </div>

                <div className="flex flex-col h-[55px] items-start gap-4 relative self-stretch w-full">
                  <div className="flex w-[330px] h-[55px] items-center gap-[7px] px-4 py-3 relative bg-[#ffffff] rounded-xl border border-solid border-[#191a23]">
                    <div className="flex items-center gap-[7px] relative flex-1 grow">
                      <img
                        className="relative flex-[0_0_auto]"
                        alt="Icon"
                        src="/figmaAssets/icon.svg"
                      />

                      <Input
                        placeholder="Enter your ingame name"
                        className="relative w-[185.14px] [font-family:'Poppins',Helvetica] font-medium text-black text-[13px] tracking-[0] leading-[normal] border-0 p-0 h-auto bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-black text-base tracking-[0] leading-[normal]">
                      Total Price &gt;
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto] bg-[#98042d] rounded-xl border-0">
                      <CardContent className="flex items-center justify-between pr-[1.14e-13px] pl-0 py-0 relative self-stretch w-full flex-[0_0_auto] p-0">
                        <div className="flex flex-col w-40 items-start relative">
                          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-[#ffffff] text-3xl tracking-[0] leading-9 whitespace-nowrap">
                              ৳1120
                            </div>
                          </div>

                          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] opacity-75">
                            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-semibold text-[#ffffff] text-sm tracking-[0] leading-5 line-through whitespace-nowrap">
                              ৳1120
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex items-center relative flex-[0_0_auto]">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="inline-flex flex-col items-center justify-center px-3 py-1 relative flex-[0_0_auto] bg-[#ffffff66] rounded-[20.8px] h-auto"
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                          >
                            <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                              -
                            </div>
                          </Button>

                          <div className="px-3 py-0 inline-flex flex-col items-start relative flex-[0_0_auto]">
                            <div className="flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-xl leading-7 relative w-fit mt-[-1.00px] tracking-[0] whitespace-nowrap">
                              {quantity}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="inline-flex flex-col items-start relative flex-[0_0_auto] h-auto"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            <div className="flex flex-col w-8 items-center justify-center px-3 py-1 relative flex-[0_0_auto] bg-[#ffffff66] rounded-[20.8px]">
                              <div className="relative flex items-center justify-center w-fit mt-[-1.00px] ml-[-1.50px] mr-[-1.50px] [font-family:'Inter',Helvetica] font-normal text-[#ffffff] text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                                +
                              </div>
                            </div>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center gap-[23px] relative self-stretch w-full flex-[0_0_auto]">
                  <Link href="/cart">
                    <Button className="flex flex-col w-60 items-start relative bg-[#98042d] rounded-xl h-auto">
                      <div className="relative flex items-center justify-center self-stretch h-[50px] mt-[-1.00px] [font-family:'Exo',Helvetica] font-extrabold text-[#ffffff] text-lg text-center tracking-[0] leading-[normal]">
                        Checkout Now
                      </div>
                    </Button>
                  </Link>

                  <div className="relative flex items-center justify-center w-fit [font-family:'Exo',Helvetica] font-bold text-black text-xl text-center tracking-[0] leading-[normal]">
                    Or
                  </div>

                  <Button
                    variant="outline"
                    className="flex flex-col w-60 items-start relative mr-[-4.00px] rounded-[10px] border-2 border-solid border-black shadow-[0px_0px_30px_#1877f2] h-auto"
                  >
                    <div className="relative flex items-center justify-center self-stretch h-[50px] mt-[-2.00px] [font-family:'Exo',Helvetica] font-semibold text-black text-lg text-center tracking-[0] leading-[normal]">
                      Add To Cart
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Card className="flex flex-col w-[1240px] items-center gap-9 px-24 py-9 relative flex-[0_0_auto] bg-[#eeeeee] rounded-xl overflow-hidden border-0">
        <CardContent className="p-0 w-full">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="inline-flex flex-col items-start pt-0 pb-px px-0 relative flex-[0_0_auto] border-b [border-bottom-style:solid] border bg-transparent h-auto">
              <div className="flex items-start justify-center gap-4 px-6 py-0 relative self-stretch w-full flex-[0_0_auto]">
                <TabsTrigger
                  value="description"
                  className="inline-flex flex-col pt-4 pb-3 px-2 flex-[0_0_auto] border-b-2 [border-bottom-style:solid] border-[#98042d] items-center justify-center relative data-[state=active]:border-[#98042d] data-[state=active]:text-[#98042d] bg-transparent"
                >
                  <div className="flex w-fit mt-[-2.00px] [font-family:'Roboto',Helvetica] font-semibold text-base text-center tracking-[0] leading-5 whitespace-nowrap items-center justify-center relative">
                    Description
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  value="delivery"
                  className="flex-col items-start inline-flex relative flex-[0_0_auto] bg-transparent"
                >
                  <div className="inline-flex flex-col items-center justify-center pt-4 pb-[18px] px-2 relative flex-[0_0_auto]">
                    <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-5 whitespace-nowrap">
                      Delivery Info
                    </div>
                  </div>
                </TabsTrigger>

                <TabsTrigger
                  value="support"
                  className="inline-flex flex-col items-start relative flex-[0_0_auto] bg-transparent"
                >
                  <div className="inline-flex flex-col items-center justify-center pt-4 pb-[18px] px-2 relative flex-[0_0_auto]">
                    <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-black text-base text-center tracking-[0] leading-5 whitespace-nowrap">
                      Support
                    </div>
                  </div>
                </TabsTrigger>
              </div>
            </TabsList>

            <TabsContent
              value="description"
              className="items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-normal text-transparent text-2xl tracking-[0] leading-6 flex relative mt-9"
            >
              <span className="font-semibold text-black leading-[30px]">
                Product Description
                <br />
              </span>

              <span className="font-medium text-[#333333] text-base leading-[30px]">
                Valorant Points for in-game purchases, skins, and battle pass
                <br />
              </span>

              <span className="font-medium text-[#333333] text-base leading-[0.1px]">
                <br />
              </span>

              <span className="font-semibold text-black text-xl leading-[25px]">
                What&#39;s Included:
                <br />
              </span>

              <span className="font-medium text-[#363636] text-base leading-[25px]">
                Digital product access key or currency
                <br />
                Step-by-step redemption instructions
                <br />
                24/7 customer support
                <br />
                Money-back guarantee if unsatisfied
                <br />
              </span>

              <span className="font-medium text-black text-base leading-[0.1px]">
                <br />
              </span>

              <span className="font-semibold text-black text-xl leading-[25px]">
                System Requirements:
                <br />
              </span>

              <span className="font-medium text-[#363636] text-base leading-[25px]">
                Valid game account or platform account
                <br />
                Internet connection for redemption
                <br />
                Compatible device (PC, Mobile, Console as applicable)
              </span>
            </TabsContent>

            <TabsContent
              value="delivery"
              className="items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-normal text-black text-base tracking-[0] leading-6 flex relative mt-9"
            >
              Delivery information content goes here
            </TabsContent>

            <TabsContent
              value="support"
              className="items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-normal text-black text-base tracking-[0] leading-6 flex relative mt-9"
            >
              Support information content goes here
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <section className="flex flex-col w-[1240px] items-start gap-[18px] pt-0 pb-8 px-0 relative flex-[0_0_auto]">
        <div className="flex flex-col items-center gap-[30px] pt-8 pb-5 px-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex flex-col items-center gap-4 relative flex-[0_0_auto]">
            <div className="inline-flex flex-col items-center gap-3 relative flex-[0_0_auto]">
              <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
                <div className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
                  CUSTOMER
                </div>

                <Badge className="inline-flex h-[50px] items-center justify-center px-[7px] py-0 relative flex-[0_0_auto] bg-[#98042d] rounded-lg">
                  <div className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#ffffff] text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
                    REVIEWS
                  </div>
                </Badge>
              </div>

              <div className="relative w-fit [font-family:'Neology-Bold-Bold',Helvetica] font-bold text-[#414141] text-lg tracking-[0] leading-[normal] whitespace-nowrap">
                SEE WHAT OUR CUSTOMERS ARE SAYING ABOUT OUR SERVICE
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-12 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-wrap w-[1120px] items-center gap-[60px_60px] relative flex-[0_0_auto]">
            <Card className="inline-flex flex-col items-center gap-4 p-8 relative flex-[0_0_auto] bg-[#eeeeee] rounded-[25px] shadow-[0px_4px_4px_#00000040] border-0">
              <CardContent className="p-0 flex flex-col items-center gap-4">
                <div className="relative self-stretch mt-[-1.00px] [font-family:'Neology-Bold-Bold',Helvetica] font-bold text-mainblack text-[56px] text-center tracking-[0] leading-[56px]">
                  4.8
                </div>

                <div className="relative self-stretch opacity-30 [font-family:'Neology-Bold-Bold',Helvetica] font-bold text-mainblack text-[15px] text-center tracking-[0] leading-4">
                  of 420 reviews
                </div>

                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                  {stars.map((star, index) => (
                    <img
                      key={index}
                      className="relative w-[18.51px] h-[17.77px]"
                      alt={star.alt}
                      src={star.src}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col min-w-[390px] items-start gap-6 relative flex-1 grow">
              {reviewData.map((review, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 relative self-stretch w-full flex-[0_0_auto]"
                >
                  <div className="relative w-[124px] mt-[-1.00px] [font-family:'Neology-Bold-Bold',Helvetica] font-bold text-mainblack text-lg tracking-[0] leading-4">
                    {review.label}
                  </div>

                  <div className="flex items-start relative flex-1 grow rotate-180">
                    <div className="bg-[#d9d9d9] relative flex-1 grow h-[5px] rounded-2xl" />
                    <div
                      className={`${review.width === "w-full" ? "ml-[-628px]" : review.width === "w-[118px]" ? "ml-[-118px]" : review.width === "w-[5px]" ? "ml-[-5px]" : review.width === "w-5" ? "-ml-5" : "-ml-px"} bg-[#98042d] relative flex-1 grow h-[5px] rounded-2xl`}
                    />
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <div
                      className={`${review.count === 100 ? "" : "  "} opacity-40 [font-family:'Neology-Bold-Bold',Helvetica] font-bold text-mainblack text-base text-right leading-4 relative w-fit mt-[-1.00px] tracking-[0] whitespace-nowrap`}
                    >
                      {review.count === 100 ? "100" : `  ${review.count}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="flex w-[1120px] items-center justify-center px-4 py-6 relative flex-[0_0_auto] bg-[#eeeeee] rounded-[7px] border-[0.5px] border-solid border-[#cecece] shadow-[0px_4px_4px_#00000040]">
            <CardContent className="p-0">
              <div className="relative flex items-center justify-center w-[1051px] mt-[-0.50px] [font-family:'Neology-Bold-Bold',Helvetica] font-bold text-black text-sm tracking-[-0.07px] leading-4">
                Drop Your Review
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <img
        className="relative self-stretch w-full flex-[0_0_auto]"
        alt="Releted products"
        src="/figmaAssets/releted-products.png"
      />
    </div>
  );
};
