import React from 'react';

interface StreetMapProps {
  center: {
    lat: number;
    lng: number;
  };
}

const StreetMap = ({ center }: StreetMapProps) => {
  // Generate a grid of streets around the center point
  const streets = [];
  const gridSize = 10;
  
  // Street names for avenues and cross streets
  const avenueNames = [
    'First Ave', 'Second Ave', 'Third Ave', 'Lexington Ave',
    'Park Ave', 'Madison Ave', 'Fifth Ave', 'Sixth Ave',
    'Seventh Ave', 'Eighth Ave', 'Ninth Ave', 'Tenth Ave'
  ];

  // Main avenues (vertical streets)
  for (let i = -gridSize; i <= gridSize; i++) {
    const isMainAvenue = i % 2 === 0;
    const avenueName = avenueNames[Math.abs(i) % avenueNames.length];
    
    streets.push(
      <div
        key={`avenue-${i}`}
        className={`absolute h-full ${isMainAvenue ? 'w-[3px] bg-gray-400' : 'w-[1px] bg-gray-300'} 
                   dark:bg-gray-600`}
        style={{ left: `${50 + (i * 4)}%` }}
      >
        {isMainAvenue && (
          <div className="absolute -left-12 top-2 transform -rotate-90 origin-right">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
              {avenueName}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Cross streets (horizontal)
  for (let i = -gridSize; i <= gridSize; i++) {
    const isMainStreet = i % 2 === 0;
    const streetNumber = Math.abs(i * 10);
    
    streets.push(
      <div
        key={`street-${i}`}
        className={`absolute w-full ${isMainStreet ? 'h-[3px] bg-gray-400' : 'h-[1px] bg-gray-300'} 
                   dark:bg-gray-600`}
        style={{ top: `${50 + (i * 4)}%` }}
      >
        {isMainStreet && (
          <div className="absolute left-2 -top-6">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
              {streetNumber}th St
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {streets}
    </div>
  );
};

export default StreetMap;