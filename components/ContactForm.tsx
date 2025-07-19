'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, Users } from 'lucide-react';
import { ContactFormData, ContactFormSchema, ContactGroups } from '@/lib/types';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

interface ContactFormProps {
  initialData?: ContactFormData;
  onSubmit: (data: ContactFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      group: undefined,
    },
  });

  const groupOptions = [
    { value: '', label: 'Select a group (optional)' },
    ...ContactGroups.map(group => ({ value: group, label: group })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Name"
          placeholder="Enter full name"
          icon={<User className="h-4 w-4" />}
          error={errors.name?.message}
          {...register('name')}
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="Enter email address"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        
        <Input
          label="Phone (Optional)"
          type="tel"
          placeholder="Enter phone number"
          icon={<Phone className="h-4 w-4" />}
          error={errors.phone?.message}
          {...register('phone')}
        />
        
        <Select
          label="Group (Optional)"
          options={groupOptions}
          error={errors.group?.message}
          {...register('group')}
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          {initialData ? 'Update Contact' : 'Create Contact'}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
