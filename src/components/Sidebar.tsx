"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Home,
    Calendar,
    Bot,
    Contact,
    Image as ImageIcon,
    BarChart,
    Shield,
    UserCheck,
    Settings,
    LogOut
} from "lucide-react";

const navigation = [
    { name: "Overview", href: "/demo", icon: LayoutDashboard },
    { name: "Leads Pipeline", href: "/demo/leads", icon: Users },
    { name: "Inventory", href: "/demo/inventory", icon: Home },
    { name: "Schedule", href: "/demo/schedule", icon: Calendar },
    { name: "Bot Simulator", href: "/demo/bot-simulator", icon: Bot },
    { name: "CRM & Campaigns", href: "/demo/crm", icon: Contact },
    { name: "AI Media Studio", href: "/demo/media", icon: ImageIcon },
    { name: "Insights", href: "/demo/insights", icon: BarChart },
    { name: "Compliance", href: "/demo/compliance", icon: Shield },
    { name: "Seller Intel", href: "/demo/seller-intel", icon: UserCheck },
    { name: "Settings", href: "/demo/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white w-64 border-r border-slate-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Guaq AI
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
                    Menu
                </div>
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-green-600/10 text-green-400"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                        YN
                    </div>
                    <div className="text-sm">
                        <div className="font-medium">Your Name</div>
                        <div className="text-xs text-slate-500">Ultimate Plan</div>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm w-full font-medium">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
