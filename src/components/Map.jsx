
 "use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import MapClickHandler from "./MapClickHandler";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = ({ trees, onMapClick }) => {
  return (
    <MapContainer
      center={[24.8607, 67.0011]}
      zoom={12}
      className="h-[500px] w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={onMapClick} />

      {trees && trees.map((tree) => {
        // Safety check coordinates ke liye
        const lat = Number(tree.lat);
        const lng = Number(tree.lng);

        if (isNaN(lat) || isNaN(lng)) return null;

        return (
          <Marker
            key={tree.id || Math.random()}
            position={[lat, lng]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="min-w-[180px]">
                <h3 className="text-lg font-bold text-green-700">
                  🌳 {tree.treeName}
                </h3>

                <p className="mt-2">
                  <strong>Planted by:</strong> {tree.userName}
                </p>

                <p>
                  <strong>Latitude:</strong> {lat}
                </p>

                <p>
                  <strong>Longitude:</strong> {lng}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Planted on: {tree.date}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;