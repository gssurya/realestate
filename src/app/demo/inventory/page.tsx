"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Home, MapPin, Tag, Plus } from "lucide-react";

type Inventory = {
    id: string;
    title: string;
    price: number;
    location: string;
    status: string;
    createdAt: string;
};

export default function InventoryPage() {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newListing, setNewListing] = useState({ title: "", price: "", location: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchInventory = () => {
        setLoading(true);
        fetch("/api/inventory")
            .then((res) => res.json())
            .then((data) => {
                setInventory(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleAddListing = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/inventory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newListing),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setNewListing({ title: "", price: "", location: "" });
                fetchInventory();
            } else {
                alert("Failed to add listing");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
                    <p className="text-muted-foreground">Manage your property listings and their status.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} />
                    Add Listing
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        Loading inventory...
                    </div>
                ) : inventory.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        No inventory found. Add your first listing!
                    </div>
                ) : (
                    inventory.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
                            <div className="h-48 bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 group relative">
                                <Home size={48} className="group-hover:scale-110 transition-transform" />
                                <div className="absolute top-2 right-2">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "AVAILABLE" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl truncate">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin size={16} />
                                    {item.location}
                                </div>
                                <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                                    {formatPrice(item.price)}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Simple Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <CardHeader>
                            <CardTitle>Add New Listing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddListing} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Property Title</label>
                                    <input
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        placeholder="e.g. Modern Sunset Penthouse"
                                        value={newListing.title}
                                        onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Location</label>
                                    <input
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        placeholder="e.g. Miami, FL"
                                        value={newListing.location}
                                        onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Price (USD)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                        placeholder="e.g. 750000"
                                        value={newListing.price}
                                        onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-2 border rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Adding..." : "Add Listing"}
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
