import type { MapboxOptions } from 'react-map-gl';

// Get Mapbox token from environment variables
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

if (!MAPBOX_TOKEN) {
  console.error('Missing Mapbox token! Please add VITE_MAPBOX_TOKEN to your .env file');
}

// Mapbox configuration
export const MAPBOX_CONFIG: Partial<MapboxOptions> = {
  mapStyle: 'mapbox://styles/mapbox/streets-v12', // Standard street style
  minZoom: 10,
  maxZoom: 20,
  attributionControl: false,
  cooperativeGestures: true, // Enable touch gestures
};

// Default map center (New York City)
export const DEFAULT_CENTER = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 13
};