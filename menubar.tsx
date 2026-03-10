"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface MapProps {
  apiKey: string
  center?: { lat: number; lng: number }
  zoom?: number
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void
  markers?: Array<{ lat: number; lng: number; label?: string }>
  height?: string
  showSearchBox?: boolean
  initialAddress?: string
}

export default function MapIntegration({
  apiKey,
  center = { lat: 28.4595, lng: 77.5021 }, // Default to Greater Noida coordinates
  zoom = 13,
  onLocationSelect,
  markers = [],
  height = "400px",
  showSearchBox = false,
  initialAddress = "",
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [searchInput, setSearchInput] = useState(initialAddress)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [google, setGoogle] = useState<typeof google | null>(null)

  useEffect(() => {
    if (!apiKey) {
      setError("Google Maps API key is required")
      return
    }

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["places"],
        })

        const googleMaps = await loader.load()
        setGoogle(googleMaps)
        setMapLoaded(true)

        if (mapRef.current) {
          const mapOptions = {
            center,
            zoom,
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }

          const map = new googleMaps.maps.Map(mapRef.current, mapOptions)
          mapInstanceRef.current = map

          // Add markers if provided
          if (markers.length > 0) {
            markers.forEach((markerData) => {
              const marker = new googleMaps.maps.Marker({
                position: { lat: markerData.lat, lng: markerData.lng },
                map,
                label: markerData.label,
              })
              markersRef.current.push(marker)
            })
          }

          // Add click listener for location selection
          if (onLocationSelect) {
            map.addListener("click", async (e: googleMaps.maps.MapMouseEvent) => {
              if (e.latLng) {
                const lat = e.latLng.lat()
                const lng = e.latLng.lng()

                // Clear existing markers
                markersRef.current.forEach((marker) => marker.setMap(null))
                markersRef.current = []

                // Add new marker
                const marker = new googleMaps.maps.Marker({
                  position: { lat, lng },
                  map,
                })
                markersRef.current.push(marker)

                // Get address from coordinates
                const geocoder = new googleMaps.maps.Geocoder()
                const response = await geocoder.geocode({ location: { lat, lng } })

                if (response.results[0]) {
                  const address = response.results[0].formatted_address
                  onLocationSelect({ lat, lng, address })
                  setSearchInput(address)
                } else {
                  onLocationSelect({ lat, lng, address: "Unknown location" })
                  setSearchInput("")
                }
              }
            })
          }

          // Setup search box if enabled
          if (showSearchBox) {
            const input = document.getElementById("map-search-box") as HTMLInputElement
            const searchBox = new googleMaps.maps.places.SearchBox(input)
            searchBoxRef.current = searchBox

            map.controls[googleMaps.maps.ControlPosition.TOP_CENTER].push(input)

            // Bias the SearchBox results towards current map's viewport
            map.addListener("bounds_changed", () => {
              searchBox.setBounds(map.getBounds() as googleMaps.maps.LatLngBounds)
            })

            searchBox.addListener("places_changed", () => {
              const places = searchBox.getPlaces()

              if (!places || places.length === 0) {
                return
              }

              // Clear existing markers
              markersRef.current.forEach((marker) => marker.setMap(null))
              markersRef.current = []

              // For each place, get the icon, name and location
              const bounds = new googleMaps.maps.LatLngBounds()

              places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                  console.log("Returned place contains no geometry")
                  return
                }

                // Create a marker for the place
                const marker = new googleMaps.maps.Marker({
                  map,
                  position: place.geometry.location,
                })
                markersRef.current.push(marker)

                if (place.geometry.viewport) {
                  // Only geocodes have viewport
                  bounds.union(place.geometry.viewport)
                } else {
                  bounds.extend(place.geometry.location)
                }

                if (onLocationSelect && place.geometry.location) {
                  const lat = place.geometry.location.lat()
                  const lng = place.geometry.location.lng()
                  const address = place.formatted_address || place.name || "Selected location"
                  onLocationSelect({ lat, lng, address })
                }
              })

              map.fitBounds(bounds)
            })
          }
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err)
        setError("Failed to load Google Maps. Please check your API key.")
      }
    }

    initMap()

    return () => {
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null))
      }
    }
  }, [apiKey, center, zoom, onLocationSelect, markers])

  // Update markers if they change
  useEffect(() => {
    if (mapLoaded && mapInstanceRef.current && google) {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null))
      markersRef.current = []

      // Add new markers
      markers.forEach((markerData) => {
        const marker = new google.maps.Marker({
          position: { lat: markerData.lat, lng: markerData.lng },
          map: mapInstanceRef.current,
          label: markerData.label,
        })
        markersRef.current.push(marker)
      })
    }
  }, [markers, mapLoaded, google])

  return (
    <div className="relative w-full">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {showSearchBox && (
        <input
          id="map-search-box"
          type="text"
          placeholder="Search for a location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-3 py-2 border rounded-xl mb-2 z-10"
        />
      )}

      <div ref={mapRef} style={{ height, width: "100%" }} className="rounded-lg overflow-hidden" />

      {!mapLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  )
}

