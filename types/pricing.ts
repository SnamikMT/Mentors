export interface PlanDTO {
  id: string;                 // 'p1' | 'p6' | ...
  title: string;
  subtitle: string;
  pricePerMinor: number;      // цена за звонок в МИНИМАЛЬНЫХ единицах (копейки)
  fixedQty?: number;          // если тариф фиксированный пакет
}

export interface QuoteRequest {
  planId: string;
  qty: number;
  mentorId: number;
  reservationId?: string;     // чтобы зафиксировать цену под бронь
}

export interface QuoteResponse {
  planId: string;
  qty: number;
  pricePerMinor: number;
  subtotalMinor: number;
  serviceFeeMinor: number;
  discountMinor: number;
  couponMinor: number;
  totalMinor: number;         // к оплате
  currency: 'RUB' | 'USD' | 'EUR';
}
