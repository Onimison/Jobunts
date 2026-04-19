/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Application } from './types';

export const COLORS = {
  background: '#F9FAFB',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#18181B',
  primaryHover: '#3F3F46',
  accent: '#6366F1',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
};

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior PM',
    company: 'Flutterwave',
    status: 'Applied',
    cvVersion: 'v3',
    date: 'Apr 17',
    originalCVText: 'Master CV content...',
    tailoredCVText: 'Tailored content for Flutterwave...',
    gapAnalysis: {
      directMatches: ['product roadmap', 'stakeholder mgmt', 'agile'],
      transferable: [{ original: 'sprint planning', reframed: 'agile delivery' }],
      gaps: ['SQL', 'Figma'],
    },
  },
  {
    id: '2',
    jobTitle: 'Research Analyst',
    company: 'ARM Holdings',
    status: 'Saved',
    cvVersion: 'v1',
    date: 'Apr 15',
    originalCVText: 'Master CV content...',
    tailoredCVText: 'Tailored content for ARM...',
    gapAnalysis: {
      directMatches: ['Python', 'Data Analysis'],
      transferable: [],
      gaps: ['Tableau'],
    },
  },
  {
    id: '3',
    jobTitle: 'Comms Associate',
    company: 'GAIN',
    status: 'Interviewing',
    cvVersion: 'v2',
    date: 'Apr 12',
    originalCVText: 'Master CV content...',
    tailoredCVText: 'Tailored content for GAIN...',
    gapAnalysis: {
      directMatches: ['Content Strategy'],
      transferable: [],
      gaps: [],
    },
  },
];
