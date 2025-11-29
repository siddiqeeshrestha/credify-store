import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFeaturedProducts, useAddToCart } from "@/lib/api";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductImage } from "@/components/ProductImage";

export const FeaturedProductsSection = (): JSX.Element => {
  const { data: productsData, isLoading, error } = useFeaturedProducts();
  const addToCart = useAddToCart();
  const { toast } = useToast();

  const handleAddToCart = async (productId: string, productName: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addToCart.mutateAsync({ productId, quantity: 1 });
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col w-full max-w-[1240px] items-start gap-12 relative flex-[0_0_auto]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl aspect-square mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-6 rounded w-1/2"></div>
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
          Failed to load featured products. Please try again later.
        </div>
      </section>
    );
  }

  const products = productsData?.products || [];

  return (
    <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col w-full max-w-[1240px] items-start gap-12 relative flex-[0_0_auto]">
        <header className="flex items-end justify-between relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex gap-1.5 flex-[0_0_auto] flex-col items-start relative">
            <h3 className="relative w-[233px] h-[27px] mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-[#1e1e1e] text-xl tracking-[0] leading-[25px] whitespace-nowrap">
              Featured Products
            </h3>

            <h2 className="w-[233px] h-[27px] font-bold text-[#1e1e1e] text-3xl leading-[25px] whitespace-nowrap relative [font-family:'Roboto',Helvetica] tracking-[0]">
              Best Deals
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
            {products.slice(0, 5).map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="inline-flex flex-col items-start justify-end gap-6 p-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border-[1.75px] border-solid border-[#d8d9e0] shadow-[0px_4px_4px_#0000000d] cursor-pointer hover:shadow-lg transition-shadow w-full">
                  <CardContent className="p-0 flex flex-col gap-6 w-full">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                      <ProductImage
                        className="w-full h-full object-cover"
                        alt={product.name}
                        src={product.images?.[0]}
                        fallbackSrc="/figmaAssets/image-1.png"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Sale
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="flex flex-col items-start gap-[10.49px] px-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
                        <h4 className="[font-family:'Inter',Helvetica] text-lg leading-[21.6px] relative self-stretch mt-[-1.75px] font-semibold text-[#0e0d11] tracking-[0] truncate">
                          {product.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between px-2.5 py-0 relative self-stretch w-full flex-[0_0_auto]">
                        <div className="inline-flex flex-col items-start gap-1.5 relative flex-[0_0_auto]">
                          <span className="relative self-stretch mt-[-1.75px] [font-family:'Inter',Helvetica] font-bold text-[#0e0d11] text-2xl md:text-3xl tracking-[0] leading-[32px]">
                            ৳{Math.floor(parseFloat(product.price))}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(product.id, product.name, e)}
                          disabled={addToCart.isPending || product.stock === 0}
                          className="w-10 h-10 md:w-12 md:h-12 bg-no-repeat bg-center bg-contain border-none cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            backgroundImage: "url('/figmaAssets/primary-button-4.svg')"
                          }}
                          aria-label={`Add ${product.name} to cart`}
                        />
                      </div>

                      {product.stock <= 5 && product.stock > 0 && (
                        <div className="px-2.5">
                          <span className="text-xs text-orange-500 font-medium">
                            Only {product.stock} left in stock!
                          </span>
                        </div>
                      )}
                      
                      {product.stock === 0 && (
                        <div className="px-2.5">
                          <span className="text-xs text-red-500 font-medium">
                            Out of stock
                          </span>
                        </div>
                      )}
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
