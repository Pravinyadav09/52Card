"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Home, HelpCircle, LogOut, Menu, Trophy, ArrowLeft, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
        const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
            <Button
                asChild
                variant="ghost"
                className={`w-full justify-start gap-4 h-12 mb-1 px-4 rounded-xl transition-all duration-300 group ${isActive
                    ? "bg-amber-50 text-amber-600 font-bold"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
            >
                <Link href={href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Icon className={`h-5 w-5 ${isActive ? "text-amber-500" : "text-zinc-400 group-hover:text-zinc-900"}`} />
                    <span className="text-[15px]">{label}</span>
                </Link>
            </Button>
        );
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-zinc-200">
            <div className="p-8 pb-10">
                <h1 className="text-2xl tracking-tight flex items-center gap-2">
                    <span className="font-black text-amber-500 uppercase">Growth</span>
                    <span className="font-bold text-zinc-900">Portal</span>
                </h1>
            </div>

            <div className="px-4 flex-1 space-y-8">
                <div>
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] px-4 block mb-4">
                        Navigation
                    </label>
                    <div className="space-y-1">
                        <NavItem href="/dashboard" icon={Home} label="The Scoreboard" />
                        <NavItem href="/dashboard/bookings" icon={Calendar} label="Book an Expert" />
                        <NavItem href="/dashboard/profile" icon={User} label="Personal Profile" />
                        <NavItem href="/dashboard/help" icon={HelpCircle} label="Help & Support" />
                    </div>
                </div>
            </div>

            <div className="mt-auto p-4 space-y-4">
                <div className="px-2">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src="/avatar-placeholder.png" />
                            <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">RK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-zinc-900 truncate">Rahul Kumar</p>
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider">User • Week 5</p>
                        </div>
                    </div>
                </div>

                <Button asChild variant="ghost" className="w-full justify-start gap-3 h-12 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl px-4 transition-all group font-bold">
                    <Link href="/login">
                        <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        Sign Out
                    </Link>
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 fixed inset-y-0 z-50">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 min-h-screen flex flex-col">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-2">
                        <span className="font-black text-amber-500 uppercase text-lg">Growth</span>
                        <span className="font-bold text-zinc-900 text-lg">Portal</span>
                    </div>
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5 text-zinc-600" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 border-r-zinc-200 bg-white text-zinc-900 w-64">
                            <div className="sr-only">
                                <SheetHeader>
                                    <SheetTitle>Navigation Menu</SheetTitle>
                                    <SheetDescription>Access portal features</SheetDescription>
                                </SheetHeader>
                            </div>
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex-1 p-4 md:p-8 overflow-auto">
                    {pathname !== '/dashboard' && (
                        <div className="mb-4">
                            <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="text-zinc-500 hover:text-zinc-900 pl-0">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
}
