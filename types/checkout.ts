export interface CheckoutInitRequest {
  reservationId: string;
  quoteId: string;            // id котировки/квоты от бэка
  method: 'yo'|'stripe'|'paypal'|'crypto';
  bindCard?: boolean;
  agree: boolean;
  returnUrl: string;          // куда вернёт платёжка
}

export interface CheckoutInitResponse {
  checkoutSessionId: string;
  redirectUrl?: string;       // если нужен внешний редирект
  clientSecret?: string;      // если встраиваем виджет
}
