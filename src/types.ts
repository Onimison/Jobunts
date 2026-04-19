/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MasterCV {
  rawText: string;
  extractedFacts: FactSheet;
  lastUpdated: string;
}

export interface FactSheet {
  hardSkills: string[];
  toolsAndPlatforms: string[];
  keyAchievements: Achievement[];
  yearsOfExperience: number;
}

export interface Achievement {
  text: string;
  metric?: string; // e.g. "↑ 40%"
}

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: 'Saved' | 'To Apply' | 'Applied' | 'Interviewing' | 'Rejected';
  cvVersion: string;
  date: string;
  originalCVText: string;
  tailoredCVText: string;
  gapAnalysis: GapAnalysis;
}

export interface GapAnalysis {
  directMatches: string[];
  transferable: { original: string; reframed: string }[];
  gaps: string[];
}

export type NavItem = 'Dashboard' | 'New Tailoring' | 'My CVs' | 'Applications' | 'Settings';
