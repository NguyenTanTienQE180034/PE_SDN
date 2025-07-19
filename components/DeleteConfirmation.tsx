'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Contact } from '@/lib/types';
import Modal from './ui/Modal';
import Button from './ui/Button';

interface DeleteConfirmationProps {
  isOpen: boolean;
  contact: Contact | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  contact,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!contact) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Delete Contact
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <strong>{contact.name}</strong>? 
          This action cannot be undone.
        </p>
        
        <div className="flex justify-center space-x-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={isLoading}
            disabled={isLoading}
          >
            Delete Contact
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
