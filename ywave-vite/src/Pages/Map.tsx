import React, { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import UserIconUrl from "../Images/Marker/User.svg";
import RestaurantIconUrl from "../Images/Marker/Restaurant.svg";
import CafeIconUrl from "../Images/Marker/Cafe.svg";
import MartIconUrl from "../Images/Marker/Mart.svg";
import HealthcareIconUrl from "../Images/Marker/Healthcare.svg";

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100svh;
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100svh;
`;

const Controls = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const SearchInput = styled.input`
  flex: 1 1 auto;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--neutral-200);
  border-radius: 8px;
  background: var(--neutral-100);
  color: var(--neutral-1000);
`;

const FloatingActions = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
`;

const ActionButton = styled.button`
  min-width: 44px;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 10px;
  background: var(--neutral-100);
  border: 1px solid var(--neutral-200);
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  color: var(--neutral-1000);
`;

const defaultCenter = { lat: 37.5665, lng: 126.978 };

const mapStyles = [
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "poi.business", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
] as google.maps.MapTypeStyle[];

type LatLngLiteral = google.maps.LatLngLiteral;

type MarkerCategory = "user" | "search" | "click" | "food" | "cafe" | "mart" | "hospital" | "etc";

type MapMarker = {
  id: string;
  position: LatLngLiteral;
  category: MarkerCategory;
};

export default function Map(): React.JSX.Element {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ?? "";

  const libraries = useMemo(() => ["places"] as ("places")[], []);
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    language: "ko",
    region: "KR",
    libraries,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<LatLngLiteral>(defaultCenter);
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const ICON_SIZE = 36;

  const icons = useMemo(() => {
    if (!isLoaded || !window.google) return null;
    const buildIcon = (url: string, size = ICON_SIZE): google.maps.Icon => ({
      url,
      scaledSize: new google.maps.Size(size, size),
      anchor: new google.maps.Point(size / 2, size / 2),
      origin: new google.maps.Point(0, 0),
    });

    return {
      byCategory: {
        user: buildIcon(UserIconUrl, ICON_SIZE),
        search: buildIcon(UserIconUrl, ICON_SIZE),
        click: buildIcon(UserIconUrl, ICON_SIZE),
        food: buildIcon(RestaurantIconUrl, ICON_SIZE),
        cafe: buildIcon(CafeIconUrl, ICON_SIZE),
        mart: buildIcon(MartIconUrl, ICON_SIZE),
        hospital: buildIcon(HealthcareIconUrl, ICON_SIZE),
        etc: buildIcon(UserIconUrl, ICON_SIZE),
      } as Record<MarkerCategory, google.maps.Icon>,
    };
  }, [isLoaded]);

  const getIcon = useCallback(
    (category: MarkerCategory): google.maps.Icon | undefined => {
      if (!icons) return undefined;
      return icons.byCategory[category] ?? icons.byCategory.user;
    },
    [icons]
  );

  const handleMapLoad = useCallback((m: google.maps.Map) => {
    setMap(m);
  }, []);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const pos = e.latLng.toJSON();
    setMarkers(prev => [...prev, { id: `${pos.lat},${pos.lng}-${Date.now()}`, position: pos, category: "click" }]);
  }, []);

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const cur = { lat: pos.coords.latitude, lng: pos.coords.longitude } as LatLngLiteral;
        setCenter(cur);
        setMarkers(prev => [...prev, { id: `me-${Date.now()}`, position: cur, category: "user" }]);
        map?.panTo(cur);
        map?.setZoom(15);
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );
  }, [map]);

  const handlePlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    const loc = place.geometry?.location;
    if (!loc) return;
    const pos = loc.toJSON();
    setCenter(pos);
    setMarkers(prev => [...prev, { id: `search-${Date.now()}`, position: pos, category: "search" }]);
    map?.panTo(pos);
    map?.setZoom(15);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }, [map]);

  const clearMarkers = useCallback(() => {
    setMarkers([]);
  }, []);

  const addBackendMarkers = useCallback((data: Array<{ lat: number; lng: number; category: MarkerCategory }>) => {
    const toAdd: MapMarker[] = data.map((d) => ({
      id: `${d.lat},${d.lng}-${d.category}-${Date.now()}`,
      position: { lat: d.lat, lng: d.lng },
      category: d.category,
    }));
    setMarkers((prev) => [...prev, ...toAdd]);
  }, []);

  const renderBody = () => {
    if (loadError) {
      return (
        <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100svh' }}>
          <p className="Body__Default" style={{ color: 'var(--error-600)' }}>
            지도를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      );
    }

    if (!isLoaded) {
      return (
        <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100svh' }}>
          <p className="Body__Default" style={{ color: 'var(--neutral-600)' }}>
            지도를 불러오는 중입니다...
          </p>
        </div>
      );
    }

    return (
      <MapWrapper>
        <Controls>
          <Autocomplete
            onLoad={(ac) => (autocompleteRef.current = ac)}
            onPlaceChanged={handlePlaceChanged}
            restrictions={{ country: ["kr"] }}
            options={{ fields: ["geometry", "name"] }}
          >
            <SearchInput ref={searchInputRef} placeholder="장소 검색 (예: 카페, 서울역)" />
          </Autocomplete>
        </Controls>

        <FloatingActions>
          <ActionButton onClick={handleLocateMe}>현재 위치</ActionButton>
          <ActionButton onClick={clearMarkers}>마커 삭제</ActionButton>
        </FloatingActions>

        <GoogleMap
          onLoad={handleMapLoad}
          onClick={handleMapClick}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={12}
          options={{
            styles: mapStyles,
            clickableIcons: false,
            disableDefaultUI: true,
            zoomControl: true,
            controlSize: 28,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {markers.map(m => (
            <Marker key={m.id} position={m.position} icon={getIcon(m.category)} zIndex={m.category === "user" ? 100 : undefined} />
          ))}
        </GoogleMap>
      </MapWrapper>
    );
  };

  return (
    <PageContainer>
      {renderBody()}
    </PageContainer>
  );
}
