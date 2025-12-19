"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Mail, Trash2, Phone, MessageCircle, Check, X } from "lucide-react";

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
    const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
    const [pendingStatus, setPendingStatus] = useState<string>("");
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = () => {
        setLoading(true);
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
    };

    const handleStatusUpdate = async (id: string) => {
        setUpdatingStatus(id);
        try {
            const res = await fetch("/api/leads", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: pendingStatus }),
            });

            if (res.ok) {
                setLeads(leads.map(l => l.id === id ? { ...l, status: pendingStatus } : l));
                setEditingLeadId(null);
            } else {
                console.error("Failed to update status");
            }
        } catch (err) {
            console.error("Error updating status:", err);
        } finally {
            setUpdatingStatus(null);
        }
    };

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
                                                {editingLeadId === lead.id ? (
                                                    <div className="flex items-center gap-1">
                                                        <select
                                                            value={pendingStatus}
                                                            onChange={(e) => setPendingStatus(e.target.value)}
                                                            className="text-xs border rounded p-1"
                                                            disabled={updatingStatus === lead.id}
                                                        >
                                                            <option value="NEW">NEW</option>
                                                            <option value="FOLLOW UP">FOLLOW UP</option>
                                                            <option value="CLOSED">CLOSED</option>
                                                            <option value="STOP AI">STOP AI</option>
                                                        </select>
                                                        <button
                                                            onClick={() => handleStatusUpdate(lead.id)}
                                                            disabled={updatingStatus === lead.id}
                                                            className="text-green-600 hover:bg-green-50 p-1 rounded transition-colors"
                                                        >
                                                            <Check size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingLeadId(null)}
                                                            disabled={updatingStatus === lead.id}
                                                            className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span
                                                        onClick={() => {
                                                            setEditingLeadId(lead.id);
                                                            setPendingStatus(lead.status);
                                                        }}
                                                        className={`cursor-pointer transition-colors px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${lead.status === "NEW" ? "bg-blue-50 text-blue-600 hover:bg-blue-100" :
                                                                lead.status === "FOLLOW UP" ? "bg-orange-50 text-orange-600 hover:bg-orange-100" :
                                                                    lead.status === "STOP AI" ? "bg-red-50 text-red-600 hover:bg-red-100" :
                                                                        "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                                            }`}
                                                    >
                                                        {lead.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 align-middle text-left">{lead.score}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-1 text-slate-500">
                                                    <a
                                                        href={lead.phone ? `tel:${lead.phone}` : undefined}
                                                        title="Call"
                                                        className={`p-2 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors ${!lead.phone ? 'opacity-20 pointer-events-none' : ''}`}
                                                    >
                                                        <Phone size={16} />
                                                    </a>
                                                    <a
                                                        href={lead.email ? `mailto:${lead.email}` : undefined}
                                                        title="Email"
                                                        className={`p-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors ${!lead.email ? 'opacity-20 pointer-events-none' : ''}`}
                                                    >
                                                        <Mail size={16} />
                                                    </a>
                                                    <a
                                                        href={lead.phone ? `https://wa.me/${lead.phone.replace(/\D/g, '')}` : undefined}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="WhatsApp"
                                                        className={`p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-md transition-colors ${!lead.phone ? 'opacity-20 pointer-events-none' : ''}`}
                                                    >
                                                        <MessageCircle size={16} />
                                                    </a>
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
