"use client";

import { Settings, User, Shield, Bell, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account preferences and system configuration.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <User className="h-5 w-5 text-gray-400" />
                            Profile Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <input className="w-full px-3 py-2 border rounded-md" defaultValue="Your Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <input className="w-full px-3 py-2 border rounded-md" defaultValue="you@example.com" />
                            </div>
                        </div>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md font-medium text-sm">
                            Save Changes
                        </button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Shield className="h-5 w-5 text-gray-400" />
                            Security & API Keys
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-slate-50 border rounded-md">
                            <p className="text-sm font-medium mb-2">OpenAI API Key</p>
                            <div className="flex gap-2">
                                <input type="password" readonly className="flex-1 px-3 py-2 border rounded-md bg-white" value="sk-••••••••••••••••" />
                                <button className="px-3 py-2 border rounded-md text-sm">Update</button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                            Subscription Plan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
                            <div>
                                <p className="font-bold text-green-800 text-lg">Ultimate Plan</p>
                                <p className="text-sm text-green-600">Active until Dec 2026</p>
                            </div>
                            <button className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded-md text-sm font-medium">
                                Upgrade Features
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
