import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ShoppingCartSection = (): JSX.Element => {
  const profileFields = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "Change your full name",
      required: true,
    },
    {
      id: "address",
      label: "Address",
      placeholder: "Change your full address",
      required: true,
    },
    {
      id: "email",
      label: "Email",
      placeholder: "Change your email",
      required: true,
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      required: true,
    },
  ];

  const passwordFields = [
    {
      id: "oldPassword",
      label: "Old Password",
      defaultValue: "Dianne",
      required: true,
    },
    {
      id: "newPassword",
      label: "New Password",
      defaultValue: "Dianne",
      required: true,
    },
  ];

  return (
    <section className="flex flex-col items-center gap-2.5 pt-0 pb-16 px-0 relative self-stretch w-full flex-[0_0_auto] bg-[#fefefe]">
      <Card className="flex flex-col w-[1024px] items-start gap-6 p-12 bg-white rounded-2xl border border-solid border-[#e6e6e6] shadow-[0px_2px_2px_#00000099] relative flex-[0_0_auto]">
        <CardContent className="flex flex-col items-start gap-16 relative self-stretch w-full flex-[0_0_auto] p-0">
          <div className="flex flex-col h-[47px] items-start gap-3 relative self-stretch w-full">
            <h2 className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-black text-xl tracking-[0.20px] leading-8">
              Edit your profile
            </h2>
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#cccccc]">
              <div className="relative w-[100px] h-[3px] bg-[#d80027]" />
            </div>
          </div>

          <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
            <div className="inline-flex flex-col items-start gap-6 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
                {profileFields.map((field) => (
                  <div
                    key={field.id}
                    className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]"
                  >
                    <Label
                      htmlFor={field.id}
                      className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-gray-scalegray-900 text-sm tracking-[0] leading-[21px] whitespace-nowrap"
                    >
                      <span className="font-semibold text-[#191919]">
                        {field.label}{" "}
                      </span>
                      {field.required && (
                        <span className="font-semibold text-[#ea4335]">*</span>
                      )}
                    </Label>
                    <Input
                      id={field.id}
                      placeholder={field.placeholder}
                      className="relative w-[512px] h-[49px] bg-gray-scalewhite rounded-md border border-solid border-[#191a23] px-4 py-3.5 [font-family:'Roboto',Helvetica] text-[#191a23] leading-[18.2px] font-normal text-sm tracking-[0]"
                    />
                  </div>
                ))}
              </div>

              <Button className="inline-flex items-center justify-center gap-3 px-8 py-3.5 relative flex-[0_0_auto] bg-[#98042d] rounded-xl h-auto hover:bg-[#98042d]/90">
                <span className="relative w-fit mt-[-0.50px] font-body-small-body-small-600 font-[number:var(--body-small-body-small-600-font-weight)] text-gray-scalewhite text-[length:var(--body-small-body-small-600-font-size)] tracking-[var(--body-small-body-small-600-letter-spacing)] leading-[var(--body-small-body-small-600-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-600-font-style)]">
                  Save Changes
                </span>
              </Button>
            </div>

            <div className="flex flex-col w-56 items-center gap-5 relative">
              <img
                className="relative w-[200px] h-[200px] object-cover"
                alt="Profile Image"
                src="/figmaAssets/image.png"
              />
              <Button
                variant="outline"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 relative flex-[0_0_auto] mb-[-1.00px] bg-gray-scalewhite rounded-xl border-2 border-solid border-[#98042d] h-auto hover:bg-gray-scalewhite/90"
              >
                <span className="relative w-fit mt-[-1.00px] font-body-small-body-small-600 font-[number:var(--body-small-body-small-600-font-weight)] text-[#98042d] text-[length:var(--body-small-body-small-600-font-size)] tracking-[var(--body-small-body-small-600-letter-spacing)] leading-[var(--body-small-body-small-600-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-600-font-style)]">
                  Chose Image
                </span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col h-[47px] items-start gap-3 relative self-stretch w-full">
              <h2 className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-black text-xl tracking-[0.20px] leading-8">
                Change Password
              </h2>
              <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#cccccc]">
                <div className="relative w-[100px] h-[3px] bg-[#d80027]" />
              </div>
            </div>

            <div className="inline-flex items-start gap-6 relative flex-[0_0_auto]">
              {passwordFields.map((field) => (
                <div
                  key={field.id}
                  className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]"
                >
                  <Label
                    htmlFor={field.id}
                    className="relative w-fit mt-[-1.00px] font-body-small-body-small-400 text-gray-scalegray-900 leading-[var(--body-small-body-small-400-line-height)] font-[number:var(--body-small-body-small-400-font-weight)] text-[length:var(--body-small-body-small-400-font-size)] tracking-[var(--body-small-body-small-400-letter-spacing)] whitespace-nowrap [font-style:var(--body-small-body-small-400-font-style)]"
                  >
                    <span className="text-[#191919] font-body-small-body-small-400 [font-style:var(--body-small-body-small-400-font-style)] font-[number:var(--body-small-body-small-400-font-weight)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] text-[length:var(--body-small-body-small-400-font-size)]">
                      {field.label}{" "}
                    </span>
                    {field.required && (
                      <span className="font-[number:var(--body-small-body-small-400-font-weight)] text-[#ea4335] font-body-small-body-small-400 [font-style:var(--body-small-body-small-400-font-style)] tracking-[var(--body-small-body-small-400-letter-spacing)] leading-[var(--body-small-body-small-400-line-height)] text-[length:var(--body-small-body-small-400-font-size)]">
                        *
                      </span>
                    )}
                  </Label>
                  <Input
                    id={field.id}
                    type="password"
                    defaultValue={field.defaultValue}
                    className="relative w-[302px] h-[49px] bg-gray-scalewhite rounded-md border border-solid border-[#191a23] px-4 py-3.5 [font-family:'Roboto',Helvetica] font-semibold text-gray-scalegray-600 text-base tracking-[0] leading-[20.8px]"
                  />
                </div>
              ))}
            </div>

            <Button className="inline-flex items-center justify-center gap-3 px-8 py-3.5 relative flex-[0_0_auto] bg-[#98042d] rounded-xl h-auto hover:bg-[#98042d]/90">
              <span className="relative w-fit mt-[-0.50px] font-body-small-body-small-600 font-[number:var(--body-small-body-small-600-font-weight)] text-gray-scalewhite text-[length:var(--body-small-body-small-600-font-size)] tracking-[var(--body-small-body-small-600-letter-spacing)] leading-[var(--body-small-body-small-600-line-height)] whitespace-nowrap [font-style:var(--body-small-body-small-600-font-style)]">
                Change Password
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
