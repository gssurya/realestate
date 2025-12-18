"use client";
import { Image as ImageIcon, Video, Sparkles, Wand2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MediaStudioPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">AI Media Studio</h2>
                <p className="text-muted-foreground">Generate professional marketing assets using AI.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:border-green-500 transition-all cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ImageIcon className="text-green-600 group-hover:scale-110 transition-transform" /> Virtual Staging</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Upload empty room photos and let AI furnish them based on current trends.</p></CardContent>
                </Card>
                <Card className="hover:border-blue-500 transition-all cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Video className="text-blue-600 group-hover:scale-110 transition-transform" /> AI Video Tours</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Create cinematic video tours from property images with automatic narration.</p></CardContent>
                </Card>
                <Card className="hover:border-purple-500 transition-all cursor-pointer group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="text-purple-600 group-hover:scale-110 transition-transform" /> Magic Enhancement</CardTitle>
                    </CardHeader>
                    <CardContent><p className="text-sm text-muted-foreground">Automatically adjust lighting, remove clutter, and enhance sky in photos.</p></CardContent>
                </Card>
            </div>
        </div>
    );
}
