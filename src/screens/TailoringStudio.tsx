/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { GeminiService } from '../services/gemini';
import { GapAnalysis } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, Lock, Download, Save, ArrowLeft } from 'lucide-react';

type StepStatus = 'waiting' | 'loading' | 'done';

export default function TailoringStudio() {
  const [jd, setJd] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [result, setResult] = useState<{ tailoredText: string; gapAnalysis: GapAnalysis } | null>(null);
  
  const originalCV = localStorage.getItem('master_cv_text') || 'Please upload your Master CV first in the My CVs section.';
  
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [isSyncScroll, setIsSyncScroll] = useState(true);

  const handleScroll = (source: 'left' | 'right') => {
    if (!isSyncScroll) return;
    const sourceEl = source === 'left' ? leftRef.current : rightRef.current;
    const targetEl = source === 'left' ? rightRef.current : leftRef.current;
    if (sourceEl && targetEl) {
      targetEl.scrollTop = sourceEl.scrollTop;
    }
  };

  const handleTailor = async () => {
    if (!jd.trim()) return;
    setIsProcessing(true);
    setResult(null);
    setStep(1);

    try {
      // Step 1: Extract facts (Simulated or real)
      await new Promise(r => setTimeout(r, 1500));
      setStep(2);
      
      // Step 2: Gap analysis & Rewrite
      const tailoring = await GeminiService.tailorCV(originalCV, jd);
      setStep(3);
      await new Promise(r => setTimeout(r, 800));
      
      setResult(tailoring);
    } catch (error) {
      console.error(error);
      alert('Failed to tailor CV. Please check your API key.');
    } finally {
      setIsProcessing(false);
      setStep(0);
    }
  };

  if (result) {
    return (
      <Layout>
        <div className="space-y-6 pb-24">
          <div className="flex items-center justify-between">
            <button onClick={() => setResult(null)} className="flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Input</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[12px] font-medium text-[#6B7280]">
                <span>Sync Scroll</span>
                <button 
                  onClick={() => setIsSyncScroll(!isSyncScroll)}
                  className={`w-8 h-4 rounded-full transition-colors relative ${isSyncScroll ? 'bg-[#6366F1]' : 'bg-[#E5E7EB]'}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isSyncScroll ? 'left-4.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-[#E5E7EB] border border-[#E5E7EB] rounded-[8px] overflow-hidden bg-white min-h-[600px]">
            <div className="flex flex-col bg-white">
              <div className="px-4 py-2 border-b border-[#E5E7EB] bg-[#F9FAFB] text-[12px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                Original
              </div>
              <div 
                ref={leftRef}
                onScroll={() => handleScroll('left')}
                className="p-8 overflow-y-auto max-h-[70vh] max-w-none whitespace-pre-wrap font-mono text-[13px] text-[#6B7280]"
              >
                {originalCV}
              </div>
            </div>
            <div className="flex flex-col bg-white border-l border-[#E5E7EB]">
              <div className="px-4 py-2 border-b border-[#E5E7EB] bg-[#F9FAFB] text-[12px] font-bold uppercase tracking-wider text-[#9CA3AF] flex justify-between items-center">
                Tailored
                <span className="text-[10px] font-normal lowercase bg-[#EEF2FF] text-[#6366F1] px-2 py-0.5 rounded-full">Fully Editable</span>
              </div>
              <div 
                ref={rightRef}
                onScroll={() => handleScroll('right')}
                contentEditable
                suppressContentEditableWarning
                className="p-8 overflow-y-auto max-h-[70vh] max-w-none whitespace-pre-wrap font-mono text-[13px] outline-none focus:bg-[#F9FAFB] transition-colors"
                dangerouslySetInnerHTML={{ __html: result.tailoredText.replace(/\*\*(.*?)\*\*/g, '<span class="bg-[#EEF2FF] text-[#4F46E5] px-1 rounded">$1</span>') }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="card p-4 space-y-3">
              <h3 className="text-[12px] font-bold uppercase text-[#22C55E] flex items-center gap-2">
                <Check size={14} /> Direct Matches ({result.gapAnalysis.directMatches.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.gapAnalysis.directMatches.map(m => (
                  <span key={m} className="badge bg-[#F4F4F5] text-[#18181B]">{m}</span>
                ))}
              </div>
            </div>
            <div className="card p-4 space-y-3">
              <h3 className="text-[12px] font-bold uppercase text-[#F59E0B] flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Transferable ({result.gapAnalysis.transferable.length})
              </h3>
              <div className="space-y-2">
                {result.gapAnalysis.transferable.map((t, i) => (
                  <div key={i} className="text-[12px] text-[#6B7280]">
                    <span className="line-through">{t.original}</span> → <span className="font-medium text-[#111827]">{t.reframed}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-4 space-y-3">
              <h3 className="text-[12px] font-bold uppercase text-[#EF4444] flex items-center gap-2">
                <Lock size={14} /> Gaps ({result.gapAnalysis.gaps.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.gapAnalysis.gaps.map(g => (
                  <span key={g} className="badge bg-[#FEE2E2] text-[#B91C1C] flex items-center gap-1">
                    <Lock size={10} /> {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-[240px] right-0 bg-white border-t border-[#E5E7EB] p-4 z-40">
          <div className="max-w-[1200px] mx-auto flex justify-between items-center">
            <button onClick={() => setResult(null)} className="btn-secondary">Discard Changes</button>
            <div className="flex gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <Download size={16} /> Download PDF
              </button>
              <button className="btn-primary flex items-center gap-2 px-8">
                Save & Track <ArrowLeft size={16} className="rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8 max-w-[800px] mx-auto py-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight">Tailoring Studio</h1>
          <p className="text-[#6B7280]">Paste a job description and get a tailored version in seconds.</p>
        </div>

        <div className="card p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#111827]">Job Description</label>
            <textarea 
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full min-h-[240px] bg-white border border-[#E5E7EB] rounded-[8px] p-5 text-[14px] font-mono focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all resize-none shadow-sm"
            />
          </div>
          
          <AnimatePresence>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3 p-4 bg-[#F9FAFB] rounded-[8px] border border-[#E5E7EB]"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#22C55E] text-white' : 'border-2 border-[#E5E7EB]'}`}>
                    {step === 1 ? <Loader2 size={10} className="animate-spin" /> : step > 1 ? <Check size={10} /> : null}
                  </div>
                  <span className={`text-[13px] ${step === 1 ? 'text-[#111827] font-medium' : 'text-[#6B7280]'}`}>Extracting your facts...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#22C55E] text-white' : 'border-2 border-[#E5E7EB]'}`}>
                    {step === 2 ? <Loader2 size={10} className="animate-spin" /> : step > 2 ? <Check size={10} /> : null}
                  </div>
                  <span className={`text-[13px] ${step === 2 ? 'text-[#111827] font-medium' : 'text-[#6B7280]'}`}>Running gap analysis...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#22C55E] text-white' : 'border-2 border-[#E5E7EB]'}`}>
                    {step === 3 ? <Loader2 size={10} className="animate-spin" /> : step > 3 ? <Check size={10} /> : null}
                  </div>
                  <span className={`text-[13px] ${step === 3 ? 'text-[#111827] font-medium' : 'text-[#6B7280]'}`}>Rewriting bullet points...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleTailor}
              disabled={isProcessing || !jd.trim()}
              className="btn-primary w-full sm:w-auto px-12 py-3 text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isProcessing ? 'Tailoring in progress...' : 'Tailor My CV'}
              {!isProcessing && <span className="group-hover:translate-x-1 transition-transform">→</span>}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

