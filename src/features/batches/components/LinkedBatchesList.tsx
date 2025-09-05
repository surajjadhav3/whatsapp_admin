import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Batch } from '../types';

interface LinkedBatchesListProps {
  batches: Batch[];
  loading: boolean;
  onUnlink: (batchId: string) => void;
}

const LinkedBatchesList: React.FC<LinkedBatchesListProps> = ({ 
  batches, 
  loading, 
  onUnlink 
}) => {
  const navigate = useNavigate();
  
  const handleView = (batchId: string) => {
    navigate(`/batches/${batchId}`);
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded mb-2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h3 className="text-lg font-semibold p-4 border-b">Linked Batches</h3>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Batch Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Slot
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Members
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {batches.map(batch => (
            <tr key={batch.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{batch.name}</td>
              <td className="px-6 py-4">{batch.time}</td>
              <td className="px-6 py-4">
                {batch.members} {batch.maxMembers && `/ ${batch.maxMembers}`}
              </td>
              <td className="px-6 py-4 flex space-x-2">
                <button 
                  onClick={() => handleView(batch.id)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View
                </button>
                <button 
                  onClick={() => onUnlink(batch.id)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Unlink
                </button>
              </td>
            </tr>
          ))}
          {batches.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No batches linked to this plan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LinkedBatchesList; 