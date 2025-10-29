import { useState, useEffect } from 'react';
import { fetchCategories } from '../components/API.tsx';
import { storage } from '../utils/storage';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
};