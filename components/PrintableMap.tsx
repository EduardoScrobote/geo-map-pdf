"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Circle, useMap } from "react-leaflet";
import { addressPoints } from "@/data/realworld";
import "leaflet/dist/leaflet.css";
import RedMakerIcon from "@/public/blue_marker.svg";
import L, { Icon } from "leaflet";

type AddressPoint = Array<[number, number, string]>;

const redMarkerUrl = RedMakerIcon;

const customIcon = new L.Icon({
  iconUrl: redMarkerUrl,
  iconSize: new L.Point(35, 35),
});

type prop = {
  fullscreen: boolean;
};

function Map({ fullscreen }: prop) {
  const [selectedMarkerPosition, setSelectedMarkerPosition] = useState<
    [number, number] | null
  >(null);
  const [mapKey, setMapKey] = useState<string>("mapKey");

  useEffect(() => {
    if (fullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Failed to enter fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Failed to exit fullscreen mode:", err);
      });
    }
  }, [fullscreen]);

  const handleClick = (position: [number, number]) => {
    setSelectedMarkerPosition(position);
    RecenterAutomatically;
  };

  return (
    <div
      className={fullscreen ? `w-full h-screen z-50` : `w-[750px] h-[700px]`}
    >
      {fullscreen ? null : <h1>10.000 marker</h1>}
      <MapContainer
        key={mapKey}
        style={{ width: "100%", height: "100%" }}
        center={[-26.899, -48.653]}
        zoom={4}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(addressPoints as AddressPoint).map((address, index) => (
          <Marker
            key={index}
            position={[address[0], address[1]]}
            title={address[2]}
            eventHandlers={{
              click: () => handleClick([address[0], address[1]]),
            }}
            icon={customIcon}
          >
            {selectedMarkerPosition &&
              selectedMarkerPosition[0] === address[0] &&
              selectedMarkerPosition[1] === address[1] && (
                <Circle center={[address[0], address[1]]} radius={150} />
              )}
          </Marker>
        ))}
        {selectedMarkerPosition && (
          <RecenterAutomatically
            position={selectedMarkerPosition}
            fullscreen={fullscreen}
          />
        )}
      </MapContainer>
    </div>
  );
}

const RecenterAutomatically = ({
  position,
  fullscreen,
}: {
  position: [number, number];
  fullscreen: boolean;
}) => {
  const map = useMap();
  useEffect(() => {
    if (!fullscreen) {
      map.flyTo(position, 18);
    }
  }, [position, map, fullscreen]);
  return null;
};
export default Map;
