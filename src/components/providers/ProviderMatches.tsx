import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search, Star, MapPin, Languages, Award, Calendar, Check } from 'lucide-react';
import { useProviders } from '../../hooks/useProviders';

const ProviderMatches = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const requirements = location.state?.requirements;

  // Get service type from URL path
  const serviceType = location.pathname.split('/')[2] as 'driver' | 'cleaning';

  //TODO: Needs to pull from real providers page
  const { providers } = useProviders(serviceType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

  // Filter providers based on search and filters
  const filteredProviders = providers.filter(provider => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        provider.name.toLowerCase().includes(query) ||
        provider.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Rating filter
    if (selectedRating && provider.rating < selectedRating) {
      return false;
    }

    // Experience filter
    if (selectedExperience && provider.experience < selectedExperience) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Available {serviceType === 'cleaning' ? 'Cleaners' : 'Drivers'}
          </h2>
          {requirements?.date && (
            <p className="text-gray-600 dark:text-gray-300">
              For {new Date(requirements.date).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
            {/* Search Box */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search providers..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 
                           dark:border-gray-600 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                Minimum Rating
              </h3>
              <div className="space-y-2">
                {[4, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                    className={`w-full p-2 rounded-lg flex items-center justify-between
                             transition-colors ${
                               selectedRating === rating
                                 ? 'bg-teal-50 dark:bg-teal-900/50 text-teal-600'
                                 : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                             }`}
                  >
                    <div className="flex items-center">
                      <span>{rating}+</span>
                      <Star className="w-4 h-4 text-yellow-400 ml-1" />
                    </div>
                    {selectedRating === rating && (
                      <Check className="w-4 h-4 text-teal-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <Award className="w-5 h-5 text-teal-600 mr-2" />
                Experience
              </h3>
              <div className="space-y-2">
                {[1, 3, 5, 10].map((years) => (
                  <button
                    key={years}
                    onClick={() => setSelectedExperience(years === selectedExperience ? null : years)}
                    className={`w-full p-2 rounded-lg flex items-center justify-between
                             transition-colors ${
                               selectedExperience === years
                                 ? 'bg-teal-50 dark:bg-teal-900/50 text-teal-600'
                                 : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                             }`}
                  >
                    <span>{years}+ years</span>
                    {selectedExperience === years && (
                      <Check className="w-4 h-4 text-teal-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Provider List */}
          <div className="flex-1">
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProviders.map(provider => (
                  <div
                    key={provider.id}
                    onClick={() => navigate(`/book/${serviceType}/provider/${provider.id}`)}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
                             transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    <div className="relative">
                      <img 
                        src={provider.coverImage || provider.avatar} 
                        alt="" 
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 transform translate-y-1/2 left-6">
                        <img 
                          src={provider.avatar} 
                          alt={provider.name}
                          className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 
                                   object-cover shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="pt-12 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold dark:text-white">{provider.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{provider.title}</p>
                        </div>
                        <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-yellow-700 dark:text-yellow-300 font-medium">
                            {provider.rating}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{provider.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Award className="w-4 h-4 mr-2" />
                          <span>{provider.experience} years experience</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Languages className="w-4 h-4 mr-2" />
                          <span>{provider.languages.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{provider.availability}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {provider.expertise.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 
                                     dark:text-teal-200 text-sm rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <p className="text-gray-500 dark:text-gray-400">
                  No providers found matching your criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderMatches;