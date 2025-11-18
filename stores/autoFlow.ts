import { defineStore } from 'pinia';
import type { Step1Payload } from '@/types/auto-flow';

export const useAutoFlowStore = defineStore('autoFlow', {
  state: () => ({
    step: 0,
    draftId: '' as string,
    // step1
    chips: [] as string[],
    expMonths: 11,
    closer: 'freelance' as Step1Payload['closer'],
    prefTab: 'any' as Step1Payload['prefTab'],
    gender: 'm' as Step1Payload['gender'],
    ageMin: 18,
    ageMax: 23,
    companies: ['sber','sovcom','vk'] as string[],
    awards: ['awwwards','behance'] as string[],
    mentorSpec: 0,
    timeTab: 'exact' as Step1Payload['timeTab'],
    timeDate: new Date(),
    timeSlot: '16:00',
    priceTier: 'low' as Step1Payload['priceTier'],


    // тариф
    planId: '' as string,
    qty: 1,
    quoteId: '' as string,    
    totalMinor: 0,

    // из шага 2 должно быть:
    reservationId: '' as string,
    selectedMentorId: null as number | null,
  }),
  actions: {
    setStep(n: number) { this.step = Math.max(0, Math.min(3, n)); },
    setDraftId(id: string) { this.draftId = id; },
    merge(payload: Record<string, unknown>) {
      Object.assign(this, payload);
    },
  }
});
