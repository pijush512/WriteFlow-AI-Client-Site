"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// ডামি ডাটা (বাস্তব ক্ষেত্রে এটি API থেকে আসবে)
const data = [
  { name: 'Mon', users: 400, documents: 240 },
  { name: 'Tue', users: 300, documents: 139 },
  { name: 'Wed', users: 200, documents: 980 },
  { name: 'Thu', users: 278, documents: 390 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Admin Analytics</h1>

      {/* স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '10,234' },
          { label: 'Documents', value: '542,000' },
          { label: 'AI Calls Today', value: '1,205' },
          { label: 'Monthly Revenue', value: '$4,500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-gray-500 text-sm">{stat.label}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* চার্ট সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-4">Daily AI Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="documents" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-4">User Signups</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}