export interface BusinessInfo {
  businessName: string;
  category: string;
  whatsappNumber: string;
  publicLink: string;
}

export interface WhatsAppConfig {
  apiKey: string;
  webhookUrl: string;
  templateSyncStatus: boolean;
}

export interface StripeConfig {
  publishableKey: string;
  webhookConnected: boolean;
}

export interface Settings {
  id?: string;
  sellerId: string;
  businessInfo: BusinessInfo;
  whatsappConfig: WhatsAppConfig;
  stripeConfig: StripeConfig;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetSettingsResponse {
  success: boolean;
  data: Settings;
}

export interface UpdateSettingsResponse {
  success: boolean;
  message: string;
  data: Settings;
} 