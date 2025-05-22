import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { NewPaymentMethod } from '../../types/payment';

interface AddPaymentModalProps {
  onClose: () => void;
  onAdd: (method: NewPaymentMethod) => Promise<void>;
}

const AddPaymentModal = ({ onClose, onAdd }: AddPaymentModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NewPaymentMethod>({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    type: 'credit',
    cardholderName: '',
    label: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Set default label if none provided
    if (!formData.label.trim()) {
      formData.label = `${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Card`;
    }

    setIsSubmitting(true);
    try {
      await onAdd(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Add Payment Method</h3>
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
              Card Label (Optional)
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              maxLength={16}
              required
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                       dark:text-white focus:ring-2 focus:ring-teal-500"
              placeholder="1234 5678 9012 3456"
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Month
              </label>
              <select
                required
                value={formData.expiryMonth}
                onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                         dark:text-white focus:ring-2 focus:ring-teal-500"
                disabled={isSubmitting}
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, '0');
                  return <option key={month} value={month}>{month}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <select
                required
                value={formData.expiryYear}
                onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                         dark:text-white focus:ring-2 focus:ring-teal-500"
                disabled={isSubmitting}
              >
                <option value="">YY</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString().slice(-2);
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                CVV
              </label>
              <input
                type="text"
                maxLength={4}
                required
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                         dark:text-white focus:ring-2 focus:ring-teal-500"
                placeholder="123"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Card Type
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'credit' | 'debit' })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600
                       dark:text-white focus:ring-2 focus:ring-teal-500"
              disabled={isSubmitting}
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Adding...' : 'Add Card'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;