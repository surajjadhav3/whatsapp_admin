import { useState, useEffect, useCallback } from 'react';
import { 
  getLandingPageConfig, 
  updateLandingPageConfig, 
  getLandingPagePreviewData,
  generateLandingPageUrl
} from '../api/landingPageApi';
import { LandingPageConfig, LandingPagePreviewData } from '../types';

export const useLandingPage = () => {
  const [config, setConfig] = useState<LandingPageConfig | null>(null);
  const [previewData, setPreviewData] = useState<LandingPagePreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getLandingPageConfig();
      console.log('Landing page config:', data);
      setConfig(data);
      setPreviewUrl(generateLandingPageUrl(data.id));
    } catch (err) {
      console.error('Error fetching landing page config:', err);
      setError('Failed to load landing page configuration');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPreviewData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getLandingPagePreviewData();
      console.log('Landing page preview data:', data);
      setPreviewData(data);
    } catch (err) {
      console.error('Error fetching landing page preview data:', err);
      setError('Failed to load landing page preview data');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConfig = async (updates: Partial<LandingPageConfig>) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Updating landing page config:', updates);
      const updatedConfig = await updateLandingPageConfig(updates);
      console.log('Updated landing page config:', updatedConfig);
      setConfig(updatedConfig);
      return true;
    } catch (err) {
      console.error('Error updating landing page config:', err);
      setError('Failed to update landing page configuration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const openPreview = () => {
    if (config) {
      const previewUrl = `/landing/${config.id}`;
      window.open(previewUrl, '_blank');
    }
  };

  const copyLandingPageUrl = () => {
    if (previewUrl) {
      navigator.clipboard.writeText(previewUrl);
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    config,
    previewData,
    loading,
    error,
    previewUrl,
    fetchConfig,
    fetchPreviewData,
    updateConfig,
    openPreview,
    copyLandingPageUrl
  };
}; 