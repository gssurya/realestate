import { Sidebar } from "@/components/Sidebar";

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative">
                <header className="absolute top-0 right-0 p-4 z-10">
                    {/* Top bar actions if needed */}
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
