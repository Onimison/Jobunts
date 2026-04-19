/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Sparkles, 
  FileText, 
  ClipboardList, 
  Settings, 
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';

const LightningBolt = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.5 0L1 9.5H6.5L5 16L15 6H8.5L9.5 0Z" />
  </svg>
);

const NAV_ITEMS = [
  { label: 'Dashboard', icon: Home, path: '/' },
  { label: 'New Tailoring', icon: Sparkles, path: '/tailor/new', primary: true },
  { label: 'My CVs', icon: FileText, path: '/profile/cv' },
  { label: 'Applications', icon: ClipboardList, path: '/applications' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-[240px] h-screen bg-white border-r border-[#E5E7EB] flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-2">
        <div className="text-[#18181B]">
          <LightningBolt />
        </div>
        <span className="text-[16px] font-[700] text-[#18181B] tracking-tight">TailorFlow</span>
      </div>

      <div className="px-3 py-4">
        <div className="h-[1px] bg-[#E5E7EB] mb-6" />
        
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-[6px] text-[14px] transition-all duration-200
                ${isActive 
                  ? 'bg-[#F4F4F5] text-[#111827] border-l-2 border-[#18181B]' 
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] border-l-2 border-transparent'}
                ${item.primary ? 'font-semibold' : 'font-medium'}
              `}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-[#E5E7EB]">
        <button className="flex items-center gap-3 w-full p-2 hover:bg-[#F9FAFB] rounded-[6px] transition-all group">
          <div className="w-8 h-8 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[12px] font-semibold text-[#18181B] border border-[#E5E7EB]">
            B
          </div>
          <div className="flex flex-col items-start overflow-hidden">
            <span className="text-[13px] font-semibold text-[#111827] truncate w-full">Bashir</span>
            <span className="text-[11px] text-[#6B7280] truncate w-full">godbless@example.com</span>
          </div>
          <ChevronDown size={14} className="text-[#6B7280] group-hover:text-[#111827] transition-colors ml-auto" />
        </button>
      </div>
    </aside>
  );
}
