<template>
  <div class="form-row">
    <!-- ЛЕВАЯ КОЛОНКА -->
    <aside class="flex items-start">
      <h2 class="text-[#101012] text-[22px] leading-[28px] sm:text-[28px] sm:leading-[32px] font-medium">
        С кем хочешь<br>работать?
      </h2>
    </aside>

    <!-- ПРАВАЯ КОЛОНКА -->
    <section>
      <!-- Табы -->
      <div class="mx-auto max-w-[640px]">
        <div class="rounded-full bg-[#F5F6F8] p-1 grid grid-cols-2">
          <button class="h-10 rounded-full text-[14px] font-medium"
                  :class="tab==='any'  ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43] hover:bg-white/60'"
                  @click="emit('update:tab','any')">Всё равно</button>
          <button class="h-10 rounded-full text-[14px] font-medium"
                  :class="tab==='have' ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43] hover:bg-white/60'"
                  @click="emit('update:tab','have')">Есть предпочтения</button>
        </div>
      </div>

      <!-- Карточка предпочтений -->
      <div v-if="tab==='have'" class="mt-4 rounded-[24px] border border-[#787880]/20 bg-white p-4 sm:p-5">
        <!-- Пол -->
        <div class="mb-4">
          <div class="text-[14px] font-medium text-[#101012] mb-2">Пол</div>
          <div class="rounded-full bg-[#F5F6F8] p-1 inline-grid grid-cols-2">
            <button class="h-9 px-5 rounded-full text-[14px] font-medium"
                    :class="gender==='m' ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43]'"
                    @click="emit('update:gender','m')">Label 1</button>
            <button class="h-9 px-5 rounded-full text-[14px] font-medium"
                    :class="gender==='f' ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43]'"
                    @click="emit('update:gender','f')">Label 2</button>
          </div>
        </div>

        <!-- Возраст -->
        <div class="mb-4">
          <div class="text-[14px] font-medium text-[#101012] mb-1">Возраст, лет</div>
          <div class="text-[12px] text-[#3C3C43]/70 flex justify-between mb-2">
            <span>18 лет</span><span>55+ лет</span>
          </div>

          <div class="relative pt-7">
            <div class="h-[3px] bg-[#C7D7FF] rounded"></div>
            <div class="absolute left-0 top-[7px] h-[3px] bg-[#007AFF] rounded"
                 :style="{ left:minPct+'%', width: Math.max(maxPct-minPct,0)+'%' }"></div>

            <input type="range" min="18" max="55" step="1"
                   :value="ageMin" @input="emit('update:ageMin', +($event.target as HTMLInputElement).value)"
                   class="range-thumb absolute inset-0 w-full opacity-0 cursor-pointer" />
            <input type="range" min="18" max="55" step="1"
                   :value="ageMax" @input="emit('update:ageMax', +($event.target as HTMLInputElement).value)"
                   class="range-thumb absolute inset-0 w-full opacity-0 cursor-pointer" />

            <div class="absolute -top-8 translate-x-[-50%]" :style="{ left:minPct+'%' }">
              <div class="px-2.5 py-1 rounded-full text-white text-[12px] bg-[#007AFF] shadow-[0_10px_18px_rgba(0,122,255,.35)]">{{ ageMin }}</div>
            </div>
            <div class="absolute -top-8 translate-x-[-50%]" :style="{ left:maxPct+'%' }">
              <div class="px-2.5 py-1 rounded-full text-white text-[12px] bg-[#007AFF] shadow-[0_10px_18px_rgba(0,122,255,.35)]">{{ ageMax }}</div>
            </div>
          </div>
        </div>

        <!-- Опыт в компании (3 опции, с иконками) -->
        <div class="mb-4" ref="companyRoot">
          <div class="text-[14px] font-medium text-[#101012] mb-2">Опыт в компании</div>

          <button type="button" class="field" @click="openCompany = !openCompany">
            <div class="flex flex-wrap gap-2">
              <template v-if="companyValues.length">
                <span v-for="val in companyValues" :key="val" class="tag">
                  <img :src="companyByVal(val)?.icon" class="w-4 h-4 rounded-sm" alt="">
                  <span>{{ companyByVal(val)?.label }}</span>
                  <button class="tag-x" @click.stop="toggleCompany(val)">×</button>
                </span>
              </template>
              <span v-else class="text-[#3C3C43]/60">Выбрать компании</span>
            </div>
            <svg class="ml-auto w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>

          <div v-if="openCompany" class="dropdown">
            <button v-for="opt in companyOptions" :key="opt.value" class="dd-item" @click="toggleCompany(opt.value)">
              <img :src="opt.icon" class="w-4 h-4 rounded-sm" alt="">
              <span class="flex-1">{{ opt.label }}</span>
              <span class="check" :data-on="companyValues.includes(opt.value)">✔</span>
            </button>
          </div>
        </div>

        <!-- Награды (без иконок) -->
        <div class="mb-4" ref="awardRoot">
          <div class="text-[14px] font-medium text-[#101012] mb-2">Награды</div>

          <button type="button" class="field" @click="openAwards = !openAwards">
            <div class="flex flex-wrap gap-2">
              <template v-if="awardValues.length">
                <span v-for="val in awardValues" :key="val" class="tag">
                  <span>{{ awardByVal(val)?.label }}</span>
                  <button class="tag-x" @click.stop="toggleAward(val)">×</button>
                </span>
              </template>
              <span v-else class="text-[#3C3C43]/60">Выбрать награды</span>
            </div>
            <svg class="ml-auto w-4 h-4 opacity-60" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>

          <div v-if="openAwards" class="dropdown">
            <button v-for="opt in awardOptions" :key="opt.value" class="dd-item" @click="toggleAward(opt.value)">
              <span class="flex-1">{{ opt.label }}</span>
              <span class="check" :data-on="awardValues.includes(opt.value)">✔</span>
            </button>
          </div>
        </div>

        <!-- Специфика -->
        <div>
          <div class="text-[14px] font-medium text-[#101012] mb-2">Специфика работы ментора</div>
          <div class="rounded-full bg-[#F5F6F8] p-1 grid grid-cols-4 max-w-[560px]">
            <button v-for="(lbl,i) in mentorSpecLabels" :key="i"
                    class="h-9 rounded-full text-[14px] font-medium"
                    :class="mentorSpec===i ? 'bg-white shadow text-[#101012]' : 'text-[#3C3C43]'"
                    @click="emit('update:mentorSpec', i)">{{ lbl }}</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  tab: 'any'|'have'
  gender: 'm'|'f'
  ageMin: number
  ageMax: number
  companies: string[]
  awards: string[]
  mentorSpec: number
}>(), {
  tab: 'any',
  gender: 'm',
  ageMin: 18,
  ageMax: 23,
  companies: () => [],
  awards: () => [],
  mentorSpec: 0
})

const emit = defineEmits<{
  (e:'update:tab', v:'any'|'have'):void
  (e:'update:gender', v:'m'|'f'):void
  (e:'update:ageMin', v:number):void
  (e:'update:ageMax', v:number):void
  (e:'update:companies', v:string[]):void
  (e:'update:awards', v:string[]):void
  (e:'update:mentorSpec', v:number):void
}>()

/* Возраст → проценты */
const minPct = computed(() => ((props.ageMin-18)/(55-18))*100)
const maxPct = computed(() => ((props.ageMax-18)/(55-18))*100)

/* --- Компании: только 3 опции с иконками --- */
import iconSber   from '@/src/assets/icons/brands/sber.svg'
import iconSovkom from '@/src/assets/icons/brands/sovcom.svg'
import iconVK     from '@/src/assets/icons/brands/vk.svg'

const companyOptions = [
  { value:'sber',   label:'Сбер',        icon: iconSber },
  { value:'sovcom', label:'Совкомбанк',  icon: iconSovkom },
  { value:'vk',     label:'ВКонтакте',   icon: iconVK },
]

/* --- Награды: без иконок --- */
const awardOptions = [
  { value:'awwwards', label:'awwwards' },
  { value:'behance',  label:'Behance' },
  { value:'dprofile', label:'DProfile' },
]

/* Выборы */
const companyValues = computed(() => props.companies)
const awardValues   = computed(() => props.awards)

const companyByVal  = (v:string) => companyOptions.find(o => o.value===v)
const awardByVal    = (v:string) => awardOptions.find(o => o.value===v)

const toggleCompany = (v:string) => {
  const next = new Set(props.companies)
  next.has(v) ? next.delete(v) : next.add(v)
  emit('update:companies', Array.from(next))
}
const toggleAward = (v:string) => {
  const next = new Set(props.awards)
  next.has(v) ? next.delete(v) : next.add(v)
  emit('update:awards', Array.from(next))
}

/* Дропдауны + клик-вне */
const openCompany = ref(false)
const openAwards  = ref(false)
const companyRoot = ref<HTMLElement|null>(null)
const awardRoot   = ref<HTMLElement|null>(null)

const onClickOutside = (e:MouseEvent) => {
  const t = e.target as Node
  if (openCompany.value && companyRoot.value && !companyRoot.value.contains(t)) openCompany.value = false
  if (openAwards.value  && awardRoot.value  && !awardRoot.value.contains(t))   openAwards.value  = false
}
onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))

/* прокидываем для шаблона */
const tab        = computed(() => props.tab)
const gender     = computed(() => props.gender)
const ageMin     = computed(() => props.ageMin)
const ageMax     = computed(() => props.ageMax)
const mentorSpec = computed(() => props.mentorSpec)
const mentorSpecLabels = ['Label 1','Label 2','Label 3','Label 4']
</script>

<style scoped>
.form-row{ display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:1024px){ .form-row{ grid-template-columns:320px 1fr; gap:36px; } }

.range-thumb { -webkit-appearance:none; appearance:none; }
.range-thumb::-webkit-slider-thumb{
  -webkit-appearance:none; appearance:none; width:18px; height:18px; border-radius:50%; background:transparent; border:none;
}

.field{
  width:100%; min-height:44px; border-radius:12px;
  border:1px solid rgba(120,120,128,.20); background:#fff;
  padding:6px 10px; display:flex; align-items:center; gap:8px; text-align:left;
}
.tag{
  display:inline-flex; align-items:center; gap:6px;
  height:28px; padding:0 10px; border-radius:9999px;
  font-size:13px; color:#101012; background:#F5F6F8; border:1px solid rgba(120,120,128,.16);
}
.tag-x{ line-height:1; font-size:16px; opacity:.55; }
.tag-x:hover{ opacity:.9; }

.dropdown{
  margin-top:8px; width:100%; background:#fff; border:1px solid rgba(120,120,128,.20);
  border-radius:12px; box-shadow:0 6px 18px rgba(16,16,18,.08); padding:6px; display:flex; flex-direction:column; gap:4px;
}
.dd-item{ display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:10px; text-align:left; }
.dd-item:hover{ background:#F7F8FA; }
.check{ width:18px; text-align:center; opacity:.2; }
.check[data-on="true"]{ opacity:1; color:#007AFF; }
</style>
