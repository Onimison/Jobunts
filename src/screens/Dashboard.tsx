/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { MOCK_APPLICATIONS } from '../constants';
import { AlertCircle, CheckCircle2, ArrowRight, FileText, Briefcase } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const masterCVUpdated = localStorage.getItem('master_cv_updated');
  const activeApps = MOCK_APPLICATIONS.filter(app => app.status !== 'Rejected').length;

  return (
    <Layout>
      <div className="space-y-8 py-4">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Good morning, Bashir</h1>
          <p className="text-[#6B7280]">You have {activeApps} active applications in your pipeline.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-[8px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-[18px] font-bold flex items-center gap-2">
                  <span className="text-[#6366F1]">✨</span> Tailor a new CV
                </h2>
                <p className="text-[#6B7280] text-[14px]">Paste a job description and get a tailored version in under 60 seconds.</p>
              </div>
              <button 
                onClick={() => navigate('/tailor/new')}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                Start Tailoring <ArrowRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold flex items-center gap-2">
                  <Briefcase size={18} className="text-[#6B7280]" />
                  Recent Activity
                </h3>
                <button 
                  onClick={() => navigate('/applications')}
                  className="text-[13px] text-[#6366F1] font-medium hover:underline"
                >
                  View tracker
                </button>
              </div>

              <div className="bg-white rounded-[8px] border border-[#E5E7EB] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                      <th className="px-6 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider">Job Title</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider text-center">Status</th>
                      <th className="px-6 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {MOCK_APPLICATIONS.map((app) => (
                      <tr 
                        key={app.id} 
                        className="hover:bg-[#F9FAFB] transition-colors cursor-pointer group"
                        onClick={() => navigate('/applications')}
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#111827] text-[14px]">{app.jobTitle}</span>
                            <span className="text-[12px] text-[#6B7280]">{app.company}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`badge ${
                            app.status === 'Applied' ? 'bg-[#E0F2FE] text-[#0369A1]' :
                            app.status === 'Interviewing' ? 'bg-[#D1FAE5] text-[#065F46]' :
                            app.status === 'Saved' ? 'bg-[#F4F4F5] text-[#3F3F46]' :
                            'bg-[#FEE2E2] text-[#B91C1C]'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-[#9CA3AF] text-[13px]">
                          {app.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`card p-5 space-y-4 border-l-4 ${masterCVUpdated ? 'border-l-[#22C55E]' : 'border-l-[#F59E0B]'}`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-[14px] font-bold flex items-center gap-2">
                    <FileText size={16} className={masterCVUpdated ? 'text-[#22C55E]' : 'text-[#F59E0B]'} />
                    Master CV Status
                  </h3>
                  {masterCVUpdated ? (
                    <p className="text-[12px] text-[#6B7280]">
                      Last updated {new Date(masterCVUpdated).toLocaleDateString()}
                    </p>
                  ) : (
                    <p className="text-[12px] text-[#6B7280]">
                      You haven’t set up your Master CV yet.
                    </p>
                  )}
                </div>
                {masterCVUpdated ? (
                  <CheckCircle2 size={18} className="text-[#22C55E]" />
                ) : (
                  <AlertCircle size={18} className="text-[#F59E0B]" />
                )}
              </div>
              <button 
                onClick={() => navigate('/profile/cv')}
                className="w-full btn-secondary text-[13px] py-1.5"
              >
                {masterCVUpdated ? 'Update Master CV' : 'Set up Master CV'}
              </button>
            </div>

            <div className="card p-5 bg-[#18181B] text-white space-y-4">
              <div className="space-y-1">
                <h3 className="text-[14px] font-bold">Pro Account</h3>
                <p className="text-gray-400 text-[12px]">Unlock unlimited tailoring and precision gap analysis.</p>
              </div>
              <button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] transition-colors py-2 rounded-[6px] text-[13px] font-semibold active:scale-[0.98]">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

