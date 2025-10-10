import React, { useEffect, useState } from "react";
import { Map, Source, Layer, Marker } from "@vis.gl/react-maplibre";
import type { Event } from "../model/Event";
import apiFetch from "../hook/useFetch";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../component/loading";
import CardMap from "../component/CardMap";
import ChatBotModal from "../component/ChatBoxModal";

const Mapping = () => {
  const [initialViewState] = useState({
    longitude: 106.700981,
    latitude: 16.047079,
    zoom: 5,
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [geoLevel1, setGeoLevel1] = useState<any>(null);
  const [geoLevel2, setGeoLevel2] = useState<any>(null);
  const [markers, setMarkers] = useState<Event[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Event | undefined>();
  const [dataEvent, setDataEvent] = useState<Event>();
  const [modalEvent, setModalEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 106.700981,
    y: 10.762622,
  });

  useEffect(() => {
    const loadGeo = async () => {
      try {
        setLoading(true);
        const [res1, res2] = await Promise.all([
          fetch("/map_data/gadm41_VNM_1.json"),
          fetch("/map_data/gadm41_VNM_2.json"),
        ]);
        setGeoLevel1(await res1.json());
        setGeoLevel2(await res2.json());
      } catch (err) {
        console.error("GeoJSON load error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGeo();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await apiFetch(`events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDataEvent(data);
          setSelectedDate(data.start_day);
          setSelectedMarker(data);
        }
      } catch (err) {
        console.error("Fetch event by id error:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    if (!selectedDate) return;

    const getSameDay = async () => {
      try {
        setLoading(true);
        const response = await apiFetch(`events/day/${selectedDate}`);
        if (response.ok) {
          const data = await response.json();
          const filteredEvents = (data.events || []).filter(
            (m: Event) =>
              m.location?.x !== null &&
              m.location?.y !== null &&
              m.location?.x !== undefined &&
              m.location?.y !== undefined &&
              !isNaN(Number(m.location.x)) &&
              !isNaN(Number(m.location.y))
          );

          setMarkers(filteredEvents);
        }
      } catch (err) {
        console.error("Fetch same-day events error:", err);
      } finally {
        setLoading(false);
      }
    };
    getSameDay();
  }, [selectedDate]);

  async function handleChooseDate() {
    if (!selectedDay && !selectedMonth) {
      return;
    }
    setLoading(true);

    if (!selectedDay && !selectedMonth) return;

    const date = new Date();
    date.setMonth(selectedMonth - 1);
    date.setDate(selectedDay);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formatted = `${year}-${month}-${day}`;
    try {
      const response = await apiFetch(`events/day/${formatted}`);
      if (response.ok) {
        const data = await response.json();

        if (data.events[0]) {
          setSelectedMarker(data.events[0]);
        }

        const filteredEvents = (data.events || []).filter(
          (m: Event) =>
            m.location?.x !== null &&
            m.location?.y !== null &&
            m.location?.x !== undefined &&
            m.location?.y !== undefined &&
            !isNaN(Number(m.location.x)) &&
            !isNaN(Number(m.location.y))
        );

        setMarkers(filteredEvents);
      }
    } catch (err) {
      console.error("Fetch same-day events error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    setCoordinates({ x: lng, y: lat });
  };

  return (
    <div className="w-full h-screen relative flex">
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
            <CardMap
              event={m}
              key={m.id}
              onMouseEnter={() => setSelectedMarker(m)}
              onMouseLeave={() => setSelectedMarker(undefined)}
              onClick={() => setModalEvent(m)}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <Map
          initialViewState={initialViewState}
          mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=EOvTbuM45yaT8gXWQdXm"
          style={{ width: "100%", height: "100%" }}
          onClick={handleMapClick}
        >
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

          {geoLevel2 && <Source id="level2" type="geojson" data={geoLevel2} />}

          {selectedMarker &&
            selectedMarker.location?.x &&
            selectedMarker.location?.y && (
              <Marker
                longitude={Number(selectedMarker.location.x)}
                latitude={Number(selectedMarker.location.y)}
                anchor="bottom"
                style={{ marginBottom: 19 }}
              >
                <div className="max-w-50 flex flex-col bg-white p-2 rounded shadow-md pointer-events-none">
                  <strong className="line-clamp-2">
                    {selectedMarker.title}
                  </strong>
                  <p className="line-clamp-2">{selectedMarker.content}</p>
                  {selectedMarker.image_url && (
                    <img
                      src={selectedMarker.image_url}
                      className="h-20 object-cover mt-1 w-full"
                    />
                  )}
                </div>
              </Marker>
            )}

          <Marker
            longitude={Number(coordinates.x)}
            latitude={Number(coordinates.y)}
            anchor="bottom"
            style={{ marginBottom: 19 }}
          >
            <div
              className="max-w-50 flex flex-col bg-white p-2 rounded shadow-md pointer-events-auto z-50"
              onClick={(e) => {
                e.stopPropagation();
                console.log("hello");
              }}
            >
              <button
                className="bg-purple-500 text-white px-2 py-1 rounded"
                onClick={() => setIsChatOpen(true)}
              >
                Tìm hiểu thêm
              </button>
            </div>
          </Marker>

          {markers.map((m) => (
            <Marker
              key={m.id}
              longitude={Number(m.location?.x || 21.0285)}
              latitude={Number(m.location?.y || 105.8542)}
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

          <div className="absolute right-10 p-3 flex gap-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="p-2 rounded w-fit bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  Tháng {month}
                </option>
              ))}
            </select>

            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="p-2 rounded w-fit bg-white"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={day}>
                  Ngày {day}
                </option>
              ))}
            </select>

            <button
              onClick={handleChooseDate}
              className="bg-purple-500 p-3 rounded-md text-white focus:bg-purple-500/50"
            >
              Tìm
            </button>
          </div>

          <Marker
            longitude={Number(coordinates.x || 21.0285)}
            latitude={Number(coordinates.y || 105.8542)}
            anchor="top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="blue"
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
        </Map>
      )}

      {modalEvent && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-1/2 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">{modalEvent.title}</h3>
            <p className="mb-2">{modalEvent.content}</p>
            {modalEvent.image_url && (
              <img
                src={modalEvent.image_url}
                alt={modalEvent.image_url || ""}
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
      {coordinates && coordinates && (
        <ChatBotModal
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          coordinates={coordinates}
        />
      )}
    </div>
  );
};

export default Mapping;
