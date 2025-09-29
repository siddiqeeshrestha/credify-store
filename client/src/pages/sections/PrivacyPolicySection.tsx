import { ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const PrivacyPolicySection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] bg-white">
        <header className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto] [background:url(../figmaAssets/background.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(37,38,39,1)_0%,rgba(37,38,39,1)_100%)]">
          <div className="flex flex-col w-[1240px] items-center gap-4 px-0 py-[50px] relative flex-[0_0_auto]">
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <h1 className="self-stretch font-bold text-white text-[32px] leading-[48px] relative flex items-center justify-center mt-[-1.00px] [font-family:'Roboto',Helvetica] tracking-[0]">
                Privacy Policy
              </h1>
            </div>

            <nav className="flex items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
              <Breadcrumb>
                <BreadcrumbList className="flex items-center gap-3">
                  <BreadcrumbItem className="inline-flex items-center gap-[5px] relative flex-[0_0_auto]">
                    <BreadcrumbLink className="inline-flex items-start px-0 py-px relative flex-[0_0_auto]">
                      <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-white text-[13px] tracking-[0] leading-3 whitespace-nowrap">
                        Home
                      </span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator>
                    <ChevronRightIcon className="w-[5px] h-[7px] text-white" />
                  </BreadcrumbSeparator>

                  <BreadcrumbItem className="inline-flex items-center gap-[5px] relative self-stretch flex-[0_0_auto]">
                    <span className="inline-flex items-start px-0 py-px relative flex-[0_0_auto]">
                      <span className="w-fit font-medium text-white text-[13px] leading-3 whitespace-nowrap relative flex items-center justify-center mt-[-1.00px] [font-family:'Roboto',Helvetica] tracking-[0]">
                        Privacy Policy
                      </span>
                    </span>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </nav>
          </div>
        </header>
      </div>

      <main className="flex items-center justify-center gap-2.5 px-0 py-16 relative self-stretch w-full flex-[0_0_auto]">
        <article className="w-[1240px] font-semibold text-black text-2xl leading-6 relative flex items-center justify-center mt-[-1.00px] [font-family:'Roboto',Helvetica] tracking-[0]">
          Privacy Policy – Credify Shop
          <br />
          <br />
          <br />
          <br />
          <br />
          1. Privacy
          <br /> <br />
          At Credify Shop, we value your trust and give the highest importance
          to protecting your personal data. This Privacy Policy explains how we
          collect, use, and safeguard your information when you interact with
          our website and services.
          <br />
          <br />
          <br /> <br />
          <br />
          2. Information We Collect
          <br /> <br />
          When you register, place an order, or contact Credify Shop, we may
          request personal details such as: <br /> <br />
          Name <br />
          Email Address <br />
          Contact Number (verified for security reasons) <br /> <br />👉
          Providing this information is voluntary, but without it, we may not be
          able to deliver products, services, or requested support. <br />
          <br />🚫 Bank account details are never stored by Credify Shop. <br />{" "}
          <br />
          <br />
          <br />
          <br />
          3. Identity Verification
          <br /> <br />
          In certain cases, we may collect identification documents (such as
          NID, passport, or other official IDs) as required by applicable laws,
          regulations, or authorized regulators. This is strictly for
          verification and compliance purposes.
          <br />
          <br />
          We do not access or collect sensitive information from your social
          accounts — except your username and email (if you choose to use them
          for login or communication).
          <br /> <br />
          <br />
          <br />
          <br />
          4. Use of Data
          <br /> <br />
          Your personal information is used for: <br /> <br />
          Processing and delivering your orders <br /> <br />
          Ensuring secure transactions <br /> <br />
          Providing customer support <br /> <br />
          Complying with legal obligations <br /> <br />
          You may request access, correction, or deletion of your data, or
          withdraw your consent, by contacting us directly.
          <br /> <br />
          <br />
          <br />
          <br />
          5. Cookies &amp; Analytics <br /> <br />
          Our website uses Google Analytics to improve performance and user
          experience. Google Analytics may use cookies (small text files) to
          analyze website usage. <br /> <br />
          Data (including your IP address) is stored on Google servers in the
          United States. <br /> <br />
          Google may share this information with third parties if legally
          required. <br /> <br />
          We do not link your IP address with any other personal data. <br />{" "}
          <br />👉 You can disable cookies or JavaScript in your browser
          settings. Please note that some features may not function properly if
          cookies are disabled.
          <br />
          <br />
          <br /> <br />
          <br />
          6. Secure Payment Data
          <br /> <br />
          Credify Shop uses a secure payment gateway integrated with bKash,
          Nagad, and other approved methods. <br /> <br />
          When you proceed to checkout, you are redirected to our secure payment
          portal. <br /> <br />
          Your payment details are encrypted and managed securely by Credify
          Shop. <br /> <br />
          Any payment-related issues are handled exclusively by our support
          team.
          <br /> <br />
          <br />
          <br />
          <br />
          7. Commitment to Security
          <br /> <br />
          We apply strict confidentiality rules, and only authorized personnel
          may handle your data. All information is protected against
          unauthorized access, misuse, or disclosure.
          <br />
          <br /> <br />
          <br />
          8. Changes to Privacy Policy
          <br /> <br />
          Credify Shop reserves the right to update or modify this Privacy
          Policy at any time. Any changes will be posted on this page, and
          continued use of our services will indicate your acceptance.
          <br />
          <br />
          <br />
          <br />
          <br />
          9. Contact Us <br /> <br />
          If you have any questions or concerns, please contact us: <br />{" "}
          <br />
          Email: support@credifyshop.com <br /> <br />
          Phone/WhatsApp: +8801XXXXXXXXX <br /> <br />
          By using this Website, you acknowledge that you have read, understood,
          and agree to be bound by these Terms and Conditions.
        </article>
      </main>
    </section>
  );
};
