"use client";

import { useState } from "react";

export default function MyProfile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "User",
  });

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
        {/* প্রোফাইল পিকচার সেকশন */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
            {profile.name.charAt(0)}
          </div>
          <button className="text-blue-600 font-medium hover:underline">Change Photo</button>
        </div>

        {/* ইনপুট ফিল্ড */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              defaultValue={profile.name}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              defaultValue={profile.email}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>

      {/* সিকিউরিটি সেকশন */}
      <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-lg font-bold mb-4">Security</h2>
        <button className="text-red-600 font-medium hover:underline">Change Password</button>
      </div>
    </div>
  );
}
