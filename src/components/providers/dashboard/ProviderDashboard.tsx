import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import TasksOverview from './TasksOverview';
import PerformanceStats from './PerformanceStats';
import VisibilityMilestones from './VisibilityMilestones';

const ProviderDashboard = () => {
  const navigate = useNavigate();

  const stats = {
    activeTasks: 2,
    earnings: 1250,
    profileCompletion: 90,
    visibilityMilestones: 3
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Tasks</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.activeTasks}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Earnings</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              ${stats.earnings.toLocaleString()}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile Completion</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.profileCompletion}%</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Visibility Milestones</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.visibilityMilestones}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks Overview */}
          <div className="lg:col-span-2">
            <TasksOverview />
          </div>

          {/* Performance Stats */}
          <div>
            <PerformanceStats />
          </div>
        </div>

        {/* Visibility Milestones */}
        <div className="mt-8">
          <VisibilityMilestones />
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;