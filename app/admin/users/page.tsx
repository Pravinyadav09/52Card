"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MOCK_USERS, User } from "@/lib/mock-data";
import { Plus, Search, MessageSquare, MoreVertical, Package, ShieldAlert, Download, Eye, Truck, UserCheck, Calendar, Clock, RefreshCcw } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>(MOCK_USERS.filter(u => u.role === 'user'));
    const [newUserOpen, setNewUserOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', mobile: '',
        businessName: '', industry: '', teamSize: '1-5', primaryGoal: '',
        address: '', city: '', state: '', source: '',
        paymentRef: '', kitGiven: false, paymentAmount: '2999', paymentMethod: 'Cash'
    });

    // Filtering State
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.mobile?.includes(searchTerm);
        const matchesStatus = statusFilter === "all" ? true : statusFilter === "active" ? user.tasksCompleted > 0 : user.tasksCompleted === 0;
        return matchesSearch && matchesStatus;
    });

    const generatePassword = () => {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Readable chars
        let pass = "";
        for (let i = 0; i < 6; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
        setFormData(prev => ({ ...prev, password: pass }));
    };

    const handleCreateUser = () => {
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const newUser: User = {
            id: `u${users.length + 1}`,
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile || 'N/A',
            businessName: formData.businessName || 'N/A',
            industry: formData.industry,
            teamSize: formData.teamSize,
            primaryGoal: formData.primaryGoal,
            address: formData.address || 'N/A',
            city: formData.city,
            state: formData.state,
            source: formData.source,
            paymentRef: formData.paymentRef || 'N/A',
            role: 'user',
            tasksCompleted: 0,
            totalTasks: 52,
            joinedAt: new Date().toISOString().split('T')[0],
            lastLogin: undefined,
            kitStatus: formData.kitGiven ? 'Delivered' : 'Pending'
        };

        setUsers([newUser, ...users]); // Add to top
        setNewUserOpen(false);
        setFormData({
            name: '', email: '', password: '', mobile: '',
            businessName: '', industry: '', teamSize: '1-5', primaryGoal: '',
            address: '', city: '', state: '', source: '',
            paymentRef: '', kitGiven: false, paymentAmount: '2999', paymentMethod: 'Cash'
        });
        toast.success(`User ${newUser.name} created! ID: ${newUser.email}, PW: ${formData.password}`);
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Name", "Email", "Mobile", "Business Name", "Address", "Joined Date", "Mobile Status", "Kit Status", "Progress"];
        const rows = users.map(u => [
            u.id, u.name, u.email, u.mobile, u.businessName, u.address, u.joinedAt, "Verified", u.kitStatus, `${u.tasksCompleted}/52`
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "system52_users.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Export successful!");
    };

    const toggleSelectUser = (id: string) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(uId => uId !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Member <span className="text-amber-500 italic">Directory</span></h2>
                    <p className="text-sm font-medium text-zinc-500">Total Users: {users.length} | Active: {users.filter(u => u.tasksCompleted > 0).length}</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {selectedUsers.length > 0 && (
                        <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100 mr-2">
                            <span className="text-xs font-semibold text-indigo-700">{selectedUsers.length} Selected</span>
                            <Button size="sm" variant="ghost" className="h-6 text-xs text-indigo-700 hover:bg-indigo-100">Send Reminder</Button>
                        </div>
                    )}
                    <Button variant="outline" onClick={handleExportCSV} className="border-zinc-200 text-zinc-600 hover:bg-zinc-50">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Dialog open={newUserOpen} onOpenChange={setNewUserOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-zinc-900 hover:bg-black text-white rounded-xl h-11 px-6 shadow-md transition-all active:scale-95 font-bold">
                                <Plus className="mr-2 h-4 w-4" /> Add New Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white border-zinc-200 text-zinc-900 max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-xl">On-Spot Registration</DialogTitle>
                                <DialogDescription>Create a new account for immediate access.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                {/* Section 1: Basic Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                                        <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                                        <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-900">Basic & Contact</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Full Name*</Label>
                                            <Input placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="h-9" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Mobile (WhatsApp)*</Label>
                                            <Input placeholder="+91 98765..." value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} className="h-9" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Email Address*</Label>
                                            <Input type="email" placeholder="client@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="h-9" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Password*</Label>
                                            <div className="flex gap-2">
                                                <Input value={formData.password} readOnly className="font-mono bg-zinc-50 h-9 flex-1 text-sm" />
                                                <Button size="icon" variant="outline" onClick={generatePassword} className="h-9 w-9 shrink-0"><RefreshCcw className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Business Profile */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                                        <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">2</div>
                                        <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-900">Business Profile</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Business Name</Label>
                                            <Input placeholder="Enterprise Name" value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} className="h-9" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Industry</Label>
                                            <Select onValueChange={(val) => setFormData({ ...formData, industry: val })}>
                                                <SelectTrigger className="h-9"><SelectValue placeholder="Select Industry" /></SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                                    <SelectItem value="Service">Service</SelectItem>
                                                    <SelectItem value="Retail">Retail / FMCG</SelectItem>
                                                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                                                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Primary Goal</Label>
                                            <Select onValueChange={(val) => setFormData({ ...formData, primaryGoal: val })}>
                                                <SelectTrigger className="h-9"><SelectValue placeholder="Member's Goal" /></SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Automation">Business Automation</SelectItem>
                                                    <SelectItem value="Sales">Sales Growth</SelectItem>
                                                    <SelectItem value="Team">Team Management</SelectItem>
                                                    <SelectItem value="Scalability">System Scalability</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Team Size</Label>
                                            <Select onValueChange={(val) => setFormData({ ...formData, teamSize: val })} defaultValue="1-5">
                                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Solo">Solo Entrepreneur</SelectItem>
                                                    <SelectItem value="1-5">1-5 Employees</SelectItem>
                                                    <SelectItem value="5-20">5-20 Employees</SelectItem>
                                                    <SelectItem value="20-50">20-50 Employees</SelectItem>
                                                    <SelectItem value="50+">50+ Employees</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">City</Label>
                                            <Input placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="h-9" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">State</Label>
                                            <Input placeholder="State" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="h-9" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Source</Label>
                                            <Select onValueChange={(val) => setFormData({ ...formData, source: val })}>
                                                <SelectTrigger className="h-9"><SelectValue placeholder="Found us?" /></SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Social Media">Social Media</SelectItem>
                                                    <SelectItem value="Referral">Referral</SelectItem>
                                                    <SelectItem value="Seminar">Seminar / Event</SelectItem>
                                                    <SelectItem value="Ads">Ads</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Payment & Welcome Kit */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">3</div>
                                        <h3 className="font-extrabold text-sm uppercase tracking-wider text-zinc-900">Payment & Logistics</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Amount Paid</Label>
                                            <Input placeholder="Amount" value={formData.paymentAmount} onChange={e => setFormData({ ...formData, paymentAmount: e.target.value })} className="h-9" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Payment Mode</Label>
                                            <Select onValueChange={(val) => setFormData({ ...formData, paymentMethod: val })} defaultValue="Cash">
                                                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Cash">Cash</SelectItem>
                                                    <SelectItem value="UPI">UPI / QR</SelectItem>
                                                    <SelectItem value="Bank">Bank Transfer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-zinc-600">Reference ID</Label>
                                            <Input placeholder="Optional" value={formData.paymentRef} onChange={e => setFormData({ ...formData, paymentRef: e.target.value })} className="h-9" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between border p-3 rounded-xl bg-zinc-50 border-zinc-200">
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" id="kitGiven" checked={formData.kitGiven} onChange={e => setFormData({ ...formData, kitGiven: e.target.checked })} className="h-4 w-4 text-emerald-600 rounded" />
                                            <Label htmlFor="kitGiven" className="cursor-pointer text-xs font-bold text-zinc-700">Welcome Kit Handed Over?</Label>
                                        </div>
                                        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest italic">Physical Handover</div>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleCreateUser} className="bg-emerald-600 hover:bg-emerald-700 w-full text-white font-bold text-lg">Create & Send WhatsApp</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="Search users..."
                        className="pl-9 bg-zinc-50 border-zinc-200 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px] bg-zinc-50 border-zinc-200">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active Learners</SelectItem>
                        <SelectItem value="inactive">Stalled / New</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Users Table */}
            <div className="rounded-xl border border-zinc-200 overflow-x-auto shadow-sm bg-white scrollbar-hide">
                <Table>
                    <TableHeader className="bg-zinc-50/50">
                        <TableRow className="border-zinc-200 whitespace-nowrap">
                            <TableHead className="w-12 text-center">
                                <input type="checkbox" className="rounded border-zinc-300"
                                    onChange={(e) => setSelectedUsers(e.target.checked ? filteredUsers.map(u => u.id) : [])}
                                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                />
                            </TableHead>
                            <TableHead className="font-extrabold text-zinc-900 px-6 min-w-[200px]">User Profile</TableHead>
                            <TableHead className="font-extrabold text-zinc-900 min-w-[150px]">Activity & Kit</TableHead>
                            <TableHead className="font-extrabold text-zinc-900 min-w-[150px]">Engagement</TableHead>
                            <TableHead className="text-right font-extrabold text-zinc-900 px-6 min-w-[120px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id} className="border-zinc-100 hover:bg-zinc-50">
                                <TableCell className="text-center">
                                    <input type="checkbox" className="rounded border-zinc-300"
                                        checked={selectedUsers.includes(user.id)}
                                        onChange={() => toggleSelectUser(user.id)}
                                    />
                                </TableCell>
                                <TableCell className="px-6">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-zinc-900 text-sm">{user.name}</span>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50 px-1.5 rounded">{user.businessName}</span>
                                            <span className="text-[10px] text-zinc-300">|</span>
                                            <span className="text-[10px] text-zinc-500">{user.mobile}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1.5 items-start">
                                        <div className="flex gap-1.5">
                                            <Badge variant="outline" className={cn(
                                                "uppercase text-[9px] font-black h-5",
                                                user.tasksCompleted > 0 ? "text-emerald-600 border-emerald-100 bg-emerald-50" : "text-zinc-500 bg-zinc-100 border-zinc-200"
                                            )}>
                                                {user.tasksCompleted > 0 ? 'Active' : 'New'}
                                            </Badge>
                                            <Badge variant="outline" className="border-amber-100 text-amber-600 bg-amber-50 uppercase text-[9px] font-black h-5">
                                                {user.kitStatus}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 mt-0.5">
                                            <Clock className="h-3 w-3 text-indigo-400" />
                                            Active {user.lastLogin || '2h ago'}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="w-full max-w-[150px] space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold text-zinc-600">
                                            <span>Week {user.tasksCompleted}</span>
                                            <span className="text-amber-600">{Math.round((user.tasksCompleted / 52) * 100)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.3)]" style={{ width: `${(user.tasksCompleted / 52) * 100}%` }} />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right px-6">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                            onClick={() => window.open(`https://wa.me/${user.mobile?.replace(/\D/g, '')}`, '_blank')}
                                        >
                                            <MessageSquare className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                            title="Login as User"
                                            onClick={() => toast.success(`Impersonating ${user.name}...`)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 rounded-lg">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            {/* Using DialogContent for a centered popup/modal */}
                                            <DialogContent className="max-w-2xl bg-white border-zinc-200 text-zinc-900 max-h-[85vh] overflow-hidden flex flex-col">
                                                <DialogHeader className="pb-4 border-b border-zinc-100 flex-shrink-0">
                                                    <DialogTitle>User Profile: {user.name}</DialogTitle>
                                                    <DialogDescription>Manage details and track progress.</DialogDescription>
                                                </DialogHeader>

                                                <div className="flex-1 overflow-y-auto pr-2">
                                                    <Tabs defaultValue="overview" className="mt-2">
                                                        <TabsList className="grid w-full grid-cols-3 bg-zinc-100">
                                                            <TabsTrigger value="overview">Overview</TabsTrigger>
                                                            <TabsTrigger value="progress">Progress</TabsTrigger>
                                                            <TabsTrigger value="history">History</TabsTrigger>
                                                        </TabsList>

                                                        {/* 1. Overview Tab */}
                                                        <TabsContent value="overview" className="space-y-4 mt-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs text-zinc-500">Full Name</Label>
                                                                    <Input defaultValue={user.name} className="h-8" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs text-zinc-500">Business</Label>
                                                                    <Input defaultValue={user.businessName} className="h-8" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs text-zinc-500">Email</Label>
                                                                    <Input defaultValue={user.email} className="h-8" />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <Label className="text-xs text-zinc-500">Mobile</Label>
                                                                    <Input defaultValue={user.mobile} className="h-8" />
                                                                </div>
                                                            </div>

                                                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 space-y-2">
                                                                <h4 className="font-semibold text-amber-800 text-sm flex items-center gap-2">
                                                                    <ShieldAlert className="h-4 w-4" /> Security & Access
                                                                </h4>
                                                                <div className="flex gap-2">
                                                                    <Button size="sm" variant="outline" className="bg-white border-amber-200 text-amber-700 hover:bg-amber-100">Reset Password</Button>
                                                                    <Button size="sm" variant="outline" className="bg-white border-red-200 text-red-600 hover:bg-red-50">Block Access</Button>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label>Admin Notes</Label>
                                                                <Textarea placeholder="Add private notes specific to this user (e.g., Follow-up calls)" />
                                                                <Button size="sm" className="w-full bg-zinc-800 text-white">Save Notes</Button>
                                                            </div>
                                                        </TabsContent>

                                                        {/* 2. Progress Tab */}
                                                        <TabsContent value="progress" className="mt-4">
                                                            <ScrollArea className="h-[300px] pr-4">
                                                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                                                    {Array.from({ length: 52 }).map((_, i) => {
                                                                        const isDone = i < user.tasksCompleted;
                                                                        return (
                                                                            <div key={i} className={`p-2 rounded border text-center text-xs ${isDone ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-zinc-50 text-zinc-400'}`}>
                                                                                <div className="font-bold">W{i + 1}</div>
                                                                                <div>{isDone ? 'DONE' : '-'}</div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </ScrollArea>
                                                        </TabsContent>

                                                        {/* 3. History Tab */}
                                                        <TabsContent value="history" className="mt-4">
                                                            <div className="space-y-4">
                                                                <div className="flex items-start gap-3 text-sm">
                                                                    <div className="mt-0.5 bg-green-100 p-1 rounded-full"><UserCheck className="h-3 w-3 text-green-600" /></div>
                                                                    <div>
                                                                        <p className="font-medium text-zinc-900">User Registered</p>
                                                                        <p className="text-zinc-500 text-xs">{user.joinedAt} via Admin Panel</p>
                                                                    </div>
                                                                </div>
                                                                {user.lastLogin && (
                                                                    <div className="flex items-start gap-3 text-sm">
                                                                        <div className="mt-0.5 bg-blue-100 p-1 rounded-full"><Eye className="h-3 w-3 text-blue-600" /></div>
                                                                        <div>
                                                                            <p className="font-medium text-zinc-900">Last Successful Login</p>
                                                                            <p className="text-zinc-500 text-xs">{user.lastLogin}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="flex items-start gap-3 text-sm">
                                                                    <div className="mt-0.5 bg-amber-100 p-1 rounded-full"><Package className="h-3 w-3 text-amber-600" /></div>
                                                                    <div>
                                                                        <p className="font-medium text-zinc-900">Kit Status Updated</p>
                                                                        <p className="text-zinc-500 text-xs text-zinc-600">Marked as {user.kitStatus}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </TabsContent>
                                                    </Tabs>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                                    No users found matching your criteria.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
