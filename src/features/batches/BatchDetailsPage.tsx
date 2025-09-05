import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBatchDetails } from './hooks/useBatches';
import BatchDetail from './components/BatchDetail';

const BatchDetailsPage: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const { batch, members, loading, error, sendMessage } = useBatchDetails(batchId || '');
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/batches')}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Batches
        </button>
      </div>
      
      {batch ? (
        <BatchDetail
          batch={batch}
          members={members}
          loading={loading}
          onSendMessage={sendMessage}
        />
      ) : loading ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">Batch not found</p>
        </div>
      )}
    </div>
  );
};

export default BatchDetailsPage; 