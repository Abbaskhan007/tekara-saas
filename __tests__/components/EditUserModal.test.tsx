// tests/components/EditUserModal.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditUserModal from '../../components/shared/users/EditUserModal'
import { User } from '../../types/userType';
import { toast } from 'sonner';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('../../serverActions/userActions', () => ({
  updateUserAction: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('EditUserModal', () => {
  const mockUser: User = {
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
  };

  const mockUsers: User[] = [mockUser];
  const mockSetUsers = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the trigger button', () => {
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    expect(screen.getByLabelText('Edit user')).toBeInTheDocument();
  });

  it('opens the modal when trigger button is clicked', async () => {
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit user'));
    expect(await screen.findByText('Edit profile')).toBeInTheDocument();
  });

  it('pre-fills form with user data', async () => {
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit user'));
    
    expect(await screen.findByDisplayValue('John Doe')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  it('updates form fields', async () => {
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit user'));
    
    const nameInput = await screen.findByDisplayValue('John Doe');
    const emailInput = await screen.findByDisplayValue('john@example.com');
    
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    
    expect(nameInput).toHaveValue('Jane Smith');
    expect(emailInput).toHaveValue('jane@example.com');
  });

  it('submits form successfully', async () => {
    // Mock successful update
    require('../../serverActions/userActions').updateUserAction.mockResolvedValueOnce(true);
    
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit user'));
    
    const nameInput = await screen.findByDisplayValue('John Doe');
    const emailInput = await screen.findByDisplayValue('john@example.com');
    
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    
    fireEvent.click(screen.getByText('Save'));
    
    await waitFor(() => {
      expect(require('../../serverActions/userActions').updateUserAction).toHaveBeenCalledWith(1, {
        name: 'Jane Smith',
        email: 'jane@example.com',
      });
    });
    
    await waitFor(() => {
      expect(mockSetUsers).toHaveBeenCalledWith([{
        ...mockUser,
        name: 'Jane Smith',
        email: 'jane@example.com',
      }]);
    });
    
    expect(toast.success).toHaveBeenCalledWith(
      'User updated successfully',
      { position: 'top-right' }
    );
    
    // Verify modal closes
    expect(screen.queryByText('Edit profile')).not.toBeInTheDocument();
  });

  it('handles form submission failure', async () => {
    // Mock failed update
    const errorMessage = 'Network error';
    require('../../serverActions/userActions').updateUserAction.mockRejectedValueOnce(
      new Error(errorMessage)
    );
    
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit user'));
    fireEvent.click(await screen.findByText('Save'));
    
    await waitFor(() => {
      expect(require('../../serverActions/userActions').updateUserAction).toHaveBeenCalled();
    });
    
    expect(toast.error).toHaveBeenCalledWith(
      `error updating user: Error: ${errorMessage}`,
      { position: 'top-right' }
    );
    
    // Verify modal stays open
    expect(screen.getByText('Edit profile')).toBeInTheDocument();
  });

  it('cancels without saving', async () => {
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit user'));
    expect(await screen.findByText('Edit profile')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    
    await waitFor(() => {
      expect(screen.queryByText('Edit profile')).not.toBeInTheDocument();
    });
    
    // Verify no updates were made
    expect(require('../../serverActions/userActions').updateUserAction).not.toHaveBeenCalled();
    expect(mockSetUsers).not.toHaveBeenCalled();
  });

  it('shows validation errors for empty fields', async () => {
    render(
      <EditUserModal
        user={mockUser}
        users={mockUsers}
        setUsers={mockSetUsers}
      />
    );
    
    fireEvent.click(screen.getByLabelText('Edit user'));
    
    const nameInput = await screen.findByDisplayValue('John Doe');
    const emailInput = await screen.findByDisplayValue('john@example.com');
    
    // Clear fields
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    
    fireEvent.click(screen.getByText('Save'));
    
    // HTML5 validation should prevent submission
    expect(require('../../serverActions/userActions').updateUserAction).not.toHaveBeenCalled();
    
    // Fields should show validation errors
    expect(nameInput).toBeInvalid();
    expect(emailInput).toBeInvalid();
  });
});