import React from "react";
import { Separator } from "@/components/ui/separator";

export const FooterSection = (): JSX.Element => {
  const categoriesLinks = [
    { name: "Valorant", color: "text-gray-scalegray-400" },
    { name: "Game-Topup", color: "text-gray-scalegray-400" },
    { name: "Giftcard", color: "text-[#999999]" },
    { name: "Subscription", color: "text-gray-scalegray-400" },
    { name: "Software", color: "text-gray-scalegray-400" },
  ];

  const profileLinks = [
    { name: "My Account", color: "text-gray-scalegray-400" },
    { name: "Order Cart", color: "text-gray-scalegray-400" },
    { name: "My Wallet", color: "text-gray-scalegray-400" },
    { name: "Order History", color: "text-[#999999]" },
    { name: "Edit Profile", color: "text-gray-scalegray-400" },
  ];

  const companyLinks = [
    { name: "Contact Us", color: "text-gray-scalegray-400" },
    { name: "Faqs", color: "text-gray-scalegray-400" },
  ];

  return (
    <footer className="flex flex-col items-center justify-center gap-8 md:gap-12 pt-8 md:pt-12 pb-0 px-4 md:px-0 relative w-full bg-[#0e0d11] border-t-[9px] border-t-[#1877f2] border-solid">
      <div className="flex flex-col lg:flex-row w-full max-w-[1240px] items-start justify-between gap-8 lg:gap-0 relative">
        {/* Company Info Section */}
        <div className="flex flex-col w-full lg:w-[366px] h-auto lg:h-[205px] items-start gap-3 relative">
          <div className="h-12 md:h-16 bg-[url(/figmaAssets/logo-1.png)] bg-cover bg-[50%_50%] relative w-[150px] md:w-[200px]" />

          <div className="relative w-full lg:w-[336px] font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] text-gray-scalegray-500 text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] [font-style:var(--body-small-body-small-400-font-style)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2.5 px-0 py-1.5 relative flex-[0_0_auto] bg-[#0e0d11] shadow-[0px_1.5px_0px_#3e66df]">
              <div className="mt-[-1.00px] font-body-small-body-small-500 text-gray-scalewhite leading-[var(--body-small-body-small-500-line-height)] relative w-fit font-[number:var(--body-small-body-small-500-font-weight)] text-[length:var(--body-small-body-small-500-font-size)] tracking-[var(--body-small-body-small-500-letter-spacing)] whitespace-nowrap [font-style:var(--body-small-body-small-500-font-style)]">
                +880-1234567890
              </div>
            </div>

            <div className="relative w-fit font-body-medium-body-medium-400 font-[number:var(--body-medium-body-medium-400-font-weight)] text-gray-scalegray-500 text-[length:var(--body-medium-body-medium-400-font-size)] tracking-[var(--body-medium-body-medium-400-letter-spacing)] leading-[var(--body-medium-body-medium-400-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-400-font-style)]">
              or
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-0 py-1.5 relative flex-[0_0_auto] bg-[#0e0d11] shadow-[0px_1.5px_0px_#377dff]">
              <div className="relative w-fit mt-[-1.00px] font-body-small-body-small-500 font-[number:var(--body-small-body-small-500-font-weight)] text-gray-scalewhite text-[length:var(--body-small-body-small-500-font-size)] tracking-[var(--body-small-body-small-500-letter-spacing)] leading-[var(--body-small-body-small-500-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-500-font-style)]">
                support@credifyshop.com
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12 md:gap-16 lg:gap-24 relative flex-[0_0_auto] w-full lg:w-auto">
          <div className="flex flex-col w-full sm:w-[95px] h-auto items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Categories
            </div>

            <div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">{categoriesLinks.map((link, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] ${link.color} text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)] cursor-pointer hover:opacity-80`}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[95px] h-[164px] items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Your profile
            </div>

            <div className="mb-[-33.00px] inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
              {profileLinks.map((link, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] ${link.color} text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)] cursor-pointer hover:opacity-80`}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[130px] h-[164px] items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Company
            </div>

            <div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
              {companyLinks.map((link, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] ${link.color} text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)] cursor-pointer hover:opacity-80`}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-[95px] h-auto items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Your profile
            </div>

            <div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
              {profileLinks.map((link, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] ${link.color} text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)] cursor-pointer hover:opacity-80`}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full sm:w-[130px] h-auto items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Company
            </div>

            <div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
              {companyLinks.map((link, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] ${link.color} text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)] cursor-pointer hover:opacity-80`}
                >
                  {link.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col sm:flex-row w-full max-w-[1240px] items-center justify-between gap-4 px-4 md:px-0 py-6 relative bg-[#0e0d11] shadow-[0px_-1px_0px_#333333]">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-transparent text-sm tracking-[0] leading-[14px] text-center sm:text-left">
            <span className="text-[#ffffffbf] leading-[18px]">
              © All rights reserved. Made by{" "}
            </span>

            <span className="text-white leading-[18px]">CredifyStore</span>
          </div>

          <Separator
            orientation="vertical"
            className="hidden sm:block w-px h-[15px] bg-gray-400"
          />

          <div className="flex items-center gap-4">
            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-gray-200 text-sm tracking-[0] leading-[18px] whitespace-nowrap cursor-pointer hover:opacity-80">
              Privacy
            </div>

            <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-gray-200 text-sm tracking-[0] leading-[18px] whitespace-nowrap cursor-pointer hover:opacity-80">
              Terms of use
            </div>
          </div>
        </div>

        <img
          className="relative flex-[0_0_auto] h-6 md:h-auto"
          alt="Payment method"
          src="/figmaAssets/payment-method.svg"
        />
      </div>
    </footer>
  );
};
