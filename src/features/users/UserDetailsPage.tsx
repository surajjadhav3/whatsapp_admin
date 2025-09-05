import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProfile } from './hooks/useUserProfile';
import UserProfile from './components/UserProfile';

const UserDetailsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  
  const {
    user,
    plan,
    batch,
    loading,
    error,
    extendPlan,
    saveNotes
  } = useUserProfile(userId || '');
  
  useEffect(() => {
    if (!userId) {
      navigate('/users');
    }
    
    // Log when component mounts
    console.log('UserDetailsPage mounted for userId:', userId);
    
    return () => {
      // Log when component unmounts
      console.log('UserDetailsPage unmounted for userId:', userId);
    };
  }, [userId, navigate]);
  
  const handleClose = () => {
    console.log('Navigating back to users list');
    navigate('/users');
  };
  
  const handleExtendPlan = async (planId: string, expiryDate: string) => {
    console.log('Extending plan with payload:', { userId, planId, expiryDate });
    const result = await extendPlan(planId, expiryDate);
    console.log('Extend plan result:', result);
    return result;
  };
  
  const handleSaveNotes = async (notes: string) => {
    console.log('Saving notes with payload:', { userId, notes });
    const result = await saveNotes(notes);
    console.log('Save notes result:', result);
    return result;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button 
          onClick={handleClose}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Users List
        </button>
      </div>
      
      <UserProfile
        user={user}
        plan={plan}
        batch={batch}
        loading={loading}
        error={error}
        onExtendPlan={handleExtendPlan}
        onSaveNotes={handleSaveNotes}
        onClose={handleClose}
      />
    </div>
  );
};

export default UserDetailsPage;
