import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './AppRoutes.jsx';
import { Toaster } from 'react-hot-toast';

const root = createRoot(document.body);
root.render(
    <div className='h-screen w-screen bg-sky-1000 text-blue-200'>
        <AppRoutes />
        <Toaster />
    </div>
);