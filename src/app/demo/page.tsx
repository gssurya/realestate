import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, LayoutDashboard, Activity, MessageSquare } from "lucide-react";
// Would accept "overview" data here eventually

export default function OverviewPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your AI Broker performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Leads"
                    value="1,284"
                    icon={Users}
                    trend="+12% from last month"
                />
                <StatsCard
                    title="Site Visits"
                    value="342"
                    icon={LayoutDashboard}
                    trend="+4% from last month"
                />
                <StatsCard
                    title="Active Inventory"
                    value="89"
                    icon={Activity}
                    trend="+2 new listings"
                />
                <StatsCard
                    title="AI Conversations"
                    value="573"
                    icon={MessageSquare}
                    trend="+201 today"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-col space-y-1.5">
                        <h3 className="font-semibold leading-none tracking-tight">Pipeline Activity</h3>
                        <p className="text-sm text-muted-foreground">Lead generation over time.</p>
                    </div>
                    <div className="p-6 pt-0 pl-2">
                        <div className="h-[200px] flex items-center justify-center text-slate-400 text-sm">
                            [Activity Graph Placeholder]
                        </div>
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-col space-y-1.5">
                        <h3 className="font-semibold leading-none tracking-tight">Gatekeeper Logs</h3>
                        <p className="text-sm text-muted-foreground">Recent AI interactions.</p>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-4 text-sm border-b last:border-0 pb-2 last:pb-0">
                                    <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500" />
                                    <div className="grid gap-1">
                                        <p className="font-medium">Lead #{1000 + i} qualified</p>
                                        <p className="text-xs text-muted-foreground">Just now</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, trend }: any) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{trend}</p>
            </div>
        </div>
    );
}
