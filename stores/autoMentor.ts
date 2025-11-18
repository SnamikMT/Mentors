import { defineStore } from 'pinia'

// Схемы шагов (примерно, расширишь по мере внедрения)
export type Step1 = {
  skills: string[];                  // выбранные чипы
  expMonths: number;                 // опыт
  closer: 'freelance'|'biz'|'studio'|'product'|'idk';
  prefTab: 'any'|'have';
  gender: 'm'|'f';
  ageMin: number; ageMax: number;
  company: string[]; awards: string[];
  mentorSpec: number;
}

export type Step2 = {
  // выбор ментора вручную/авто, возможно draftId рекомендованного
  pickedMentorId?: string;
}

export type Step3 = {
  // тариф/пакет
  planId?: string;
}

export type Step4 = {
  
}

export type AutoMentorDraft = {
  id?: string;       
  updatedAt: number;
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step4: Step4;
}

const DEFAULT: AutoMentorDraft = {
  updatedAt: Date.now(),
  step1: {
    skills: [], expMonths: 0, closer: 'freelance',
    prefTab: 'any', gender: 'm', ageMin: 18, ageMax: 23,
    company: [], awards: [], mentorSpec: 0,
  },
  step2: {}, step3: {}, step4: {}
}

const LS_KEY = 'auto-mentor-draft-v1'

export const useAutoMentor = defineStore('autoMentor', {
  state: (): AutoMentorDraft => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? JSON.parse(raw) as AutoMentorDraft : structuredClone(DEFAULT)
    } catch { return structuredClone(DEFAULT) }
  },
  actions: {
    patch<K extends keyof AutoMentorDraft>(key: K, value: AutoMentorDraft[K]) {
      // простое объединение
      // @ts-expect-error
      this[key] = { ...(this as any)[key], ...value }
      this.updatedAt = Date.now()
      this.persist()
      this.queueSync()   // фоновая синхронизация на бек
    },
    persist() {
      localStorage.setItem(LS_KEY, JSON.stringify(this.$state))
    },
    reset() {
      this.$state = structuredClone(DEFAULT)
      this.persist()
    },

    // ====== Опционально: синк с беком ======
    async loadFromServer(draftId?: string) {
      // const data = await $fetch(`/api/drafts/${draftId ?? 'current'}`)
      // Object.assign(this.$state, data)
      // this.persist()
    },

    // дебаунс-синк (заглушка)
    queueSync: (() => {
      let t: any
      return function (this: any) {
        clearTimeout(t)
        t = setTimeout(async () => {
          try {
            // const res = await $fetch('/api/drafts', { method:'POST', body: this.$state })
            // if (res.id) this.id = res.id
          } catch { /* без паники — повторим позже */ }
        }, 600)
      }
    })()
  }
})
