import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <aside><Sidebar></Sidebar></aside>
      <main>{children}</main> {/* এই {children} থাকা বাধ্যতামূলক */}
    </div>
  );
}