"use client";

import { Calendar as CalendarIcon, Clock, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const appointments = [
    { id: 1, time: "10:00 AM", date: "Today", lead: "John Doe", type: "Property Showing" },
    { id: 2, time: "02:30 PM", date: "Today", lead: "Jane Smith", type: "Initial Consultation" },
    { id: 3, time: "11:00 AM", date: "Tomorrow", lead: "Mike Johnson", type: "Closing Meeting" },
    { id: 4, time: "04:00 PM", date: "Friday", lead: "Sarah Wilson", type: "Valuation" },
];

export default function SchedulePage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
                <p className="text-muted-foreground">Manage your upcoming appointments and showings.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5 text-green-600" />
                            Upcoming Appointments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {appointments.map((apt) => (
                                <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-green-100 rounded-full text-green-700">
                                            <Clock size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{apt.type}</p>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <User size={14} /> {apt.lead}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-green-600">{apt.time}</p>
                                        <p className="text-xs text-muted-foreground">{apt.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
