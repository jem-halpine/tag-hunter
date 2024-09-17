import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { newArt } from '@/apis/artworks'
import { IsAuthenticated } from '@/components/IsAuthenticated'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { useNavigate } from 'react-router-dom'

const DEFAULT_CENTER = { lat: -41.29244, lng: 174.77876 }

const SubmitArt: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [latitude, setLatitude] = useState<number | ''>('')
  const [longitude, setLongitude] = useState<number | ''>('')
  const [artistName, setArtistName] = useState<string>('')
  const [locationName, setLocationName] = useState<string>('')
  const [formError, setFormError] = useState<string | null>(null)
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number }>(
    DEFAULT_CENTER,
  )

  const navigate = useNavigate()

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null
    setImageFile(file)
  }

  async function handleSubmitArt() {
    if (!imageFile || latitude === '' || longitude === '') {
      setFormError('Please upload an image and provide coordinates.')
      return
    }

    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('latitude', latitude.toString())
    formData.append('longitude', longitude.toString())
    if (artistName) formData.append('artistName', artistName)
    if (locationName) formData.append('locationName', locationName)

    try {
      await newArt(formData)
      alert('Art submitted successfully!')
      setImageFile(null)
      setLatitude('')
      setLongitude('')
      setArtistName('')
      setLocationName('')
      setMapLocation(DEFAULT_CENTER)
      navigate('/gallery')
    } catch (error) {
      console.error('Error submitting art:', error)
      setFormError('Failed to submit art.')
    }
  }

  function handleDragEnd(e: google.maps.MapMouseEvent) {
    if (e.latLng) {
      const location = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      setMapLocation(location)
      setLatitude(location.lat)
      setLongitude(location.lng)
    }
  }

  return (
    <IsAuthenticated>
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-center text-2xl font-bold">Submit Your Art</h2>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-500 file:rounded file:border file:border-gray-300 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
        />

        <div className="mb-6">
          <div className="mb-2 text-lg font-semibold">Set Location on Map</div>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={DEFAULT_CENTER}
              defaultZoom={12}
              mapId="artMap"
              className="h-80 w-full rounded-lg border-2 border-gray-300"
            >
              <AdvancedMarker
                position={mapLocation}
                draggable={true}
                onDrag={handleDragEnd}
              />
            </Map>
          </APIProvider>
        </div>

        <input
          type="number"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(parseFloat(e.target.value))}
          className="mb-4 block w-full rounded-md border border-gray-300 p-2 text-gray-700"
          readOnly
        />
        <input
          type="number"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(parseFloat(e.target.value))}
          className="mb-4 block w-full rounded-md border border-gray-300 p-2 text-gray-700"
          readOnly
        />
        <input
          type="text"
          placeholder="Artist Name (optional)"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="mb-4 block w-full rounded-md border border-gray-300 p-2 text-gray-700"
        />
        <input
          type="text"
          placeholder="Location Name (optional)"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          className="mb-6 block w-full rounded-md border border-gray-300 p-2 text-gray-700"
        />
        {formError && <p className="mb-4 text-red-500">{formError}</p>}
        <Button onClick={handleSubmitArt} className="w-full ">
          Submit Art
        </Button>
      </div>
    </IsAuthenticated>
  )
}

export default SubmitArt
