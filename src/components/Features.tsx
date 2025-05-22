import React from 'react';
import { Shield, Clock, Award, UserCheck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-teal-600" />,
      title: "Verified Providers",
      description: "All service providers undergo thorough background checks"
    },
    {
      icon: <Clock className="w-12 h-12 text-teal-600" />,
      title: "Quick Booking",
      description: "Book trusted professionals in minutes"
    },
    {
      icon: <Award className="w-12 h-12 text-teal-600" />,
      title: "Quality Guaranteed",
      description: "100% satisfaction guarantee on all services"
    },
    {
      icon: <UserCheck className="w-12 h-12 text-teal-600" />,
      title: "Expert Selection",
      description: "Only top-rated professionals in our network"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;