import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(leads);
    } catch (error) {
        console.error("Error fetching leads:", error);
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updatedLead = await prisma.lead.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(updatedLead);
    } catch (error) {
        console.error("Error updating lead:", error);
        return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
    }
}
