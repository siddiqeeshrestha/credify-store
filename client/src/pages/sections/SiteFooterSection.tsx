import React from "react";

const categoriesData = [
  { name: "Valorant", color: "text-gray-scalegray-400" },
  { name: "Game-Topup", color: "text-gray-scalegray-400" },
  { name: "Giftcard", color: "text-[#999999]" },
  { name: "Subscription", color: "text-gray-scalegray-400" },
  { name: "Software", color: "text-gray-scalegray-400" },
];

const profileData = [
  { name: "My Account", color: "text-gray-scalegray-400" },
  { name: "Order Cart", color: "text-gray-scalegray-400" },
  { name: "My Wallet", color: "text-gray-scalegray-400" },
  { name: "Order History", color: "text-[#999999]" },
  { name: "Edit Profile", color: "text-gray-scalegray-400" },
];

const companyData = [
  { name: "Contact Us", color: "text-gray-scalegray-400" },
  { name: "Faqs", color: "text-gray-scalegray-400" },
];

export const SiteFooterSection = (): JSX.Element => {
  return (
    <footer className="flex flex-col items-center justify-center gap-12 pt-12 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto] ml-[-4.50px] mr-[-4.50px] bg-[#0e0d11] border-t-[9px] [border-top-style:solid] [border-right-style:none] [border-bottom-style:none] [border-left-style:none] border-[#1877f2]">
      <div className="flex w-[1240px] items-start justify-between relative flex-[0_0_auto]">
        <div className="flex flex-col w-[366px] h-[205px] items-start gap-3 relative">
          <div className="h-16 bg-[url(/figmaAssets/logo-1.png)] bg-cover bg-[50%_50%] relative w-[200px]" />

          <div className="relative w-[336px] font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] text-gray-scalegray-500 text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] [font-style:var(--body-small-body-small-400-font-style)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </div>

          <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2.5 px-0 py-1.5 relative flex-[0_0_auto] bg-[#0e0d11] shadow-[0px_1.5px_0px_#3e66df]">
              <div className="relative w-fit mt-[-1.00px] font-body-small-body-small-500 font-[number:var(--body-small-body-small-500-font-weight)] text-gray-scalewhite text-[length:var(--body-small-body-small-500-font-size)] tracking-[var(--body-small-body-small-500-letter-spacing)] leading-[var(--body-small-body-small-500-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-500-font-style)]">
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

        <div className="inline-flex items-center gap-24 relative flex-[0_0_auto]">
          <div className="flex flex-col w-[95px] h-[164px] items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Catagories
            </div>

            <div className="mb-[-33.00px] mr-[-1.00px] inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
              {categoriesData.map((item, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] ${item.color} text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)]`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[95px] h-[164px] items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Your profile
            </div>

            <div className="mb-[-33.00px] inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
              {profileData.map((item, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} ${index === 1 ? "font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] text-gray-scalegray-400 text-[length:var(--body-small-body-small-400-font-size)] leading-[var(--body-small-body-small-400-line-height)] tracking-[var(--body-small-body-small-400-letter-spacing)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)]" : "font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)]"} ${item.color}`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[130px] h-[164px] items-start gap-5 relative">
            <div className="relative w-fit mt-[-1.00px] font-body-medium-body-medium-500 font-[number:var(--body-medium-body-medium-500-font-weight)] text-gray-scalewhite text-[length:var(--body-medium-body-medium-500-font-size)] tracking-[var(--body-medium-body-medium-500-letter-spacing)] leading-[var(--body-medium-body-medium-500-line-height)] whitespace-nowrap [font-style:var(--body-medium-body-medium-500-font-style)]">
              Company
            </div>

            <div className="inline-flex flex-col items-start gap-3 relative flex-[0_0_auto]">
              {companyData.map((item, index) => (
                <div
                  key={index}
                  className={`relative w-fit ${index === 0 ? "mt-[-1.00px]" : ""} font-body-small-body-small-400 font-[number:var(--body-small-body-small-400-font-weight)] ${item.color} text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)]`}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-[1240px] items-center justify-between px-0 py-6 relative flex-[0_0_auto] bg-[#0e0d11] shadow-[0px_-1px_0px_#333333]">
        <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-transparent text-sm tracking-[0] leading-[14px]">
            <span className="text-[#ffffffbf] leading-[18px]">
              © All rights reserved. Made by{" "}
            </span>

            <span className="text-white leading-[18px]">CredifyStore</span>
          </div>

          <img
            className="relative w-px h-[15px]"
            alt="Div"
            src="/figmaAssets/div.svg"
          />

          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-gray-200 text-sm tracking-[0] leading-[18px] whitespace-nowrap">
            Privacy
          </div>

          <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-gray-200 text-sm tracking-[0] leading-[18px] whitespace-nowrap">
            Terms of use
          </div>
        </div>

        <img
          className="relative flex-[0_0_auto]"
          alt="Payment method"
          src="/figmaAssets/payment-method.svg"
        />
      </div>
    </footer>
  );
};
