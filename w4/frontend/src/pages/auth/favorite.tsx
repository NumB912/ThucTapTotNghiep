import React, { useEffect, useState } from "react";
import CardEventChild from "../../component/CardEventChild";
import { useAuth } from "../../context/userContext";
import apiFetch from "../../hook/useFetch";
import type { Event } from "../../model/Event";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import ModalLogin from "../../component/modalLogin";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Event[]>();
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return;
    }

    const getFavorites = async () => {
      try {
        const response = await apiFetch(
          "favorite",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
          token
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFavorites(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getFavorites();
  }, [token]);

  return (
    <div className="px-20 pt-10 border-1.5 ">
      <div className="border-gray-100 shadow-lg bg-white p-5 rounded-md">
      <div className="w-full flex gap-2 mb-5 ">
        <button
          onClick={() => navigate("/profile")}
          className="p-2 rounded-full hover:bg-gray-200 w-fit"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-bold">Danh sách yêu thích</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {favorites?.map((favorite) => {
          return <CardEventChild key={favorite.id} event={favorite} />;
        })}
      </div>
      </div>

            <ModalLogin />
    </div>
  );
};

export default Favorites;
