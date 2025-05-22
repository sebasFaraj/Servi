import React from 'react';
import type { User } from '../../hooks/useAuth';
import { UserCircle } from 'lucide-react';

interface UserAvatarProps {
  user: User | null;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar = ({ user, size = 'md' }: UserAvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  if (!user || !user.avatar) {
    return (
      <div className={`${sizeClasses[size]} rounded-full bg-gray-100 flex items-center justify-center`}>
        <UserCircle className="w-full h-full text-gray-400" />
      </div>
    );
  }

  return (
    <img
      src={user.avatar}
      alt={user.name}
      className={`${sizeClasses[size]} rounded-full object-cover`}
    />
  );
};

export default UserAvatar;