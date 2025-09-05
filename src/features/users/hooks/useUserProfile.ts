import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { User } from '../types/user';
import { getBatchById } from '../../batches/services/batchService';
import { getPlanById } from '../../plans/services/planService';
import { Batch } from '../../batches/types';
import { Plan } from '../../plans/types';


export const useUserProfile = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [batch, setBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        // Fetch user data  
        const userData = await userService.getUserById(userId);
        console.log('User data fetched:', userData);
        if (userData) {
          setUser(userData);
        }
        
        // Fetch batch data
        if (userData?.batchId) {
          try {
            const batchData = await getBatchById(userData.batchId);
            console.log('Batch data fetched:', batchData);
            setBatch(batchData);
          } catch (batchError) {
            console.error('Error fetching batch:', batchError);
          }
        }
        
        // Fetch plan data
        if (userData?.planId) {
          try {
            const planData = await getPlanById(userData.planId);
            console.log('Plan data fetched:', planData);
            setPlan(planData);
          } catch (planError) {
            console.error('Error fetching plan:', planError);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const extendPlan = async (planId: string, expiryDate: string) => {
    console.log('Extending plan with payload:', { userId, planId, expiryDate });
    // Simulate API call
    return new Promise<{ success: boolean; message: string }>((resolve) => {
      setTimeout(() => {
        if (user) {
          // Update local state
          setUser({
            ...user,
            planId,
            expiryDate
          });
          console.log('Plan extended successfully:', { userId, planId, expiryDate });
          resolve({ success: true, message: 'Plan extended successfully' });
        } else {
          console.error('Failed to extend plan: User not found');
          resolve({ success: false, message: 'Failed to extend plan' });
        }
      }, 500);
    });
  };

  const saveNotes = async (notes: string) => {
    console.log('Saving notes with payload:', { userId, notes });
    // Simulate API call
    return new Promise<{ success: boolean; message: string }>((resolve) => {
      setTimeout(() => {
        if (user) {
          // Update local state
          setUser({
            ...user,
            notes
          });
          console.log('Notes saved successfully:', { userId, notes });
          resolve({ success: true, message: 'Notes saved successfully' });
        } else {
          console.error('Failed to save notes: User not found');
          resolve({ success: false, message: 'Failed to save notes' });
        }
      }, 500);
    });
  };

  return {
    user,
    plan,
    batch,
    loading,
    error,
    extendPlan,
    saveNotes
  };
}; 