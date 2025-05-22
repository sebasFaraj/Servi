import React from 'react';
import UserAvatar from '../../user/UserAvatar';
import type { User } from '../../../hooks/useAuth';

interface ProfileOverviewProps {
  user: User;
}

const ProfileOverview = ({ user }: ProfileOverviewProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-6">
      <UserAvatar user={user} size="lg" />
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  </div>
);

export default ProfileOverview;