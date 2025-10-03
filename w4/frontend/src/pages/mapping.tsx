import React, { useEffect, useState } from "react";
import { Map, Source, Layer, Marker } from "@vis.gl/react-maplibre";

const Mapping = () => {
  const [initialViewState] = useState({
    longitude: 106.700981,
    latitude: 16.047079,
    zoom: 5,
  });

  const [geoLevel1, setGeoLevel1] = useState(null);
  const [geoLevel2, setGeoLevel2] = useState(null);

  const [selectedMarker, setSelectedMarker] = useState(null);

  // Marker dữ liệu
  const markers = [
    {
      id: 1,
      title: "Hà Nội",
      description: "Giải phóng Thủ đô 10/10/1954",
      coordinates: [105.8342, 21.0278],
    },
    {
      id: 2,
      title: "Điện Biên Phủ",
      description: "Chiến thắng 7/5/1954",
      coordinates: [103.016, 21.383],
    },
  ];

  useEffect(() => {
    const loadGeo = async () => {
      const res1 = await fetch("/map_data/gadm41_VNM_1.json");
      const data1 = await res1.json();
      setGeoLevel1(data1);

      const res2 = await fetch("/map_data/gadm41_VNM_2.json");
      const data2 = await res2.json();
      setGeoLevel2(data2);
    };
    loadGeo();
  }, []);

  return (
    <div className="w-full h-screen">
      <Map
        initialViewState={initialViewState}
        mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=EOvTbuM45yaT8gXWQdXm"
        style={{ width: "100%", height: "100%" }}
      >
        {/* ----------- TỈNH (LEVEL 1) ----------- */}
        {geoLevel1 && (
          <Source id="level1" type="geojson" data={geoLevel1}>
            <Layer
              id="fill-level1"
              type="fill"
              maxzoom={7}
              paint={{
                "fill-color": "#0080ff",
                "fill-opacity": 0.2,
              }}
            />
            <Layer
              id="line-level1"
              type="line"
              maxzoom={9}
              paint={{
                "line-color": "#004080",
                "line-width": 1.5,
              }}
            />
            <Layer
              id="label-level1"
              type="symbol"
              maxzoom={9}
              layout={{
                "text-field": ["get", "NAME_1"],
                "text-size": 12,
                "text-anchor": "center",
              }}
              paint={{
                "text-color": "#000000",
                "text-halo-color": "#ffffff",
                "text-halo-width": 1,
              }}
            />
          </Source>
        )}

        {/* ----------- HUYỆN (LEVEL 2) ----------- */}
        {geoLevel2 && (
          <Source id="level2" type="geojson" data={geoLevel2}>
            <Layer
              id="fill-level2"
              type="fill"
              minzoom={10}
              paint={{
                "fill-color": "#00cc00",
                "fill-opacity": 0.3,
              }}
            />
            <Layer
              id="line-level2"
              type="line"
              minzoom={10}
              paint={{
                "line-color": "#006600",
                "line-width": 1,
              }}
            />
            <Layer
              id="label-level2"
              type="symbol"
              minzoom={13}
              layout={{
                "text-field": ["get", "NAME_2"],
                "text-size": 10,
                "text-anchor": "center",
              }}
              paint={{
                "text-color": "#222222",
                "text-halo-color": "#ffffff",
                "text-halo-width": 1,
              }}
            />
          </Source>
        )}

        {markers.map((m) => (
          <Marker
            key={m.id}
            longitude={m.coordinates[0]}
            latitude={m.coordinates[1]}
            anchor="bottom"
            onClick={() => setSelectedMarker(m)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="red"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-lg cursor-pointer"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" fill="white" />
            </svg>
          </Marker>
        ))}

  
        {selectedMarker && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "10%",
              transform: "translate(-50%, 0)",
              background: "white",
              padding: "8px 12px",
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              zIndex: 1000,
            }}
          >
            <strong>{selectedMarker.title}</strong>
            <p>{selectedMarker.description}</p>
            <button
              onClick={() => setSelectedMarker(null)}
              style={{ marginTop: "4px", cursor: "pointer" }}
            >
              Đóng
            </button>
          </div>
        )}
      </Map>
    </div>
  );
};

export default Mapping;
