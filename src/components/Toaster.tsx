'use client';
 
import { Toaster as SonnerToaster } from 'sonner';
 
export function Toaster() {
  return (
    <SonnerToaster
      toastOptions={{
        classNames: {
          toast: '!bg-base-300',
          title: '!text-white',
        } 
      }}
      richColors
      theme="dark"
      position="top-center"
    />
  );
}
