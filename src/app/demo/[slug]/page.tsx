import { Wrench } from "lucide-react";

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // Simple capitalization
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="bg-slate-100 p-4 rounded-full dark:bg-slate-800">
                <Wrench className="h-10 w-10 text-slate-400" />
            </div>
            <div>
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground">This module is part of the full suite and is under maintenance in this demo.</p>
            </div>
        </div>
    );
}
