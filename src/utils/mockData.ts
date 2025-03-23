
// Mock data for the sustainability platform

export interface Supplier {
  id: string;
  name: string;
  location: string;
  tier: 'primary' | 'secondary' | 'tertiary';
  lastVerified: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  sustainabilityScore: number;
  certifications: string[];
  category: string;
}

export interface SustainabilityMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  target: number;
  periodLabel: string;
}

export interface VerificationActivity {
  id: string;
  supplier: string;
  activity: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  type: 'audit' | 'certification' | 'report' | 'update';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  status: 'published' | 'draft';
}

export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in-progress' | 'pending';
  dueDate: string;
  assignee: string;
}

// Sample suppliers
export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'EcoHarvest Materials',
    location: 'Portland, OR',
    tier: 'primary',
    lastVerified: '2023-11-15',
    verificationStatus: 'verified',
    sustainabilityScore: 92,
    certifications: ['B Corp', 'FSC', 'Carbon Neutral'],
    category: 'Raw Materials'
  },
  {
    id: '2',
    name: 'GreenTech Manufacturing',
    location: 'Austin, TX',
    tier: 'primary',
    lastVerified: '2023-10-22',
    verificationStatus: 'verified',
    sustainabilityScore: 87,
    certifications: ['ISO 14001', 'Green-e', 'Fair Trade'],
    category: 'Manufacturing'
  },
  {
    id: '3',
    name: 'Circular Packaging Co.',
    location: 'Minneapolis, MN',
    tier: 'secondary',
    lastVerified: '2023-09-30',
    verificationStatus: 'verified',
    sustainabilityScore: 85,
    certifications: ['Cradle to Cradle', 'EcoLogo'],
    category: 'Packaging'
  },
  {
    id: '4',
    name: 'Sustainable Logistics',
    location: 'Seattle, WA',
    tier: 'primary',
    lastVerified: '2023-12-01',
    verificationStatus: 'pending',
    sustainabilityScore: 78,
    certifications: ['SmartWay', 'ISO 14001'],
    category: 'Logistics'
  },
  {
    id: '5',
    name: 'Pure Elements Processors',
    location: 'Denver, CO',
    tier: 'secondary',
    lastVerified: '2023-08-15',
    verificationStatus: 'expired',
    sustainabilityScore: 72,
    certifications: ['Organic', 'Non-GMO'],
    category: 'Processing'
  },
  {
    id: '6',
    name: 'EthicalSource Textiles',
    location: 'New York, NY',
    tier: 'primary',
    lastVerified: '2023-11-05',
    verificationStatus: 'verified',
    sustainabilityScore: 89,
    certifications: ['GOTS', 'Fair Trade', 'OEKO-TEX'],
    category: 'Textiles'
  },
];

// Sample sustainability metrics
export const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: '1',
    name: 'Carbon Footprint',
    value: 1842,
    unit: 'tons CO2e',
    trend: 'down',
    change: 12.4,
    target: 1500,
    periodLabel: 'FY 2023'
  },
  {
    id: '2',
    name: 'Water Usage',
    value: 3750,
    unit: 'kiloliters',
    trend: 'down',
    change: 8.2,
    target: 3200,
    periodLabel: 'Q4 2023'
  },
  {
    id: '3',
    name: 'Renewable Energy',
    value: 68,
    unit: '%',
    trend: 'up',
    change: 15.3,
    target: 85,
    periodLabel: 'YTD'
  },
  {
    id: '4',
    name: 'Waste Diverted',
    value: 92,
    unit: '%',
    trend: 'up',
    change: 5.7,
    target: 95,
    periodLabel: 'Q4 2023'
  },
  {
    id: '5',
    name: 'Ethical Compliance',
    value: 97,
    unit: '%',
    trend: 'stable',
    change: 0.5,
    target: 100,
    periodLabel: 'YTD'
  },
  {
    id: '6',
    name: 'Circular Materials',
    value: 72,
    unit: '%',
    trend: 'up',
    change: 18.2,
    target: 85,
    periodLabel: 'FY 2023'
  }
];

// Sample verification activities
export const verificationActivities: VerificationActivity[] = [
  {
    id: '1',
    supplier: 'EcoHarvest Materials',
    activity: 'Annual Sustainability Audit',
    date: '2023-11-15',
    status: 'completed',
    type: 'audit'
  },
  {
    id: '2',
    supplier: 'GreenTech Manufacturing',
    activity: 'ISO 14001 Certification Renewal',
    date: '2023-12-10',
    status: 'scheduled',
    type: 'certification'
  },
  {
    id: '3',
    supplier: 'Circular Packaging Co.',
    activity: 'Quarterly GHG Emissions Report',
    date: '2023-10-30',
    status: 'completed',
    type: 'report'
  },
  {
    id: '4',
    supplier: 'Sustainable Logistics',
    activity: 'Supply Chain Ethics Verification',
    date: '2023-12-03',
    status: 'in-progress',
    type: 'audit'
  },
  {
    id: '5',
    supplier: 'Pure Elements Processors',
    activity: 'Supplier Documentation Update',
    date: '2023-11-28',
    status: 'in-progress',
    type: 'update'
  }
];

// Performance summary
export const performanceSummary = {
  overallScore: 84,
  supplierCompliance: 91,
  verifiedClaims: 78,
  improvementRate: 12.5,
  riskLevel: 'Low',
  topPerformer: 'EcoHarvest Materials',
  improvementAreas: ['Scope 3 Emissions', 'Supplier Diversity', 'Material Traceability'],
  recentMilestones: ['Achieved 75% renewable energy', 'Reduced water usage by 8%', 'Onboarded 12 new verified suppliers']
};

// Sample users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=1'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'Verifier',
    avatar: 'https://i.pravatar.cc/150?u=2'
  },
  {
    id: '3',
    name: 'Michael Thompson',
    email: 'michael.thompson@example.com',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=3'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    role: 'Verifier',
    avatar: 'https://i.pravatar.cc/150?u=4'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'Supplier Manager',
    avatar: 'https://i.pravatar.cc/150?u=5'
  }
];

// Sample reports
export const reports: Report[] = [
  {
    id: '1',
    title: 'Q4 Sustainability Report',
    date: '2023-12-15',
    status: 'published'
  },
  {
    id: '2',
    title: 'Carbon Footprint Analysis',
    date: '2023-11-10',
    status: 'published'
  },
  {
    id: '3',
    title: 'Supply Chain Ethics Review',
    date: '2024-01-05',
    status: 'draft'
  },
  {
    id: '4',
    title: 'Annual ESG Performance',
    date: '2023-12-28',
    status: 'draft'
  },
  {
    id: '5',
    title: 'Supplier Compliance Summary',
    date: '2023-11-30',
    status: 'published'
  }
];

// Sample tasks
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Complete Q1 Supplier Audits',
    priority: 'high',
    status: 'in-progress',
    dueDate: 'Mar 31, 2024',
    assignee: 'Sarah Williams'
  },
  {
    id: '2',
    title: 'Review New Supplier Applications',
    priority: 'medium',
    status: 'pending',
    dueDate: 'Apr 15, 2024',
    assignee: 'Michael Thompson'
  },
  {
    id: '3',
    title: 'Update Sustainability Metrics Dashboard',
    priority: 'low',
    status: 'completed',
    dueDate: 'Mar 10, 2024',
    assignee: 'Alex Johnson'
  },
  {
    id: '4',
    title: 'Prepare Monthly Compliance Report',
    priority: 'high',
    status: 'pending',
    dueDate: 'Apr 05, 2024',
    assignee: 'Emma Davis'
  },
  {
    id: '5',
    title: 'Conduct Supply Chain Risk Assessment',
    priority: 'medium',
    status: 'in-progress',
    dueDate: 'Apr 20, 2024',
    assignee: 'David Wilson'
  }
];
