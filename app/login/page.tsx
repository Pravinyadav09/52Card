"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Loader2, ArrowRight, ShieldCheck, Globe, Star } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulated delay for premium feel
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (email === "admin@portal.com") {
            toast.success("Identity Verified. Welcome Admin.");
            router.push("/admin/dashboard");
        } else if (email) {
            toast.success("Authentication Successful.");
            router.push("/dashboard");
        } else {
            toast.error("Invalid credentials. Access Denied.");
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-50">
            {/* Background Image / Texture */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/white_bg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-80 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-50/50 via-transparent to-transparent opacity-60" />
            </div>

            {/* Subtle Gradient Orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-200/40 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-100/40 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="relative z-10 w-full max-w-[440px] px-6 animate-in fade-in zoom-in-95 duration-1000">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-amber-500/20 mb-6 rotate-6 hover:rotate-0 transition-transform duration-500 group cursor-pointer">
                        <span className="text-4xl font-black text-white group-hover:scale-110 transition-transform">52</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-zinc-900 mb-2">
                        SYSTEM <span className="text-amber-500">52</span>
                    </h1>
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-bold text-zinc-500">Secure Gateway Active</span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)]">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold text-zinc-400 ml-1">Portal Alias</Label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-500 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <Input
                                        type="email"
                                        placeholder="admin@portal.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-14 bg-zinc-50 border-zinc-100 pl-12 rounded-2xl text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:ring-amber-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <Label className="text-[11px] font-bold text-zinc-400">Access Key</Label>
                                    <button type="button" className="text-[10px] font-bold text-amber-500 hover:underline">Forgot?</button>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-14 bg-zinc-50 border-zinc-100 pl-12 rounded-2xl text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:ring-amber-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            disabled={loading}
                            className="w-full h-14 bg-zinc-900 hover:bg-black text-white font-bold text-lg rounded-2xl shadow-xl shadow-zinc-200 transition-all active:scale-[0.98] mt-2 group"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                            ) : (
                                <div className="flex items-center gap-2">
                                    Initialize Session
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </Button>
                    </form>

                    {/* Quick Login Section */}
                    <div className="mt-8 space-y-3">
                        <p className="text-[10px] font-bold text-zinc-400 text-center uppercase tracking-widest px-1">Quick Access for Demo</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => { setEmail("admin@portal.com"); setPassword("admin123"); }}
                                className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 p-3 rounded-2xl text-left transition-all active:scale-95 group"
                            >
                                <p className="text-[9px] font-black text-amber-600 uppercase mb-0.5">Admin Account</p>
                                <p className="text-[11px] font-bold text-zinc-600 group-hover:text-zinc-900">admin@portal.com</p>
                            </button>
                            <button
                                onClick={() => { setEmail("member@portal.com"); setPassword("pass123"); }}
                                className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 p-3 rounded-2xl text-left transition-all active:scale-95 group"
                            >
                                <p className="text-[9px] font-black text-indigo-600 uppercase mb-0.5">Member Account</p>
                                <p className="text-[11px] font-bold text-zinc-600 group-hover:text-zinc-900">member@portal.com</p>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-[8px] font-bold text-zinc-400">
                                    {i}
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-medium">1.2k Founders Online</p>
                    </div>
                </div>

                {/* Footer Badges */}
                <div className="flex justify-center gap-6 mt-10">
                    <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all cursor-default">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-zinc-900">256-bit AES</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all cursor-default">
                        <Globe size={16} className="text-indigo-500" />
                        <span className="text-[10px] font-black text-zinc-900">Global Access</span>
                    </div>
                </div>
            </div>

            {/* Subtle bottom line */}
            <div className="absolute bottom-8 text-center w-full">
                <p className="text-[10px] text-zinc-300 font-bold">
                    Evolution Management System &copy; 2026
                </p>
            </div>
        </div>
    );
}
