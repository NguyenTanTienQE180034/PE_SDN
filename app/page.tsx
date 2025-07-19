'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Search as SearchIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import { Contact, ContactFormData } from '@/lib/types';
import ContactCard from '@/components/ContactCard';
import ContactForm from '@/components/ContactForm';
import SearchAndFilter from '@/components/SearchAndFilter';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contacts');
      const data = await response.json();

      if (data.success) {
        setContacts(data.data);
      } else {
        toast.error('Failed to fetch contacts');
      }
    } catch (error) {
      toast.error('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredAndSortedContacts = useMemo(() => {
    let filtered = contacts.filter(contact => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGroup = !selectedGroup || contact.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });

    filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [contacts, searchTerm, selectedGroup, sortOrder]);

  const handleCreateContact = async (data: ContactFormData) => {
    try {
      setFormLoading(true);
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setContacts(prev => [...prev, result.data]);
        setIsCreateModalOpen(false);
        toast.success('Contact created successfully!');
      } else {
        toast.error(result.error || 'Failed to create contact');
      }
    } catch (error) {
      toast.error('Error creating contact');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditContact = async (data: ContactFormData) => {
    if (!selectedContact) return;

    try {
      setFormLoading(true);
      const response = await fetch(`/api/contacts/${selectedContact._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setContacts(prev =>
          prev.map(contact =>
            contact._id === selectedContact._id ? result.data : contact
          )
        );
        setIsEditModalOpen(false);
        setSelectedContact(null);
        toast.success('Contact updated successfully!');
      } else {
        toast.error(result.error || 'Failed to update contact');
      }
    } catch (error) {
      toast.error('Error updating contact');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteContact = async () => {
    if (!selectedContact) return;

    try {
      setFormLoading(true);
      const response = await fetch(`/api/contacts/${selectedContact._id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setContacts(prev => prev.filter(contact => contact._id !== selectedContact._id));
        setIsDeleteModalOpen(false);
        setSelectedContact(null);
        toast.success('Contact deleted successfully!');
      } else {
        toast.error(result.error || 'Failed to delete contact');
      }
    } catch (error) {
      toast.error('Error deleting contact');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold gradient-text mb-4"
          >
            Contact Manager
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg"
          >
            Manage your contacts with style and ease
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="font-medium">
              {filteredAndSortedContacts.length} contact{filteredAndSortedContacts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Contact</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedGroup={selectedGroup}
            onGroupChange={setSelectedGroup}
            sortOrder={sortOrder}
            onSortToggle={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredAndSortedContacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || selectedGroup ? 'No contacts found' : 'No contacts yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedGroup
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first contact'
              }
            </p>
            {!searchTerm && !selectedGroup && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Contact
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredAndSortedContacts.map((contact, index) => (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ContactCard
                    contact={contact}
                    onEdit={(contact) => {
                      setSelectedContact(contact);
                      setIsEditModalOpen(true);
                    }}
                    onDelete={(contact) => {
                      setSelectedContact(contact);
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Add New Contact"
          size="md"
        >
          <ContactForm
            onSubmit={handleCreateContact}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={formLoading}
          />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedContact(null);
          }}
          title="Edit Contact"
          size="md"
        >
          <ContactForm
            initialData={selectedContact ? {
              name: selectedContact.name,
              email: selectedContact.email,
              phone: selectedContact.phone || '',
              group: selectedContact.group,
            } : undefined}
            onSubmit={handleEditContact}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedContact(null);
            }}
            isLoading={formLoading}
          />
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          contact={selectedContact}
          onConfirm={handleDeleteContact}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setSelectedContact(null);
          }}
          isLoading={formLoading}
        />
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </div>
  );
}
