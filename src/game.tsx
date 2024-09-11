import { LatLng } from "models/models";

export function calculateDistance (loc1: LatLng, loc2: LatLng) {
  const R = 6371071; // Radius of the Earth in metres
  const rlat1 = loc1.lat * (Math.PI/180); // Convert degrees to radians
  const rlat2 = loc2.lat * (Math.PI/180); // Convert degrees to radians
  const difflat = rlat2-rlat1; // Radian difference (latitudes)
  const difflon = (loc2.lng-loc1.lng) * (Math.PI/180); // Radian difference (longitudes)

  const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}