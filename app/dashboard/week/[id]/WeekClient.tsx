"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    ArrowLeft, CheckCircle2, Download, FileText,
    MessageCircle, Share2, Clock,
    ExternalLink, BookOpen, Trophy, ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { WeekData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WeekClientProps {
    weekData: WeekData;
}

export default function WeekClient({ weekData }: WeekClientProps) {
    const router = useRouter();
    const weekId = weekData.id;

    const [notes, setNotes] = useState("");
    const [completed, setCompleted] = useState(weekData.isCompleted);

    const handleMarkDone = () => {
        setCompleted(true);
        toast.success(`Week ${weekId} completed! Manish & Team have been notified.`);
        setTimeout(() => {
            router.push('/dashboard');
        }, 2000);
    };

    const copyTeamLink = () => {
        if (typeof window !== "undefined") {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            toast.success("Team access link copied to clipboard!");
        }
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-700 max-w-6xl mx-auto pb-20">
            {/* Header / Breadcrumb - Back button removed */}
            <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4 px-1">

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <Button variant="outline" onClick={copyTeamLink} className="flex-1 sm:flex-none rounded-xl border-zinc-200 text-zinc-600 font-bold group h-10 text-xs">
                        <Share2 className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                        Share
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none rounded-xl border-amber-200 text-amber-600 bg-amber-50 font-bold hover:bg-amber-100 transition-all active:scale-95 h-10 text-xs">
                        <MessageCircle className="w-3.5 h-3.5 mr-2" />
                        Help
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                    {/* Video Player Section */}
                    <div className="relative group overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-4 md:border-8 border-white bg-zinc-900 shadow-2xl shadow-zinc-200">
                        <div className="aspect-video relative">
                            <iframe
                                width="100%"
                                height="100%"
                                src={weekData.videoUrl}
                                title="Week Content"
                                className="opacity-90 group-hover:opacity-100 transition-opacity"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="absolute top-3 left-3 md:top-4 md:left-4 flex gap-2">
                            <Badge className="bg-amber-500 text-white border-none px-2 md:px-3 py-0.5 md:py-1 font-bold text-[8px] md:text-[10px] shadow-lg">
                                Week {weekId}
                            </Badge>
                            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 px-2 md:px-3 py-0.5 md:py-1 font-bold text-[8px] md:text-[10px]">
                                Private
                            </Badge>
                        </div>
                    </div>

                    {/* Description & Guide */}
                    <div className="space-y-6">
                        <div className="space-y-2 px-1">
                            <h1 className="text-2xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight">{weekData.title}</h1>
                            <p className="text-sm md:text-lg text-zinc-500 font-medium leading-relaxed">{weekData.description}</p>
                        </div>

                        <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-amber-100 bg-amber-50/30 overflow-hidden border-2">
                            <CardHeader className="bg-amber-100/50 p-4 md:p-6">
                                <CardTitle className="text-base md:text-lg flex items-center gap-2 text-amber-900">
                                    <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                                    Implementation Guide
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <GuideStep num="01" text="Watch the training end-to-end to understand logic." />
                                    <GuideStep num="02" text="Download PDF SOPs and Excel templates." />
                                    <GuideStep num="03" text="Assign tasks as per the checklist below." />
                                    <GuideStep num="04" text="Upload results or questions in notes." />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Notes Area */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden">
                        <CardHeader className="bg-zinc-50 border-b border-zinc-100 p-4 md:p-6">
                            <CardTitle className="text-base md:text-lg text-zinc-900">Your Action Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-8">
                            <Textarea
                                placeholder="What challenges did you face? What were the wins? Record everything here..."
                                className="bg-zinc-50 border-zinc-200 focus:border-amber-500 min-h-[150px] md:min-h-[200px] text-zinc-900 rounded-2xl p-4 text-sm md:text-base placeholder:text-zinc-400"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </CardContent>
                        <CardFooter className="bg-zinc-50 border-t border-zinc-100 px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
                            <span className="text-[10px] md:text-xs text-zinc-400 font-bold flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Auto-saved
                            </span>
                            <Button variant="ghost" size="sm" className="text-amber-600 font-black text-[10px] md:text-[11px] h-auto p-0 hover:bg-transparent">
                                Clear
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Sidebar Actions & Resources */}
                <div className="w-full lg:w-[350px] space-y-8">
                    {/* Main Completion Card */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-emerald-100 bg-emerald-50/20 shadow-xl shadow-emerald-100/50 overflow-hidden relative group">
                        <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <Trophy size={150} />
                        </div>
                        <CardHeader className="p-6 md:p-8 pb-3 md:pb-4">
                            <CardTitle className="text-emerald-900 font-bold text-[10px] md:text-[11px] tracking-widest">Completion</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8 pt-0 space-y-4 md:space-y-6">
                            <div className="space-y-1 md:space-y-2">
                                <p className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">Ready to verify?</p>
                                <p className="text-xs md:text-sm text-emerald-800 font-medium opacity-70">Marking this as done will update tracking.</p>
                            </div>
                            <Button
                                className={cn(
                                    "w-full h-14 md:h-16 rounded-2xl font-bold text-base md:text-lg shadow-xl transition-all active:scale-95 group",
                                    completed
                                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                                        : "bg-zinc-900 hover:bg-black text-white"
                                )}
                                onClick={handleMarkDone}
                                disabled={completed}
                            >
                                {completed ? (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />
                                        Task Completed!
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        Mark as Done
                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Resources & Downloads */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden">
                        <CardHeader className="p-6 md:p-8 pb-3 md:pb-4 border-b border-zinc-50 flex flex-row items-center justify-between">
                            <CardTitle className="text-zinc-900 flex items-center gap-2 font-black text-base md:text-lg">
                                <Download className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
                                Assets
                            </CardTitle>
                            <Button variant="ghost" className="h-8 text-[10px] md:text-[11px] font-bold text-amber-600 p-0 h-auto hover:bg-transparent">
                                Get All
                            </Button>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 space-y-2 md:space-y-3">
                            {weekData.downloads.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl bg-zinc-50 hover:bg-zinc-100 transition-all border border-zinc-100 group cursor-pointer">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-rose-500 shadow-sm group-hover:bg-rose-50 transition-colors shrink-0">
                                            <FileText className="h-4 w-4 md:h-5 md:w-5" />
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-xs md:text-sm font-bold text-zinc-800 truncate max-w-[120px] md:max-w-[140px]">{file.name}</span>
                                            <span className="text-[8px] md:text-[10px] text-zinc-400 font-bold uppercase tracking-widest">PDF SOP</span>
                                        </div>
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 md:h-10 md:w-10 text-zinc-400 group-hover:text-zinc-900 group-hover:bg-white rounded-xl shadow-sm transition-all shrink-0">
                                        <Download className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Task Checklist */}
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden">
                        <CardHeader className="p-6 md:p-8 pb-3 md:pb-4">
                            <CardTitle className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase">Checklist</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6 pt-0 space-y-2 md:space-y-4">
                            {weekData.checklist.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-zinc-50 transition-colors cursor-pointer group">
                                    <Checkbox
                                        id={`task-${i}`}
                                        className="mt-0.5 md:mt-1 w-5 h-5 border-zinc-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 rounded-lg transition-colors shadow-sm"
                                    />
                                    <label htmlFor={`task-${i}`} className="text-xs md:text-sm font-bold text-zinc-600 leading-snug cursor-pointer group-hover:text-zinc-900 transition-colors">
                                        {item}
                                    </label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer Support */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-10 opacity-60 grayscale hover:grayscale-0 transition-all">
                <p className="text-sm font-bold text-zinc-500">Need personal eyes on this week?</p>
                <Link href="/dashboard/bookings" className="flex items-center gap-2 text-amber-600 font-black text-xs hover:underline">
                    Book an Expert Slot <ExternalLink size={14} />
                </Link>
            </div>
        </div>
    );
}

function GuideStep({ num, text }: { num: string; text: string }) {
    return (
        <div className="flex gap-4 items-start">
            <span className="text-3xl font-black text-amber-200 leading-none">{num}</span>
            <p className="text-sm font-bold text-amber-900/70 py-1 leading-relaxed">{text}</p>
        </div>
    );
}
