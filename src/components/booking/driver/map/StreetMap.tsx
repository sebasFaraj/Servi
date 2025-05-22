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

  // Blocks (buildings)
  const blocks = [];
  for (let i = -gridSize; i <= gridSize; i++) {
    for (let j = -gridSize; j <= gridSize; j++) {
      if (i % 2 !== 0 && j % 2 !== 0) {
        blocks.push(
          <div
            key={`block-${i}-${j}`}
            className="absolute bg-gray-100 dark:bg-gray-800 border border-gray-200 
                     dark:border-gray-700"
            style={{
              left: `${50 + (i * 4)}%`,
              top: `${50 + (j * 4)}%`,
              width: '7%',
              height: '7%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        );
      }
    }
  }

  // Intersections (traffic circles)
  const intersections = [];
  for (let i = -gridSize; i <= gridSize; i += 2) {
    for (let j = -gridSize; j <= gridSize; j += 2) {
      intersections.push(
        <div
          key={`intersection-${i}-${j}`}
          className="absolute w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full 
                   transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${50 + (i * 4)}%`,
            top: `${50 + (j * 4)}%`
          }}
        />
      );
    }
  }

  return (
    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Render in order: blocks -> streets -> intersections */}
      <div className="absolute inset-0">
        {blocks}
        {streets}
        {intersections}
      </div>

      {/* Grid overlay for visual reference */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-[repeat(50,1fr)] grid-rows-[repeat(50,1fr)]">
          {Array.from({ length: 2500 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-100/20 dark:border-gray-800/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreetMap;