'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const SearchInput = ({ docs }: { docs: { id: string; title: string }[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocs, setFilteredDocs] = useState<{ id: string; title: string }[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredDocs([]);
      setIsDropdownOpen(false);
      return;
    }

    const results = docs.filter((doc) =>
      doc.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDocs(results);
    setIsDropdownOpen(results.length > 0);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search documents..."
        className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Search Results Dropdown */}
      {isDropdownOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          {filteredDocs.map((doc) => (
            <li key={doc.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">
              <Link href={`/documents/${doc.id}`} className="block">
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;