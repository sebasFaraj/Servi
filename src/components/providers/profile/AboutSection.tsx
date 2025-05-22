import React from 'react';
import { Award, Languages, GraduationCap, Heart } from 'lucide-react';
import type { Provider } from '../../../types/provider';

interface AboutSectionProps {
  provider: Provider;
}

const AboutSection = ({ provider }: AboutSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-semibold mb-4">About Me</h3>
        <p className="text-gray-600 dark:text-gray-300">{provider.about}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <Award className="w-5 h-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium mb-2">Experience & Credentials</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {provider.credentials.map((credential, index) => (
                  <li key={index}>{credential}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <Languages className="w-5 h-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium mb-2">Languages</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {provider.languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <GraduationCap className="w-5 h-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium mb-2">Education & Training</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {provider.education.map((edu, index) => (
                  <li key={index}>{edu}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start">
            <Heart className="w-5 h-5 text-teal-600 mt-1 mr-3" />
            <div>
              <h4 className="font-medium mb-2">Professional Philosophy</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {provider.philosophy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;