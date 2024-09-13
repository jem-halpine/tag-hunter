export interface LatLng {
  lat: number
  lng: number
}

export interface Artwork {
  id: number
  location: string
  latitude: number
  longitude: number
  artist?: string
  imageUrl: string
  userId: string
  description: string
}
