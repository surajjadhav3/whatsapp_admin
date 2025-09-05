export interface LandingPageConfig {
  id: string;
  businessName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  logoUrl?: string;
  coverImageUrl?: string;
  contactNumber: string;
  contactEmail?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  showPlans: boolean;
  showBatches: boolean;
  customCss?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandingPagePreviewData {
  config: LandingPageConfig;
  plans: any[];
  batches: any[];
} 