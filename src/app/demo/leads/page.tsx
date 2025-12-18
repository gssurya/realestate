"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Mail, Trash2, Phone, MessageCircle } from "lucide-react";

type Lead = {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
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
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Contact</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Interest</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Score</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Action</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="p-4 text-center">Loading leads...</td>
                                    </tr>
                                ) : leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-4 text-center">No leads found. Start a chat in the Simulator!</td>
                                    </tr>
                                ) : (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle font-medium">{lead.id.slice(-4)}</td>
                                            <td className="p-4 align-middle">
                                                <div className="font-medium">{lead.name}</div>
                                                <div className="text-[10px] uppercase text-muted-foreground font-semibold">{lead.platform}</div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="text-xs space-y-0.5">
                                                    {lead.email && <div className="text-blue-600 font-medium">{lead.email}</div>}
                                                    {lead.phone && <div className="text-slate-600">{lead.phone}</div>}
                                                    {!lead.email && !lead.phone && <div className="text-slate-400 italic font-light text-[10px]">Awaiting info...</div>}
                                                </div>
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
                                            <td className="p-4 align-middle text-left">{lead.score}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-1 text-slate-500">
                                                    <button title="Call" disabled={!lead.phone} className="p-2 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors disabled:opacity-20">
                                                        <Phone size={16} />
                                                    </button>
                                                    <button title="Email" disabled={!lead.email} className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors disabled:opacity-20">
                                                        <Mail size={16} />
                                                    </button>
                                                    <button title="WhatsApp" disabled={!lead.phone} className="p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors disabled:opacity-20">
                                                        <MessageCircle size={16} />
                                                    </button>
                                                    <div className="w-px h-4 bg-slate-200 mx-1" />
                                                    <button title="Delete Lead" className="p-2 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
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
