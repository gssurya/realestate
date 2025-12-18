import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let inventory = await prisma.inventory.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Add some dummy data if empty
        if (inventory.length === 0) {
            await prisma.inventory.createMany({
                data: [
                    { title: "Modern Apartment", price: 500000, location: "New York", status: "AVAILABLE" },
                    { title: "Luxury Villa", price: 2500000, location: "Los Angeles", status: "PENDING" },
                    { title: "Cozy Cottage", price: 350000, location: "Seattle", status: "AVAILABLE" },
                ]
            });
            inventory = await prisma.inventory.findMany({
                orderBy: { createdAt: "desc" },
            });
        }

        return NextResponse.json(inventory);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, price, location } = await req.json();

        if (!title || !price || !location) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newListing = await prisma.inventory.create({
            data: {
                title,
                price: parseFloat(price),
                location,
                status: "AVAILABLE"
            }
        });

        return NextResponse.json(newListing);
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
    }
}
