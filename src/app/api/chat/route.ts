import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        let lead = await prisma.lead.findFirst({
            orderBy: { createdAt: 'desc' },
            where: { name: "New Lead" }
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

        // Detect and Save Email/Phone
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

        const emailMatch = message.match(emailRegex);
        const phoneMatch = message.match(phoneRegex);

        if (emailMatch || phoneMatch) {
            await prisma.lead.update({
                where: { id: lead.id },
                data: {
                    ...(emailMatch && { email: emailMatch[0] }),
                    ...(phoneMatch && { phone: phoneMatch[0] }),
                    score: { increment: 5 }
                }
            });
        }

        // Generate Reply
        let reply = "I'm not sure how to help with that yet, but a human agent will be with you shortly.";
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes("hi") || lowerMsg.includes("hello")) {
            reply = "Hello! I'm your AI assistant. Are you looking to buy or sell a property today? Please leave your phone or email so we can reach out!";
        } else if (lowerMsg.includes("buy")) {
            reply = "Great! We have some amazing properties available. What is your budget range? Please share your phone/email if you'd like a curated list.";
            await prisma.lead.update({
                where: { id: lead.id },
                data: { interest: "Buying", status: "FOLLOW UP", score: { increment: 10 } }
            });
        } else if (lowerMsg.includes("sell")) {
            reply = "I can help with that. Where is the property located? Also, share your contact details for a free valuation.";
            await prisma.lead.update({
                where: { id: lead.id },
                data: { interest: "Selling", status: "FOLLOW UP", score: { increment: 10 } }
            });
        } else if (emailMatch || phoneMatch) {
            reply = "Thank you for sharing your contact details! I've noted them down and an expert will contact you shortly. Is there anything specific about the property you'd like to discuss?";
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
        console.error("CHAT ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
