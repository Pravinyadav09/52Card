export type User = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  businessName?: string;
  address?: string;
  paymentRef: string;
  role: 'admin' | 'user';
  tasksCompleted: number;
  totalTasks: number;
  joinedAt: string;
  lastLogin?: string;
  avatarUrl?: string;
  kitStatus: 'Pending' | 'Shipped' | 'In Transit' | 'Delivered' | 'Returned' | 'Failed';
  trackingId?: string;
  courierPartner?: string;
  expectedDelivery?: string;
  actualDelivery?: string;
  shippingCost?: number;
  paymentDate?: string;
  isBlocked?: boolean;
  industry?: string;
  primaryGoal?: string;
  teamSize?: string;
  source?: string;
  city?: string;
  state?: string;
};

export type WeekData = {
  id: number;
  title: string;
  description: string;
  videoUrl: string; // Embed URL
  isLocked: boolean;
  isCompleted: boolean;
  checklist: string[];
  downloads: { name: string; url: string }[];
};

export type BookingRequest = {
  id: string;
  userId: string;
  userName: string;
  userMobile?: string;
  topic: string;
  requestedDate: string;
  requestedTime: string;
  duration: number; // in minutes
  status: 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled';
  expertId?: string;
  expertName?: string;
  meetingLink?: string;
  notes?: string;
  rating?: number;
  tags?: string[];
};

export type Expert = {
  id: string;
  name: string;
  expertise: string[];
  email: string;
  phone: string;
  availability: string; // e.g. "Mon-Fri 10AM-5PM"
  maxSlotsPerWeek: number;
  currentSlotsThisWeek: number;
  avatarUrl?: string;
};

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    mobile: '+91 9876543210',
    businessName: 'RK Enterprises',
    address: '123, Gandhi Nagar, Delhi - 110001',
    paymentRef: 'TXN123456',
    role: 'user',
    tasksCompleted: 5,
    totalTasks: 52,
    joinedAt: '2023-11-01',
    lastLogin: '2023-11-10',
    kitStatus: 'Delivered',
    trackingId: 'AWB123456789',
    courierPartner: 'India Post',
    expectedDelivery: '2023-11-08',
    actualDelivery: '2023-11-09',
    shippingCost: 80,
    paymentDate: '2023-11-01',
    isBlocked: false,
  },
  {
    id: 'u2',
    name: 'Amit Singh',
    email: 'amit@example.com',
    mobile: '+91 9123456780',
    businessName: 'Amit Traders',
    address: '45, Market Road, Mumbai - 400001',
    paymentRef: 'CASH',
    role: 'user',
    tasksCompleted: 12,
    totalTasks: 52,
    joinedAt: '2023-10-15',
    lastLogin: '2023-11-05',
    kitStatus: 'Shipped',
    trackingId: 'AWB987654321',
    courierPartner: 'DTDC',
    expectedDelivery: '2023-10-22',
    shippingCost: 120,
    paymentDate: '2023-10-15',
    isBlocked: false,
  },
  {
    id: 'u3',
    name: 'Sneha Gupta',
    email: 'sneha@example.com',
    mobile: '+91 9988776655',
    businessName: 'Creative Solutions',
    address: '77, Tech Park, Bangalore - 560001',
    paymentRef: 'UPI776655',
    role: 'user',
    tasksCompleted: 1,
    totalTasks: 52,
    joinedAt: '2023-11-12',
    lastLogin: '2023-11-12',
    kitStatus: 'Pending',
    paymentDate: '2023-11-12',
    isBlocked: false,
  },
  {
    id: 'u4',
    name: 'Vikram Mehta',
    email: 'vikram@example.com',
    mobile: '+91 9888877777',
    address: 'Shop 12, Main Bazar, Jaipur',
    paymentRef: 'TXN998877',
    role: 'user',
    tasksCompleted: 0,
    totalTasks: 52,
    joinedAt: '2023-11-18',
    kitStatus: 'Pending',
    paymentDate: '2023-11-18',
    isBlocked: false,
  },
  {
    id: 'u5',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    mobile: '+91 9777766666',
    address: 'A-402, Highrise Apartments, Pune',
    paymentRef: 'UPI112233',
    role: 'user',
    tasksCompleted: 8,
    totalTasks: 52,
    joinedAt: '2023-11-05',
    kitStatus: 'In Transit',
    trackingId: 'AWB554433221',
    courierPartner: 'BlueDart',
    expectedDelivery: '2023-11-12',
    paymentDate: '2023-11-05',
    isBlocked: false,
  },
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@portal.com',
    mobile: '+91 8888888888',
    paymentRef: 'N/A',
    role: 'admin',
    tasksCompleted: 0,
    totalTasks: 0,
    joinedAt: '2023-01-01',
    lastLogin: '2023-11-13',
    kitStatus: 'Delivered',
  },
];

export const MOCK_BOOKINGS: BookingRequest[] = [
  {
    id: 'b1',
    userId: 'u3',
    userName: 'Sneha Gupta',
    userMobile: '+91 9988776655',
    topic: 'Inventory Automation',
    requestedDate: '2023-11-20',
    requestedTime: '14:00',
    duration: 30,
    status: 'Pending'
  },
  {
    id: 'b2',
    userId: 'u1',
    userName: 'Rahul Kumar',
    userMobile: '+91 9876543210',
    topic: 'Sales Optimization',
    requestedDate: '2023-11-22',
    requestedTime: '10:00',
    duration: 30,
    status: 'Scheduled',
    expertId: 'e1',
    expertName: 'Manish Sir',
    meetingLink: 'https://zoom.us/j/123456789'
  },
  {
    id: 'b3',
    userId: 'u2',
    userName: 'Amit Singh',
    userMobile: '+91 9123456780',
    topic: 'Digital Marketing',
    requestedDate: '2023-11-15',
    requestedTime: '11:00',
    duration: 30,
    status: 'Completed',
    expertId: 'e2',
    expertName: 'Rahul (Consultant)',
    meetingLink: 'https://zoom.us/j/987654321',
    notes: 'Strategic plan for Meta ads discussed.',
    rating: 5
  }
];

export const MOCK_EXPERTS: Expert[] = [
  {
    id: 'e1',
    name: 'Manish Sir',
    expertise: ['Strategy', 'Automation', 'Inventory'],
    email: 'manish@system52.com',
    phone: '+91 9000000000',
    availability: 'Mon-Sat 10AM-1PM',
    maxSlotsPerWeek: 15,
    currentSlotsThisWeek: 8
  },
  {
    id: 'e2',
    name: 'Rahul (Consultant)',
    expertise: ['Digital Marketing', 'Sales'],
    email: 'rahul.c@system52.com',
    phone: '+91 9000000001',
    availability: 'Mon-Fri 2PM-6PM',
    maxSlotsPerWeek: 20,
    currentSlotsThisWeek: 12
  },
  {
    id: 'e3',
    name: 'Priya (Expert)',
    expertise: ['CRM', 'Operations'],
    email: 'priya@system52.com',
    phone: '+91 9000000002',
    availability: 'Tue-Fri 11AM-4PM',
    maxSlotsPerWeek: 10,
    currentSlotsThisWeek: 3
  }
];

export const MOCK_WEEKS: WeekData[] = Array.from({ length: 52 }, (_, i) => {
  const weekNum = i + 1;
  return {
    id: weekNum,
    title: `Week ${weekNum}: ${[
      'Business Foundation & Vision',
      'Inventory Control Mastery',
      'Sales Funnel Optimization',
      'Team & Leadership Growth',
      'Financial Audit & Planning',
      'Customer Service Excellence',
      'Marketing Multiplier',
      'Process Documentation',
      'Tech & Automation',
      'The 90 Day Sprint',
    ][i % 10]
      }`,
    description: `Complete the tasks for Week ${weekNum} to unlock the next level of growth.`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    isLocked: weekNum > 5, // Simulating 5 weeks unlocked
    isCompleted: weekNum <= 5,
    checklist: [
      'Watch the video completely',
      'Download the workbook',
      'Complete the exercise sheet',
      'Upload your progress',
    ],
    downloads: [
      { name: `Week ${weekNum} Workbook.pdf`, url: '#' },
      { name: 'Checklist.xlsx', url: '#' },
    ],
  };
});

export type HelpRequest = {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  status: 'Open' | 'Resolved';
  date: string;
};

export const MOCK_HELP_REQUESTS: HelpRequest[] = [
  { id: 'h1', userId: 'u3', userName: 'Sneha Gupta', subject: 'Week 2 video not playing', status: 'Open', date: '2023-11-13' },
  { id: 'h2', userId: 'u2', userName: 'Amit Singh', subject: 'Need invoice copy', status: 'Open', date: '2023-11-12' },
  { id: 'h3', userId: 'u1', userName: 'Rahul Kumar', subject: 'Login issue on mobile', status: 'Resolved', date: '2023-11-10' },
];
