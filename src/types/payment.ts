export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  cardholderName: string;
  label: string;
}

export interface NewPaymentMethod {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  type: 'credit' | 'debit';
  cardholderName: string;
  label: string;
}