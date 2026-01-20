"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Users, LayoutGrid, PlayCircle, LogOut, Settings, Truck, Calendar, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const NavItem = ({ href, icon: Icon, label, onClick }: { href: string; icon: any; label: string; onClick?: () => void }) => {
        const isActive = pathname.startsWith(href);
        return (
            <Button
                asChild
                variant="ghost"
                onClick={onClick}
                className={`w-full justify-start gap-4 h-12 mb-1 px-4 rounded-xl transition-all duration-300 group ${isActive
                    ? "bg-amber-50 text-amber-600 font-bold"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
            >
                <Link href={href}>
                    <Icon className={`h-5 w-5 ${isActive ? "text-amber-500" : "text-zinc-400 group-hover:text-zinc-900"}`} />
                    <span className="text-[15px]">{label}</span>
                </Link>
            </Button>
        );
    };

    const SidebarContent = ({ onNavItemClick }: { onNavItemClick?: () => void }) => (
        <div className="flex flex-col h-full bg-white">
            <div className="p-8 pb-10">
                <h1 className="text-2xl tracking-tight flex items-center gap-2">
                    <span className="font-black text-amber-500">ADMIN</span>
                    <span className="font-bold text-zinc-900">Portal</span>
                </h1>
            </div>

            <div className="px-4 flex-1 space-y-8">
                <div>
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] px-4 block mb-4">
                        Management
                    </label>
                    <div className="space-y-1">
                        <NavItem href="/admin/dashboard" icon={LayoutGrid} label="Overview" onClick={onNavItemClick} />
                        <NavItem href="/admin/users" icon={Users} label="User Management" onClick={onNavItemClick} />
                        <NavItem href="/admin/content" icon={PlayCircle} label="Content System 52" onClick={onNavItemClick} />
                        <NavItem href="/admin/logistics" icon={Truck} label="Kit Logistics" onClick={onNavItemClick} />
                        <NavItem href="/admin/bookings" icon={Calendar} label="Expert Slots" onClick={onNavItemClick} />
                    </div>
                </div>

                <div className="pt-4 border-t border-zinc-50">
                    <NavItem href="/admin/settings" icon={Settings} label="Settings" onClick={onNavItemClick} />
                </div>
            </div>

            <div className="p-6 mt-auto">
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
        <div className="flex h-screen overflow-hidden bg-zinc-50">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-68 border-r border-zinc-200 flex-col bg-white flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-zinc-50">
                <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-72">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Admin Navigation</SheetTitle>
                                    <SheetDescription>Mobile navigation menu for the admin portal.</SheetDescription>
                                </SheetHeader>
                                <SidebarContent />
                            </SheetContent>
                        </Sheet>
                        <h2 className="text-sm font-bold text-zinc-900 md:text-zinc-500 md:font-medium">
                            <span className="md:hidden text-amber-500 mr-1 uppercase">Admin</span>
                            Control Center
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold border border-amber-200 text-xs shadow-sm">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
