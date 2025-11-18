// types/auto-flow.ts
export type CloserKind = 'freelance' | 'biz' | 'studio' | 'product' | 'idk';
export type PrefTab = 'any' | 'have';
export type Gender = 'm' | 'f';
export type TimeTab = 'any' | 'soon' | 'exact';
export type PriceTier = 'low' | 'mid' | 'top';

export interface Step1Payload {
  chips: string[];
  expMonths: number;
  closer: CloserKind;
  prefTab: PrefTab;
  gender: Gender;
  ageMin: number;
  ageMax: number;
  companies: string[];
  awards: string[];
  mentorSpec: number;
  timeTab: TimeTab;
  timeDate: string | null; 
  timeSlot: string;        
  priceTier: PriceTier;
}

export interface AutoFlowDraft {
  id: string;
  step1?: Step1Payload;
}
