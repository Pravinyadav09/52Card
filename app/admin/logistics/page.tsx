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
import { Checkbox } from "@/components/ui/checkbox";
import { MOCK_USERS, User } from "@/lib/mock-data";
import {
    Search, Truck, CheckCircle, AlertCircle,
    MoreHorizontal, Filter, Download,
    Calendar, Package, IndianRupee,
    MapPin, Phone, ExternalLink,
    AlertTriangle, History,
    Printer, Send, RefreshCcw,
    TrendingUp, ShieldAlert, ChevronRight,
    Clock, ClipboardList
} from "lucide-react";
import { toast } from "sonner";
import { format, addDays, isPast } from "date-fns";
import { cn } from "@/lib/utils";

export default function KitLogisticsPage() {
    const [users, setUsers] = useState<User[]>(MOCK_USERS.filter(u => u.role === 'user'));
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [trackingId, setTrackingId] = useState("");
    const [courierPartner, setCourierPartner] = useState("");
    const [dispatchDialogOpen, setDispatchDialogOpen] = useState(false);
    const [batchShipping, setBatchShipping] = useState<string[]>([]);

    // Stock Management State
    const [stockCount, setStockCount] = useState(142);
    const [addStockValue, setAddStockValue] = useState("");
    const [stockDialogOpen, setStockDialogOpen] = useState(false);

    const handleAddStock = () => {
        const count = parseInt(addStockValue);
        if (isNaN(count) || count <= 0) {
            toast.error("Please enter a valid quantity");
            return;
        }
        setStockCount(prev => prev + count);
        setAddStockValue("");
        setStockDialogOpen(false);
        toast.success(`Successfully added ${count} kits to inventory`);
    };

    // Analytics Calculation
    const stats = useMemo(() => {
        const pending = users.filter(u => u.kitStatus === 'Pending').length;
        const shippedToday = users.filter(u => u.kitStatus === 'Shipped' && u.joinedAt === format(new Date(), 'yyyy-MM-dd')).length; // Mock logic
        const delivered = users.filter(u => u.kitStatus === 'Delivered').length;
        const totalValue = users.reduce((acc, u) => acc + (u.shippingCost || 0), 0);
        const issues = users.filter(u => u.kitStatus === 'Failed' || u.kitStatus === 'Returned').length;
        const successRate = users.length > 0 ? Math.round((delivered / users.length) * 100) : 0;

        return { pending, shippedToday, delivered, totalValue, issues, successRate };
    }, [users]);

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.mobile.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || u.kitStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleUpdateStatus = (userId: string, status: User['kitStatus'], details?: Partial<User>) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, kitStatus: status, ...details } : u));
        toast.success(`Status updated to ${status}`);
    };

    const handleDispatch = () => {
        if (!selectedUser || !trackingId || !courierPartner) {
            toast.error("Please fill all details");
            return;
        }

        handleUpdateStatus(selectedUser.id, 'Shipped', {
            trackingId,
            courierPartner,
            expectedDelivery: format(addDays(new Date(), 7), 'yyyy-MM-dd')
        });
        setDispatchDialogOpen(false);
        setTrackingId("");
        setCourierPartner("");
        toast.success(`WhatsApp notification sent to ${selectedUser.name}`);
    };

    const toggleBatchSelect = (id: string) => {
        setBatchShipping(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const getStatusColor = (status: User['kitStatus']) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'In Transit': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Returned': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Failed': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    const getStatusIcon = (status: User['kitStatus']) => {
        switch (status) {
            case 'Pending': return <AlertCircle className="w-3.5 h-3.5 mr-1" />;
            case 'Shipped': return <Package className="w-3.5 h-3.5 mr-1" />;
            case 'In Transit': return <Truck className="w-3.5 h-3.5 mr-1" />;
            case 'Delivered': return <CheckCircle className="w-3.5 h-3.5 mr-1" />;
            case 'Returned': return <History className="w-3.5 h-3.5 mr-1" />;
            case 'Failed': return <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="p-4 sm:p-6 space-y-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Kit <span className="text-amber-500 italic">Logistics</span></h1>
                    <p className="text-sm font-medium text-zinc-500">Manage, track and fulfill welcome kit shipments.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="flex-1 md:flex-none border-zinc-200 bg-white hover:bg-zinc-50 shadow-sm transition-all active:scale-95 text-xs">
                        <Download className="w-3.5 h-3.5 mr-2" />
                        Export
                    </Button>
                    <Button className="flex-1 md:flex-none bg-zinc-900 text-white hover:bg-zinc-800 shadow-md shadow-zinc-200 transition-all active:scale-95 text-xs">
                        <Printer className="w-3.5 h-3.5 mr-2" />
                        Print Labels
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 transition-transform group-hover:scale-110 duration-500">
                        <Package size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-extrabold text-amber-100 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Total Kits Pending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-amber-100 mt-1 opacity-80 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +3 since yesterday
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 transition-transform group-hover:scale-110 duration-500">
                        <Send size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-extrabold text-blue-100 flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Shipped (Today/Week)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.shippedToday} / 12</div>
                        <p className="text-xs text-blue-100 mt-1 opacity-80">On schedule for delivery</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 transition-transform group-hover:scale-110 duration-500">
                        <CheckCircle size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-extrabold text-emerald-100 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Delivery Success Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.successRate}%</div>
                        <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                            <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: `${stats.successRate}%` }} />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-gradient-to-br from-rose-500 to-red-600 text-white overflow-hidden relative group">
                    <div className="absolute -right-4 -top-4 opacity-10 transition-transform group-hover:scale-110 duration-500">
                        <ShieldAlert size={120} />
                    </div>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-extrabold text-rose-100 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Issues / Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stats.issues}</div>
                        <p className="text-xs text-rose-100 mt-1 opacity-80 underline cursor-pointer hover:text-white">View problematic shipments</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
                {/* Search and Filters */}
                <div className="p-4 border-b border-zinc-100 bg-zinc-50/50 flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        <div className="relative w-full lg:w-80 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                            <Input
                                placeholder="Search by name or mobile..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white border-zinc-200 focus:ring-zinc-900 focus:border-zinc-900 rounded-lg h-10 w-full"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full lg:w-[180px] bg-white border-zinc-200 rounded-lg h-10">
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-zinc-400" />
                                    <SelectValue placeholder="All Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white border-zinc-200">
                                <SelectItem value="all">All Shipments</SelectItem>
                                <SelectItem value="Pending">Pending Dispatch</SelectItem>
                                <SelectItem value="Shipped">Shipped</SelectItem>
                                <SelectItem value="In Transit">In Transit</SelectItem>
                                <SelectItem value="Delivered">Delivered</SelectItem>
                                <SelectItem value="Returned">Returned / Failed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                        {batchShipping.length > 0 && (
                            <Button
                                variant="secondary"
                                className="bg-zinc-900 text-white hover:bg-zinc-800 animate-in zoom-in-95 duration-200 h-10 rounded-lg text-xs"
                                onClick={() => {
                                    toast.success(`Processing batch for ${batchShipping.length} orders`);
                                    setBatchShipping([]);
                                }}
                            >
                                <Truck className="w-4 h-4 mr-2" />
                                Ship ({batchShipping.length})
                            </Button>
                        )}
                        <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 h-10 text-xs" onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}>
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px] scrollbar-hide">
                    <Table>
                        <TableHeader className="bg-zinc-50/50">
                            <TableRow className="border-zinc-100 whitespace-nowrap">
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={batchShipping.length === filteredUsers.length && filteredUsers.length > 0}
                                        onCheckedChange={(checked) => {
                                            if (checked) setBatchShipping(filteredUsers.map(u => u.id));
                                            else setBatchShipping([]);
                                        }}
                                    />
                                </TableHead>
                                <TableHead className="text-zinc-900 font-extrabold text-xs uppercase tracking-tight min-w-[180px]">User Details</TableHead>
                                <TableHead className="text-zinc-900 font-extrabold text-xs uppercase tracking-tight min-w-[200px]">Shipping Address</TableHead>
                                <TableHead className="text-zinc-900 font-extrabold text-xs uppercase tracking-tight min-w-[180px]">Logistics Info</TableHead>
                                <TableHead className="text-zinc-900 font-extrabold text-xs uppercase tracking-tight min-w-[120px]">Status</TableHead>
                                <TableHead className="text-right text-zinc-900 font-extrabold text-xs uppercase tracking-tight min-w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-zinc-400 space-y-2">
                                            <Package size={48} className="opacity-20" />
                                            <p className="font-medium">No kit orders found matching filters.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                                        <TableCell>
                                            <Checkbox
                                                checked={batchShipping.includes(user.id)}
                                                onCheckedChange={() => toggleBatchSelect(user.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-zinc-900 flex items-center gap-1 group cursor-pointer hover:text-zinc-700">
                                                    {user.name}
                                                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </span>
                                                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                                                    <span className="bg-zinc-100 px-1.5 py-0.5 rounded font-mono truncate max-w-[80px]">{user.id}</span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {user.joinedAt}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col max-w-[250px] group">
                                                <div className="flex items-center gap-1.5 text-zinc-900 font-medium text-sm">
                                                    <MapPin className="w-3.5 h-3.5 text-zinc-400 group-hover:text-rose-500 transition-colors shrink-0" />
                                                    <span className="truncate">{user.address || 'Address missing'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-zinc-500 text-xs mt-1">
                                                    <Phone className="w-3 h-3 shrink-0" />
                                                    {user.mobile}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {user.kitStatus === 'Pending' ? (
                                                <span className="text-zinc-400 text-sm italic">Fulfillment pending</span>
                                            ) : (
                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary" className="bg-white border-zinc-200 text-zinc-700 text-[10px] font-bold py-0">
                                                            {user.courierPartner || 'Unknown'}
                                                        </Badge>
                                                        <span className="text-xs font-mono text-zinc-500">{user.trackingId}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">
                                                        Exp Delivery: {user.expectedDelivery || 'TBD'}
                                                        {user.expectedDelivery && isPast(new Date(user.expectedDelivery)) && user.kitStatus !== 'Delivered' && (
                                                            <span className="text-rose-500 flex items-center gap-0.5 ml-1 animate-pulse">
                                                                <AlertTriangle className="w-2.5 h-2.5" />
                                                                DELAYED
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border flex items-center w-fit shadow-sm",
                                                getStatusColor(user.kitStatus)
                                            )}>
                                                {getStatusIcon(user.kitStatus)}
                                                {user.kitStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {user.kitStatus === 'Pending' ? (
                                                    <Dialog open={dispatchDialogOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                                                        setDispatchDialogOpen(open);
                                                        if (open) setSelectedUser(user);
                                                    }}>
                                                        <DialogTrigger asChild>
                                                            <Button size="sm" className="bg-zinc-900 border border-zinc-800 text-white hover:bg-black rounded-lg active:scale-95 transition-all h-8 font-bold text-[11px] uppercase tracking-tight shadow-md">
                                                                Ship Now
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="bg-white border-zinc-200 text-zinc-900 rounded-2xl w-full max-w-md shadow-2xl p-0 overflow-hidden">
                                                            <div className="bg-zinc-900 p-6 text-white text-center relative">
                                                                <div className="absolute top-4 right-4 text-white/20">
                                                                    <Package size={80} />
                                                                </div>
                                                                <Truck className="w-12 h-12 mx-auto mb-3 text-amber-400" />
                                                                <DialogHeader>
                                                                    <DialogTitle className="text-2xl font-bold text-white text-center">Process Shipment</DialogTitle>
                                                                    <DialogDescription className="text-zinc-400 text-sm mt-1 text-center font-normal">
                                                                        Ready to send the kit to {user.name}?
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                            </div>
                                                            <div className="p-6 space-y-6">
                                                                <div className="space-y-4">
                                                                    <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 flex items-start gap-3">
                                                                        <MapPin className="w-4 h-4 text-zinc-400 mt-1" />
                                                                        <div className="text-sm">
                                                                            <p className="font-bold text-zinc-900">Shipping Address</p>
                                                                            <p className="text-zinc-500 mt-0.5">{user.address}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="space-y-2 text-start">
                                                                            <Label className="text-xs font-bold uppercase text-zinc-400">Courier Partner</Label>
                                                                            <Select onValueChange={setCourierPartner}>
                                                                                <SelectTrigger className="bg-white border-zinc-200 h-10">
                                                                                    <SelectValue placeholder="Select" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-white border-zinc-200">
                                                                                    <SelectItem value="India Post">India Post</SelectItem>
                                                                                    <SelectItem value="BlueDart">BlueDart</SelectItem>
                                                                                    <SelectItem value="DTDC">DTDC</SelectItem>
                                                                                    <SelectItem value="Delhivery">Delhivery</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                        <div className="space-y-2 text-start">
                                                                            <Label className="text-xs font-bold uppercase text-zinc-400">Shipping Cost</Label>
                                                                            <div className="relative">
                                                                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                                                                                <Input defaultValue="100" className="pl-8 bg-white border-zinc-200 h-10" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-2 text-start">
                                                                        <Label className="text-xs font-bold uppercase text-zinc-400">Tracking Number (AWB)</Label>
                                                                        <Input
                                                                            placeholder="Enter AWB ID"
                                                                            className="bg-white border-zinc-200 focus:ring-zinc-900 h-10"
                                                                            value={trackingId}
                                                                            onChange={(e) => setTrackingId(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    onClick={handleDispatch}
                                                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg font-bold rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-95"
                                                                >
                                                                    Confirm & Notify User
                                                                </Button>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                ) : (
                                                    <Button variant="outline" size="sm" className="text-zinc-400 h-8 border-zinc-200 bg-zinc-50" disabled>
                                                        Details
                                                    </Button>
                                                )}

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-zinc-100 rounded-lg">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-56 bg-white border-zinc-200 shadow-xl rounded-xl p-1">
                                                        <DropdownMenuLabel className="text-[10px] uppercase font-bold text-zinc-400 px-2 py-1.5">Shipment Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer" onClick={() => handleUpdateStatus(user.id, 'In Transit')}>
                                                            <Truck className="w-4 h-4 text-zinc-500" />
                                                            Mark as In Transit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer" onClick={() => handleUpdateStatus(user.id, 'Delivered', { actualDelivery: format(new Date(), 'yyyy-MM-dd') })}>
                                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                            Mark as Delivered
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-zinc-100" />
                                                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                                                            <ExternalLink className="w-4 h-4 text-zinc-500" />
                                                            Track on Courier site
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer">
                                                            <Send className="w-4 h-4 text-green-500" />
                                                            Send WhatsApp Update
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-zinc-100" />
                                                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer text-rose-600 focus:text-rose-600" onClick={() => handleUpdateStatus(user.id, 'Failed')}>
                                                            <AlertTriangle className="w-4 h-4" />
                                                            Mark as Failed / Delay
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
                </div>

                {/* Footer / Pagination Mock */}
                <div className="p-4 border-t border-zinc-100 bg-white flex items-center justify-between text-xs text-zinc-500">
                    <p>Showing {filteredUsers.length} kits across 1 page</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-3 border-zinc-200 text-zinc-900 font-bold" disabled>Previous</Button>
                        <Button variant="outline" size="sm" className="h-8 px-3 border-zinc-200 bg-zinc-900 text-white hover:bg-zinc-800 font-bold" disabled>1</Button>
                        <Button variant="outline" size="sm" className="h-8 px-3 border-zinc-200 text-zinc-900 font-bold" disabled>Next</Button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Reports & Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-zinc-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-indigo-500" />
                            Shipping Logs
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-zinc-100">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-4 flex items-center gap-3 hover:bg-zinc-50/50 transition-colors">
                                    <div className="bg-blue-50 p-2 rounded-lg">
                                        <RefreshCcw className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-zinc-900 truncate">Status Update: AWB78239</p>
                                        <p className="text-xs text-zinc-500">Updated to In Transit by Admin • 2h ago</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-zinc-300" />
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full text-zinc-500 text-xs font-bold uppercase tracking-wider h-10 rounded-none border-t border-zinc-100">
                            View All Logs
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                        <CardTitle className="text-base font-bold flex items-center gap-2 text-zinc-900">
                            <Package className="w-5 h-5 text-amber-500" />
                            Inventory Level
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-black text-zinc-900">{stockCount}</p>
                                    <p className="text-xs text-zinc-500 font-bold uppercase">52-Card Kits in Stock</p>
                                </div>
                                <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-amber-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase text-zinc-400">
                                    <span>Stock Health</span>
                                    <span>{Math.min(100, Math.round((stockCount / 200) * 100))}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all duration-1000" style={{ width: `${Math.min(100, Math.round((stockCount / 200) * 100))}%` }} />
                                </div>
                                <p className="text-[10px] text-zinc-400 italic">
                                    {stockCount < 50 ? "⚠️ Critical: Restock immediately." : stockCount < 100 ? "Restock recommended within 7 days." : "Inventory levels healthy."}
                                </p>
                            </div>

                            <Dialog open={stockDialogOpen} onOpenChange={setStockDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-zinc-900 h-10 hover:bg-zinc-800 shadow-lg shadow-zinc-100">Add Stock</Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white border-zinc-200 text-zinc-900 rounded-2xl w-full max-w-xs p-0 overflow-hidden">
                                    <div className="bg-amber-500 p-6 text-white text-center">
                                        <Package className="w-10 h-10 mx-auto mb-2" />
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-bold text-white text-center">Restock Inventory</DialogTitle>
                                            <DialogDescription className="text-amber-100 text-xs font-medium text-center">
                                                How many new kits arrived?
                                            </DialogDescription>
                                        </DialogHeader>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Quantity</Label>
                                            <Input
                                                type="number"
                                                placeholder="e.g. 50"
                                                value={addStockValue}
                                                onChange={e => setAddStockValue(e.target.value)}
                                                className="bg-white border-zinc-200 h-12 text-lg font-bold text-center"
                                            />
                                        </div>
                                        <Button
                                            onClick={handleAddStock}
                                            className="w-full bg-zinc-900 h-12 rounded-xl font-bold shadow-lg"
                                        >
                                            Confirm Restock
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200 shadow-sm overflow-hidden lg:col-span-1 md:col-span-2">
                    <CardHeader className="bg-zinc-50 border-b border-zinc-100">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-emerald-500" />
                            Logistics Costs
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 text-center space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                                <p className="text-xs text-zinc-400 font-bold uppercase tracking-tight">This Month</p>
                                <p className="text-xl font-bold text-zinc-900">₹4,250</p>
                            </div>
                            <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                                <p className="text-xs text-zinc-400 font-bold uppercase tracking-tight">Avg per Kit</p>
                                <p className="text-xl font-bold text-zinc-900">₹92</p>
                            </div>
                        </div>
                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3 text-start">
                            <TrendingUp className="w-8 h-8 text-emerald-500 shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-emerald-800 uppercase">Cost Optimization</p>
                                <p className="text-[11px] text-emerald-600 leading-tight">Switching to India Post for NCR zone could save ₹15/kit.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
