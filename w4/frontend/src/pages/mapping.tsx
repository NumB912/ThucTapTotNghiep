import React, { useEffect, useState } from "react";
import { Map, Source, Layer, Marker } from "@vis.gl/react-maplibre";
import type { Event } from "../model/Event";
import apiFetch from "../hook/useFetch";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const Mapping = () => {
  const [initialViewState] = useState({
    longitude: 106.700981,
    latitude: 16.047079,
    zoom: 5,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const [geoLevel1, setGeoLevel1] = useState<any>(null);
  const [geoLevel2, setGeoLevel2] = useState<any>(null);
  const [markers, setMarkers] = useState<Event[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Event>();
  const [dataEvent, setDataEvent] = useState<Event>();
  const [modalEvent, setModalEvent] = useState<Event | null>(null);

  // 🗺️ Load geojson (cấp tỉnh, huyện)
  useEffect(() => {
    const loadGeo = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch("/map_data/gadm41_VNM_1.json"),
          fetch("/map_data/gadm41_VNM_2.json"),
        ]);
        setGeoLevel1(await res1.json());
        setGeoLevel2(await res2.json());
      } catch (err) {
        console.error("GeoJSON load error:", err);
      }
    };
    loadGeo();
  }, []);

  // 🎯 Lấy thông tin event theo id
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiFetch(`events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDataEvent(data);
          setSelectedMarker(data);
        }
      } catch (err) {
        console.error("Fetch event by id error:", err);
      }
    };
    getData();
  }, [id]);

  // 🗓️ Lấy các event cùng ngày, chỉ giữ event có tọa độ hợp lệ
  useEffect(() => {
    if (!dataEvent?.start_day) return;

    const getSameDay = async () => {
      try {
        const response = await apiFetch(`events/day/${dataEvent.start_day}`);
        if (response.ok) {
          const data = await response.json();

          // ✅ Lọc bỏ event không có tọa độ hợp lệ
          const filteredEvents = (data.events || []).filter(
            (m: Event) =>
              m.region?.x !== null &&
              m.region?.y !== null &&
              m.region?.x !== undefined &&
              m.region?.y !== undefined &&
              !isNaN(Number(m.region.x)) &&
              !isNaN(Number(m.region.y))
          );

          setMarkers(filteredEvents);
        }
      } catch (err) {
        console.error("Fetch same-day events error:", err);
      }
    };
    getSameDay();
  }, [dataEvent]);

  return (
    <div className="w-full h-screen relative flex">
      {/* 📋 Sidebar */}
      <div className="w-1/4 h-full bg-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-300 flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-bold">Thông tin sự kiện</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {markers.map((m) => (
            <div
              key={m.id}
              className="p-2 mb-2 rounded hover:bg-gray-200 cursor-pointer"
              onMouseEnter={() => setSelectedMarker(m)}
              onMouseLeave={() => setSelectedMarker(undefined)}
              onClick={() => setModalEvent(m)}
            >
              <strong>{m.title}</strong>
              <p className="line-clamp-2 text-sm">{m.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🗺️ Map hiển thị các marker */}
      <Map
        initialViewState={initialViewState}
        mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=EOvTbuM45yaT8gXWQdXm"
        style={{ width: "100%", height: "100%" }}
      >
        {/* 🧭 Cấp tỉnh */}
        {geoLevel1 && (
          <Source id="level1" type="geojson" data={geoLevel1}>
            <Layer
              id="line-level1"
              type="line"
              maxzoom={9}
              paint={{
                "line-color": "#004080",
                "line-width": 1.5,
              }}
            />
          </Source>
        )}

        {/* 🏙️ Cấp huyện */}
        {geoLevel2 && <Source id="level2" type="geojson" data={geoLevel2} />}

        {/* 📍 Marker được chọn */}
        {selectedMarker &&
          selectedMarker.region?.x &&
          selectedMarker.region?.y && (
            <Marker
              longitude={Number(selectedMarker.region.x)}
              latitude={Number(selectedMarker.region.y)}
              anchor="bottom"
              style={{ marginBottom: 19 }}
            >
              <div
                className="max-w-50 flex flex-col bg-white p-2 rounded shadow-md pointer-events-none"
              >
                <strong className="line-clamp-2">
                  {selectedMarker.title}
                </strong>
                <p className="line-clamp-2">{selectedMarker.content}</p>
                {selectedMarker.image?.url && (
                  <img
                    src={"http://127.0.0.1:8000/api" + selectedMarker.image.url}
                    alt={selectedMarker.image.alt || ""}
                    className="h-20 object-cover mt-1 w-full"
                  />
                )}
              </div>
            </Marker>
          )}

        {/* 📌 Marker danh sách */}
        {markers.map((m) => (
          <Marker
            key={m.id}
            longitude={Number(m.region.x)}
            latitude={Number(m.region.y)}
            anchor="top"
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
              onMouseEnter={() => setSelectedMarker(m)}
              onClick={() => setSelectedMarker(m)}
              onMouseLeave={() => setSelectedMarker(undefined)}
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" fill="white" />
            </svg>
          </Marker>
        ))}
      </Map>

      {/* 🪟 Modal chi tiết sự kiện */}
      {modalEvent && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-1/2 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">{modalEvent.title}</h3>
            <p className="mb-2">{modalEvent.content}</p>
            {modalEvent.image?.url && (
              <img
                src={"http://127.0.0.1:8000/api" + modalEvent.image.url}
                alt={modalEvent.image.alt || ""}
                className="w-full object-cover mb-2"
              />
            )}
            <button
              onClick={() => setModalEvent(null)}
              className="bg-purple-500 text-white px-4 py-2 rounded mt-2 hover:bg-purple-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapping;
