import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export const LoginSection = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!username || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    try {
      await login(username, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      setLocation('/profile'); // Redirect to profile page
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="items-center justify-center gap-4 md:gap-16 px-4 md:px-0 py-8 md:py-16 self-stretch w-full flex-[0_0_auto] [background:url(../figmaAssets/login.png)_50%_50%_/_cover] relative flex">
      {/* Left decorative image - hidden on mobile */}
      <div className="hidden md:block relative w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-3xl shadow-[0px_2px_2px_#000000] [background:url(../figmaAssets/frame-29.png)_50%_50%_/_cover]" />

      {/* Divider - hidden on mobile */}
      <div className="hidden md:block relative w-[5px] h-[300px] md:h-[381px] bg-[#d82b4a]" />

      {/* Login Form Card */}
      <Card className="h-auto md:h-[768px] w-full max-w-[520px] md:w-auto px-4 md:px-16 py-8 md:py-0 bg-white rounded-xl border border-solid border-[#1e1e1e] shadow-[0px_2px_2px_#00000099]">
        <CardContent className="flex items-center gap-2.5 h-full p-0">
          <form onSubmit={handleSubmit} className="flex-col w-full md:w-[388px] items-start gap-6 md:gap-8 relative flex">
            {/* Header */}
            <div className="flex flex-col w-full md:w-[388px] items-start gap-3 relative flex-[0_0_auto]">
              <h1 className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-black text-lg md:text-xl tracking-[0.20px] leading-8">
                Log in to your account
              </h1>

              <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#cccccc]">
                <div className="relative w-[100px] h-[3px] bg-[#d80027]" />
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col items-end justify-center gap-4 md:gap-6 relative self-stretch w-full flex-[0_0_auto]">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Username/Email Field */}
              <div className="flex flex-col items-start gap-3 md:gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <Label className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-sm md:text-base tracking-[0.16px] leading-4 whitespace-nowrap">
                  <span className="text-black tracking-[0.03px]">
                    Username or email address{" "}
                  </span>
                  <span className="text-[#ea4335] tracking-[0.03px]">*</span>
                </Label>

                <div className="relative self-stretch w-full h-10 md:h-12">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full h-full bg-[#eeeeee] rounded-xl border border-solid text-[#4e4e4e] [font-family:'Roboto',Helvetica] font-normal text-sm md:text-base tracking-[0.16px] leading-4 px-3 md:px-[15px] py-2 md:py-3 placeholder:text-[#4e4e4e]"
                    placeholder="Enter your username or email address here..."
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <Label className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-sm md:text-base tracking-[0.16px] leading-4 whitespace-nowrap">
                  <span className="text-black tracking-[0.03px]">
                    Password{" "}
                  </span>
                  <span className="text-[#ea4335] tracking-[0.03px]">*</span>
                </Label>

                <div className="relative self-stretch w-full h-10 md:h-12">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-full bg-[#eeeeee] rounded-xl border border-solid text-[#4e4e4e] [font-family:'Roboto',Helvetica] font-normal text-sm md:text-base tracking-[0.16px] leading-4 px-3 md:px-[15px] py-2 md:py-3 pr-12 placeholder:text-[#4e4e4e]"
                    placeholder="At least 8 characters"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <Button
                type="button"
                variant="link"
                className="h-auto flex items-center justify-center w-fit [font-family:'Roboto',Helvetica] font-normal text-link text-sm md:text-base text-center tracking-[0.16px] leading-4 whitespace-nowrap p-0"
              >
                Forgot Password?
              </Button>

              {/* Sign In Button */}
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="h-auto flex items-center justify-around gap-2.5 px-0 py-3 md:py-4 relative self-stretch w-full flex-[0_0_auto] bg-[#d80027] rounded-xl hover:bg-[#c00024] disabled:opacity-50"
              >
                <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-white text-lg md:text-xl text-center tracking-[0.20px] leading-5 whitespace-nowrap">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </span>
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="inline-flex items-center justify-center gap-2.5">
              <div className="flex items-center justify-center w-full md:w-[382px] mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-sm md:text-lg text-center tracking-[0.18px] leading-[28.8px]">
                <span className="text-[#313957] tracking-[0.03px]">
                  Don&#39;t you have an account?{" "}
                </span>
                <Link href="/register">
                  <Button
                    variant="link"
                    className="h-auto p-0 text-[#1d4ae8] tracking-[0.03px] text-sm md:text-lg font-normal"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
