import React from 'react';
import { Users, FileText, Activity, CreditCard, Clock, ChevronRight, TrendingUp } from 'lucide-react';

const DashboardView = ({ stats }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-slate-900">System Overview</h2>
        <p className="text-sm text-slate-600 mt-1">Monitor real-time metrics and recent activities</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Visitors (30d)', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Quote Requests', value: stats.leads, icon: FileText, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Active Policies', value: stats.policies, icon: CreditCard, color: 'text-brand-gold', bg: 'bg-brand-gold/10' },
          { label: 'Pending Endorsements', value: stats.endorsements, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900">Recent Activity</h3>
            <button className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { time: '10 mins ago', text: 'New Car Insurance quote request from Rajesh K.', type: 'quote' },
              { time: '1 hour ago', text: 'Health policy PP-HEA-104928 successfully renewed.', type: 'renewal' },
              { time: '2 hours ago', text: 'New contact inquiry received regarding Corporate plan.', type: 'inquiry' }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Activity size={14} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{act.text}</p>
                  <span className="text-[10px] font-bold text-slate-500">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-brand-navy to-slate-900 p-6 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={100} />
          </div>
          <h3 className="text-lg font-black mb-6 relative z-10">Quick Actions</h3>
          <div className="space-y-3 relative z-10">
            {['Generate Monthly Report', 'Update Homepage Banner', 'Add New Garage', 'Review Pending Claims'].map((action, i) => (
              <button key={i} className="w-full text-left px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-sm font-semibold transition-all flex items-center justify-between">
                {action}
                <ChevronRight size={16} className="text-brand-gold" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
