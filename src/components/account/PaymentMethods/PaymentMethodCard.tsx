import React from 'react';
import { CreditCard, Star, Trash2 } from 'lucide-react';
import type { PaymentMethod } from '../../../types/payment';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onRemove: (id: string) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>;
}

const PaymentMethodCard = ({ method, onRemove, onSetDefault }: PaymentMethodCardProps) => {
  const handleRemove = async () => {
    if (method.isDefault) {
      alert('Cannot remove default payment method. Please set another method as default first.');
      return;
    }
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      await onRemove(method.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CreditCard className={`w-8 h-8 ${method.isDefault ? 'text-teal-600' : 'text-gray-400'}`} />
          <div>
            <p className="font-semibold">•••• •••• •••• {method.last4}</p>
            <p className="text-sm text-gray-500">
              Expires {method.expiryMonth}/{method.expiryYear}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!method.isDefault && (
            <button
              onClick={() => onSetDefault(method.id)}
              className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
              title="Set as default"
            >
              <Star className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleRemove}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
            title="Remove card"
            disabled={method.isDefault}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;