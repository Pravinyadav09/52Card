"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Mail, MessageCircle, Phone,
    HelpCircle, Zap, ShieldCheck,
    MessageSquare, Clock3, ExternalLink,
    ArrowRight, ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HelpPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-20">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center space-y-3 pt-4 px-1">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 shadow-sm mb-1">
                    <HelpCircle className="w-7 h-7 md:w-8 md:h-8 text-amber-500" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
                        Help & <span className="text-amber-500">Support</span>
                    </h1>
                    <p className="text-zinc-500 text-sm md:text-medium max-w-xl mx-auto px-4">
                        Aapke Business Transformation journey mein hum yahan support ke liye maujood hain.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* 1. Contact Options - WhatsApp (Primary) */}
                <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-emerald-100 bg-emerald-50/20 shadow-xl shadow-emerald-50/50 overflow-hidden relative group md:col-span-1">
                    <div className="p-6 md:p-8 space-y-5 md:space-y-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-500">
                            <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <h3 className="text-lg md:text-xl font-black text-zinc-900">WhatsApp Team</h3>
                            <p className="text-xs md:text-sm font-bold text-emerald-800 opacity-60">Instant support for content or login issues.</p>
                        </div>
                        <Button asChild className="w-full h-11 md:h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95 text-sm">
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                                Chat Now
                            </a>
                        </Button>
                    </div>
                </Card>

                {/* 2. Contact Options - Expert Session (Secondary) */}
                <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-amber-100 bg-amber-50/20 shadow-xl shadow-amber-50/50 overflow-hidden relative group md:col-span-1">
                    <div className="p-6 md:p-8 space-y-5 md:space-y-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform duration-500">
                            <Clock3 className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <h3 className="text-lg md:text-xl font-black text-zinc-900">Expert Slot</h3>
                            <p className="text-xs md:text-sm font-bold text-amber-800 opacity-60">Schedule 1:1 strategy call with our mentors.</p>
                        </div>
                        <Button asChild className="w-full h-11 md:h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-lg shadow-amber-200 transition-all active:scale-95 text-sm">
                            <Link href="/dashboard/bookings">
                                Book Session
                            </Link>
                        </Button>
                    </div>
                </Card>

                {/* 3. Contact Options - Email (Official) */}
                <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden relative group md:col-span-1">
                    <div className="p-6 md:p-8 space-y-5 md:space-y-6">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <Mail className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <h3 className="text-lg md:text-xl font-black text-zinc-900">Official Email</h3>
                            <p className="text-xs md:text-sm font-bold text-zinc-500 leading-tight">For official business queries.</p>
                        </div>
                        <Button variant="outline" className="w-full h-11 md:h-12 rounded-xl border-zinc-200 text-zinc-600 font-bold transition-all active:scale-95 text-sm">
                            Email Us
                        </Button>
                    </div>
                </Card>
            </div>

            {/* FAQs Section */}
            <div className="grid gap-6 md:gap-8 lg:grid-cols-5">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 text-white space-y-5 md:space-y-6 relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Zap size={200} />
                        </div>
                        <div className="space-y-2 relative z-10">
                            <Badge className="bg-amber-500 text-white border-none py-1 px-3 font-black uppercase tracking-widest text-[9px] md:text-[10px] mb-1">Notice</Badge>
                            <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight md:leading-none">Aapke Sawaal? Humare Jawaab!</h3>
                        </div>
                        <p className="text-zinc-400 text-xs md:text-sm font-medium relative z-10 leading-relaxed">
                            Agar aapko koi issue ho, toh WhatsApp button use karein support ke liye.
                        </p>
                        <div className="flex items-center gap-2 md:gap-3 pt-2 md:pt-4 relative z-10">
                            <ShieldCheck className="text-emerald-500 h-4 w-4 md:h-5 md:w-5" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">System 52 Support</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <Card className="rounded-[1.5rem] md:rounded-[2.5rem] border-zinc-200 shadow-sm overflow-hidden h-full">
                        <CardHeader className="p-6 md:p-8 border-b border-zinc-50 flex flex-row items-center justify-between">
                            <CardTitle className="text-lg md:text-xl font-black text-zinc-900">FAQs</CardTitle>
                            <span className="text-[9px] md:text-[10px] font-black uppercase text-zinc-400 tracking-widest">Knowledge Base</span>
                        </CardHeader>
                        <CardContent className="p-4 md:p-8">
                            <Accordion type="single" collapsible className="w-full space-y-2 md:space-y-4">
                                <FaqItem
                                    value="item-1"
                                    question="Content kab khulega?"
                                    answer="Har week ka naya content 7 din baad automatic unlock ho jata hai."
                                />
                                <FaqItem
                                    value="item-2"
                                    question="Kya videos download kar sakta hoon?"
                                    answer="Nahi, videos security reasons ki wajah se download nahi ho sakti."
                                />
                                <FaqItem
                                    value="item-3"
                                    question="Expert slots kitne huye hain?"
                                    answer="Total 5 expert slots milte hain, status scoreboard par check karein."
                                />
                                <FaqItem
                                    value="item-4"
                                    question="Card kit nahi aaya?"
                                    answer="7-10 days mein delivery ho jati hai. Tracking info WhatsApp par maangein."
                                />
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Motivation Banner */}
            <div className="bg-amber-500 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center text-white space-y-4 md:space-y-6 shadow-2xl shadow-amber-200">
                <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter leading-tight md:leading-none">"Humari Team Aapki Success Ka Platform Hai!"</h3>
                <p className="text-amber-100 font-bold text-sm md:text-lg max-w-2xl mx-auto opacity-90">
                    Manish & Team aapke business transformation ke har step par aapke sath hain.
                </p>
            </div>
        </div>
    );
}

function FaqItem({ value, question, answer }: { value: string; question: string; answer: string }) {
    return (
        <AccordionItem value={value} className="border-b border-zinc-50 last:border-none px-2 group">
            <AccordionTrigger className="text-left font-bold text-zinc-700 hover:text-amber-600 hover:no-underline py-5 group-data-[state=open]:text-amber-600 transition-all">
                {question}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-500 font-medium leading-relaxed pb-6 pr-4">
                {answer}
            </AccordionContent>
        </AccordionItem>
    );
}
