/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_APPLICATIONS } from '../constants';
import { Search, Filter, MoreHorizontal, ExternalLink, Trash2, Copy, FileText } from 'lucide-react';

export default function ApplicationsTracker() {
  const [apps, setApps] = useState(MOCK_APPLICATIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(search.toLowerCase()) || 
                          app.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-[#E0F2FE] text-[#0369A1]';
      case 'Interviewing': return 'bg-[#D1FAE5] text-[#065F46]';
      case 'Rejected': return 'bg-[#FEE2E2] text-[#B91C1C]';
      case 'To Apply': return 'bg-[#DBEAFE] text-[#1E40AF]';
      case 'Saved': return 'bg-[#F4F4F5] text-[#3F3F46]';
      default: return 'bg-[#F4F4F5] text-[#3F3F46]';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-[#111827]">Applications</h1>
            <p className="text-[#6B7280] text-[14px]">Track and manage your tailored CVs.</p>
          </div>
          <button className="btn-primary">Add Application</button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 border border-[#E5E7EB] rounded-[8px]">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
            <input 
              type="text" 
              placeholder="Search roles, companies..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 text-[14px] bg-transparent outline-none"
            />
          </div>
          <div className="h-6 w-px bg-[#E5E7EB] hidden sm:block" />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={14} className="text-[#6B7280]" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-[14px] bg-transparent outline-none font-medium cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Saved">Saved</option>
              <option value="To Apply">To Apply</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-[8px] border border-[#E5E7EB] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="px-6 py-4 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Role & Company</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider text-center">CV Used</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider text-right">Date Applied</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredApps.length > 0 ? filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-[#F9FAFB] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#111827] text-[14px]">{app.jobTitle}</span>
                      <span className="text-[12px] text-[#6B7280]">{app.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      className={`text-[12px] font-medium px-2 py-0.5 rounded-full outline-none cursor-pointer transition-colors ${getStatusColor(app.status)}`}
                      defaultValue={app.status}
                    >
                      <option value="Saved">Saved</option>
                      <option value="To Apply">To Apply</option>
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="inline-flex items-center gap-1 text-[12px] text-[#6366F1] font-medium hover:underline">
                      <FileText size={12} /> {app.cvVersion}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right text-[#9CA3AF] text-[13px]">
                    {app.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-[#9CA3AF] hover:text-[#111827] hover:bg-[#E5E7EB] rounded-full transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#9CA3AF] space-y-2">
                    <p className="text-[16px]">No applications found.</p>
                    <p className="text-[14px]">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

