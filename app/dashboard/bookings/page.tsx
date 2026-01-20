"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
    Clock, CheckCircle2, User, CalendarDays,
    Video, MessageSquare, AlertCircle,
    ArrowRight, History, Zap, ShieldCheck,
    Check
} from "lucide-react";
import { MOCK_USERS, MOCK_BOOKINGS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function UserBookingsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [topic, setTopic] = useState("");
    const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

    const user = MOCK_USERS[0];
    const userBookings = MOCK_BOOKINGS.filter(b => b.userId === user.id);
    const [slotsRemaining, setSlotsRemaining] = useState(5 - userBookings.length);

    const handleBookSlot = () => {
        if (!date || !selectedTime || !topic) {
            toast.error("Please select a date, time and topic.");
            return;
        }

        if (slotsRemaining <= 0) {
            toast.error("You have no expert slots remaining.");
            return;
        }

        setSlotsRemaining(prev => prev - 1);
        toast.success(`Session Request Sent! Topic: ${topic} on ${date.toLocaleDateString()}`);
        setSelectedTime("");
        setTopic("");
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-zinc-200 shadow-sm mx-1">
                <div className="space-y-1">
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                        Expert <span className="text-amber-500">Consultation</span>
                    </h2>
                    <p className="text-zinc-500 text-sm font-medium">Book your 1:1 strategy session with Manish.</p>
                </div>
                <div className="flex items-center gap-4 bg-amber-50 px-5 py-3 md:px-6 md:py-4 rounded-2xl md:rounded-3xl border border-amber-100 w-full md:w-auto">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-[9px] md:text-[10px] font-black uppercase text-amber-600 tracking-widest">Available Slots</p>
                        <p className="text-xl md:text-2xl font-black text-zinc-900">{slotsRemaining} <span className="text-xs md:text-sm font-bold text-zinc-400">/ 5 Left</span></p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Booking Form Card */}
                <Card className="rounded-[2rem] md:rounded-[3rem] border-zinc-200 shadow-sm overflow-hidden lg:col-span-2">
                    <CardHeader className="bg-zinc-50/50 p-6 md:p-8 border-b border-zinc-50">
                        <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-indigo-500" />
                            Schedule New Session
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col xl:flex-row gap-8 md:gap-10">
                            {/* Calendar */}
                            <div className="space-y-3 md:space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">1. Choose Date</label>
                                <div className="border border-zinc-100 rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 bg-zinc-50/50 flex justify-center shadow-inner">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        className="bg-white rounded-[1.2rem] md:rounded-[1.5rem] border-none shadow-sm"
                                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                                    />
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex-1 space-y-6 md:space-y-8">
                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">2. Select Topic</label>
                                    <Select onValueChange={setTopic} value={topic}>
                                        <SelectTrigger className="w-full bg-zinc-50 border-zinc-100 text-zinc-900 h-12 md:h-14 rounded-2xl font-bold px-4 focus:ring-amber-500 transition-all text-sm">
                                            <SelectValue placeholder="What do you want to discuss?" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white rounded-2xl border-zinc-200">
                                            <SelectItem value="strategy">Business Growth Strategy</SelectItem>
                                            <SelectItem value="marketing">Sales & Marketing Funnels</SelectItem>
                                            <SelectItem value="operations">Operational Efficiency</SelectItem>
                                            <SelectItem value="finance">Finance & Cashflow</SelectItem>
                                            <SelectItem value="tech">Tech Integration</SelectItem>
                                            <SelectItem value="other">General Guidance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">3. Select Time Slot (IST)</label>
                                    <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 md:gap-3">
                                        {timeSlots.map(time => (
                                            <Button
                                                key={time}
                                                variant="ghost"
                                                onClick={() => setSelectedTime(time)}
                                                className={cn(
                                                    "h-10 md:h-12 rounded-xl font-bold text-[10px] md:text-xs transition-all border outline-none",
                                                    selectedTime === time
                                                        ? "bg-amber-500 text-white border-amber-600 shadow-lg shadow-amber-200"
                                                        : "bg-white border-zinc-100 text-zinc-600 hover:bg-zinc-50"
                                                )}
                                            >
                                                <Clock className={cn("h-3 w-3 md:h-3.5 md:w-3.5 mr-1 md:mr-2", selectedTime === time ? "opacity-100" : "opacity-40")} />
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2 md:pt-4">
                                    <Button
                                        className="w-full h-14 md:h-16 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold text-base md:text-lg shadow-xl shadow-zinc-200 transition-all active:scale-[0.98] group"
                                        onClick={handleBookSlot}
                                        disabled={slotsRemaining === 0}
                                    >
                                        Request Session
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 mt-3 md:mt-4 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                        <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                                        Approved for System 52
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Info & History Column */}
                <div className="space-y-6 md:space-y-8">
                    {/* Important Info Card */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] bg-indigo-900 text-white p-6 md:p-8 border-none shadow-2xl shadow-indigo-200/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <Video size={100} />
                        </div>
                        <div className="relative z-10 space-y-5 md:space-y-6">
                            <CardTitle className="text-lg md:text-xl font-black italic">Booking Protocol</CardTitle>
                            <ul className="space-y-3 md:space-y-4">
                                <ProtocolItem text="Available only on Weekdays." />
                                <ProtocolItem text="Max 1 active booking at a time." />
                                <ProtocolItem text="Meeting links on WhatsApp." />
                                <ProtocolItem text="Cancel 12hrs before for credit." />
                            </ul>
                            <div className="pt-2 md:pt-4">
                                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl font-bold h-10 text-xs">
                                    Read All Rules
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Booking History View */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden md:min-h-[400px]">
                        <CardHeader className="p-6 md:p-8 pb-3 md:pb-4">
                            <CardTitle className="text-base md:text-lg font-bold flex items-center justify-between">
                                <span>Recent Sessions</span>
                                <History className="w-4 h-4 text-zinc-400" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-3">
                            {userBookings.length > 0 ? (
                                userBookings.map((booking) => (
                                    <div key={booking.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs font-black text-zinc-400 uppercase tracking-tighter">Topic</p>
                                                <p className="text-sm font-bold text-zinc-900">{booking.topic}</p>
                                            </div>
                                            <Badge className={cn(
                                                "border-none px-2 py-0.5 text-[9px] font-black uppercase tracking-tighter",
                                                booking.status === 'Scheduled' ? "bg-amber-100 text-amber-700" : "bg-zinc-200 text-zinc-600"
                                            )}>
                                                {booking.status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-500">
                                            <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {booking.requestedDate}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.requestedTime}</span>
                                        </div>
                                        {booking.meetingLink && (
                                            <Button size="sm" variant="outline" className="w-full bg-white rounded-xl border-zinc-200 text-indigo-600 font-bold h-9">
                                                Join Zoom Session
                                            </Button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center space-y-4">
                                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto text-zinc-200">
                                        <History size={32} />
                                    </div>
                                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">No Sessions Yet</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Help Support Shortcut */}
            <div className="flex justify-center pt-6">
                <Button variant="ghost" className="text-zinc-400 hover:text-amber-600 font-bold flex items-center gap-2">
                    <MessageSquare size={16} />
                    Need urgent help? Chat with Support
                </Button>
            </div>
        </div>
    );
}

function ProtocolItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-3 text-sm font-bold opacity-80 decoration-indigo-400">
            <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400" />
            </div>
            {text}
        </li>
    );
}
