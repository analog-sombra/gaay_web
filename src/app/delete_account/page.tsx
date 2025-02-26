"use client";

import type React from "react";

import { useState } from "react";
import { Alert, Button, Input } from "antd";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { AlertCircle } from "lucide-react"

export default function DeleteAccountPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
//   const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!mobileNumber.match(/^\+?[1-9]\d{1,14}$/)) {
      setError("Please enter a valid mobile number");
      return;
    }

    // Here you would typically call a server action to handle the account deletion
    // For demonstration, we'll just log and redirect
    // console.log("Account deletion requested for mobile:", mobileNumber);
    // router.push("/account/deleted"); // Redirect to a confirmation page
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-background border border-border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Delete Account</h1>

      <Alert
        message="Warning: This action cannot be undone."
        type="warning"
        showIcon
        closable
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <Input
            id="mobileNumber"
            type="tel"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
        <Button
          color="red"
          type="primary"
          className="w-full"
          onClick={handleSubmit}
        >
          Delete My Account
        </Button>
      </div>
    </div>
  );
}
