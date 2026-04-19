/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { GeminiService } from '../services/gemini';
import { FactSheet } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export default function MasterCVSetup() {
  const [cvText, setCvText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [factSheet, setFactSheet] = useState<FactSheet | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleUpload = async () => {
    if (!cvText.trim()) return;
    setIsProcessing(true);
    try {
      const extracted = await GeminiService.extractFactSheet(cvText);
      setFactSheet(extracted);
      localStorage.setItem('master_cv_text', cvText);
      localStorage.setItem('master_cv_facts', JSON.stringify(extracted));
      localStorage.setItem('master_cv_updated', new Date().toISOString());
    } catch (error) {
      console.error(error);
      alert('Failed to extract facts. Please check your API key.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Layout>
      <div className="max-w-[720px] mx-auto space-y-8 py-8">
        <div className="space-y-1">
          <h1 className="text-[28px] font-bold tracking-tight">Master CV Setup</h1>
          <p className="text-[#6B7280]">Establish the “Source of Truth” Fact Sheet for all your applications.</p>
        </div>
        
        {!factSheet ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-[#E5E7EB] hover:border-[#6366F1] transition-colors rounded-[8px] p-12 flex flex-col items-center justify-center gap-4 bg-white cursor-pointer group relative">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (re) => setCvText(re.target?.result as string);
                    reader.readAsText(file);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-full bg-[#F9FAFB] flex items-center justify-center text-[#6B7280] group-hover:text-[#6366F1] transition-colors">
                <FileText size={24} />
              </div>
              <div className="text-center">
                <p className="font-medium">Drop your CV here or click to upload</p>
                <p className="text-[#9CA3AF] text-[12px]">PDF or plain text · Max 5MB</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E5E7EB]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#F9FAFB] px-2 text-[#9CA3AF]">or paste text</span>
                </div>
              </div>

              <textarea 
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV content here..."
                className="w-full min-h-[300px] card p-6 text-[14px] font-mono outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all"
              />

              <div className="flex justify-end">
                <button 
                  onClick={handleUpload}
                  disabled={isProcessing || !cvText.trim()}
                  className="btn-primary flex items-center gap-2 px-8 py-3 disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 size={18} className="animate-spin" /> : null}
                  {isProcessing ? 'Processing...' : 'Generate Fact Sheet'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="card divide-y divide-[#E5E7EB]">
              <div className="p-6 space-y-4">
                <h2 className="text-[16px] font-semibold">Extracted Fact Sheet</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase text-[#6B7280]">Hard Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {factSheet.hardSkills.map(s => (
                        <span key={s} className="badge bg-[#F4F4F5] text-[#18181B]">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase text-[#6B7280]">Tools & Platforms</label>
                    <div className="flex flex-wrap gap-2">
                      {factSheet.toolsAndPlatforms.map(s => (
                        <span key={s} className="badge bg-[#EEF2FF] text-[#6366F1]">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] font-bold uppercase text-[#6B7280]">Key Achievements</label>
                    <ul className="space-y-3">
                      {factSheet.keyAchievements.map((a, i) => (
                        <li key={i} className="flex gap-3 text-[14px] text-[#111827]">
                          <span className="text-[#9CA3AF] font-mono">{i + 1}.</span>
                          <span className="flex-1">
                            {a.text}
                            {a.metric && (
                              <span className="ml-2 inline-flex items-center text-[10px] font-bold text-[#22C55E] bg-[#DCFCE7] px-1.5 py-0.5 rounded">
                                {a.metric}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <div className="inline-flex flex-col">
                      <label className="text-[12px] font-bold uppercase text-[#6B7280]">Experience</label>
                      <span className="text-[24px] font-bold text-[#18181B]">{factSheet.yearsOfExperience} years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FFFBEB] flex items-start gap-3">
                <AlertCircle size={16} className="text-[#F59E0B] mt-0.5" />
                <p className="text-[12px] text-[#92400E]">
                  Review carefully. This is your source of truth. The AI will never add anything not in this list.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setFactSheet(null)} className="btn-secondary flex-1">Re-upload CV</button>
              <button onClick={handleSave} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                Confirm & Save Fact Sheet <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-8 right-8 z-[100] bg-white border-l-4 border-[#22C55E] shadow-lg rounded-[6px] p-4 pr-12 min-w-[320px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#22C55E]">
                <Check size={18} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#111827]">Fact Sheet saved</p>
                <p className="text-[12px] text-[#6B7280]">You’re ready to tailor your CV.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

