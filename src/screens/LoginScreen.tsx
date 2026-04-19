/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LightningBolt = () => (
  <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.5 0L1 9.5H6.5L5 16L15 6H8.5L9.5 0Z" />
  </svg>
);

export default function LoginScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="card max-w-[400px] w-full p-8 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="text-[#6366F1]">
            <LightningBolt />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-[20px] font-bold tracking-tight">TailorFlow</h1>
            <p className="text-[#6B7280] text-[14px]">Your CV, tuned to every job.</p>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/')}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <span>Continue with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#9CA3AF]">or</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase">Email</label>
              <input type="email" placeholder="bashir@example.com" className="input-field w-full" />
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-[#6B7280] uppercase">Password</label>
              <input type="password" placeholder="••••••••" className="input-field w-full" />
            </div>
            <button 
              onClick={() => navigate('/')}
              className="btn-primary w-full py-2.5"
            >
              Sign In
            </button>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#9CA3AF]">
          By signing up, your data stays in your private instance.
        </p>
      </div>
    </div>
  );
}
