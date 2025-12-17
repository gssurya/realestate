"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Lead = {
    id: string;
    name: string;
    platform: string;
    status: string;
    interest: string | null;
    summary: string | null;
    score: number;
    createdAt: string;
};

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/leads")
            .then((res) => res.json())
            .then((data) => {
                setLeads(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Leads Pipeline</h2>
                    <p className="text-muted-foreground">Manage and track your AI-generated leads.</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm">
                    Export CSV
                </button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[100px]">ID</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Platform</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Interest</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-right">Score</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center">Loading leads...</td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center">No leads found. Start a chat in the Simulator!</td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle font-medium">{lead.id.slice(-4)}</td>
                                            <td className="p-4 align-middle">{lead.name}</td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                                                    {lead.platform}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">{lead.interest || "-"}</td>
                                            <td className="p-4 align-middle">
                                                <span className={
                                                    lead.status === "NEW" ? "text-blue-600" :
                                                        lead.status === "FOLLOW UP" ? "text-orange-600" :
                                                            "text-slate-600"
                                                }>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-right">{lead.score}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
