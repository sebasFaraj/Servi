import React from 'react';
import { Clock, Check } from 'lucide-react';

interface Task {
  id: string;
  client: string;
  type: string;
  date: string;
  status: 'pending' | 'completed';
}

const TasksOverview = () => {
  const tasks: Task[] = [
    {
      id: '1',
      client: 'John Doe',
      type: 'Fix Leaky Faucet',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: '2',
      client: 'Jane Smith',
      type: 'Install Ceiling Fan',
      date: '2024-01-16',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Task Overview</h2>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {tasks.map(task => (
            <div 
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{task.type}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Client: {task.client}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date: {new Date(task.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-teal-600 
                             bg-teal-100 rounded-lg hover:bg-teal-200 dark:bg-teal-900/30 
                             dark:text-teal-400 dark:hover:bg-teal-900/50">
                <Check className="w-4 h-4 mr-2" />
                Complete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksOverview;