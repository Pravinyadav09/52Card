"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/lib/mock-data";
import {
    Package, Truck, CheckCircle, Save,
    ShieldCheck, User, Camera, Lock,
    ChevronRight, ExternalLink, Mail,
    Smartphone, MapPin, Building
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const user = MOCK_USERS[0]; // Simulate current user
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleSave = () => {
        toast.success("Identity profile updated successfully!");
    };

    const getKitStatusStyle = (status: string) => {
        switch (status) {
            case 'Delivered': return "text-emerald-500 bg-emerald-50/50 border-emerald-100";
            case 'Shipped':
            case 'In Transit': return "text-amber-500 bg-amber-50/50 border-amber-100";
            default: return "text-zinc-500 bg-zinc-50/50 border-zinc-100";
        }
    };

    const handleUpdatePassword = () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Please enter both fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        toast.success("Security keys updated securely.");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
                <div className="space-y-1">
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
                        My <span className="text-amber-500">Profile</span>
                    </h2>
                    <p className="text-zinc-500 text-sm font-medium">Manage identity and membership status.</p>
                </div>
                <Badge className="bg-zinc-900 text-white px-3 py-1 rounded-full border-none font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                    Elite Member
                </Badge>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
                {/* Left Column: Personal Info */}
                <Card className="lg:col-span-2 rounded-[2rem] md:rounded-[3rem] border-zinc-200 shadow-sm overflow-hidden bg-white">
                    <CardHeader className="bg-zinc-50/50 p-6 md:p-10 border-b border-zinc-50 flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-xl group-hover:brightness-90 transition-all duration-300">
                                <AvatarImage src="/avatar-placeholder.png" />
                                <AvatarFallback className="bg-amber-100 text-amber-700 text-3xl md:text-4xl font-black">RK</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-0 right-0 bg-zinc-900 text-white p-2 rounded-xl border-2 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={14} />
                            </div>
                        </div>
                        <div className="text-center mt-4 md:mt-6 space-y-1">
                            <CardTitle className="text-xl md:text-2xl font-black text-zinc-900">{name}</CardTitle>
                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Business Evolution Partner</p>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 md:p-10">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <ProfileInput
                                    label="Full Name"
                                    icon={User}
                                    value={name}
                                    onChange={setName}
                                />
                                <ProfileInput
                                    label="Official Email"
                                    icon={Mail}
                                    value={email}
                                    readOnly
                                    subtext="Registered identity cannot be changed."
                                />
                            </div>
                            <div className="space-y-6">
                                <ProfileInput
                                    label="Registered Mobile"
                                    icon={Smartphone}
                                    value={user.mobile}
                                    readOnly
                                />
                                <ProfileInput
                                    label="Business Name"
                                    icon={Building}
                                    value={user.businessName || "Not Provided"}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="mt-8 md:mt-10 p-5 md:p-6 bg-amber-50 rounded-2xl md:rounded-[2rem] border border-amber-100 flex items-start gap-3 md:gap-4">
                            <MapPin className="text-amber-500 shrink-0 mt-1 w-4 h-4 md:w-5 md:h-5" />
                            <div className="space-y-1">
                                <p className="text-[9px] md:text-[10px] font-black uppercase text-amber-600 tracking-widest">Shipping Address</p>
                                <p className="text-xs md:text-sm font-bold text-zinc-800 leading-relaxed">
                                    {user.address || "Please update your shipping address via help chat if incorrect."}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="px-6 md:px-10 pb-6 md:pb-10">
                        <Button
                            onClick={handleSave}
                            className="w-full h-12 md:h-14 bg-zinc-900 hover:bg-black text-white rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-zinc-200 transition-all active:scale-[0.98] text-sm md:text-base"
                        >
                            <Save size={18} />
                            Update Profile
                        </Button>
                    </CardFooter>
                </Card>

                {/* Right Column: Security & Kit */}
                <div className="space-y-8">
                    {/* Welcome Kit Card */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-amber-100 bg-amber-50/20 shadow-xl shadow-amber-50/50 overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <Package size={150} />
                        </div>
                        <CardHeader className="p-6 md:p-8 pb-3 md:pb-4">
                            <div className="flex items-center gap-2 text-amber-700">
                                <Package className="h-4 w-4 md:h-5 md:w-5" />
                                <CardTitle className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Kit Logistics</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-0 space-y-5 md:space-y-6">
                            <div className={cn("p-5 md:p-6 rounded-2xl md:rounded-[2rem] border transition-all", getKitStatusStyle(user.kitStatus))}>
                                <div className="flex items-center gap-4 mb-3 md:mb-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                                        {user.kitStatus === 'Delivered' ? <CheckCircle className="h-5 w-5 md:h-6 md:w-6" /> : <Truck className="h-5 w-5 md:h-6 md:w-6" />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-xl md:text-2xl font-black tracking-tight">{user.kitStatus}</p>
                                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                                    </div>
                                </div>
                                <p className="text-[11px] md:text-xs font-bold leading-relaxed opacity-70">
                                    {user.kitStatus === 'Delivered'
                                        ? `Kit established on ${user.actualDelivery || 'Nov 09, 2023'}.`
                                        : "Your kit is being processed."}
                                </p>
                                {user.trackingId && (
                                    <div className="mt-3 md:mt-4 flex items-center justify-between text-[10px] md:text-[11px] font-black bg-white/40 p-2.5 md:p-3 rounded-xl border border-black/5">
                                        <span className="opacity-50 tracking-wider">TRACKING ID</span>
                                        <span className="tracking-widest">{user.trackingId}</span>
                                    </div>
                                )}
                            </div>
                            <Button variant="ghost" className="w-full h-8 md:h-10 text-[9px] md:text-[10px] font-black uppercase text-amber-600 tracking-[0.2em] hover:bg-amber-100">
                                Logistic Logs <ChevronRight size={12} className="ml-1" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Security Card */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden bg-white">
                        <CardHeader className="p-6 md:p-8 pb-3 md:pb-4">
                            <div className="flex items-center gap-2 text-zinc-900">
                                <Lock className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
                                <CardTitle className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Security</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-0 space-y-4 md:space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">New Key</Label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-11 md:h-12 bg-zinc-50 border-zinc-100 rounded-xl px-4 focus:ring-amber-500 transition-all font-bold text-sm"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Verify</Label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-11 md:h-12 bg-zinc-50 border-zinc-100 rounded-xl px-4 focus:ring-amber-500 transition-all font-bold text-sm"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <Button
                                className="w-full h-11 md:h-12 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold mt-2 md:mt-4 shadow-lg shadow-zinc-200 transition-all active:scale-[0.98] text-xs md:text-sm"
                                onClick={handleUpdatePassword}
                            >
                                Secure Update
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="p-8 text-center text-zinc-400 space-y-2">
                        <ShieldCheck className="mx-auto text-emerald-500/30" size={32} />
                        <p className="text-[10px] font-black uppercase tracking-widest">Authorized Identity View Only</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileInput({ label, icon: Icon, value, onChange, readOnly, subtext }: any) {
    return (
        <div className="space-y-2">
            <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">{label}</Label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-500 transition-colors">
                    <Icon size={18} />
                </div>
                <Input
                    value={value}
                    onChange={onChange ? e => onChange(e.target.value) : undefined}
                    readOnly={readOnly}
                    className={cn(
                        "h-12 md:h-14 pl-12 rounded-xl md:rounded-2xl font-bold transition-all text-sm md:text-base",
                        readOnly
                            ? "bg-zinc-50 border-zinc-100 text-zinc-400 cursor-not-allowed"
                            : "bg-white border-zinc-200 text-zinc-900 focus:border-amber-500 focus:ring-amber-500/20 shadow-sm"
                    )}
                />
            </div>
            {subtext && <p className="text-[10px] text-zinc-400 font-bold px-1 italic">{subtext}</p>}
        </div>
    );
}
