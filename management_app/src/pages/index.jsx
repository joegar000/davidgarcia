import React from 'react';
import { createRoot } from 'react-dom/client';
import App, { router } from '../components/App';
import { RouterProvider } from 'react-router-dom';

document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.querySelector('div#root'));
    root.render(
        <React.StrictMode>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
        </React.StrictMode>
    );
});
