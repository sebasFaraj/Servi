import { MAPBOX_TOKEN } from './mapConfig';

// Convert coordinates to address
export const getAddressFromCoords = async (lat: number, lng: number): Promise<string> => {
  if (!MAPBOX_TOKEN) {
    throw new Error('Mapbox token is required for geocoding');
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&types=address`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    
    if (!data.features?.length) {
      throw new Error('No address found');
    }

    // Return the most relevant address
    return data.features[0].place_name;
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Failed to get address');
  }
};

// Convert address to coordinates
export const getCoordsFromAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  if (!MAPBOX_TOKEN) {
    throw new Error('Mapbox token is required for geocoding');
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&types=address`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    
    if (!data.features?.length) {
      throw new Error('No coordinates found for this address');
    }

    const [lng, lat] = data.features[0].center;
    return { lat, lng };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw new Error('Failed to get coordinates');
  }
};