export interface LatLng {
  lat: number
  lng: number
}

export interface ArtworkPaginate {
  data: Artwork[]
  pagination: Partial<Paginate>
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

export interface GameData {
  auth0Id?: string
  artworkId: number
  artWasFound: boolean
  guessesUsed: number
  rating?: number
}

export interface Game extends GameData {
  id: number
  timestamp: number
  userName: string | undefined
}

export interface Paginate {
  total: number
  lastPage: number
  prevPage: null | number
  nextPage: number
  perPage: number
  currentPage: number
  from: number
  to: number
}
