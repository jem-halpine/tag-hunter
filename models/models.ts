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

export interface Game {
  id: number,
  timestamp: number,
  artworkId: number,
  userName: string | undefined,
  artWasFound: boolean,
  guessesUsed: number,
  rating?: number,
}

