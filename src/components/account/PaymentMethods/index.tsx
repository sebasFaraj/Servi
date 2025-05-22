import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { usePaymentMethods } from '../../../hooks/usePaymentMethods';
import PaymentMethodCard from './PaymentMethodCard';
import AddPaymentModal from './AddPaymentModal';
import type { NewPaymentMethod } from '../../../types/payment';

const PaymentMethods = () => {
  const { paymentMethods, isLoading, addPaymentMethod, removePaymentMethod, setDefaultMethod } = usePaymentMethods();
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddMethod = async (method: NewPaymentMethod) => {
    setError(null);
    try {
      await addPaymentMethod(method);
      setShowAddModal(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add payment method');
      throw error;
    }
  };

  const handleRemoveMethod = async (id: string) => {
    setError(null);
    try {
      await removePaymentMethod(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to remove payment method');
    }
  };

  const handleSetDefault = async (id: string) => {
    setError(null);
    try {
      await setDefaultMethod(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to set default method');
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading payment methods...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Payment Methods</h2>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            onRemove={handleRemoveMethod}
            onSetDefault={handleSetDefault}
          />
        ))}

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center space-x-2 w-full p-6
                   bg-gray-50 rounded-lg border-2 border-dashed border-gray-300
                   text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {showAddModal && (
        <AddPaymentModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMethod}
        />
      )}
    </div>
  );
};

export default PaymentMethods;