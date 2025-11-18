// repositories/autoFlow.ts
import type { AutoFlowDraft, Step1Payload } from '@/types/auto-flow';

export function useAutoFlowRepository() {
  const api = useApiClient();

  async function createDraft(): Promise<AutoFlowDraft> {
    return api.post<AutoFlowDraft>('/auto-flow/drafts', {});
  }

  async function patchStep1(draftId: string, payload: Step1Payload): Promise<AutoFlowDraft> {
    return api.patch<AutoFlowDraft, { step1: Step1Payload }>(
      `/auto-flow/drafts/${draftId}`,
      { step1: payload }
    );
  }

  return { createDraft, patchStep1 };
}
