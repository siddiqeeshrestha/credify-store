import { CheckCircleIcon, CreditCardIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const breadcrumbItems = [
  { label: "Home", href: "#" },
  { label: "Order Confirmation", href: "#" },
];

const progressSteps = [
  { label: "Your Cart", position: "left-[-26px]" },
  { label: "Information", position: "left-[196px]" },
  { label: "Payment", position: "left-[424px]" },
  { label: "Confirmed", position: "left-[634px]" },
];

const orderItem = {
  image: "/figmaAssets/image.png",
  title: "Valorant Points Malaysia",
  quantity: "01",
  price: "1200৳",
};

const pricingDetails = {
  subtotal: "420.69 BDT",
  total: "420.69 BDT",
};

export const OrderConfirmationSection = (): JSX.Element => {
  return (
    <section className="gap-16 self-stretch w-full [background:url(..//figmaAssets/banner.png)_50%_50%_/_cover] flex flex-col items-center relative flex-[0_0_auto]">
      <div className="w-full bg-white flex flex-col items-center relative flex-[0_0_auto]">
        <header className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] [background:url(..//figmaAssets/background.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(37,38,39,1)_0%,rgba(37,38,39,1)_100%)]">
          <div className="flex flex-col w-full max-w-[1240px] items-center gap-4 px-0 py-[50px] relative flex-[0_0_auto]">
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <h1 className="flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-white text-[32px] leading-[48px] relative tracking-[0]">
                Order Confirmation
              </h1>
            </div>

            <nav className="flex items-start gap-3 self-stretch w-full relative flex-[0_0_auto]">
              <Breadcrumb>
                <BreadcrumbList className="flex items-center gap-3">
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                        <BreadcrumbLink
                          href={item.href}
                          className="items-start px-0 py-px inline-flex relative flex-[0_0_auto]"
                        >
                          <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-white text-[13px] tracking-[0] leading-3 whitespace-nowrap">
                            {item.label}
                          </span>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < breadcrumbItems.length - 1 && (
                        <BreadcrumbSeparator>
                          <img
                            className="relative w-[5px] h-[7px]"
                            alt="Separator"
                            src="/figmaAssets/svg.svg"
                          />
                        </BreadcrumbSeparator>
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </nav>
          </div>
        </header>
      </div>

      <div className="flex flex-col w-full max-w-[665px] items-center gap-[18px] relative flex-[0_0_auto]">
        <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
          <h2 className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
            THANK YOOU FOR PLACING
          </h2>

          <Badge className="inline-flex h-[50px] items-center justify-center px-[7px] py-0 relative flex-[0_0_auto] bg-[#98042d] rounded-lg hover:bg-[#98042d]">
            <span className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[35.2px] whitespace-nowrap">
              YOUR ORDER
            </span>
          </Badge>
        </div>

        <p className="relative flex items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-medium text-[#191a23] text-base text-center tracking-[0] leading-3">
          You'll receive a confirmation email shortly with your order number and
          tracking information.
        </p>
      </div>

      <div className="inline-flex flex-col items-center gap-4 relative flex-[0_0_auto]">
        <div className="inline-flex flex-col items-center gap-4 relative flex-[0_0_auto]">
          <img
            className="relative flex-[0_0_auto] mt-[-6.00px] ml-[-12.00px] mr-[-12.00px]"
            alt="Progress bar"
            src="/figmaAssets/bar.svg"
          />

          <div className="relative self-stretch w-full h-4">
            {progressSteps.map((step, index) => (
              <div
                key={index}
                className={`absolute top-3.5 ${step.position} [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-base tracking-[0] leading-[normal] ${index === 3 ? "whitespace-nowrap" : ""}`}
              >
                {step.label}
              </div>
            ))}
          </div>

          <CreditCardIcon className="absolute top-1.5 left-[444px] w-6 h-6" />
          <CheckCircleIcon className="absolute top-1.5 left-[660px] w-6 h-6" />
        </div>
      </div>

      <Card className="flex flex-col w-full max-w-[644px] items-center gap-6 px-0 py-8 relative flex-[0_0_auto] bg-white rounded-2xl border border-solid border-[#e6e6e6] shadow-[0px_2px_2px_#00000099]">
        <CardContent className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto] p-0">
          <div className="flex flex-col items-center justify-center gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scalegray-900 text-2xl leading-9 whitespace-nowrap relative tracking-[0]">
              Order Confirmed
            </h3>

            <p className="relative w-[444px] [font-family:'Roboto',Helvetica] font-medium text-[#383838] text-sm text-center tracking-[0] leading-[18px]">
              Your order is successfully placed. You can find all of the
              information about your order below, and we will send you a
              confirmation email as soon as it is delivered.
            </p>
          </div>

          <div className="inline-flex flex-col items-center gap-1.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-transparent text-sm tracking-[0] leading-[18px] whitespace-nowrap">
              <span className="font-semibold text-[#383838]">Order ID</span>
              <span className="font-semibold text-black">&nbsp;</span>
              <span className="font-semibold text-[#383838]">:</span>
              <span className="font-semibold text-black"> #ILOVEYOU01</span>
            </div>

            <div className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-transparent text-sm tracking-[0] leading-[18px] whitespace-nowrap">
              <span className="font-semibold text-[#383838]">
                Delivery Time :
              </span>
              <span className="font-semibold text-black">
                {" "}
                Instant - 120 Mintues
              </span>
            </div>
          </div>

          <div className="inline-flex flex-col items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <h4 className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-gray-scalegray-900 text-base tracking-[0] leading-6 whitespace-nowrap">
              Items Purchased
            </h4>

            <Separator className="relative w-[200px] h-0.5 bg-[#383838] rounded-[10px]" />
          </div>

          <div className="inline-flex items-center gap-16 pl-0 pr-[38px] py-0 relative flex-[0_0_auto] rounded-[10px] border border-solid border-[#fcc0c5]">
            <div className="inline-flex items-center gap-3 relative flex-[0_0_auto]">
              <img
                className="relative w-[100px] h-[100px] rounded-lg object-cover"
                alt="Product image"
                src={orderItem.image}
              />

              <div className="inline-flex flex-col items-start justify-center gap-3 relative flex-[0_0_auto]">
                <h5 className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-gray-scalegray-900 text-base tracking-[0] leading-6 whitespace-nowrap">
                  {orderItem.title}
                </h5>

                <div className="inline-flex items-center gap-0.5 relative flex-[0_0_auto] border-0 border-none">
                  <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                    <span className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-neutral-04100 text-xs tracking-[0] leading-[22px] whitespace-nowrap">
                      Quantity: {orderItem.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-start gap-1 relative flex-[0_0_auto]">
              <span className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-[#111111] text-base tracking-[0] leading-6 whitespace-nowrap">
                {orderItem.price}
              </span>
            </div>
          </div>

          <Separator className="relative w-[200px] h-0.5 bg-[#383838] rounded-[10px]" />

          <div className="inline-flex flex-col items-center gap-8 relative flex-[0_0_auto]">
            <div className="flex flex-col w-[444px] items-start gap-4 relative flex-[0_0_auto]">
              <div className="flex flex-col items-start pt-0 pb-4 px-0 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex flex-col items-start px-0 py-[13px] relative self-stretch w-full flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#eaeaea]">
                  <div className="flex items-start gap-40 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative flex-1 grow h-[26px]">
                      <div className="inline-flex items-center gap-2 absolute top-[calc(50.00%_-_13px)] left-0">
                        <span className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-neutral-07100 text-base tracking-[0] leading-[26px] whitespace-nowrap">
                          Subtotal
                        </span>
                      </div>

                      <span className="absolute top-[calc(50.00%_-_13px)] right-0 [font-family:'Roboto',Helvetica] font-semibold text-neutral-07100 text-base text-right tracking-[0] leading-[26px] whitespace-nowrap">
                        {pricingDetails.subtotal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start px-0 py-[13px] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="flex items-start gap-40 relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative flex-1 grow h-[26px]">
                      <span className="absolute top-0 left-0 [font-family:'Roboto',Helvetica] font-semibold text-neutral-07100 text-xl tracking-[0] leading-8 whitespace-nowrap">
                        Total
                      </span>

                      <span className="absolute top-[calc(50.00%_-_13px)] right-0 [font-family:'Roboto',Helvetica] font-semibold text-neutral-07100 text-xl text-right tracking-[0] leading-8 whitespace-nowrap">
                        {pricingDetails.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button className="flex w-[300px] items-center justify-center gap-2 px-[26px] py-2.5 relative flex-[0_0_auto] bg-[#98042d] rounded-lg hover:bg-[#98042d]/90 h-auto">
              <span className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-extrabold text-white text-lg text-center tracking-[-0.40px] leading-8 whitespace-nowrap">
                Back To Shopping
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <footer className="inline-flex items-center justify-center gap-2.5 pt-0 pb-16 px-0 relative flex-[0_0_auto]">
        <p className="relative w-[650px] mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-black text-base text-center tracking-[0] leading-[normal]">
          By clicking "Next Step," you agree to our Terms of Service and Privacy
          Policy. Your use of our services indicates your acceptance of these
          terms. If you have any questions, please contact us before placing
          your order.
        </p>
      </footer>
    </section>
  );
};
