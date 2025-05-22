import React, { useState } from 'react';
import { X, CreditCard, Plus, AlertCircle, Check } from 'lucide-react';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import AddPaymentModal from '../payments/AddPaymentModal';

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onPaymentComplete: () => void;
  testMode?: boolean;
}

const PaymentModal = ({ amount, onClose, onPaymentComplete, testMode = false }: PaymentModalProps) => {
  const { paymentMethods } = usePaymentMethods();
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test card that always succeeds
  const testCard = {
    id: 'test-success',
    last4: '4242',
    expiryMonth: '12',
    expiryYear: '25',
    type: 'credit' as const,
    label: 'Test Success Card'
  };

  const handlePayment = async () => {
    if (!selectedMethodId) {
      setError('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (testMode && selectedMethodId === 'error') {
        throw new Error('Payment method declined');
      }

      onPaymentComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">Payment Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                       dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="text-2xl font-bold mb-1">${amount}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total amount to be charged
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 
                          rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <h4 className="font-medium">Select Payment Method</h4>
            
            {/* Test Success Card */}
            <button
              onClick={() => setSelectedMethodId(testCard.id)}
              className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
                selectedMethodId === testCard.id
                  ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
              }`}
            >
              <div className="flex items-center text-teal-600 mr-3">
                <CreditCard className="w-5 h-5" />
                <Check className="w-4 h-4 ml-1" />
              </div>
              <div className="text-left">
                <div className="font-medium">•••• {testCard.last4}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Test Card (Always Succeeds)
                </div>
              </div>
            </button>

            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
                  selectedMethodId === method.id
                    ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-teal-500'
                }`}
              >
                <CreditCard className={`w-5 h-5 mr-3 ${
                  selectedMethodId === method.id ? 'text-teal-600' : 'text-gray-400'
                }`} />
                <div className="text-left">
                  <div className="font-medium">•••• {method.last4}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Expires {method.expiryMonth}/{method.expiryYear}
                  </div>
                </div>
              </button>
            ))}

            {testMode && (
              <button
                onClick={() => setSelectedMethodId('error')}
                className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
                  selectedMethodId === 'error'
                    ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-red-500'
                }`}
              >
                <CreditCard className={`w-5 h-5 mr-3 ${
                  selectedMethodId === 'error' ? 'text-red-600' : 'text-gray-400'
                }`} />
                <div className="text-left">
                  <div className="font-medium">Test Error Card</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Will trigger payment error
                  </div>
                </div>
              </button>
            )}

            <button
              onClick={() => setShowAddPayment(true)}
              className="w-full flex items-center justify-center space-x-2 p-4 rounded-lg 
                       border-2 border-dashed border-gray-200 dark:border-gray-700 
                       text-gray-600 dark:text-gray-300 hover:border-teal-500 
                       transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Payment Method</span>
            </button>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing || !selectedMethodId}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium
                     hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>

      {showAddPayment && (
        <AddPaymentModal
          onClose={() => setShowAddPayment(false)}
          onAdd={async (method) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setShowAddPayment(false);
          }}
        />
      )}
    </div>
  );
};

export default PaymentModal;