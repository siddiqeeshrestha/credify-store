import { ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const ProfileManagementSection = (): JSX.Element => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "My Profile", href: "/profile", isActive: true },
  ];

  return (
    <section className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-white">
      <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-white">
        <div className="flex flex-col w-full max-w-[1920px] items-center relative flex-[0_0_auto] bg-white">
          <header className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] [background:url(../figmaAssets/background.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(37,38,39,1)_0%,rgba(37,38,39,1)_100%)]">
            <div className="flex flex-col w-full max-w-[1240px] items-center gap-4 px-0 py-[50px] relative flex-[0_0_auto]">
              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <h1 className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-[48px]">
                  My Profile
                </h1>
              </div>

              <nav className="flex items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <Breadcrumb>
                  <BreadcrumbList className="flex items-center gap-3">
                    {breadcrumbItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbItem className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                          <BreadcrumbLink
                            href={item.href}
                            className="inline-flex items-start px-0 py-px relative flex-[0_0_auto]"
                          >
                            <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-white text-[13px] tracking-[0] leading-3 whitespace-nowrap">
                              {item.label}
                            </span>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && (
                          <BreadcrumbSeparator>
                            <ChevronRightIcon className="w-[5px] h-[7px] text-white" />
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
      </div>
    </section>
  );
};
