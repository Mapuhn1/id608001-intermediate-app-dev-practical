import { useState, useEffect } from 'react';
import { fetchCategories } from '../components/API.tsx';
import { storage } from '../utils/storage';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cached = storage.getCategories();
        if (cached) {
          setCategories(cached);
          setLoading(false);
          return;
        }

        const data = await fetchCategories();
        setCategories(data);
        storage.saveCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
 
    loadCategories();
  }, []);

  return { categories, loading, error };
};