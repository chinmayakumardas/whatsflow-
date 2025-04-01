'use client';

import { useState } from 'react';

const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Admin' }
];

export default function Users() {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  
  const filteredUsers = sampleUsers
    .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded-md w-full mb-4"
      />
      
      {/* Sort Button */}
      <button
        onClick={() => setSortAsc(!sortAsc)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Sort by Name {sortAsc ? '▲' : '▼'}
      </button>
      
      {/* User Table */}
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}