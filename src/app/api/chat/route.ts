import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // In a real app, we'd have a session ID or user ID. 
        // For this demo, we'll assume a single active "New Lead" or find strict match.
        // Let's simplified: Always attach to the most recent "New Lead" or create one.

        let lead = await prisma.lead.findFirst({
            orderBy: { createdAt: 'desc' },
            where: { name: "New Lead" } // simplified session tracking
        });

        if (!lead) {
            lead = await prisma.lead.create({
                data: {
                    name: "New Lead",
                    platform: "Simulator",
                    status: "NEW",
                    interest: "General Inquiry"
                }
            });
        }

        // Save User Message
        await prisma.message.create({
            data: {
                content: message,
                sender: "user",
                leadId: lead.id
            }
        });

        // Generate Reply
        // Mock Logic
        let reply = "I'm not sure how to help with that yet, but a human agent will be with you shortly.";
        if (message.toLowerCase().includes("hi") || message.toLowerCase().includes("hello")) {
            reply = "Hello! I'm your AI assistant. Are you looking to buy or sell a property today?";
        } else if (message.toLowerCase().includes("buy")) {
            reply = "Great! We have some amazing properties available. What is your budget range?";
            // Update interest
            await prisma.lead.update({
                where: { id: lead.id },
                data: { interest: "Buying", status: "FOLLOW UP", score: { increment: 10 } }
            });
        } else if (message.toLowerCase().includes("sell")) {
            reply = "I can help with that. Where is the property located?";
            await prisma.lead.update({
                where: { id: lead.id },
                data: { interest: "Selling", status: "FOLLOW UP", score: { increment: 10 } }
            });
        }

        // Save AI Message
        await prisma.message.create({
            data: {
                content: reply,
                sender: "ai",
                leadId: lead.id
            }
        });

        return NextResponse.json({ reply });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
