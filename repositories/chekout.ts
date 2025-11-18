import type { CheckoutInitRequest, CheckoutInitResponse } from '@/types/checkout';

export function useCheckoutRepository() {
  const api = useApiClient();

  function init(body: CheckoutInitRequest): Promise<CheckoutInitResponse> {
    return api.post<CheckoutInitResponse, CheckoutInitRequest>('/checkout/init', body);
  }

  return { init };
}
