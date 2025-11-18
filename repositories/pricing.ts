import type { PlanDTO, QuoteRequest, QuoteResponse } from '@/types/pricing';

export function usePricingRepository() {
  const api = useApiClient();

  function listPlans(): Promise<PlanDTO[]> {
    return api.get<PlanDTO[]>('/pricing/plans');
  }

  function quote(body: QuoteRequest): Promise<QuoteResponse> {
    return api.post<QuoteResponse, QuoteRequest>('/pricing/quote', body);
  }

  return { listPlans, quote };
}
