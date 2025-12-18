"use client";
import { BarChart, TrendingUp, Users, Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function InsightsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Market Insights</h2>
                <p className="text-muted-foreground">AI-driven analytics and market predictions.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Market Temperature</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Hot</div>
                        <p className="text-xs text-muted-foreground">+2.4% avg price increase</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Buyer Sentiment</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Resilient</div>
                        <p className="text-xs text-muted-foreground">High demand for suburbs</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Demand Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                        Chart showing predicted demand for next 6 months
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
