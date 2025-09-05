import React, { useState } from 'react';
import { Batch, BatchMember } from '../types';
import MessageBatchModal from './MessageBatchModal';

interface BatchDetailProps {
  batch: Batch;
  members: BatchMember[];
  loading: boolean;
  onSendMessage: (message: string) => Promise<boolean>;
}

const BatchDetail: React.FC<BatchDetailProps> = ({ 
  batch, 
  members, 
  loading,
  onSendMessage
}) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  
  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{batch.name}</h1>
            <div className="text-gray-600 mb-1">Time: {batch.time}</div>
            <div className="text-gray-600">
              Members: {batch.members} {batch.maxMembers && `/ ${batch.maxMembers}`}
            </div>
          </div>
          <button
            onClick={() => setIsMessageModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Send WhatsApp Message
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Batch Members</h2>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.planName}</td>
                <td className="px-6 py-4">{member.endDate}</td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No members in this batch
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {isMessageModalOpen && (
        <MessageBatchModal
          batch={batch}
          onSend={onSendMessage}
          onClose={() => setIsMessageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BatchDetail; 