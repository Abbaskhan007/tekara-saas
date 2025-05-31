'use client';
import React from 'react';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

export default function SubmitButton({
  buttonTitle,
  buttonLoadingTitle,
}: {
  buttonTitle: string;
  buttonLoadingTitle: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button disabled={pending} type='submit' className='w-full'>
        {pending ? buttonLoadingTitle : buttonTitle}
        {pending && <Loader2 className='animate-spin' />}
      </Button>
    </div>
  );
}
