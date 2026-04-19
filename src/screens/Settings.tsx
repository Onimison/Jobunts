/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layout } from '../components/Layout';

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-[24px] font-semibold">Settings</h1>
          <p className="text-[#6B7280]">Manage your profile and API configurations.</p>
        </div>

        <div className="flex gap-8">
          <aside className="w-[200px] space-y-1">
            <button className="w-full text-left px-3 py-2 text-[14px] font-medium bg-[#F4F4F5] text-[#111827] rounded-[6px]">Profile</button>
            <button className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-[6px]">Master CV</button>
            <button className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] rounded-[6px]">API Keys</button>
          </aside>

          <div className="flex-1 space-y-6">
            <div className="card p-6 space-y-4">
              <h2 className="text-[16px] font-semibold">Public Profile</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#F4F4F5] border border-[#E5E7EB] flex items-center justify-center text-[24px]">B</div>
                <button className="btn-secondary text-[12px]">Change Avatar</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#6B7280] uppercase">Display Name</label>
                  <input type="text" defaultValue="Bashir" className="input-field w-full" />
                </div>
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#6B7280] uppercase">Email</label>
                  <input type="email" defaultValue="godbless@example.com" className="input-field w-full" disabled />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
