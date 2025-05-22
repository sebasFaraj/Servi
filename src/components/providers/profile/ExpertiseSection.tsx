import React from 'react';
import { CheckCircle, Calendar, Briefcase } from 'lucide-react';
import type { Provider } from '../../../types/provider';

interface ExpertiseSectionProps {
  provider: Provider;
}

const ExpertiseSection = ({ provider }: ExpertiseSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Expertise & Services</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Specialized Skills</h4>
            <div className="flex flex-wrap gap-2">
              {provider.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 
                           dark:text-teal-200 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Service Categories</h4>
            <ul className="space-y-2">
              {provider.services.map((service, index) => (
                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-teal-600 mr-2" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Availability</h4>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <div className="flex items-start mb-3">
                <Calendar className="w-5 h-5 text-teal-600 mt-1 mr-3" />
                <div>
                  <h5 className="font-medium mb-1">Working Hours</h5>
                  {provider.businessHours.map((hours, index) => (
                    <p key={index} className="text-gray-600 dark:text-gray-300 text-sm">
                      {hours.day}: {hours.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Success Stories</h4>
            <div className="space-y-3">
              {provider.successStories.map((story, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 border 
                           dark:border-gray-700"
                >
                  <div className="flex items-center mb-2">
                    <Briefcase className="w-4 h-4 text-teal-600 mr-2" />
                    <h5 className="font-medium">{story.title}</h5>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;