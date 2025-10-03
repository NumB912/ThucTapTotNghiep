import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; // icon xoay loading
import apiFetch from "../hook/useFetch";
import { useAuth } from "../context/userContext";

interface ToggleFavoriteProps {
  className?: string;
  event_id: number;
}

const ToggleFavorite = ({ className = "", event_id }: ToggleFavoriteProps) => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        setLoading(true);
        const response = await apiFetch(
          `favorite/${event_id}`,
          { method: "GET" },
          token
        );
        const data = await response.json();
        setIsActive(data.favorite);
      } catch (error) {
        console.error("Lỗi khi fetch favorite:", error);
      } finally {
        setLoading(false);
      }
    };

    if (event_id) fetchFavorite();
  }, [event_id, token]);

  const handleToggle = async () => {
    if (!event_id || loading) return;

    const prevState = isActive;
    setIsActive(!prevState);
    setLoading(true);

    try {
      const endpoint = prevState ? "favorite/remove" : "favorite/add";
      const response = await apiFetch(
        endpoint,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event_id: event_id }),
        },
        token
      );

      const data = await response.json();
      console.log("Toggle favorite:", data);
    } catch (error) {
      console.error("Lỗi khi toggle favorite:", error);
      setIsActive(prevState);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center justify-center ${
        isActive
          ? "bg-purple-600 text-white hover:bg-white hover:text-purple-500 hover:border-purple-600"
          : "border-purple-600 border-2 bg-white text-purple-500 hover:bg-purple-600 hover:text-white"
      } cursor-pointer p-3 rounded  transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <ImSpinner2 className="animate-spin" />
      ) : (
        <FaHeart />
      )}
    </button>
  );
};

export default ToggleFavorite;
