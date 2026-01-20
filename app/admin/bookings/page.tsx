"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Search, Calendar, Clock, Link as LinkIcon,
    UserCheck, CheckCircle, AlertCircle,
    MoreHorizontal, Filter, Download,
    Users, Video, Plus, Mail, Phone,
    TrendingUp, Star, MapPin, ExternalLink,
    Send, RefreshCcw, LayoutGrid, List,
    ChevronRight, BookOpen, Clock3
} from "lucide-react";
import { MOCK_BOOKINGS, MOCK_EXPERTS, BookingRequest, Expert } from "@/lib/mock-data";
import { toast } from "sonner";
import { format, isFuture, isPast } from "date-fns";

export default function ExpertSlotManagement() {
    const [bookings, setBookings] = useState<BookingRequest[]>(MOCK_BOOKINGS);
    const [experts, setExperts] = useState<Expert[]>(MOCK_EXPERTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [expertId, setExpertId] = useState("");
    const [meetingLink, setMeetingLink] = useState("");

    // Manual Booking State
    const [manualDialogOpen, setManualDialogOpen] = useState(false);
    const [newBooking, setNewBooking] = useState({
        userName: "",
        topic: "",
        date: "",
        time: "",
        duration: "30",
        expertId: ""
    });

    const handleCreateManualBooking = () => {
        if (!newBooking.userName || !newBooking.topic || !newBooking.date || !newBooking.time) {
            toast.error("Please fill required fields");
            return;
        }

        const selectedExpert = experts.find(e => e.id === newBooking.expertId);

        const booking: BookingRequest = {
            id: `B${Math.floor(Math.random() * 9000) + 1000}`,
            userId: "manual",
            userName: newBooking.userName,
            topic: newBooking.topic,
            requestedDate: newBooking.date,
            requestedTime: newBooking.time,
            duration: parseInt(newBooking.duration),
            status: selectedExpert ? 'Scheduled' : 'Pending',
            expertId: selectedExpert?.id,
            expertName: selectedExpert?.name,
            meetingLink: selectedExpert ? "https://zoom.us/j/manual" : undefined
        };

        setBookings([booking, ...bookings]);
        setManualDialogOpen(false);
        setNewBooking({ userName: "", topic: "", date: "", time: "", duration: "30", expertId: "" });
        toast.success("Manual booking created successfully");
    };

    // Stats Calculations
    const stats = useMemo(() => {
        const total = bookings.length;
        const pending = bookings.filter(b => b.status === 'Pending').length;
        const completed = bookings.filter(b => b.status === 'Completed').length;
        const upcoming = bookings.filter(b => b.status === 'Scheduled').length;
        const avgRating = (bookings.filter(b => b.rating).reduce((acc, b) => acc + (b.rating || 0), 0) / (bookings.filter(b => b.rating).length || 1)).toFixed(1);

        return { total, pending, completed, upcoming, avgRating };
    }, [bookings]);

    const filteredBookings = bookings.filter(b => {
        const matchesSearch = b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || b.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAssignExpert = () => {
        if (!selectedBooking || !expertId || !meetingLink) {
            toast.error("Please fill all details");
            return;
        }

        const selectedExpert = experts.find(e => e.id === expertId);
        if (!selectedExpert) return;

        setBookings(prev => prev.map(b => b.id === selectedBooking.id ? {
            ...b,
            status: 'Scheduled',
            expertId: selectedExpert.id,
            expertName: selectedExpert.name,
            meetingLink: meetingLink
        } : b));

        setAssignDialogOpen(false);
        setExpertId("");
        setMeetingLink("");
        toast.success(`Session scheduled with ${selectedExpert.name}. Notification sent to ${selectedBooking.userName}`);
    };

    const getStatusColor = (status: BookingRequest['status']) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    return (
        <div className="p-4 sm:p-6 space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Expert Slot <span className="text-indigo-600 italic">Management</span></h1>
                    <p className="text-zinc-500 text-sm font-medium">Coordinate 1:1 strategy calls and consulting.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-none border-zinc-200 shadow-sm text-xs h-9 px-3"
                        onClick={() => {
                            const headers = ["ID", "User", "Topic", "Date", "Time", "Expert", "Status"];
                            const rows = bookings.map(b => [b.id, b.userName, b.topic, b.requestedDate, b.requestedTime, b.expertName || 'N/A', b.status]);
                            const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'bookings_export.csv';
                            a.click();
                            toast.success("Bookings exported successfully");
                        }}
                    >
                        <Download className="w-3.5 h-3.5 mr-2" />
                        Export
                    </Button>
                    <Dialog open={manualDialogOpen} onOpenChange={setManualDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex-1 md:flex-none bg-zinc-900 text-white hover:bg-zinc-800 shadow-md text-xs h-9 px-3">
                                <Plus className="w-3.5 h-3.5 mr-2" />
                                Add Manual
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0 border-none overflow-hidden max-w-lg bg-white rounded-3xl shadow-2xl">
                            <div className="bg-zinc-900 p-8 text-white relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Plus size={100} />
                                </div>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-white">New Manual Booking</DialogTitle>
                                    <DialogDescription className="text-zinc-400 text-sm mt-1 font-normal">
                                        Manually sync an offline or WhatsApp booking.
                                    </DialogDescription>
                                </DialogHeader>
                            </div>
                            <div className="p-6 md:p-8 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 text-start">
                                        <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">User Name</Label>
                                        <Input
                                            placeholder="Full Name"
                                            value={newBooking.userName}
                                            onChange={e => setNewBooking({ ...newBooking, userName: e.target.value })}
                                            className="h-10 md:h-12 rounded-xl bg-zinc-50 border-zinc-100 placeholder:text-zinc-400"
                                        />
                                    </div>
                                    <div className="space-y-2 text-start">
                                        <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Topic</Label>
                                        <Input
                                            placeholder="e.g. Sales Help"
                                            value={newBooking.topic}
                                            onChange={e => setNewBooking({ ...newBooking, topic: e.target.value })}
                                            className="h-10 md:h-12 rounded-xl bg-zinc-50 border-zinc-100 placeholder:text-zinc-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 text-start">
                                        <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Date</Label>
                                        <Input
                                            type="date"
                                            value={newBooking.date}
                                            onChange={e => setNewBooking({ ...newBooking, date: e.target.value })}
                                            className="h-10 md:h-12 rounded-xl bg-zinc-50 border-zinc-100"
                                        />
                                    </div>
                                    <div className="space-y-2 text-start">
                                        <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Time</Label>
                                        <Input
                                            type="time"
                                            value={newBooking.time}
                                            onChange={e => setNewBooking({ ...newBooking, time: e.target.value })}
                                            className="h-10 md:h-12 rounded-xl bg-zinc-50 border-zinc-100"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 text-start">
                                        <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Duration (Mins)</Label>
                                        <Select value={newBooking.duration} onValueChange={v => setNewBooking({ ...newBooking, duration: v })}>
                                            <SelectTrigger className="h-10 md:h-12 rounded-xl bg-zinc-50 border-zinc-100">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-zinc-100">
                                                <SelectItem value="15">15 Mins</SelectItem>
                                                <SelectItem value="30">30 Mins</SelectItem>
                                                <SelectItem value="45">45 Mins</SelectItem>
                                                <SelectItem value="60">1 Hour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 text-start">
                                        <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Assign Expert (Optional)</Label>
                                        <Select value={newBooking.expertId} onValueChange={v => setNewBooking({ ...newBooking, expertId: v })}>
                                            <SelectTrigger className="h-10 md:h-12 rounded-xl bg-zinc-50 border-zinc-100">
                                                <SelectValue placeholder="Unassigned" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-zinc-100">
                                                <SelectItem value="none">Unassigned</SelectItem>
                                                {experts.map(e => (
                                                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl h-14 font-bold text-lg shadow-xl shadow-zinc-100 mt-4 active:scale-[0.98] transition-all"
                                    onClick={handleCreateManualBooking}
                                >
                                    Create Booking
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Video size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-indigo-100 flex items-center gap-2">
                            <Clock3 className="w-4 h-4" />
                            Upcoming Slots
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.upcoming}</div>
                        <p className="text-xs text-indigo-100 mt-1 opacity-80 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Next slot in 14 mins
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Users size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-amber-100 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Pending Assignments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-amber-100 mt-1 opacity-80 underline cursor-pointer">Assign Experts Now</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Completed Successfully
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.completed}</div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex -space-x-2">
                                {experts.map((e, i) => (
                                    <Avatar key={i} className="w-6 h-6 border-2 border-emerald-600">
                                        <AvatarFallback className="text-[10px] bg-emerald-700 text-white">{e.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <span className="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">Top rated consultants</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Star size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-400" />
                            Program Avg Rating
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.avgRating}/5</div>
                        <p className="text-xs text-slate-400 mt-1 opacity-80">Based on {bookings.filter(b => b.rating).length} reviews</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="bookings" className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-2 rounded-2xl border border-zinc-200 shadow-sm">
                    <TabsList className="bg-zinc-100 p-1 gap-1 w-full lg:w-auto h-auto grid grid-cols-3 lg:flex">
                        <TabsTrigger value="bookings" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-2 lg:px-6 py-2 transition-all text-xs">
                            <List className="w-4 h-4 mr-0 lg:mr-2" />
                            <span className="hidden lg:inline">Bookings</span>
                        </TabsTrigger>
                        <TabsTrigger value="experts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-2 lg:px-6 py-2 transition-all text-xs">
                            <Users className="w-4 h-4 mr-0 lg:mr-2" />
                            <span className="hidden lg:inline">Experts</span>
                        </TabsTrigger>
                        <TabsTrigger value="calendar" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg px-2 lg:px-6 py-2 transition-all text-xs">
                            <Calendar className="w-4 h-4 mr-0 lg:mr-2" />
                            <span className="hidden lg:inline">Schedule</span>
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex flex-col sm:flex-row items-center gap-3 px-2 w-full lg:w-auto">
                        <div className="relative group w-full lg:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                            <Input
                                placeholder="Search sessions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-10 bg-transparent border-zinc-100 focus:ring-0 focus:border-zinc-300 rounded-xl w-full"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[150px] h-10 border-zinc-100 rounded-xl">
                                <Filter className="w-4 h-4 mr-2 text-zinc-400" />
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-zinc-200">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Scheduled">Scheduled</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <TabsContent value="bookings" className="outline-none">
                    <Card className="border-zinc-200 shadow-sm overflow-x-auto rounded-2xl scrollbar-hide">
                        <Table>
                            <TableHeader className="bg-zinc-50/50 border-b border-zinc-100">
                                <TableRow className="whitespace-nowrap">
                                    <TableHead className="text-zinc-900 font-bold text-xs uppercase tracking-wider py-4 min-w-[180px]">Session Info</TableHead>
                                    <TableHead className="text-zinc-900 font-bold text-xs uppercase tracking-wider min-w-[180px]">Expert Assigned</TableHead>
                                    <TableHead className="text-zinc-900 font-bold text-xs uppercase tracking-wider min-w-[150px]">Date & Time</TableHead>
                                    <TableHead className="text-zinc-900 font-bold text-xs uppercase tracking-wider min-w-[120px]">Status</TableHead>
                                    <TableHead className="text-right text-zinc-900 font-bold text-xs uppercase tracking-wider min-w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-48 text-center text-zinc-400 font-medium">
                                            No sessions match your search.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <TableRow key={booking.id} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors group">
                                            <TableCell className="py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-zinc-900 flex items-center gap-2 group-hover:text-indigo-600 transition-colors cursor-pointer">
                                                        {booking.userName}
                                                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="text-[10px] font-bold py-0 bg-white border-zinc-200 shadow-sm">
                                                            {booking.topic}
                                                        </Badge>
                                                        <span className="text-[10px] text-zinc-400 font-mono">{booking.id}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {booking.expertName ? (
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="w-8 h-8 rounded-lg shadow-sm">
                                                            <AvatarFallback className="bg-zinc-900 text-white text-[10px] font-bold">{booking.expertName[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold text-zinc-700">{booking.expertName}</span>
                                                            <span className="text-[10px] text-zinc-400 font-medium italic">Strategist</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-400 text-sm italic">Unassigned</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col text-sm">
                                                    <div className="flex items-center gap-1.5 text-zinc-900 font-medium">
                                                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                                                        {booking.requestedDate}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-zinc-500 mt-1">
                                                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                                        {booking.requestedTime} ({booking.duration}m)
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center w-fit shadow-sm ${getStatusColor(booking.status)}`}>
                                                    {booking.status === 'Completed' ? <CheckCircle className="w-3 h-3 mr-1" /> : booking.status === 'Scheduled' ? <Video className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {booking.status === 'Pending' ? (
                                                        <Dialog open={assignDialogOpen && selectedBooking?.id === booking.id} onOpenChange={(open) => {
                                                            setAssignDialogOpen(open);
                                                            if (open) setSelectedBooking(booking);
                                                        }}>
                                                            <DialogTrigger asChild>
                                                                <Button size="sm" className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl h-8 active:scale-95 transition-all">
                                                                    Assign Expert
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="p-0 border-none overflow-hidden max-w-md bg-white rounded-3xl shadow-2xl">
                                                                <div className="bg-indigo-600 p-8 text-white relative">
                                                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                                                        <Video size={100} />
                                                                    </div>
                                                                    <DialogHeader>
                                                                        <DialogTitle className="text-2xl font-bold text-white">Schedule Strategy Call</DialogTitle>
                                                                        <DialogDescription className="text-indigo-100 text-sm mt-1 font-normal">
                                                                            Select an expert for {booking.userName} regarding "{booking.topic}".
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                </div>
                                                                <div className="p-8 space-y-6">
                                                                    <div className="space-y-4">
                                                                        <div className="space-y-2">
                                                                            <Label className="text-xs font-black uppercase text-zinc-400 tracking-widest">Available Experts</Label>
                                                                            <Select onValueChange={setExpertId}>
                                                                                <SelectTrigger className="h-12 rounded-xl bg-zinc-50 border-zinc-100">
                                                                                    <SelectValue placeholder="Choose Expert" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-white border-zinc-200 rounded-xl">
                                                                                    {experts.map(e => (
                                                                                        <SelectItem key={e.id} value={e.id} className="rounded-lg">
                                                                                            <div className="flex flex-col">
                                                                                                <span className="font-bold">{e.name}</span>
                                                                                                <span className="text-[10px] text-zinc-400">Exp: {e.expertise.join(", ")}</span>
                                                                                            </div>
                                                                                        </SelectItem>
                                                                                    ))}
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label className="text-xs font-black uppercase text-zinc-400 tracking-widest">Meeting Link (Zoom/GMeet)</Label>
                                                                            <div className="relative">
                                                                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                                                <Input
                                                                                    placeholder="Paste link here..."
                                                                                    className="pl-10 h-12 rounded-xl bg-zinc-50 border-zinc-100"
                                                                                    value={meetingLink}
                                                                                    onChange={e => setMeetingLink(e.target.value)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        onClick={handleAssignExpert}
                                                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 font-bold text-lg shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
                                                                    >
                                                                        Confirm Session
                                                                    </Button>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    ) : (
                                                        <Button variant="outline" size="sm" className="h-8 rounded-xl border-zinc-200 text-zinc-600 hover:bg-zinc-50" onClick={() => booking.meetingLink && window.open(booking.meetingLink, '_blank')}>
                                                            <Video className="w-3 h-3 mr-1" />
                                                            Meeting
                                                        </Button>
                                                    )}

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-56 bg-white border-zinc-200 shadow-xl rounded-2xl p-1">
                                                            <DropdownMenuLabel className="text-[10px] uppercase font-bold text-zinc-400 px-3 py-2">Consultation Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem className="rounded-xl gap-3 h-10 cursor-pointer">
                                                                <Send className="w-4 h-4 text-zinc-500" />
                                                                Send Reminders
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="rounded-xl gap-3 h-10 cursor-pointer">
                                                                <Mail className="w-4 h-4 text-zinc-500" />
                                                                Email Briefing
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-zinc-100" />
                                                            <DropdownMenuItem className="rounded-xl gap-3 h-10 cursor-pointer text-emerald-600 focus:text-emerald-600">
                                                                <CheckCircle className="w-4 h-4" />
                                                                Mark Completed
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="rounded-xl gap-3 h-10 cursor-pointer text-rose-600 focus:text-rose-600">
                                                                <AlertCircle className="w-4 h-4" />
                                                                Cancel Booking
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="experts" className="outline-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {experts.map((expert) => (
                            <Card key={expert.id} className="border-zinc-200 shadow-sm overflow-hidden rounded-3xl group hover:shadow-xl transition-all duration-300">
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="w-14 h-14 border-2 border-zinc-100 rounded-2xl shadow-sm group-hover:scale-105 transition-transform">
                                                <AvatarFallback className="bg-zinc-900 text-white font-bold text-xl">{expert.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{expert.name}</h3>
                                                <p className="text-xs text-zinc-500 font-medium">Top Tier Consultant</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100 rounded-lg">
                                            {expert.currentSlotsThisWeek}/{expert.maxSlotsPerWeek} Slots
                                        </Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {expert.expertise.map((skill, idx) => (
                                            <Badge key={idx} variant="outline" className="bg-white text-[10px] font-bold text-zinc-500 border-zinc-200">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-zinc-50">
                                        <div className="flex items-center gap-2 text-sm text-zinc-600">
                                            <Mail className="w-3.5 h-3.5 text-zinc-400" />
                                            {expert.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-zinc-600">
                                            <Phone className="w-3.5 h-3.5 text-zinc-400" />
                                            {expert.phone}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-zinc-900 font-bold">
                                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                            {expert.availability}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                                    <Button variant="ghost" className="text-zinc-500 text-xs font-bold uppercase tracking-wider h-10 hover:text-indigo-600">
                                        View Schedule
                                    </Button>
                                    <Button size="sm" variant="outline" className="rounded-xl h-9 border-zinc-200 shadow-sm text-zinc-600">
                                        Adjust Load
                                    </Button>
                                </div>
                            </Card>
                        ))}
                        <Card className="border-2 border-dashed border-zinc-200 bg-zinc-50/50 rounded-3xl flex flex-col items-center justify-center p-8 space-y-4 hover:bg-zinc-100/50 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-zinc-400" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-zinc-900 text-lg">Onboard Expert</p>
                                <p className="text-xs text-zinc-500 max-w-[150px]">Add new team member and define expertise.</p>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="calendar" className="outline-none">
                    <Card className="border-zinc-200 shadow-xl rounded-3xl overflow-hidden bg-white">
                        <div className="p-8 flex flex-col items-center justify-center space-y-6 h-[500px] text-center">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center animate-bounce">
                                <Calendar className="w-10 h-10 text-indigo-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter">Full Calendar View</h3>
                                <p className="text-zinc-500 max-w-sm font-medium">Visual drag-and-drop scheduling is coming in the next update. Manage slots via the Bookings tab for now.</p>
                            </div>
                            <div className="flex gap-4">
                                <Button className="bg-zinc-900 text-white h-12 px-8 rounded-2xl font-bold active:scale-95 transition-all">Go to Bookings</Button>
                                <Button variant="outline" className="border-zinc-200 h-12 px-8 rounded-2xl font-bold h-12 flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Google Sync
                                </Button>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Bottom Insights Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-zinc-200 shadow-sm rounded-3xl overflow-hidden">
                    <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-amber-500" />
                            Top Topics
                        </CardTitle>
                        <Badge variant="outline" className="text-[10px] font-bold">This Month</Badge>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5">
                        <div className="space-y-3">
                            <TopicBar label="Inventory & RM" value={45} color="bg-amber-500" />
                            <TopicBar label="Sales CRM" value={30} color="bg-indigo-500" />
                            <TopicBar label="Digital Growth" value={15} color="bg-emerald-500" />
                            <TopicBar label="Accounting" value={10} color="bg-rose-500" />
                        </div>
                        <p className="text-[11px] text-zinc-400 font-medium italic">Most users struggle with Warehouse automation in Week 4.</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 shadow-sm rounded-3xl overflow-hidden">
                    <CardHeader className="bg-zinc-50/50 border-b border-zinc-100 flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Users className="w-5 h-5 text-emerald-500" />
                            Top Experts
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">View All</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-48 divide-y divide-zinc-50">
                            {experts.map((e, idx) => (
                                <div key={idx} className="p-4 flex items-center justify-between group hover:bg-zinc-50/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white text-[10px] font-bold">
                                            {e.name[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-zinc-900">{e.name}</span>
                                            <span className="text-[10px] text-zinc-500">12 Comp. / 4.9 Rating</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-zinc-200 group-hover:text-zinc-400 transition-colors" />
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 shadow-sm rounded-3xl overflow-hidden bg-zinc-900 text-white">
                    <div className="p-8 h-full flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold">Conflict Detection</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">We detected 2 overlapping slots for Manish Sir on Jan 22nd. Review assignments to prevent no-shows.</p>
                        </div>
                        <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-200 h-12 rounded-2xl font-bold mt-6 shadow-xl shadow-white/5 active:scale-95 transition-all">
                            Resolve Conflicts
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function TopicBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-tighter">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}
