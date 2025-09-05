import { LandingPageConfig, LandingPagePreviewData } from '../types';
// import { plans } from '../../../services/mockData';
import { mockBatches } from '../../../features/batches/mockData'; // Import batches data
import { plans } from '../../../services/mockData';

// Mock landing page config
const mockLandingPageConfig: LandingPageConfig = {
  id: 'default-config',
  businessName: 'Yoga Studio',
  tagline: 'Find your inner peace',
  description: 'We offer a variety of yoga classes for all levels. Join us to improve your physical and mental wellbeing.',
  primaryColor: '#4f46e5',
  logoUrl: 'https://via.placeholder.com/150',
  coverImageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  contactNumber: '+91 9876543210',
  contactEmail: 'info@yogastudio.com',
  socialLinks: {
    instagram: 'https://instagram.com/yogastudio',
    facebook: 'https://facebook.com/yogastudio',
  },
  showPlans: true,
  showBatches: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Create your own mock batch data instead of importing
const landingPageBatches = [
  {
    id: '1',
    name: 'Morning Yoga',
    timeSlot: '6–7 AM',
    membersCount: 23,
    memberLimit: 30
  },
  // ... other batch data
];

// Get landing page config
export const getLandingPageConfig = async (): Promise<LandingPageConfig> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLandingPageConfig);
    }, 500);
  });
};

// Update landing page config
export const updateLandingPageConfig = async (config: Partial<LandingPageConfig>): Promise<LandingPageConfig> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedConfig = {
        ...mockLandingPageConfig,
        ...config,
        updatedAt: new Date().toISOString()
      };
      resolve(updatedConfig);
    }, 500);
  });
};

// Get landing page preview data
export const getLandingPagePreviewData = async (): Promise<LandingPagePreviewData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get active plans
      const activePlans = plans.filter(plan => plan.isActive).map(plan => {
        // Find linked batches for this plan
        const linkedBatches = mockBatches.filter(batch =>
          plan.linkedBatchIds.includes(batch.id)
        );

        // Return plan with its linked batches
        return {
          ...plan,
          linkedBatches
        };
      });

      resolve({
        config: mockLandingPageConfig,
        plans: activePlans,
        batches: landingPageBatches
      });
    }, 500);
  });
};

// Generate landing page URL
export const generateLandingPageUrl = (businessId: string): string => {
  // In a real app, this might generate a unique URL or use a subdomain
  return `${window.location.origin}/landing/${businessId}`;
}; 