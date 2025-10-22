import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App.tsx';
import Stories from './components/stories/Stories.tsx';
import Leaders from './components/leaders/Leaders.tsx';
import Favourites from './components/favourites/Favourites.tsx';
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='stories' element={<Stories />} />
            <Route path='leaders' element={<Leaders />} />
            <Route path='favourites' element={<Favourites />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);