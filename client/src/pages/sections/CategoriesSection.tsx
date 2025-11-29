import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCategories } from "@/lib/api";

export const CategoriesSection = (): JSX.Element => {
  const { data: categoriesData, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-center gap-12 relative flex-[0_0_auto] w-full max-w-[1240px]">
          <div className="inline-flex items-center gap-8 relative flex-[0_0_auto]">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
        <div className="text-center text-red-500">
          Failed to load categories. Please try again later.
        </div>
      </section>
    );
  }

  const categories = categoriesData?.categories || [];

  return (
    <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col items-center gap-12 relative flex-[0_0_auto] w-full max-w-[1240px]">
        <header className="flex w-full items-center justify-between relative flex-[0_0_auto]">
          <h2 className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#1e1e1e] text-2xl tracking-[0.24px] leading-8 whitespace-nowrap">
            Browse By Category
          </h2>

          <Button className="flex flex-col w-[140px] h-10 items-center justify-center relative bg-[#98042d] rounded-xl shadow-[0px_2px_2px_#00000099] hover:bg-[#98042d]/90 h-auto">
            <Link href="/categories" className="w-full h-full flex items-center justify-center">
              <span className="relative flex items-center justify-center w-fit [font-family:'Manrope',Helvetica] font-extrabold text-[#ffffff] text-sm text-center tracking-[0] leading-6 whitespace-nowrap">
                View more
              </span>
            </Link>
          </Button>
        </header>

        <div className="inline-flex items-center gap-8 relative flex-[0_0_auto] overflow-x-auto">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <Card className="flex w-[120px] h-[120px] items-center justify-center gap-2.5 relative bg-[#f1f1f1] rounded-xl overflow-hidden shadow-[0px_2px_2px_#00000099] border-0 cursor-pointer hover:bg-[#e8e8e8] transition-colors">
                <CardContent className="inline-flex flex-col items-center justify-center gap-2 relative flex-[0_0_auto] p-4">
                  {category.icon ? (
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                  ) : category.image ? (
                    <img
                      className="w-12 h-12 object-cover rounded-lg"
                      alt={`${category.name} icon`}
                      src={category.image}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-12 h-12 bg-[#98042d]/20 rounded-lg flex items-center justify-center">
                              <span class="text-[#98042d] font-bold text-lg">
                                ${category.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-[#98042d]/20 rounded-lg flex items-center justify-center">
                      <span className="text-[#98042d] font-bold text-lg">
                        {category.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="inline-flex flex-col items-center gap-0.5 relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-[#1e1e1e] text-xs tracking-[0] leading-[18px] text-center max-w-[100px] truncate">
                      {category.name}
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
