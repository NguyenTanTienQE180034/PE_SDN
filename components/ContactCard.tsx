'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Edit, Trash2, User } from 'lucide-react';
import { Contact } from '@/lib/types';
import { getInitials, getGroupColor, formatPhoneNumber } from '@/lib/utils';
import Button from './ui/Button';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getGroupColor(contact.group)}`}>
              {getInitials(contact.name)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{contact.name}</h3>
              {contact.group && (
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${getGroupColor(contact.group)}`}>
                  {contact.group}
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(contact)}
              className="p-2 hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(contact)}
              className="p-2 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{contact.email}</span>
          </div>

          {contact.phone && (
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{formatPhoneNumber(contact.phone)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </motion.div>
  );
};

export default ContactCard;
