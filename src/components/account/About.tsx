import React from 'react';
import { Info, Mail, Phone, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">About ServiWeb</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-teal-600 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">Our Mission</h3>
            <p className="text-gray-600">
              To connect people with trusted service providers, making everyday life easier and more efficient.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Contact Us</h3>
          
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-teal-600" />
            <span>support@serviweb.com</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-teal-600" />
            <span>1-800-SERVIWEB</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-teal-600" />
            <span>www.serviweb.com</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Version</h3>
          <p className="text-gray-600">App Version: 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default About;