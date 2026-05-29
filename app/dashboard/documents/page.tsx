"use client";

import { useState } from "react";

export default function MyDocuments() {
  // ডামি ডাটা - পরবর্তীতে এখানে আপনার ডাটাবেস থেকে ডাটা আসবে
  const [documents] = useState([
    { id: 1, title: "AI Blog Post", status: "Published", date: "2026-05-28" },
    { id: 2, title: "Social Media Caption", status: "Draft", date: "2026-05-27" },
    { id: 3, title: "Email Newsletter", status: "Archived", date: "2026-05-25" },
  ]);

  return (
    <div className="p-8">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + New Document
        </button>
      </div>

      {/* ডকুমেন্ট টেবিল */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">{doc.title}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.status === 'Published' ? 'bg-green-100 text-green-700' : 
                    doc.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {doc.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{doc.date}</td>
                <td className="p-4 text-blue-600 font-medium hover:underline cursor-pointer">
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}