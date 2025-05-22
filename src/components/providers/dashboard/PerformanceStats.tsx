import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const PerformanceStats = () => {

  //Figure out performance data structure (where is this information coming from?)
  const performanceData = [
    { date: '1/1', rating: 4.5, earnings: 150 },
    { date: '1/2', rating: 4.8, earnings: 200 },
    { date: '1/3', rating: 4.6, earnings: 175 },
    { date: '1/4', rating: 4.9, earnings: 225 },
    { date: '1/5', rating: 4.7, earnings: 190 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Performance</h2>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Ratings Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Customer Ratings
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis 
                    dataKey="date"
                    stroke="#6B7280"
                  />
                  <YAxis 
                    domain={[0, 5]}
                    stroke="#6B7280"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#0D9488" 
                    strokeWidth={2}
                    dot={{ fill: '#0D9488' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Earnings Chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Daily Earnings
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis 
                    dataKey="date"
                    stroke="#6B7280"
                  />
                  <YAxis 
                    stroke="#6B7280"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff'
                    }}
                    formatter={(value) => [`$${value}`, 'Earnings']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#0D9488" 
                    strokeWidth={2}
                    dot={{ fill: '#0D9488' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;