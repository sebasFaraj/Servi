import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { PaymentMethod } from '../../types/payment';

interface EditPaymentModalProps {
  method: PaymentMethod;
  onClose: () => void;
  onSave: (id: string, updates: Partial<PaymentMethod>) => Promise<void>;
}

const EditPaymentModal = ({ method, onClose, onSave }: EditPaymentModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: method.cardholderName || '', // Ensure initial value is never undefined
    label: method.label || '' // Ensure initial value is never undefined
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate required fields
    if (!formData.cardholderName.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(method.id, {
        cardholderName: formData.cardholderName.trim(),
        label: formData.label.trim() || method.label // Fallback to existing label if empty
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Edit Payment Method</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              required
              value={formData.cardholderName}
              onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                       dark:text-white focus:ring-2 focus:ring-teal-500"
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Label
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                       dark:text-white focus:ring-2 focus:ring-teal-500"
              placeholder="e.g., Personal Card, Business Card"
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                       dark:hover:bg-gray-700 rounded-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.cardholderName.trim()}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaymentModal;