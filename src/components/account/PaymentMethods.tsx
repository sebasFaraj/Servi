import React from 'react';
import { CreditCard, Plus } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Methods</h2>
      
      <div className="grid gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-semibold">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/24</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-700">Remove</button>
          </div>
        </div>

        <button className="flex items-center justify-center space-x-2 w-full p-6
                       bg-gray-50 rounded-lg border-2 border-dashed border-gray-300
                       text-gray-600 hover:bg-gray-100 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Payment Method</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;