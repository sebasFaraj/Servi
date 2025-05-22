import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Star, CreditCard, Settings } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import StatCard from './StatCard';
import ProfileOverview from './ProfileOverview';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth/signin');
    return null;
  }

  const stats = [
    { icon: Calendar, label: 'Active Bookings', value: '3', path: '/account/bookings' },
    { icon: Star, label: 'Reviews Given', value: '12', path: '/account/reviews' },
    { icon: CreditCard, label: 'Payment Methods', value: '2', path: '/account/payments' },
    { icon: Settings, label: 'Account Settings', value: 'Manage', path: '/account/settings' }
  ];

  return (
    <div className="space-y-8">
      <ProfileOverview user={user} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            {...stat}
            onClick={() => navigate(stat.path)}
          />
        ))}
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;