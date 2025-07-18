import React from 'react';
import { Signup as SignupComponent } from '../components';

export default function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="w-full max-w-md">
        <SignupComponent />
      </div>
    </div>
  );
}
