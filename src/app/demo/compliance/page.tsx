"use client";
import { Shield, FileCheck, AlertCircle, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CompliancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Compliance</h2>
                <p className="text-muted-foreground">Automated legal and regulatory monitoring.</p>
            </div>
            <div className="space-y-4">
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="py-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <FileCheck className="text-green-600" /> All Documents Verified
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Your 12 active listings are fully compliant with local regulations.</p>
                    </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Fair Housing Audit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">PASSED</div>
                            <p className="text-xs text-muted-foreground">Last checked 2 hours ago</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Data Privacy Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">SECURE</div>
                            <p className="text-xs text-muted-foreground">GDPR & CCPA Compliant</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
