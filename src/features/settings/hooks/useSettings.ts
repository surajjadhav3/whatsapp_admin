import { useState, useEffect } from 'react';
import { Settings, BusinessInfo, WhatsAppConfig, StripeConfig } from '../types';
import * as settingsApi from '../api/settingsApi';
import { useToast } from '../../../components/Toast';

// Default seller ID - in a real app, this would come from auth context or similar
const DEFAULT_SELLER_ID = 'seller-002';

export const useSettings = (sellerId = DEFAULT_SELLER_ID) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await settingsApi.getSettings(sellerId);
        setSettings(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load settings';
        setError(errorMessage);
        showToast('error', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [sellerId, showToast]);

  const updateBusinessInfo = async (businessInfo: BusinessInfo): Promise<boolean> => {
    if (!settings) return false;

    try {
      const response = await settingsApi.updateBusinessInfo(settings, businessInfo);
      if (response.success) {
        setSettings(response.data);
        showToast('success', 'Business information updated successfully');
        return true;
      }
      showToast('error', response.message || 'Failed to update business information');
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update business information';
      console.error('Error updating business info:', err);
      showToast('error', errorMessage);
      return false;
    }
  };

  const updateWhatsAppConfig = async (whatsappConfig: WhatsAppConfig): Promise<boolean> => {
    if (!settings) return false;

    try {
      const response = await settingsApi.updateWhatsAppConfig(settings, whatsappConfig);
      if (response.success) {
        setSettings(response.data);
        showToast('success', 'WhatsApp configuration updated successfully');
        return true;
      }
      showToast('error', response.message || 'Failed to update WhatsApp configuration');
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update WhatsApp configuration';
      console.error('Error updating WhatsApp config:', err);
      showToast('error', errorMessage);
      return false;
    }
  };

  const updateStripeConfig = async (stripeConfig: StripeConfig): Promise<boolean> => {
    if (!settings) return false;

    try {
      const response = await settingsApi.updateStripeConfig(settings, stripeConfig);
      if (response.success) {
        setSettings(response.data);
        showToast('success', 'Payment settings updated successfully');
        return true;
      }
      showToast('error', response.message || 'Failed to update payment settings');
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment settings';
      console.error('Error updating Stripe config:', err);
      showToast('error', errorMessage);
      return false;
    }
  };

  return {
    settings,
    loading,
    error,
    updateBusinessInfo,
    updateWhatsAppConfig,
    updateStripeConfig
  };
}; 