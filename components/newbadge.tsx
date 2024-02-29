import { Star } from 'lucide-react';

export const NewBadge = () => {
  return (
    <div className="flex items-center">
      <Star className="text-yellow-400" size={20} />
      <span className="ml-2 font-bold">New</span>
    </div>
  );
};