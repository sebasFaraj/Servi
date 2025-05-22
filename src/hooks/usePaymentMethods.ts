import { useState, useEffect } from 'react';
import type { PaymentMethod, NewPaymentMethod } from '../types/payment';

const STORAGE_KEY = 'paymentMethods';

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPaymentMethods = () => {
      try {
        const savedMethods = localStorage.getItem(STORAGE_KEY);
        if (savedMethods) {
          setPaymentMethods(JSON.parse(savedMethods));
        }
      } catch (error) {
        console.error('Error loading payment methods:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentMethods();
  }, []);

  const savePaymentMethods = (methods: PaymentMethod[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(methods));
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Error saving payment methods:', error);
      throw new Error('Failed to save payment methods');
    }
  };

  const addPaymentMethod = async (newMethod: NewPaymentMethod) => {
    try {
      if (!newMethod.cardholderName?.trim()) {
        throw new Error('Cardholder name is required');
      }

      if (!/^\d{16}$/.test(newMethod.cardNumber)) {
        throw new Error('Invalid card number');
      }

      const method: PaymentMethod = {
        id: Date.now().toString(),
        type: newMethod.type,
        last4: newMethod.cardNumber.slice(-4),
        expiryMonth: newMethod.expiryMonth,
        expiryYear: newMethod.expiryYear,
        isDefault: paymentMethods.length === 0,
        cardholderName: newMethod.cardholderName.trim(),
        label: newMethod.label.trim() || `${newMethod.type.charAt(0).toUpperCase() + newMethod.type.slice(1)} Card`
      };

      const updatedMethods = [...paymentMethods, method];
      savePaymentMethods(updatedMethods);
      return method;
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  };

  const updatePaymentMethod = async (id: string, updates: Partial<PaymentMethod>) => {
    try {
      const updatedMethods = paymentMethods.map(method =>
        method.id === id ? { ...method, ...updates } : method
      );
      savePaymentMethods(updatedMethods);
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }
  };

  const removePaymentMethod = async (id: string) => {
    try {
      const methodToRemove = paymentMethods.find(method => method.id === id);
      if (!methodToRemove) return;

      // If removing the default method and there are other methods
      if (methodToRemove.isDefault && paymentMethods.length > 1) {
        // Find the next method to make default
        const nextDefault = paymentMethods.find(m => m.id !== id);
        if (nextDefault) {
          const updatedMethods = paymentMethods
            .filter(method => method.id !== id)
            .map(method => ({
              ...method,
              isDefault: method.id === nextDefault.id
            }));
          savePaymentMethods(updatedMethods);
          return;
        }
      }

      // If it's not the default or it's the only method
      const updatedMethods = paymentMethods.filter(method => method.id !== id);
      savePaymentMethods(updatedMethods);
    } catch (error) {
      console.error('Error removing payment method:', error);
      throw error;
    }
  };

  const setDefaultMethod = async (id: string) => {
    try {
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }));
      savePaymentMethods(updatedMethods);
    } catch (error) {
      console.error('Error setting default method:', error);
      throw error;
    }
  };

  return {
    paymentMethods,
    isLoading,
    addPaymentMethod,
    updatePaymentMethod,
    removePaymentMethod,
    setDefaultMethod
  };
}