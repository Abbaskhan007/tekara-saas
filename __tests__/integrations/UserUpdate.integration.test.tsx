// tests/integration/UserUpdateIntegration.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersTable from '../../components/shared/users/UsersTable';
import { User } from '../../types/userType';
import '@testing-library/jest-dom';

// Mock the EditUserModal to avoid nested modals in tests
jest.mock('../../components/shared/users/EditUserModal.tsx', () => {
  const React = require('react');
  return function MockEditUserModal({
    user,
    setUsers,
  }: {
    user: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  }) {
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);

    return (
      <div>
        <button 
          aria-label={`Edit ${user.name}`}
          onClick={() => {
            setName('Updated ' + user.name);
            setEmail('updated_' + user.email);
            setUsers(prev => prev.map(u => 
              u.id === user.id ? {...u, name: 'Updated ' + u.name, email: 'updated_' + u.email} : u
            ));
          }}
        >
          Edit
        </button>
      </div>
    );
  };
});

describe('User Update Integration', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt 4',
        city: 'Anytown',
        zipcode: '12345',
        geo: { lat: '0', lng: '0' },
      },
      phone: '555-1234',
      website: 'john.com',
      company: {
        name: 'Company Inc',
        catchPhrase: 'Catch me if you can',
        bs: 'bs',
      },
      username: 'johndoe',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      address: {
        street: '456 Oak St',
        suite: 'Suite 100',
        city: 'Otherville',
        zipcode: '67890',
        geo: { lat: '0', lng: '0' },
      },
      phone: '555-5678',
      website: 'jane.com',
      company: {
        name: 'Corporation LLC',
        catchPhrase: 'We mean business',
        bs: 'business',
      },
      username: 'janesmith',
    }
  ];

  it('updates user data in the table after editing', async () => {
    // Render the UsersTable component with mock data
    render(<UsersTable users={mockUsers} />);

    // Verify initial data is present
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    // Find and click the edit button for John Doe
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]); // First user's edit button

    // Wait for the update to reflect in the table
    await waitFor(() => {
      expect(screen.getByText('Updated John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('updated_john@example.com')).toBeInTheDocument();
    
    // Verify other user remains unchanged
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('only updates the edited user', async () => {
    render(<UsersTable users={mockUsers} />);
    
    // Get all edit buttons
    const editButtons = screen.getAllByText('Edit');
    
    // Click edit for first user
    fireEvent.click(editButtons[0]);
    
    await waitFor(() => {
      // First user updated
      expect(screen.getByText('Updated John Doe')).toBeInTheDocument();
      
      // Second user unchanged
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('Updated Jane Smith')).not.toBeInTheDocument();
    });
  });
});