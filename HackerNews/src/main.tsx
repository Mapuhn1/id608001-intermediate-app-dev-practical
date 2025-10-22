import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App.tsx';
import Stories from './components/stories/Stories.tsx';
import Leaders from './components/leaders/Leaders.tsx';
import Favourites from './components/favourites/Favourites.tsx';
import './index.css'
import App from './App'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)