import React from 'react';
import { Star, Award, Trophy, Rocket, Users, DollarSign, Check } from 'lucide-react';

const VisibilityMilestones = () => {
  const tiers = [
    {
      id: 1,
      name: 'Bronze',
      icon: Star,
      color: 'from-amber-700 to-amber-500',
      benefits: ['Basic visibility', 'Standard leads'],
      progress: 100,
      achieved: true
    },
    {
      id: 2,
      name: 'Silver',
      icon: Award,
      color: 'from-gray-400 to-gray-300',
      benefits: ['Higher visibility', 'Priority leads', '24/7 support'],
      progress: 80,
      achieved: false,
      requirements: {
        tasks: 25,
        rating: 4.5,
        days: 30
      }
    },
    {
      id: 3,
      name: 'Gold',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-400',
      benefits: ['Featured provider', 'Premium leads', 'Commission discounts'],
      progress: 45,
      achieved: false,
      requirements: {
        tasks: 50,
        rating: 4.8,
        days: 60
      }
    },
    {
      id: 4,
      name: 'Platinum',
      icon: Rocket,
      color: 'from-teal-600 to-teal-400',
      benefits: ['Top search placement', 'Affiliate program access', 'Custom badge'],
      progress: 20,
      achieved: false,
      requirements: {
        tasks: 100,
        rating: 4.9,
        days: 90
      }
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Provider Tiers & Benefits
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete milestones to unlock more benefits and increase your visibility
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map(tier => {
            const Icon = tier.icon;
            return (
              <div 
                key={tier.id}
                className={`relative overflow-hidden rounded-lg border-2 transition-all
                          ${tier.achieved 
                            ? 'border-transparent shadow-lg scale-105 z-10' 
                            : 'border-gray-200 dark:border-gray-700'
                          }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} 
                              opacity-${tier.achieved ? '100' : '10'}`} />

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${
                      tier.achieved 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-semibold ${
                      tier.achieved ? 'text-white' : 'text-gray-900 dark:text-white'
                    }`}>
                      {tier.name}
                    </span>
                  </div>

                  {/* Benefits */}
                  <ul className={`space-y-2 mb-4 ${
                    tier.achieved ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Requirements if not achieved */}
                  {!tier.achieved && tier.requirements && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Progress</span>
                        <span>{tier.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                          style={{ width: `${tier.progress}%` }}
                        />
                      </div>
                      <div className="mt-4 space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {tier.requirements.tasks} completed tasks
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {tier.requirements.rating}+ rating
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Maintain for {tier.requirements.days} days
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Achievement Badge */}
                  {tier.achieved && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-white/20 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VisibilityMilestones;