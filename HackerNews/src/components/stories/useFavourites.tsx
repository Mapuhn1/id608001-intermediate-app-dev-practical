import { useState, useEffect } from 'react';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState(new Set());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(new Set(stored.map(item => item.id)));
  }, []);

  const toggle = (id, story) => {
    const stored = JSON.parse(localStorage.getItem('favourites') || '[]');
    const exists = stored.some(item => item.id === id);
    
    const updated = exists 
      ? stored.filter(item => item.id !== id)
      : [...stored, story];
    
    localStorage.setItem('favourites', JSON.stringify(updated));
    setFavourites(new Set(updated.map(item => item.id)));
  };

  const getAll = () => JSON.parse(localStorage.getItem('favourites') || '[]');

  return { favourites, toggle, getAll };
};

export const getDomain = (url) => {
  if (!url) return null;
  try {
    return url.split('//')[1]?.split('/')[0]?.replace('www.', '');
  } catch {
    return null;
  }
};