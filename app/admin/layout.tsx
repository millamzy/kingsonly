import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <AdminSidebar />
            <main className="ml-64 min-h-screen p-8">
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
