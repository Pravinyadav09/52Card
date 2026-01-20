"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Video, FileText, Upload, Save, CheckCircle, Eye, AlertCircle, LayoutGrid, List, File, Edit2, Copy, Trash2, Search } from "lucide-react";
import { MOCK_WEEKS, WeekData } from "@/lib/mock-data";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ContentManagementPage() {
    const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchTerm, setSearchTerm] = useState("");

    // Mock Stats
    const totalWeeks = 52;
    const readyWeeks = MOCK_WEEKS.length; // Assuming mock data represents ready weeks
    const completionRate = Math.round((readyWeeks / totalWeeks) * 100);

    const filteredWeeks = MOCK_WEEKS.filter(w =>
        w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.id.toString().includes(searchTerm)
    );

    const handleEditWeek = (week: WeekData) => {
        setSelectedWeek(week);
        toast.info(`Editing Week ${week.id}: ${week.title}`);
    };

    const handleSaveContent = () => {
        toast.success("Content saved successfully (Mock Action)");
        setSelectedWeek(null);
    };

    if (selectedWeek) {
        return (
            <div className="space-y-6 animate-in slide-in-from-right duration-300 max-w-5xl mx-auto pb-10">
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setSelectedWeek(null)} className="text-zinc-500 hover:text-zinc-900">
                        &larr; Back to Dashboard
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                            <Eye className="mr-2 h-4 w-4" /> Preview
                        </Button>
                        <Button onClick={handleSaveContent} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                            <Save className="mr-2 h-4 w-4" /> Save Content
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[300px_1fr]">
                    {/* Editor Sidebar */}
                    <div className="space-y-4">
                        <Card className="bg-white border-zinc-200">
                            <CardHeader className="pb-3 border-b border-zinc-100 bg-zinc-50/50">
                                <CardTitle className="text-sm font-bold uppercase text-zinc-500 tracking-wider">Week Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label>Week Number</Label>
                                    <Input value={selectedWeek.id} disabled className="bg-zinc-50 font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select defaultValue="published">
                                        <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="published">Published</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="p-3 bg-amber-50 rounded border border-amber-100 text-xs text-amber-800">
                                    <AlertCircle className="h-4 w-4 inline mr-1 -mt-0.5" />
                                    Last updated on {new Date().toLocaleDateString()}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content Form */}
                    <div className="space-y-6">
                        <Card className="bg-white border-zinc-200 shadow-sm">
                            <CardHeader>
                                <CardTitle>Core Content</CardTitle>
                                <CardDescription>Define the main topic and video.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Action Title</Label>
                                    <Input defaultValue={selectedWeek.title} className="text-lg font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description / SOPs</Label>
                                    <Textarea defaultValue={selectedWeek.description} className="min-h-[120px]" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex justify-between">
                                        Video Embed URL <span className="text-xs text-zinc-400 font-normal">(YouTube Private/Unlisted)</span>
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input defaultValue={selectedWeek.videoUrl} className="font-mono text-sm" />
                                        <Button variant="outline" size="icon"><Video className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-zinc-200 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Resources & Files</CardTitle>
                                    <CardDescription>Attach templates, checklists, or PDFs.</CardDescription>
                                </div>
                                <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-1" /> Add File</Button>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {selectedWeek.downloads.map((file, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-zinc-100 rounded-md bg-zinc-50 hover:bg-white transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                                                <File className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">{file.name}</div>
                                                <div className="text-xs text-zinc-400 uppercase">Document</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-400 hover:text-zinc-900"><Edit2 className="h-3 w-3" /></Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-700 hover:bg-red-50"><Trash2 className="h-3 w-3" /></Button>
                                        </div>
                                    </div>
                                ))}
                                {selectedWeek.downloads.length === 0 && (
                                    <div className="text-center py-8 text-zinc-400 border-2 border-dashed border-zinc-100 rounded-lg">
                                        No files attached yet.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* 1. Overview Dashboard */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-zinc-900 text-white border-zinc-800">
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-400">Content Readiness</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{readyWeeks} / {totalWeeks} Weeks</div>
                        <div className="text-xs text-green-400 mt-1">{completionRate}% Complete</div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200">
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-500">Recent Updates</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">3 Weeks</div>
                        <div className="text-xs text-zinc-400 mt-1">Updated in last 7 days</div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200">
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-zinc-500">Total Assets</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-zinc-900">142</div>
                        <div className="text-xs text-zinc-400 mt-1">Videos & Documents</div>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-emerald-100">
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-emerald-800">System Health</CardTitle></CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-700">Good</div>
                        <div className="text-xs text-emerald-600 mt-1">No broken links detected</div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Week-Wise Curriculum</h2>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <Input
                            placeholder="Search weeks..."
                            className="pl-9 bg-white border-zinc-200 md:w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex border rounded-md bg-white">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-none border-r ${viewMode === 'grid' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-none ${viewMode === 'list' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button className="bg-zinc-900 text-white">
                        <Plus className="mr-2 h-4 w-4" /> New Week
                    </Button>
                </div>
            </div>

            {/* 2. Week Content List/Grid */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {Array.from({ length: 52 }).map((_, i) => {
                        const weekNum = i + 1;
                        const data = filteredWeeks.find(w => w.id === weekNum);
                        const hasContent = !!data;

                        return (
                            <div
                                key={i}
                                onClick={() => data && handleEditWeek(data)}
                                className={`
                                    relative aspect-square rounded-xl border flex flex-col items-center justify-center p-4 cursor-pointer transition-all hover:scale-105 hover:shadow-md
                                    ${hasContent ? 'bg-white border-zinc-200 hover:border-indigo-300 group' : 'bg-zinc-50 border-zinc-100 opacity-60'}
                                `}
                            >
                                <span className={`text-2xl font-bold mb-1 ${hasContent ? 'text-zinc-900 group-hover:text-indigo-600' : 'text-zinc-300'}`}>
                                    {weekNum}
                                </span>
                                <span className="text-[10px] uppercase font-semibold text-zinc-400">
                                    {hasContent ? 'Active' : 'Empty'}
                                </span>
                                {hasContent && (
                                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500" />
                                )}
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
                    {filteredWeeks.length === 0 ? (
                        <div className="p-8 text-center text-zinc-500">No weeks found matching search.</div>
                    ) : (
                        <div className="divide-y divide-zinc-100">
                            {filteredWeeks.map((week) => (
                                <div key={week.id} className="p-4 flex items-center justify-between hover:bg-zinc-50/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center rounded-lg border border-indigo-100">
                                            {week.id}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-zinc-900">{week.title}</h4>
                                            <p className="text-xs text-zinc-500 flex items-center gap-2">
                                                <span className="flex items-center"><Video className="h-3 w-3 mr-1" /> Video</span>
                                                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                                                <span className="flex items-center"><File className="h-3 w-3 mr-1" /> {week.downloads.length} Files</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">Published</Badge>
                                        <Button size="sm" variant="ghost" onClick={() => handleEditWeek(week)}>
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
