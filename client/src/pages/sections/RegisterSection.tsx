import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

const formFields = [
  {
    id: "username",
    label: "Username",
    placeholder: "Enter your username here...",
    required: true,
    type: "text",
  },
  {
    id: "email",
    label: "Email address",
    placeholder: "Enter your email address here...",
    required: true,
    type: "email",
  },
  {
    id: "firstName",
    label: "First name",
    placeholder: "Enter your first name here...",
    required: false,
    type: "text",
  },
  {
    id: "lastName",
    label: "Last name",
    placeholder: "Enter your last name here...",
    required: false,
    type: "text",
  },
  {
    id: "phone",
    label: "Phone number",
    placeholder: "Enter your phone number here...",
    required: false,
    type: "tel",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "At least 8 characters",
    required: true,
    type: "password",
  },
];

export const RegisterSection = (): JSX.Element => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const registerMutation = useRegister();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      await registerMutation.mutateAsync({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        phone: formData.phone || undefined,
      });
      
      toast({
        title: "Account created successfully",
        description: "Welcome to Credify Store!",
      });
      
      setLocation('/profile'); // Redirect to profile page
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.');
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="items-center justify-center gap-4 md:gap-16 px-4 md:px-0 py-8 md:py-16 self-stretch w-full flex-[0_0_auto] [background:url(../figmaAssets/login.png)_50%_50%_/_cover] relative flex">
      {/* Left decorative image - hidden on mobile */}
      <div className="hidden md:block relative w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-3xl shadow-[0px_2px_2px_#000000] [background:url(../figmaAssets/frame-29.png)_50%_50%_/_cover]" />

      {/* Divider - hidden on mobile */}
      <div className="hidden md:block relative w-[5px] h-[300px] md:h-[381px] bg-[#d82b4a]" />

      {/* Registration Form Card */}
      <Card className="h-auto md:h-[768px] w-full max-w-[520px] md:w-auto px-4 md:px-16 py-8 md:py-0 bg-white rounded-xl border border-solid border-[#1e1e1e] shadow-[0px_2px_2px_#00000099]">
        <CardContent className="flex items-center gap-2.5 h-full p-0">
          <div className="flex-col w-full md:w-[388px] items-start gap-6 md:gap-8 relative flex">
            {/* Header */}
            <header className="flex flex-col w-full md:w-[388px] items-start gap-3 relative flex-[0_0_auto]">
              <h1 className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-semibold text-black text-lg md:text-xl tracking-[0.20px] leading-8">
                Register Now!
              </h1>

              <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] bg-[#cccccc]">
                <div className="relative w-[100px] h-[3px] bg-[#d80027]" />
              </div>
            </header>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="flex flex-col items-end justify-center gap-4 md:gap-6 relative self-stretch w-full flex-[0_0_auto]">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 w-full p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {formFields.map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col items-start gap-3 md:gap-4 relative self-stretch w-full flex-[0_0_auto]"
                >
                  <Label
                    htmlFor={field.id}
                    className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-normal text-sm md:text-base tracking-[0.16px] leading-4 whitespace-nowrap"
                  >
                    <span className="text-black tracking-[0.03px]">
                      {field.label}{" "}
                    </span>
                    {field.required && (
                      <span className="text-[#ea4335] tracking-[0.03px]">
                        *
                      </span>
                    )}
                  </Label>

                  <div className="relative self-stretch w-full h-10 md:h-12">
                    <Input
                      id={field.id}
                      type={field.id === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      required={field.required}
                      placeholder={field.placeholder}
                      className={`w-full h-full bg-[#eeeeee] rounded-xl border border-solid text-[#4e4e4e] [font-family:'Roboto',Helvetica] font-normal text-sm md:text-base tracking-[0.16px] leading-4 px-3 md:px-[15px] py-2 md:py-[15px] placeholder:text-[#4e4e4e] ${field.id === 'password' ? 'pr-12' : ''}`}
                    />
                    {field.id === 'password' && (
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
                    )}
                  </div>
                </div>
              ))}

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="flex items-center justify-around gap-2.5 px-0 py-3 md:py-4 relative self-stretch w-full flex-[0_0_auto] bg-[#d80027] rounded-xl h-auto hover:bg-[#c00024] disabled:opacity-50"
              >
                <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-white text-lg md:text-xl text-center tracking-[0.20px] leading-5 whitespace-nowrap">
                  {registerMutation.isPending ? 'Creating Account...' : 'Sign Up'}
                </span>
              </Button>
              
              {/* Sign In Link */}
              <div className="flex items-center justify-center mt-4 w-full">
                <span className="text-gray-600 mr-2 text-sm md:text-base">Already have an account?</span>
                <Link href="/login">
                  <Button variant="link" className="p-0 h-auto text-[#d80027] hover:text-[#c00024] text-sm md:text-base">
                    Sign In
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
