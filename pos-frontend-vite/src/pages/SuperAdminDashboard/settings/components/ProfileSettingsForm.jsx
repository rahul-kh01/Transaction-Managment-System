import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiUser, FiSave } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileInput = ({ id, label, value, onChange, disabled }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    {disabled ? (
      <Skeleton className="h-10 w-full" />
    ) : (
      <Input id={id} value={value} onChange={onChange} disabled={disabled} />
    )}
  </div>
);

const ProfileSettingsForm = ({
  profileData,
  onUpdate,
  onFieldChange,
  loading,
}) => {
  console.log("ProfileSettingsForm rendered with data:", profileData);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiUser className="w-5 h-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileInput
            id="fullName"
            label="Full Name"
            value={profileData.fullName}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
            disabled={loading}
          />
          <ProfileInput
            id="email"
            label="Email Address"
            value={profileData.email}
            // onChange={(e) => onFieldChange("email", e.target.value)}
            disabled={false}
            
          />
          <ProfileInput
            id="phone"
            label="Phone Number"
            value={profileData.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            disabled={loading}
          />
        </div>
        <Button
          onClick={onUpdate}
          className="flex items-center gap-2"
          disabled={loading}
        >
          {loading ? "Updating..." : <><FiSave className="w-4 h-4" /> Update Profile</>}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsForm; 