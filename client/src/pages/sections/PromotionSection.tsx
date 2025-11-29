import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useProducts, useAddToCart, type Product } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export const PromotionSection = (): JSX.Element => {
  const { data: productsData, isLoading, error } = useProducts();
  const addToCart = useAddToCart();
  const { toast } = useToast();

  // Filter to show only game currency/promotion products (first 5)
  const gameItems = productsData?.products?.slice(0, 5) || [];

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast({
        title: "Out of stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1 });
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 w-full">
        <div className="flex flex-col w-full max-w-[1240px] items-start gap-12">
          <div className="h-20 bg-gray-200 animate-pulse rounded" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 w-full">
        <div className="text-center">
          <p className="text-red-500">Failed to load products</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center gap-12 px-4 md:px-0 py-8 w-full">
      <div className="flex flex-col w-full max-w-[1240px] items-start gap-12">
        <header className="flex flex-col sm:flex-row items-start sm:items-end justify-between w-full gap-4">
          <div className="flex max-w-full sm:max-w-[500px] gap-1.5 flex-col items-start">
            <div className="mt-[-1.00px] font-semibold text-lg sm:text-xl h-auto [font-family:'Roboto',Helvetica] text-[#1e1e1e] tracking-[0] leading-[25px]">
              Game Currency
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl h-auto [font-family:'Roboto',Helvetica] text-[#1e1e1e] tracking-[0] leading-[25px]">
              GAME TOPUP
            </h1>
          </div>

          <Button className="w-[140px] h-10 bg-[#98042d] rounded-xl shadow-[0px_2px_2px_#00000099] [font-family:'Manrope',Helvetica] font-extrabold text-[#ffffff] text-sm hover:bg-[#98042d]/90 h-auto">
            View more
          </Button>
        </header>

        <div className="flex flex-col items-center gap-16 relative self-stretch w-full flex-[0_0_auto]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {gameItems.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="inline-flex flex-col items-start justify-end gap-6 p-4 relative flex-[0_0_auto] bg-white rounded-2xl overflow-hidden border-[1.75px] border-solid border-[#d8d9e0] shadow-[0px_4px_4px_#0000000d] cursor-pointer hover:shadow-lg transition-shadow w-full">
                  <CardContent className="p-0 flex flex-col gap-6 w-full">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                      {product.images && product.images[0] ? (
                        <img
                          className="w-full h-full object-cover"
                          alt={product.name}
                          src={product.images[0]}
                          onError={(e) => {
                            e.currentTarget.src = "/figmaAssets/image-20.png";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No image</span>
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
                          onClick={(e) => handleAddToCart(product, e)}
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
