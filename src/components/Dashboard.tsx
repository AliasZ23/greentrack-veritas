
import React from 'react';
import { ChevronDown, Filter, Plus, RefreshCw, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { suppliers, sustainabilityMetrics, performanceSummary, verificationActivities } from '@/utils/mockData';
import MetricsPanel from './MetricsPanel';
import SupplierCard from './SupplierCard';
import SustainabilityScore from './SustainabilityScore';
import VerificationBadge from './VerificationBadge';
import TransitionComponent from './TransitionComponent';
import AnimatedCounter from './AnimatedCounter';

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Dashboard header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <TransitionComponent animation="fade-up" delay={100}>
          <div>
            <h1 className="text-3xl font-semibold">Sustainability Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track, verify, and improve your supply chain sustainability</p>
          </div>
        </TransitionComponent>
        
        <TransitionComponent animation="fade-up" delay={200}>
          <div className="flex space-x-3">
            <button className="flex items-center px-3 py-2 rounded-lg bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
              <Filter className="w-4 h-4 mr-1.5" />
              Filter
            </button>
            <button className="flex items-center px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4 mr-1.5" />
              Add Supplier
            </button>
          </div>
        </TransitionComponent>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TransitionComponent animation="scale-in" delay={100}>
          <div className="glass-card p-5 rounded-xl">
            <p className="text-sm font-medium text-muted-foreground">Overall Sustainability</p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <h3 className="text-2xl font-semibold">
                  <AnimatedCounter value={performanceSummary.overallScore} />
                </h3>
                <p className="text-xs text-muted-foreground mt-1">out of 100</p>
              </div>
              <SustainabilityScore score={performanceSummary.overallScore} size="md" showLabel={false} />
            </div>
          </div>
        </TransitionComponent>
        
        <TransitionComponent animation="scale-in" delay={200}>
          <div className="glass-card p-5 rounded-xl">
            <p className="text-sm font-medium text-muted-foreground">Supplier Compliance</p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <h3 className="text-2xl font-semibold">
                  <AnimatedCounter value={performanceSummary.supplierCompliance} />%
                </h3>
                <p className="text-xs text-muted-foreground mt-1">of suppliers compliant</p>
              </div>
              <div className="h-12 w-12 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-eco-green-500">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="126" strokeDashoffset="13" />
                </svg>
              </div>
            </div>
          </div>
        </TransitionComponent>
        
        <TransitionComponent animation="scale-in" delay={300}>
          <div className="glass-card p-5 rounded-xl">
            <p className="text-sm font-medium text-muted-foreground">Verified Claims</p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <h3 className="text-2xl font-semibold">
                  <AnimatedCounter value={performanceSummary.verifiedClaims} />%
                </h3>
                <p className="text-xs text-muted-foreground mt-1">of claims verified</p>
              </div>
              <div className="h-12 w-12 flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-ocean-blue-500">
                  <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="2" />
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" strokeDasharray="126" strokeDashoffset="28" />
                </svg>
              </div>
            </div>
          </div>
        </TransitionComponent>
        
        <TransitionComponent animation="scale-in" delay={400}>
          <div className="glass-card p-5 rounded-xl">
            <p className="text-sm font-medium text-muted-foreground">Improvement Rate</p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <h3 className="text-2xl font-semibold flex items-center">
                  +<AnimatedCounter value={performanceSummary.improvementRate} />%
                </h3>
                <p className="text-xs text-muted-foreground mt-1">year over year</p>
              </div>
              <div className="h-12 w-12 flex items-center justify-center">
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-eco-green-500">
                  <path d="M1 29L13.8571 16.1429L21.5714 23.8571L39 6.42857" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M39 15.7143V6.42857H29.7143" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </TransitionComponent>
      </div>
      
      {/* Metrics section */}
      <TransitionComponent animation="fade-up">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Key Sustainability Metrics</h2>
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Refresh
            </button>
          </div>
          
          <MetricsPanel metrics={sustainabilityMetrics} />
        </div>
      </TransitionComponent>
      
      {/* Suppliers section */}
      <TransitionComponent animation="fade-up">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Verified Suppliers</h2>
            <div className="flex items-center space-x-3">
              <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span>View all</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.slice(0, 6).map((supplier, index) => (
              <SupplierCard key={supplier.id} supplier={supplier} index={index} />
            ))}
          </div>
        </div>
      </TransitionComponent>
      
      {/* Recent activities */}
      <TransitionComponent animation="fade-up">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Verification Activities</h2>
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="w-4 h-4 mr-1.5" />
              View Calendar
            </button>
          </div>
          
          <div className="overflow-hidden glass-card rounded-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-4 px-5 text-sm font-medium">Supplier</th>
                    <th className="text-left py-4 px-5 text-sm font-medium">Activity</th>
                    <th className="text-left py-4 px-5 text-sm font-medium">Date</th>
                    <th className="text-left py-4 px-5 text-sm font-medium">Status</th>
                    <th className="text-left py-4 px-5 text-sm font-medium">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {verificationActivities.map((activity, index) => (
                    <tr 
                      key={activity.id} 
                      className={cn(
                        "transition-colors hover:bg-secondary/40",
                        index !== verificationActivities.length - 1 && "border-b border-gray-200 dark:border-gray-800"
                      )}
                    >
                      <td className="py-3.5 px-5 text-sm">{activity.supplier}</td>
                      <td className="py-3.5 px-5 text-sm">{activity.activity}</td>
                      <td className="py-3.5 px-5 text-sm">{new Date(activity.date).toLocaleDateString()}</td>
                      <td className="py-3.5 px-5 text-sm">
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          activity.status === 'completed' ? "bg-eco-green-100 text-eco-green-800" :
                          activity.status === 'in-progress' ? "bg-ocean-blue-100 text-ocean-blue-800" :
                          "bg-warm-gray-100 text-warm-gray-800"
                        )}>
                          {activity.status === 'completed' ? "Completed" :
                           activity.status === 'in-progress' ? "In Progress" :
                           "Scheduled"}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-sm">
                        <span className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          activity.type === 'audit' ? "bg-purple-100 text-purple-800" :
                          activity.type === 'certification' ? "bg-amber-100 text-amber-800" :
                          activity.type === 'report' ? "bg-blue-100 text-blue-800" :
                          "bg-warm-gray-100 text-warm-gray-800"
                        )}>
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TransitionComponent>
    </div>
  );
};

export default Dashboard;
