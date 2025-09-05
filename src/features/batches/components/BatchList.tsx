import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Batch } from '../types';

interface BatchListProps {
  batches: Batch[];
  loading: boolean;
  onEdit: (batch: Batch) => void;
  onMessage: (batch: Batch) => void;
}

const BatchList: React.FC<BatchListProps> = ({ 
  batches, 
  loading, 
  onEdit, 
  onMessage 
}) => {
  const navigate = useNavigate();
  
  const handleView = (batchId: string) => {
    navigate(`/batches/${batchId}`);
  };
  
  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                  onClick={() => onEdit(batch)}
                  className="text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onMessage(batch)}
                  className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                >
                  Message
                </button>
              </td>
            </tr>
          ))}
          {batches.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No batches found. Create your first batch!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BatchList; 