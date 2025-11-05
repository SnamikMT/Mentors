// stores/autoFlow.ts
import { defineStore } from '#imports'

type Booking = { dateLabel: string; time: string } | null

export const useAutoFlowStore = defineStore('autoFlow', {
  state: () => ({
    step: 0,

    // step1
    chips: [] as string[],
    expMonths: 11,
    closer: 'freelance' as 'freelance'|'biz'|'studio'|'product'|'idk',
    prefTab: 'any' as 'any'|'have',
    gender: 'm' as 'm'|'f',
    ageMin: 18,
    ageMax: 23,
    companies: ['sber', 'sovcom', 'vk'] as string[],
    awards: ['awwwards', 'behance'] as string[],
    mentorSpec: 0,
    timeTab: 'exact' as 'any'|'soon'|'exact',
    timeDate: new Date() as Date|null,
    timeSlot: '16:00',
    priceTier: 'low' as 'low'|'mid'|'top',

    // step2
    selectedMentorId: null as number|null,
    booking: null as Booking,

    // step3
    tariff: { pack: 1, pricePer: 3900 },

    // step4
    paymentMethod: 'card',
  }),

  actions: {
    setStep(n: number) {
      // 0..3
      this.step = Math.min(3, Math.max(0, n))
    },
    merge(payload: Record<string, unknown>) {
      Object.assign(this, payload)
    },
    setBooking(b: Booking) {
      this.booking = b
    },
  },
})
