import { ManagerSidebar } from "@/components/manager/ManagerSidebar";

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <ManagerSidebar />
            <main className="ml-64 min-h-screen p-8">
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
