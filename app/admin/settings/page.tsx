"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Save, Shield, Globe, Bell, Truck,
    Video, Zap, Palette, Database,
    Lock, Smartphone, Mail, AlertTriangle,
    IndianRupee, Clock, CheckCircle2, RefreshCcw, Users,
    Activity, ShieldCheck, Eye, Terminal, Globe2
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminSettings() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Settings updated successfully and synced to all modules.");
        }, 1200);
    };

    return (
        <div className="p-4 sm:p-6 space-y-8 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Platform <span className="text-amber-500 italic">Governance</span></h2>
                    <p className="text-sm font-medium text-zinc-500">Configure core engine and security protocols.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">System Live</span>
                    </div>
                    <Button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto bg-zinc-900 text-white hover:bg-black shadow-lg shadow-zinc-200 h-11 px-8 rounded-xl active:scale-95 transition-all font-bold">
                        {isLoading ? <RefreshCcw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Sync
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="platform" className="space-y-6">
                <div className="bg-white p-2 rounded-2xl border border-zinc-200 shadow-sm overflow-x-auto scrollbar-hide">
                    <TabsList className="bg-transparent h-auto gap-1 sm:gap-2 flex w-max">
                        <SettingTabTrigger value="platform" icon={Globe} label="Portal Identity" />
                        <SettingTabTrigger value="curriculum" icon={Zap} label="Program Engine" />
                        <SettingTabTrigger value="logistics" icon={Truck} label="Logistics" />
                        <SettingTabTrigger value="experts" icon={Clock} label="Slot Rules" />
                        <SettingTabTrigger value="security" icon={Shield} label="Security" />
                        <SettingTabTrigger value="automation" icon={Zap} label="Integrations" />
                    </TabsList>
                </div>

                {/* 1. Portal Branding */}
                <TabsContent value="platform" className="space-y-6 outline-none">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                            <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                <CardTitle className="text-lg">Identity</CardTitle>
                                <CardDescription>Basic platform identifiers</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-zinc-400">Portal Name</Label>
                                    <Input defaultValue="System 52 - Founder's Portal" className="bg-white border-zinc-200 h-10 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-zinc-400">Copyright Text</Label>
                                    <Input defaultValue="© 2024 Growth Systems Inc." className="bg-white border-zinc-200 h-10 rounded-xl" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                            <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                <CardTitle className="text-lg">Support Channels</CardTitle>
                                <CardDescription>Contact info for users</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-zinc-400">Support Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <Input defaultValue="support@system52.com" className="pl-10 bg-white border-zinc-200 h-10 rounded-xl" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-zinc-400">WhatsApp Support Number</Label>
                                    <div className="relative">
                                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <Input defaultValue="+91 9876543210" className="pl-10 bg-white border-zinc-200 h-10 rounded-xl" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* 2. Program Logic */}
                <TabsContent value="curriculum" className="space-y-6 outline-none">
                    <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                        <CardHeader className="bg-indigo-50 border-b border-indigo-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-indigo-900">Content Drip Engine</CardTitle>
                                    <CardDescription className="text-indigo-700/60 font-medium">Control how lessons are released to users.</CardDescription>
                                </div>
                                <Zap className="w-8 h-8 text-indigo-400 opacity-50" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-extrabold text-zinc-900">Auto-Unlock Weeks</Label>
                                            <p className="text-xs text-zinc-500 font-medium">Enable time-based content release.</p>
                                        </div>
                                        <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                                    </div>
                                    <div className="space-y-2 px-1">
                                        <Label className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Unlock Frequency</Label>
                                        <Select defaultValue="weekly">
                                            <SelectTrigger className="h-11 rounded-xl border-zinc-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="daily">Every Day</SelectItem>
                                                <SelectItem value="weekly">Every 7 Days</SelectItem>
                                                <SelectItem value="fixed">Fixed Day (e.g., Monday)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-bold">Total Program Weeks</Label>
                                            <p className="text-xs text-zinc-500">Global count (Default: 52)</p>
                                        </div>
                                        <Badge className="bg-zinc-900">52 Weeks</Badge>
                                    </div>
                                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                                        <p className="text-xs text-amber-800 leading-relaxed font-semibold italic">
                                            Changing the unlock logic will affect current active learners' scoreboard calculations. Proceed with caution.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 3. Supply Chain */}
                <TabsContent value="logistics" className="space-y-6 outline-none">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl md:col-span-2">
                            <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                <CardTitle className="text-lg">Courier Partners</CardTitle>
                                <CardDescription>Allowed shipping providers in dispatch modal</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-2">
                                    {["India Post", "BlueDart", "DTDC", "Delhivery"].map((partner) => (
                                        <div key={partner} className="flex items-center justify-between p-3.5 bg-zinc-50/50 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-sm transition-all group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <span className="font-extrabold text-xs uppercase tracking-tight text-zinc-700">{partner}</span>
                                            </div>
                                            <Switch defaultChecked className="data-[state=checked]:bg-emerald-600 scale-75" />
                                        </div>
                                    ))}
                                    <Button variant="ghost" className="w-full text-indigo-600 text-xs font-bold uppercase mt-2">
                                        <Plus className="w-3 h-3 mr-2" /> Add Partner
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                            <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                <CardTitle className="text-lg">Kit Economics</CardTitle>
                                <CardDescription>Set default shipping costs</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase text-zinc-400">Avg. Shipping Cost</Label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <Input defaultValue="150" type="number" className="pl-10 bg-white border-zinc-200 h-10 rounded-xl font-bold" />
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                    <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-widest text-center">Auto-Calculate Invoicing</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* 4. Slot Rules */}
                <TabsContent value="experts" className="space-y-6 outline-none">
                    <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                        <CardHeader className="bg-amber-50 border-b border-amber-100">
                            <CardTitle className="text-amber-900 font-extrabold tracking-tight">Consultation Governance</CardTitle>
                            <CardDescription className="text-amber-800/60 font-medium italic">Global rules for 1:1 strategy sessions.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid md:grid-cols-3 gap-6">
                                <RuleCard
                                    label="Slots Per User"
                                    value="5"
                                    description="Total lifetime sessions"
                                    icon={Users}
                                    color="bg-amber-100 text-amber-700"
                                />
                                <RuleCard
                                    label="Cool-off Period"
                                    value="14 Days"
                                    description="Wait time between sessions"
                                    icon={Clock}
                                    color="bg-blue-100 text-blue-700"
                                />
                                <RuleCard
                                    label="Cancel Window"
                                    value="24 Hours"
                                    description="Max time to reschedule"
                                    icon={AlertTriangle}
                                    color="bg-rose-100 text-rose-700"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 5. Security & Audit */}
                <TabsContent value="security" className="space-y-6 outline-none">
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                                <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                    <CardTitle className="text-lg font-extrabold tracking-tight">Audit Logs</CardTitle>
                                    <CardDescription>Recent administrative activities</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <ScrollArea className="h-[300px]">
                                        <div className="divide-y divide-zinc-100">
                                            {[
                                                { user: "Admin (Rahul)", action: "Changed shipment status for U102", time: "2m ago", color: "text-blue-600", bg: "bg-blue-50", icon: Truck },
                                                { user: "System", action: "Automatic kit deduction (Inventory -1)", time: "1h ago", color: "text-amber-600", bg: "bg-amber-50", icon: Database },
                                                { user: "Admin (Rahul)", action: "Updated Slot Governance Rules", time: "4h ago", color: "text-emerald-600", bg: "bg-emerald-50", icon: ShieldCheck },
                                                { user: "Expert (Kapil)", action: "Cancelled slot for User U094", time: "6h ago", color: "text-rose-600", bg: "bg-rose-50", icon: AlertTriangle },
                                            ].map((log, i) => (
                                                <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-lg ${log.bg} flex items-center justify-center`}>
                                                            <log.icon className={`w-4 h-4 ${log.color}`} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-zinc-900">{log.action}</p>
                                                            <p className="text-xs text-zinc-400 font-medium">By {log.user}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-black text-zinc-300 uppercase">{log.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>

                            <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                                <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                    <CardTitle className="text-lg font-extrabold tracking-tight">In-App Security</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-bold">Restrict Admin IP</Label>
                                            <p className="text-xs text-zinc-500 font-medium">Allow login only from trusted IPs.</p>
                                        </div>
                                        <Switch className="data-[state=checked]:bg-zinc-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold uppercase text-zinc-400">Trusted IP Whitelist</Label>
                                        <Textarea placeholder="Enter IP addresses separated by commas..." className="bg-white border-zinc-200 rounded-2xl h-20 text-xs font-mono" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="border-rose-100 bg-rose-50/30 shadow-sm overflow-hidden rounded-3xl">
                                <CardHeader className="border-b border-rose-100">
                                    <CardTitle className="text-lg font-extrabold text-rose-900 flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5" /> Critical Control
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-bold text-rose-900">Maintenance Mode</Label>
                                            <p className="text-xs text-rose-700 font-medium">Disable Portal for all users.</p>
                                        </div>
                                        <Switch className="data-[state=checked]:bg-rose-600" />
                                    </div>
                                    <div className="pt-4 border-t border-rose-100">
                                        <Button variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl h-10 font-bold text-xs uppercase tracking-wider">
                                            Invalidate All Sessions
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                                <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                    <CardTitle className="text-sm font-extrabold tracking-tight">System Info</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-3">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-zinc-500">Version</span>
                                        <span className="text-zinc-900 font-bold">2.4.0-build-82</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-zinc-500">DB Status</span>
                                        <span className="text-emerald-600 font-bold">Healthy</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-zinc-500">Uptime</span>
                                        <span className="text-zinc-900 font-bold">14 Days, 2h</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* 5. Automation */}
                <TabsContent value="automation" className="space-y-6 outline-none">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                            <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                <CardTitle className="text-lg">WhatsApp API Gateway</CardTitle>
                                <CardDescription>Connected via Interakt/Twilio</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                            <Smartphone className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-900">API Status: Connected</p>
                                            <p className="text-xs text-zinc-500">Latency: 45ms</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="rounded-lg h-8 text-[10px] font-bold uppercase border-zinc-200">Test Webhook</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl">
                            <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                                <CardTitle className="text-lg">Video Conferencing</CardTitle>
                                <CardDescription>Auto-generate meeting links</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2 px-1">
                                    <Label className="text-xs font-bold uppercase text-zinc-400">Default Provider</Label>
                                    <Select defaultValue="zoom">
                                        <SelectTrigger className="h-10 rounded-xl border-zinc-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="zoom">Zoom Meetings</SelectItem>
                                            <SelectItem value="gmeet">Google Meet</SelectItem>
                                            <SelectItem value="manual">Manual Entry Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function SettingTabTrigger({ value, icon: Icon, label }: { value: string; icon: any; label: string }) {
    return (
        <TabsTrigger
            value={value}
            className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white rounded-xl px-3 sm:px-4 py-2 transition-all flex items-center gap-2 font-extrabold text-[10px] sm:text-xs uppercase tracking-tight text-zinc-500 data-[state=active]:shadow-lg active:scale-95 shrink-0"
        >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{label}</span>
        </TabsTrigger>
    );
}

function RuleCard({ label, value, description, icon: Icon, color }: any) {
    return (
        <div className="p-6 border border-zinc-100 rounded-3xl bg-zinc-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-default">
            <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                <Icon size={24} />
            </div>
            <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">{label}</h4>
            <div className="text-3xl font-black text-zinc-900 mt-1 tracking-tighter">{value}</div>
            <p className="text-xs text-zinc-500 mt-2 font-medium italic opacity-70">{description}</p>
        </div>
    );
}

function Plus(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
