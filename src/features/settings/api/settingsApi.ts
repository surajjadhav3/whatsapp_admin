import { Settings, BusinessInfo, WhatsAppConfig, StripeConfig, GetSettingsResponse, UpdateSettingsResponse } from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Mock data for initial settings
// const mockSettings: Settings = {
//   sellerId: '123',
//   businessInfo: {
//     businessName: 'Yoga Studio',
//     category: 'Wellness',
//     whatsappNumber: '+91 9876543210',
//     publicLink: 'https://wa.me/919876543210'
//   },
//   whatsappConfig: {
//     apiKey: '••••••••••••••••',
//     webhookUrl: 'https://api.yourdomain.com/webhooks/whatsapp',
//     templateSyncStatus: true
//   },
//   stripeConfig: {
//     publishableKey: '••••••••••••••••',
//     webhookConnected: false
//   }
// };

// GET /settings
export const getSettings = async (sellerId: string): Promise<Settings> => {
  try {
    const response = await axios.get<GetSettingsResponse>(
      `${API_BASE_URL}/settings?sellerId=${sellerId}`
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch settings');
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

// PUT /settings
export const updateSettings = async (settings: Settings): Promise<UpdateSettingsResponse> => {
  try {
    // Create a new object with only the required fields
    const payload = {
      sellerId: settings.sellerId,
      businessInfo: settings.businessInfo,
      whatsappConfig: settings.whatsappConfig,
      stripeConfig: settings.stripeConfig
    };

    const response = await axios.post<UpdateSettingsResponse>(
      `${API_BASE_URL}/settings`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

// Helper function to update business info while keeping other settings intact
export const updateBusinessInfo = async (
  currentSettings: Settings,
  businessInfo: BusinessInfo
): Promise<UpdateSettingsResponse> => {
  const updatedSettings = {
    ...currentSettings,
    businessInfo: {
      ...businessInfo,
      // Ensure publicLink is updated based on the whatsapp number
      publicLink: `https://wa.me/${businessInfo.whatsappNumber.replace(/\D/g, '')}`
    }
  };

  return updateSettings(updatedSettings);
};

// Helper function to update WhatsApp config while keeping other settings intact
export const updateWhatsAppConfig = async (
  currentSettings: Settings,
  whatsappConfig: WhatsAppConfig
): Promise<UpdateSettingsResponse> => {
  const updatedSettings = {
    ...currentSettings,
    whatsappConfig: {
      ...whatsappConfig
    }
  };

  return updateSettings(updatedSettings);
};

// Helper function to update Stripe config while keeping other settings intact
export const updateStripeConfig = async (
  currentSettings: Settings,
  stripeConfig: StripeConfig
): Promise<UpdateSettingsResponse> => {
  const updatedSettings = {
    ...currentSettings,
    stripeConfig: {
      ...stripeConfig
    }
  };

  return updateSettings(updatedSettings);
};

// POST /settings/whatsapp/sync-templates
export const syncWhatsAppTemplates = async (): Promise<{ success: boolean; message: string }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'WhatsApp templates synced successfully'
      });
    }, 1500);
  });
};

// POST /settings/stripe/connect-webhook
export const connectStripeWebhook = async (): Promise<{ success: boolean; message: string }> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Stripe webhook connected successfully'
      });
    }, 1500);
  });
}; 