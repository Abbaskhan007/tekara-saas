'use client';

import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import React, { useState } from 'react';
import { User } from '@/types/userType';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { updateUserAction } from '@/serverActions/userActions';
import SubmitButton from '../SubmitButton';

export default function EditUserModal({
  user,
  users,
  setUsers,
}: {
  user: User;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateUserAction(user.id, { name, email });
      const updatedUsers = users.map(item => {
        if (item.id === user.id) {
          return { ...item, name, email };
        } else {
          return item;
        }
      });
      setUsers(updatedUsers);
      toast.success('User updated successfully', { position: 'top-right' });
      setOpen(false); // ✅ close the modal
    } catch (err) {
      console.error(err);
      toast.error(`error updating user: ${err}`, { position: 'top-right' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full hover:bg-gray-200 bg-gray-100 cursor-pointer shadow-md'
          aria-label='Edit user'
        >
          <Pencil className='h-4 w-4 text-gray-600' />
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[425px]'
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='mb-6'>
            <Input
              type='text'
              placeholder='Name'
              className='w-full'
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <Input
              type='email'
              placeholder='Email'
              className='w-full'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <DialogFooter>
            <SubmitButton buttonTitle='Save' buttonLoadingTitle='Saving' />
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
