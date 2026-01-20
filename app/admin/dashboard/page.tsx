"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Users, Activity, CheckCircle, Package, HelpCircle,
    ArrowRight, MessageSquare, Clock, AlertCircle,
    Truck, Calendar, LayoutDashboard, ChevronRight
} from "lucide-react";
import { MOCK_USERS, MOCK_BOOKINGS, MOCK_HELP_REQUESTS } from "@/lib/mock-data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
    // 1. Core Metrics for Action
    const totalUsers = MOCK_USERS.filter(u => u.role === 'user').length;
    const pendingShipments = MOCK_USERS.filter(u => u.kitStatus === 'Pending');
    const openSupport = MOCK_HELP_REQUESTS.filter(r => r.status === 'Open');
    const pendingExpertSlots = MOCK_BOOKINGS.filter(b => b.status === 'Pending');
    // Using 'Scheduled' instead of 'Confirmed' to match mock-data.ts types if necessary, 
    // but confirmed is a common state. Let's stick to Scheduled for today's active ones.
    const confirmedToday = MOCK_BOOKINGS.filter(b => b.status === 'Scheduled');
    const atRiskMembers = MOCK_USERS.filter(u => u.role === 'user' && u.tasksCompleted < 10);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 mt-4">
            {/* Action Header - Bold Version */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                        Admin <span className="text-amber-500">Dashboard</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">Clear actions and pending tasks for today.</p>
                </div>
                <div className="flex items-center w-full md:w-auto">
                    <Button asChild className="w-full md:w-auto bg-zinc-900 hover:bg-black text-white rounded-2xl h-12 md:h-14 px-8 shadow-xl shadow-zinc-200 transition-all active:scale-95 font-bold">
                        <Link href="/admin/users">
                            <Users className="w-5 h-5 mr-2" /> Add New Member
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Core Action Counters - Vibrant Style */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <ActionCard
                    label="Total Members"
                    value={totalUsers.toString()}
                    icon={Users}
                    gradient="from-amber-500 to-amber-600"
                    subtext="+3 since yesterday"
                />
                <ActionCard
                    label="Kits to Ship"
                    value={pendingShipments.length.toString()}
                    icon={Package}
                    gradient="from-blue-500 to-indigo-600"
                    subtext="Needs Dispatch"
                    href="/admin/logistics"
                />
                <ActionCard
                    label="Slots to Assign"
                    value={pendingExpertSlots.length.toString()}
                    icon={Calendar}
                    gradient="from-emerald-500 to-teal-600"
                    subtext="Strategy Calls"
                    href="/admin/bookings"
                />
                <ActionCard
                    label="Support Tickets"
                    value={openSupport.length.toString()}
                    icon={MessageSquare}
                    gradient="from-rose-500 to-red-600"
                    subtext="Action Required"
                />
            </div>

            {/* Task Management Grid - 3 Columns */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* 1. Fulfillment Queue */}
                <Card className="rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden flex flex-col bg-white">
                    <CardHeader className="p-6 md:p-8 pb-3 md:pb-4 flex flex-row items-center justify-between border-b border-zinc-50">
                        <div className="space-y-1">
                            <CardTitle className="text-xl md:text-2xl font-black text-zinc-900 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-amber-500" />
                                Logistics
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold text-zinc-400">Queue: {pendingShipments.length}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-zinc-400" asChild>
                            <Link href="/admin/logistics"><ChevronRight className="w-4 h-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <div className="divide-y divide-zinc-50">
                            {pendingShipments.slice(0, 3).map(user => (
                                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 font-bold text-xs shrink-0">{user.name.charAt(0)}</div>
                                        <div className="space-y-0 min-w-0">
                                            <p className="font-bold text-zinc-900 text-xs truncate">{user.name}</p>
                                            <p className="text-[10px] text-zinc-400 truncate">{user.mobile}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-amber-100 text-amber-600 bg-amber-50/50 uppercase text-[9px] font-black h-5 shrink-0">Ship</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Expert Session Queue */}
                <Card className="rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden flex flex-col bg-white">
                    <CardHeader className="p-6 md:p-8 pb-3 md:pb-4 flex flex-row items-center justify-between border-b border-zinc-50">
                        <div className="space-y-1">
                            <CardTitle className="text-xl md:text-2xl font-black text-zinc-900 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-indigo-500" />
                                Expert Slots
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold text-zinc-400">Pending: {pendingExpertSlots.length}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-zinc-400" asChild>
                            <Link href="/admin/bookings"><ChevronRight className="w-4 h-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <div className="divide-y divide-zinc-50">
                            {pendingExpertSlots.slice(0, 3).map(booking => (
                                <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xs italic shrink-0">?</div>
                                        <div className="space-y-0 min-w-0 text-start">
                                            <p className="font-bold text-zinc-900 text-xs truncate">{booking.userName}</p>
                                            <p className="text-[10px] text-zinc-400 truncate">{booking.topic}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[9px] font-black text-zinc-900 uppercase">{booking.requestedDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 3. At-Risk Members */}
                <Card className="rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden flex flex-col bg-white">
                    <CardHeader className="p-6 md:p-8 pb-3 md:pb-4 flex flex-row items-center justify-between border-b border-zinc-50">
                        <div className="space-y-1">
                            <CardTitle className="text-xl md:text-2xl font-black text-rose-600 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                At-Risk
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold text-zinc-400">Low Engagement</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-zinc-400" asChild>
                            <Link href="/admin/users"><ChevronRight className="w-4 h-4" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                        <div className="divide-y divide-zinc-50">
                            {atRiskMembers.slice(0, 3).map(user => (
                                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600 font-bold text-xs shrink-0">{user.name.charAt(0)}</div>
                                        <div className="space-y-0 min-w-0">
                                            <p className="font-bold text-zinc-900 text-xs truncate">{user.name}</p>
                                            <p className="text-[10px] text-zinc-400 truncate">{user.tasksCompleted}/52 Weeks</p>
                                        </div>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-emerald-600 hover:bg-emerald-50 rounded-full shrink-0">
                                        <MessageSquare className="w-3 h-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Today's Schedule & Quick Insights */}
            <div className="grid gap-6 lg:grid-cols-3">

                {/* 4. Today's Expert Schedule */}
                <Card className="rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden lg:col-span-2 bg-white">
                    <CardHeader className="p-6 md:p-8 pb-3 md:pb-4 flex flex-row items-center justify-between border-b border-zinc-50">
                        <div className="space-y-1">
                            <CardTitle className="text-xl md:text-2xl font-black text-zinc-900 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-emerald-500" />
                                Today's Schedule
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold text-zinc-400">Confirmed Sessions</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableBody>
                                    {confirmedToday.slice(0, 3).map((session) => (
                                        <TableRow key={session.id} className="hover:bg-zinc-50/50 border-zinc-50">
                                            <TableCell className="py-3 pl-4 md:pl-6 min-w-[100px]">
                                                <div className="flex items-center gap-2 md:gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                                    <span className="font-bold text-zinc-900 text-xs">{session.requestedTime}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3 min-w-[120px]">
                                                <div className="space-y-0 text-start">
                                                    <p className="font-bold text-zinc-900 text-xs">{session.userName}</p>
                                                    <p className="text-[10px] text-zinc-400 truncate max-w-[120px] md:max-w-[150px]">{session.topic}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3 min-w-[100px]">
                                                <Badge className="bg-zinc-100 text-zinc-600 border-none text-[9px] font-bold px-2 py-0.5 whitespace-nowrap">{session.expertName || 'Assigning...'}</Badge>
                                            </TableCell>
                                            <TableCell className="py-3 text-right pr-4 md:pr-6 min-w-[80px]">
                                                <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold px-3">Join</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {confirmedToday.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-32 text-center text-zinc-400 italic text-sm">No sessions confirmed for today.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Support Snapshot (Combined Insight) */}
                <Card className="rounded-2xl bg-indigo-900 text-white p-6 border-none overflow-hidden relative group">
                    <div className="absolute -top-6 -right-6 opacity-10 group-hover:scale-110 transition-transform">
                        <HelpCircle size={100} />
                    </div>
                    <div className="relative z-10 space-y-5">
                        <h3 className="text-2xl font-black italic tracking-tighter">Open Support</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                <span className="opacity-60">Critical Issues</span>
                                <span className="text-rose-400">2 Tickets</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-black">
                                <span className="opacity-60">Account Access</span>
                                <span className="text-amber-400">1 Ticket</span>
                            </div>
                        </div>
                        <Button className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-2xl font-black text-[10px] h-11 mt-2">Manage Desk</Button>
                    </div>
                </Card>
            </div>

            {/* Bottom Row Insights */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-2xl bg-zinc-900 text-white p-6 border-none overflow-hidden relative group">
                    <div className="absolute -top-6 -right-6 opacity-10 group-hover:scale-110 transition-transform">
                        <Activity size={100} />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="space-y-2">
                            <Badge className="bg-amber-500 border-none text-white py-0 h-4 px-1.5 font-black uppercase text-[9px]">Portal Pulse</Badge>
                            <h3 className="text-lg font-black italic">Active Learners</h3>
                            <div className="text-3xl font-black">24 <span className="text-xs font-medium text-zinc-500">online now</span></div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Growth Engines</p>
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold">U</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="rounded-2xl bg-zinc-100 p-4 md:p-6 border-zinc-200 overflow-hidden relative group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="relative z-10 space-y-2 grow">
                        <h3 className="text-lg font-black italic text-zinc-900 tracking-tighter">Content Status</h3>
                        <p className="text-xs font-bold text-zinc-500 leading-relaxed max-w-full sm:max-w-[200px]">Week 6: "Systemizing Operations" is ready for release.</p>
                    </div>
                    <Button className="w-full sm:w-auto shrink-0 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold h-10 text-xs px-6" asChild>
                        <Link href="/admin/content">Go to Curriculum</Link>
                    </Button>
                </Card>
            </div>
        </div>
    );
}

function ActionCard({ label, value, icon: Icon, gradient, subtext, href }: any) {
    const CardUI = (
        <Card className={cn(
            "rounded-3xl border-none shadow-xl text-white overflow-hidden relative group transition-all duration-300",
            `bg-gradient-to-br ${gradient}`,
            href && "cursor-pointer active:scale-95"
        )}>
            {/* Background Icon Effect */}
            <div className="absolute -right-6 -top-6 opacity-10 transition-transform group-hover:scale-110 duration-500">
                <Icon size={140} />
            </div>

            <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-[11px] md:text-[12px] font-bold text-white/80 flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 pb-6 text-start">
                <div className="text-4xl md:text-5xl font-black tracking-tighter">{value}</div>
                {subtext && (
                    <p className="text-[10px] md:text-[11px] text-white/70 mt-2 font-bold">
                        {subtext}
                    </p>
                )}
            </CardContent>
        </Card>
    );

    if (href) return <Link href={href}>{CardUI}</Link>;
    return CardUI;
}
