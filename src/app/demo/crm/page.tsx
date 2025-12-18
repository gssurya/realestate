"use client";

import { Contact, Mail, Phone, MessageSquare, PieChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const campaigns = [
    { id: 1, name: "New Listing Blast", type: "Email", status: "Active", reach: 1250, conversion: "4.2%" },
    { id: 2, name: "Facebook Retargeting", type: "Social", status: "Active", reach: 5800, conversion: "2.1%" },
    { id: 3, name: "Neighborhood Newsletter", type: "Email", status: "Paused", reach: 2100, conversion: "1.8%" },
];

export default function CRMPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">CRM & Campaigns</h2>
                <p className="text-muted-foreground">Monitor and manage your lead generation campaigns.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-500" />
                            Email Campaigns
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-500" />
                            Active Calls
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">Currently 3 in queue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-500" />
                            AI Responses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">892</div>
                        <p className="text-xs text-muted-foreground">98% success rate</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-green-600" />
                        Campaign Performance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-slate-900">
                                <tr>
                                    <th className="p-4 font-medium">Campaign Name</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Reach</th>
                                    <th className="p-4 font-medium text-right">Conversion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((camp) => (
                                    <tr key={camp.id} className="border-b hover:bg-slate-50 transition-colors">
                                        <td className="p-4 font-medium">{camp.name}</td>
                                        <td className="p-4">{camp.type}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${camp.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                                                }`}>
                                                {camp.status}
                                            </span>
                                        </td>
                                        <td className="p-4">{camp.reach.toLocaleString()}</td>
                                        <td className="p-4 text-right font-semibold text-green-600">{camp.conversion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
