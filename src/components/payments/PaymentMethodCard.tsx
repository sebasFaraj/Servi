import React, { useState } from 'react';
import { CreditCard, Star, Trash2, Edit } from 'lucide-react';
import EditPaymentModal from './EditPaymentModal';
import type { PaymentMethod } from '../../types/payment';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  onRemove: (id: string) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>;
  onUpdate: (id: string, updates: Partial<PaymentMethod>) => Promise<void>;
}

const PaymentMethodCard = ({ method, onRemove, onSetDefault, onUpdate }: PaymentMethodCardProps) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleRemove = async () => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      await onRemove(method.id);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CreditCard className={`w-8 h-8 ${method.isDefault ? 'text-teal-600' : 'text-gray-400'}`} />
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold dark:text-white">{method.label}</p>
                {method.isDefault && (
                  <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                •••• {method.last4} · Expires {method.expiryMonth}/{method.expiryYear}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {method.cardholderName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
              title="Edit card"
            >
              <Edit className="w-5 h-5" />
            </button>
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
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditPaymentModal
          method={method}
          onClose={() => setShowEditModal(false)}
          onSave={onUpdate}
        />
      )}
    </>
  );
};

export default PaymentMethodCard;