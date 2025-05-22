import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, DollarSign, Calendar, Shield, ArrowRight } from 'lucide-react';

const ProvidersLanding = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn More",
      description: "Set your own rates and keep more of your earnings with our competitive fee structure"
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Work when you want, where you want. You're in control of your schedule"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Our platform ensures secure payments and verified clients for your peace of mind"
    },
    {
      icon: Star,
      title: "Build Your Brand",
      description: "Grow your reputation with ratings and reviews from satisfied clients"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Nanny",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      quote: "Joining ServiWeb changed my life. I've doubled my client base and can now work on my own terms.",
      rating: 5,
      earnings: "5,000+"
    },
    {
      name: "Michael Chen",
      role: "Driver",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      quote: "The flexibility and earning potential on ServiWeb is unmatched. I'm my own boss now!",
      rating: 5,
      earnings: "4,500+"
    },
    {
      name: "Robert Martinez",
      role: "Handyman",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      quote: "ServiWeb's platform helped me expand my business and connect with quality clients.",
      rating: 5,
      earnings: "6,000+"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Turn Your Skills Into A Thriving Business
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              Join thousands of professionals who've found success providing services through our platform
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/provider/signup')}
                className="w-full sm:w-auto bg-white text-teal-600 px-8 py-4 rounded-full text-lg font-semibold
                         hover:bg-teal-50 transform hover:scale-105 transition-all shadow-lg"
              >
                Start Earning Today
              </button>
              <button
                onClick={() => navigate('/auth/provider/signin')}
                className="w-full sm:w-auto flex items-center justify-center text-white border-2 border-white/20 
                         px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transform 
                         hover:scale-105 transition-all"
              >
                Provider Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ServiWeb?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear from professionals who have transformed their careers with ServiWeb
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 bg-teal-600">
                  <div className="absolute -bottom-10 left-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full border-4 border-white"
                    />
                  </div>
                </div>
                <div className="p-6 pt-12">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-400">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-teal-600 font-semibold">${testimonial.earnings}/mo</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-teal-100">
            Join our community of successful service providers today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/provider/signup')}
              className="w-full sm:w-auto bg-white text-teal-600 px-8 py-4 rounded-full text-lg font-semibold
                       hover:bg-teal-50 transform hover:scale-105 transition-all shadow-lg"
            >
              Apply Now
            </button>
            <button
              onClick={() => navigate('/auth/provider/signin')}
              className="w-full sm:w-auto flex items-center justify-center text-white border-2 border-white/20 
                       px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transform 
                       hover:scale-105 transition-all"
            >
              Provider Login
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvidersLanding;