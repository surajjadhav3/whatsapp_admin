import React from 'react';
import { Batch } from '../types';
import { useNavigate } from 'react-router-dom';

interface BatchItemProps {
  batch: Batch;
  onEdit: (batch: Batch) => void;
  onMessage: (batch: Batch) => void;
  onDelete: (batchId: string) => void;
}

const BatchItem: React.FC<BatchItemProps> = ({ batch, onEdit, onMessage, onDelete }) => {
  const navigate = useNavigate();
  
  const handleView = () => {
    navigate(`/batches/${batch.id}`);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{batch.name}</td>
      <td className="px-6 py-4">{batch.time}</td>
      <td className="px-6 py-4">{batch.members}</td>
      <td className="px-6 py-4 flex space-x-2">
        <button 
          onClick={handleView}
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
          Msg
        </button>
        <button 
          onClick={() => onDelete(batch.id)}
          className="text-red-600 hover:text-red-800 font-medium text-sm"
        >
          Del
        </button>
      </td>
    </tr>
  );
};

export default BatchItem; 