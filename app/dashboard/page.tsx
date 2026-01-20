"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    CheckCircle2, Lock, PlayCircle, Star,
    Trophy, Calendar, Clock, MessageSquare,
    TrendingUp, AlertCircle, ExternalLink,
    ChevronRight, ArrowUpRight, BarChart3,
    Smartphone, Zap, Download, Users,
    Clock3
} from "lucide-react";
import { MOCK_WEEKS, MOCK_USERS, MOCK_BOOKINGS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Assuming User 1 is logged in
const USER = MOCK_USERS[0];

export default function UserScoreboard() {
    const [searchTerm, setSearchTerm] = useState("");

    // Stats Calculations
    const progressPercentage = Math.round((USER.tasksCompleted / USER.totalTasks) * 100);
    const weeksRemaining = USER.totalTasks - USER.tasksCompleted;
    const userBookings = MOCK_BOOKINGS.filter(b => b.userId === USER.id);
    const slotsUsed = userBookings.length;

    // Filtered weeks based on search
    const filteredWeeks = useMemo(() => {
        return MOCK_WEEKS.filter(w =>
            w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            `Week ${w.id}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* 1. Header and Welcome Section */}
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between px-1">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900 leading-tight">
                        Hello, <span className="text-amber-500">{USER.name.split(' ')[0]}</span>!
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        Explore your System 52 journey.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Button asChild className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-lg shadow-emerald-100 font-bold border-none transition-all active:scale-95 text-xs h-11 px-4">
                        <a href={`https://wa.me/919876543210?text=Help%20needed%20on%20Week%20${USER.tasksCompleted + 1}`} target="_blank" rel="noopener noreferrer">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Support
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 sm:flex-none border-zinc-200 text-zinc-600 font-bold rounded-2xl hover:bg-zinc-50 transition-all active:scale-95 text-xs h-11 px-4">
                        <Link href="/dashboard/bookings">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Slot
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Overall Progress"
                    value={`${progressPercentage}%`}
                    subtext={`${USER.tasksCompleted}/${USER.totalTasks} Weeks Done`}
                    icon={Trophy}
                    color="text-amber-500 bg-amber-50"
                    progress={progressPercentage}
                />
                <StatCard
                    label="Weeks Remaining"
                    value={weeksRemaining.toString()}
                    subtext="Days to transform your business"
                    icon={Clock}
                    color="text-indigo-500 bg-indigo-50"
                />
                <StatCard
                    label="Last Activity"
                    value="Week 5"
                    subtext="Marked as done on Jan 18"
                    icon={TrendingUp}
                    color="text-emerald-500 bg-emerald-50"
                />
                <StatCard
                    label="Expert Slots"
                    value={`${slotsUsed}/5`}
                    subtext="Personalized sessions used"
                    icon={Users}
                    color="text-rose-500 bg-rose-50"
                    action={<Link href="/dashboard/bookings" className="text-[10px] font-black uppercase text-rose-600 hover:underline">Book New</Link>}
                />
            </div>

            {/* 2. Progress Grid / Scoreboard */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-zinc-200 shadow-sm overflow-hidden p-5 md:p-10 space-y-6 md:space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <h2 className="text-xl md:text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
                            The Scoreboard
                            <div className="flex gap-1 h-3 items-end">
                                <div className="w-1 bg-amber-500 h-2 rounded-full" />
                                <div className="w-1 bg-amber-500 h-3 rounded-full" />
                                <div className="w-1 bg-amber-500 h-1 rounded-full" />
                            </div>
                        </h2>
                        <p className="text-zinc-500 text-xs md:text-sm font-medium">Click on any week to see its SOPs and videos.</p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search by topic..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 h-10 bg-zinc-50 border-zinc-100 rounded-xl text-xs focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-4">
                    {filteredWeeks.map((week) => (
                        <WeekBox key={week.id} week={week} />
                    ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 md:gap-6 pt-6 border-t border-zinc-50">
                    <LegendItem color="bg-emerald-500" label="Done" />
                    <LegendItem color="bg-amber-500" label="Current" />
                    <LegendItem color="bg-zinc-200" label="Pending" />
                    <LegendItem color="bg-zinc-100 opacity-50" label="Locked" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* 4. Simple Reports & Analytics */}
                <Card className="rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-zinc-50/50 border-b border-zinc-50">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-indigo-600" />
                            Program Insights
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-sm font-bold text-zinc-700">Completion Status</span>
                                <span className="text-sm font-black text-indigo-600">{progressPercentage}% Total Done</span>
                            </div>
                            <div className="h-10 w-full bg-zinc-100 rounded-2xl overflow-hidden flex p-1">
                                <div className="h-full bg-emerald-500 rounded-xl shadow-sm" style={{ width: `${progressPercentage}%` }} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-zinc-50 rounded-3xl border border-zinc-100">
                                <p className="text-[10px] font-bold text-zinc-400 mb-1">Milestone</p>
                                <p className="text-sm font-black text-zinc-900">10 Weeks Badge</p>
                                <p className="text-[10px] text-zinc-500 font-bold mt-1">Unlock in 5 weeks</p>
                            </div>
                            <div className="p-4 bg-zinc-50 rounded-3xl border border-zinc-100">
                                <p className="text-[10px] font-bold text-zinc-400 mb-1">Consistency</p>
                                <p className="text-sm font-black text-zinc-900">4 Week Streak</p>
                                <p className="text-[10px] text-emerald-600 font-bold mt-1">Increasing velocity!</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Support & Expert Booking Quick View */}
                <Card className="rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <Users size={120} />
                    </div>
                    <CardHeader className="bg-zinc-50/50 border-b border-zinc-50">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Clock3 className="w-5 h-5 text-amber-600" />
                            Upcoming Expert Session
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                        {userBookings.length > 0 ? (
                            <div className="space-y-4 w-full">
                                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4 text-left">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-zinc-900">{userBookings[0].topic}</p>
                                        <p className="text-xs text-zinc-500 font-medium">{userBookings[0].requestedDate} at {userBookings[0].requestedTime}</p>
                                    </div>
                                    <Badge className="ml-auto bg-amber-500">{userBookings[0].status}</Badge>
                                </div>
                                <Button asChild variant="outline" className="w-full h-12 rounded-xl border-zinc-200">
                                    <Link href="/dashboard/bookings">Manage All My Sessions</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <AlertCircle className="w-10 h-10 text-zinc-200 mx-auto" />
                                <p className="text-sm text-zinc-500 font-medium">No sessions scheduled yet. Get personal help to grow faster.</p>
                                <Button asChild className="bg-zinc-900 text-white rounded-2xl h-11 px-8 shadow-xl">
                                    <Link href="/dashboard/bookings">Book Expert Now</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Motivation */}
            <div className="text-center bg-zinc-900 p-10 rounded-[3rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-amber-500 rounded-full" />
                <h3 className="text-2xl font-black italic tracking-tight">"One Card a Week to Transform Your Business!"</h3>
                <p className="text-zinc-400 text-sm font-medium">Keep going, the finish line is closer than you think. Manish & Team are with you.</p>
            </div>
        </div>
    );
}

function StatCard({ label, value, subtext, icon: Icon, color, progress, action }: any) {
    return (
        <Card className="rounded-[2rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden p-5 md:p-6 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className={cn("p-2.5 rounded-2xl", color)}>
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </div>
                {action}
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-400">{label}</p>
                <h4 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tighter">{value}</h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-tight">{subtext}</p>
            </div>
            {progress !== undefined && (
                <div className="mt-4 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
            )}
        </Card>
    );
}

function WeekBox({ week }: { week: any }) {
    let statusClasses = "";
    let icon = null;

    if (week.isCompleted) {
        statusClasses = "bg-emerald-500 text-white border-emerald-600 shadow-lg shadow-emerald-100";
        icon = <CheckCircle2 size={16} />;
    } else if (!week.isLocked) {
        statusClasses = "bg-amber-500 text-white border-amber-600 shadow-lg shadow-amber-200 animate-in zoom-in-95";
        icon = <PlayCircle size={16} />;
    } else {
        statusClasses = "bg-zinc-100 text-zinc-400 border-zinc-200 opacity-50";
        icon = <Lock size={16} />;
    }

    return (
        <Link
            href={!week.isLocked ? `/dashboard/week/${week.id}` : "#"}
            className={cn(
                "group relative transition-all duration-300 transform",
                week.isLocked ? "cursor-not-allowed" : "hover:-translate-y-1 focus:scale-95"
            )}
        >
            <div className={cn(
                "h-24 rounded-2xl md:rounded-3xl border-2 flex flex-col items-center justify-center gap-2 p-2 text-center transition-all",
                statusClasses
            )}>
                <span className="text-[10px] font-bold opacity-80">Week</span>
                <span className="text-xl md:text-2xl font-black leading-none">{week.id}</span>
                <div className="transition-transform group-hover:scale-110 duration-300">
                    {icon}
                </div>
            </div>

            {/* Tooltip-like Card Name on Hover */}
            {!week.isLocked && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 w-max max-w-[120px] bg-zinc-900 text-white text-[10px] font-bold p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {week.title}
                </div>
            )}
        </Link>
    );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", color)} />
            <span className="text-[10px] font-bold text-zinc-500">{label}</span>
        </div>
    );
}
