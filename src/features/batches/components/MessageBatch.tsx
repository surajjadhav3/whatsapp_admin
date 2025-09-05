import React, { useState } from 'react';
import { Batch } from '../types';

interface MessageBatchProps {
  batch: Batch;
  onClose: () => void;
}

const MessageBatch: React.FC<MessageBatchProps> = ({ batch, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    console.log(`Sending message to batch ${batch.id}: ${message}`);
    // Here you would integrate with WhatsApp API
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Message to {batch.name}
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here..."
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBatch; 