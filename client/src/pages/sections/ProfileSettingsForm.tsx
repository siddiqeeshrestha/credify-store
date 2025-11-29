import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { ProfileAvatarUpload } from "@/components/ProfileAvatarUpload";

export const ProfileSettingsForm = (): JSX.Element => {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const updateProfileMutation = useUpdateProfile();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatar: ''
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (avatarUrl: string) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync(formData);
      await refreshUser(); // Refresh user data to show updated info
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="flex flex-col items-center gap-8 pt-8 pb-16 px-4 relative self-stretch w-full flex-[0_0_auto] bg-white">
      <div className="flex flex-col w-full max-w-[800px] items-center gap-8 relative flex-[0_0_auto]">
        <div className="flex flex-col items-center gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-[#191a23] text-2xl tracking-[0] leading-[28px] whitespace-nowrap">
            Profile Settings
          </h2>
          <p className="relative flex items-center justify-center self-stretch [font-family:'Roboto',Helvetica] font-medium text-[#7f7f7f] text-base text-center tracking-[0] leading-6">
            Update your personal information below
          </p>
        </div>

        {/* Profile Avatar Section */}
        <div className="flex flex-col items-center gap-4 relative w-full">
          <h3 className="[font-family:'Roboto',Helvetica] font-semibold text-[#191a23] text-lg tracking-[0] leading-6">
            Profile Picture
          </h3>
          <ProfileAvatarUpload
            currentAvatar={formData.avatar}
            onAvatarChange={handleAvatarChange}
            size="lg"
          />
        </div>

        <Card className="flex flex-col w-full items-start gap-6 p-8 relative bg-white rounded-lg shadow-[0px_2px_2px_#00000099] border border-solid border-[#d8d9e0]">
          <CardContent className="flex flex-col items-start gap-6 p-0 relative self-stretch w-full flex-[0_0_auto]">
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col items-start gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                    <Label htmlFor="firstName" className="text-sm font-medium text-[#191a23]">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="relative self-stretch w-full flex-[0_0_auto] h-12 px-4 py-3 bg-white rounded-lg border border-solid border-[#d8d9e0] [font-family:'Roboto',Helvetica] font-normal text-[#191a23] text-base tracking-[0] leading-6"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div className="flex flex-col items-start gap-2 relative flex-[0_0_auto]">
                    <Label htmlFor="lastName" className="text-sm font-medium text-[#191a23]">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="relative self-stretch w-full flex-[0_0_auto] h-12 px-4 py-3 bg-white rounded-lg border border-solid border-[#d8d9e0] [font-family:'Roboto',Helvetica] font-normal text-[#191a23] text-base tracking-[0] leading-6"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Avatar Upload Section */}
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <Label className="text-sm font-medium text-[#191a23]">
                    Profile Picture
                  </Label>
                  <ProfileAvatarUpload
                    currentAvatar={formData.avatar}
                    onAvatarChange={handleAvatarChange}
                  />
                </div>

                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <Label htmlFor="email" className="text-sm font-medium text-[#191a23]">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="relative self-stretch w-full flex-[0_0_auto] h-12 px-4 py-3 bg-white rounded-lg border border-solid border-[#d8d9e0] [font-family:'Roboto',Helvetica] font-normal text-[#191a23] text-base tracking-[0] leading-6"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <Label htmlFor="phone" className="text-sm font-medium text-[#191a23]">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="relative self-stretch w-full flex-[0_0_auto] h-12 px-4 py-3 bg-white rounded-lg border border-solid border-[#d8d9e0] [font-family:'Roboto',Helvetica] font-normal text-[#191a23] text-base tracking-[0] leading-6"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <Button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="flex px-8 py-3 bg-[#98042d] rounded-lg items-center justify-center gap-2 relative hover:bg-[#98042d]/90 h-auto disabled:opacity-50"
                >
                  <span className="relative w-fit [font-family:'Roboto',Helvetica] font-bold text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                    {updateProfileMutation.isPending ? 'Updating...' : 'Update Profile'}
                  </span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};