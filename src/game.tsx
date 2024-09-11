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


// Checks if guess is close enough to win (default 30m)
export function hasFoundArt(distance: number){
  return distance < 25     
}

// return a failure message
export function failureMessage(distance: number): string {
     
  if(distance > 1000){
    return "Not even close! You're over 1km away"
  } else if (distance > 100) {
    const dist = Math.ceil(distance/100)*100
    return `Keep hunting! you're within ${dist}m`
  } else {
    return `Getting close! You're within 100m`
  }
}
