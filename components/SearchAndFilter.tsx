'use client';

import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { ContactGroups } from '@/lib/types';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedGroup: string;
  onGroupChange: (group: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortToggle: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedGroup,
  onGroupChange,
  sortOrder,
  onSortToggle,
}) => {
  const groupOptions = [
    { value: '', label: 'All Groups' },
    ...ContactGroups.map(group => ({ value: group, label: group })),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Search contacts by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="w-full"
          />
        </div>
        
        {/* Group Filter */}
        <div className="lg:w-48">
          <Select
            options={groupOptions}
            value={selectedGroup}
            onChange={(e) => onGroupChange(e.target.value)}
          />
        </div>
        
        {/* Sort Button */}
        <Button
          variant="secondary"
          onClick={onSortToggle}
          className="lg:w-auto flex items-center space-x-2"
        >
          <ArrowUpDown className="h-4 w-4" />
          <span>Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
