/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { FactSheet, GapAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class GeminiService {
  static async extractFactSheet(cvText: string): Promise<FactSheet> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract a fact sheet from this CV text. Output in JSON format.
      
      CV CONTENT:
      ${cvText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hardSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            toolsAndPlatforms: { type: Type.ARRAY, items: { type: Type.STRING } },
            keyAchievements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  metric: { type: Type.STRING }
                },
                required: ["text"]
              }
            },
            yearsOfExperience: { type: Type.NUMBER }
          },
          required: ["hardSkills", "toolsAndPlatforms", "keyAchievements", "yearsOfExperience"]
        }
      }
    });

    return JSON.parse(response.text);
  }

  static async tailorCV(cvText: string, jobDescription: string): Promise<{ tailoredText: string; gapAnalysis: GapAnalysis }> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a career expert and ATS specialist. 
      Tailor the provided CV to match the Job Description. 
      
      RULES:
      1. ONLY use facts found in the CV. NEVER lie or add skills the user does not have.
      2. Highlight direct matches.
      3. Reframe transferable skills to match the JOB DESCRIPTION terminology.
      4. List Gaps that are in the JD but missing from the CV.
      5. BOLD (using markdown **text**) every specific section, keyword, or sentence that you changed or added relative to the original CV. This allows the UI to highlight them.
      
      CV:
      ${cvText}
      
      JOB DESCRIPTION:
      ${jobDescription}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tailoredText: { type: Type.STRING },
            gapAnalysis: {
              type: Type.OBJECT,
              properties: {
                directMatches: { type: Type.ARRAY, items: { type: Type.STRING } },
                transferable: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      original: { type: Type.STRING },
                      reframed: { type: Type.STRING }
                    }
                  }
                },
                gaps: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          },
          required: ["tailoredText", "gapAnalysis"]
        }
      }
    });

    return JSON.parse(response.text);
  }
}
