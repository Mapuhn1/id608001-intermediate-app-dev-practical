import { Badge } from '../ui/badge';

const categoryColors = {
  9: 'bg-blue-500',        // General Knowledge
  10: 'bg-green-500',      // Books
  11: 'bg-purple-500',     // Film
  17: 'bg-yellow-500',     // Science & Nature
  18: 'bg-pink-500',       // Computers
  19: 'bg-indigo-500',     // Mathematics
  20: 'bg-red-500',        // Mythology
  21: 'bg-teal-500',       // Sports
  22: 'bg-orange-500',     // Geography
  23: 'bg-cyan-500',       // History
  24: 'bg-rose-500',       // Politics
  25: 'bg-amber-500',      // Art
  26: 'bg-lime-500',       // Celebrities
  27: 'bg-emerald-500',    // Animals
  28: 'bg-sky-500',        // Vehicles
  29: 'bg-violet-500',     // Entertainment: Comics
  30: 'bg-fuchsia-500',    // Science: Gadgets
  31: 'bg-indigo-400',     // Entertainment: Japanese Anime & Manga
  32: 'bg-orange-400',     // Entertainment: Cartoon & Animations
  default: 'bg-gray-500'
};

export const CategoryBadge = ({ categoryId, categoryName }) => {
  const colorClass = categoryColors[categoryId] || categoryColors.default;
};