import React from 'react';

const RoadPattern = () => {
  // Main roads (thicker lines)
  const mainRoads = Array(3).fill(0).map((_, i) => ({
    horizontal: `${(i + 1) * 25}%`,
    vertical: `${(i + 1) * 25}%`
  }));

  // Secondary roads (thinner lines)
  const secondaryRoads = Array(8).fill(0).map((_, i) => ({
    horizontal: `${(i + 1) * 10}%`,
    vertical: `${(i + 1) * 10}%`
  }));

  return (
    <div className="absolute inset-0">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-50" />

      {/* Secondary Roads */}
      <div className="absolute inset-0">
        {secondaryRoads.map((road, i) => (
          <React.Fragment key={`secondary-${i}`}>
            <div 
              className="absolute w-full h-[1px] bg-gray-200"
              style={{ top: road.horizontal }}
            />
            <div 
              className="absolute h-full w-[1px] bg-gray-200"
              style={{ left: road.vertical }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Main Roads */}
      <div className="absolute inset-0">
        {mainRoads.map((road, i) => (
          <React.Fragment key={`main-${i}`}>
            <div 
              className="absolute w-full h-[2px] bg-gray-300"
              style={{ top: road.horizontal }}
            />
            <div 
              className="absolute h-full w-[2px] bg-gray-300"
              style={{ left: road.vertical }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Intersections */}
      {mainRoads.map((vRoad, i) => 
        mainRoads.map((hRoad, j) => (
          <div
            key={`intersection-${i}-${j}`}
            className="absolute w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: vRoad.vertical,
              top: hRoad.horizontal
            }}
          />
        ))
      )}
    </div>
  );
};

export default RoadPattern;