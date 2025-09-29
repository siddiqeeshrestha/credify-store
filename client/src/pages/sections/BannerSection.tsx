import React from "react";

export const BannerSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <img
        className="w-full h-auto object-cover"
        alt="Credify Banner"
        src="/figmaAssets/banner.png"
      />
    </section>
  );
};