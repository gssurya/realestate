"use client";
import { UserCheck, Search, Database, Fingerprint } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SellerIntelPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Seller Intel</h2>
                <p className="text-muted-foreground">Deep analysis and background intel on potential sellers.</p>
            </div>
            <div className="flex gap-2">
                <input className="flex-1 px-4 py-2 border rounded-md" placeholder="Enter property address or seller name..." />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium">Search Intel</button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Database className="h-5 w-5 text-blue-600" /> Recent Seller Signals
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-3 border rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">123 Maple St, Highland</p>
                                        <p className="text-xs text-muted-foreground">High likelihood of listing in 2 months</p>
                                    </div>
                                    <span className="text-sm font-bold text-orange-600">82% Match</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Fingerprint className="h-5 w-5 text-purple-600" /> AI Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm italic text-muted-foreground">"Market data indicates a cluster of potential sellers in the East Side district due to recent zoning updates."</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
