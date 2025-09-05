import { useState, useEffect, useCallback } from 'react';
import { Batch, BatchMember, Plan } from '../types';
import * as batchesApi from '../api/batchesApi';

export const useBatches = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatches = useCallback(async () => {
    try {
      setLoading(true);
      const data = await batchesApi.fetchBatches();
      setBatches(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch batches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const createBatch = async (batchData: Omit<Batch, 'id' | 'members'>) => {
    try {
      setLoading(true);
      const newBatch = await batchesApi.createBatch(batchData);
      setBatches(prev => [...prev, newBatch]);
      return newBatch;
    } catch (err) {
      setError('Failed to create batch');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBatch = async (batchId: string, batchData: Partial<Batch>) => {
    try {
      setLoading(true);
      const updatedBatch = await batchesApi.updateBatch(batchId, batchData);
      setBatches(prev => prev.map(batch => 
        batch.id === batchId ? { ...batch, ...updatedBatch } : batch
      ));
      return updatedBatch;
    } catch (err) {
      setError('Failed to update batch');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBatch = async (batchId: string) => {
    try {
      setLoading(true);
      await batchesApi.deleteBatch(batchId);
      setBatches(prev => prev.filter(batch => batch.id !== batchId));
      return true;
    } catch (err) {
      setError('Failed to delete batch');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    batches,
    loading,
    error,
    fetchBatches,
    createBatch,
    updateBatch,
    deleteBatch,
  };
};

export const useBatchDetails = (batchId: string) => {
  const [batch, setBatch] = useState<Batch | null>(null);
  const [members, setMembers] = useState<BatchMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const batchData = await batchesApi.fetchBatchById(batchId);
      setBatch(batchData);
      
      if (batchData) {
        const membersData = await batchesApi.fetchBatchMembers(batchId);
        setMembers(membersData);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch batch details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  useEffect(() => {
    if (batchId) {
      fetchBatchDetails();
    }
  }, [batchId, fetchBatchDetails]);

  const sendMessage = async (message: string) => {
    try {
      return await batchesApi.sendMessageToBatch(batchId, message);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
      throw err;
    }
  };

  return {
    batch,
    members,
    loading,
    error,
    fetchBatchDetails,
    sendMessage,
  };
};

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const data = await batchesApi.fetchPlans();
      setPlans(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const linkBatchToPlan = async (batchId: string, planId: string) => {
    try {
      await batchesApi.linkBatchToPlan(batchId, planId);
      setPlans(prev => prev.map(plan => 
        plan.id === planId 
          ? { ...plan, linkedBatchIds: [...plan.linkedBatchIds, batchId] } 
          : plan
      ));
      return true;
    } catch (err) {
      setError('Failed to link batch to plan');
      console.error(err);
      throw err;
    }
  };

  const unlinkBatchFromPlan = async (batchId: string, planId: string) => {
    try {
      await batchesApi.unlinkBatchFromPlan(batchId, planId);
      setPlans(prev => prev.map(plan => 
        plan.id === planId 
          ? { ...plan, linkedBatchIds: plan.linkedBatchIds.filter(id => id !== batchId) } 
          : plan
      ));
      return true;
    } catch (err) {
      setError('Failed to unlink batch from plan');
      console.error(err);
      throw err;
    }
  };

  return {
    plans,
    loading,
    error,
    fetchPlans,
    linkBatchToPlan,
    unlinkBatchFromPlan,
  };
}; 