import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/contexts/AdminContext";

export const AdminLoginPage = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { adminLogin } = useAdmin();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    setError("");
    
    try {
      await adminLogin(username, password);
      setLocation("/credify-admin/dashboard");
    } catch (error) {
      setError("Invalid credentials. Use admin/admin to login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#98042d] to-[#c00024] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-[#98042d] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <p className="text-sm text-gray-600 text-center">
            Sign in to access the admin panel
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#98042d] hover:bg-[#98042d]/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            
            <div className="text-xs text-center text-gray-500 mt-4">
              Demo credentials: admin / admin
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};