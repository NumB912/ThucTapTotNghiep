import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import RankCard from "../../component/rankCard";
import type { User } from "../../model/user";

interface Rank {
  rank:number;
  total_result: number;
  total_pass: number;
  user: User;
}

const Ranks = () => {
  const navigate = useNavigate();
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page,setPage] = useState<number>(1)
  const [lastPage,setLastPage] = useState<number>(1)
  const [first,setFirst] = useState<Rank>()
  const [second,setSecond] = useState<Rank>()
  const [third,setThird] = useState<Rank>()
  useEffect(() => {
    async function getRank() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/rank?page=${page}`);

        if (response.ok) {
          const data = await response.json();
          setRanks(data.data);
          setLastPage(data.last_page)
          setLoading(false);
          setFirst(data.data[0])
          setSecond(data.data[1])
          setThird(data.data[2])
        }
      } catch (e) {
        console.error("message", e);
      }
    }

    getRank();
  }, [page]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="exam-content w-full flex flex-col gap-2 bg-white rounded-sm p-5">
        <button
          onClick={() => navigate("/exam/index")}
          className="p-2 rounded-full hover:bg-gray-200 w-fit"
        >
          <FaArrowLeft />
        </button>

        <div className="w-full flex flex-col items-center justify-center">
          <div className="rank flex items-center justify-center">
            <div className="relative w-full">
              <div className="inline-block mx-3 rounded-full aspect-square">
                <img
                  src={
                     second?.user.img??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSo4AIYXeHrD1_tkckd4xjUuOhco37WFWl9A&s"
                  }
                  className="rounded-full w-full h-full aspect-square object-cover"
                  alt="avatar"
                />
                <div className="bg-yellow-500 text-white font-bold rounded-full p-2 mt-2 text-center">
                  Hạng {second?.rank}
                </div>

                <p className="text-center text-lg font-medium mt-2">{second?.user.name??"Chưa có"}</p>
              </div>
              <div className="inline-block mx-3 mb-10 rounded-full aspect-square">
                        <img
                  src={
                    first?.user.img ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSo4AIYXeHrD1_tkckd4xjUuOhco37WFWl9A&s"
                  }
                  className="rounded-full w-full h-full aspect-square object-cover"
                  alt="avatar"
                />
                <div className="bg-red-500 text-white font-bold rounded-full p-2 mt-2 text-center">
                  Hạng {first?.rank}
                </div>

                <p className="text-center text-lg font-medium mt-2">{first?.user.name??"Chưa có"}</p>
              </div>
              <div className="inline-block mx-3 rounded-full aspect-square">
                        <img
                  src={
                    third?.user.img??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSo4AIYXeHrD1_tkckd4xjUuOhco37WFWl9A&s"
                  }
                  className="rounded-full aspect-square object-cover"
                  alt="avatar"
                />
                <div className="bg-blue-500 text-white font-bold rounded-full p-2 mt-2 text-center">
                  Hạng {third?.rank}
                </div>
                <p className="text-center text-lg font-medium mt-2">{third?.user.name??"Chưa có"}</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="text-2xl font-bold text-center mb-5">Xếp hạng </div>

            <div className="flex flex-col gap-2 justify-center items-center mt-3 w-full">
              <div className="user-score grid grid-cols-5 gap-5 border border-gray-300 p-2 rounded w-5/8">
                <p className="ml-2 text-lg font-bold text-center">Xếp hạng </p>
                <p className="text-lg text-center">Hình ảnh</p>
                <p className="text-lg text-center">Tên người</p>
                <p className="text-lg text-center">số lượng bài đạt</p>
                <p className="text-lg text-center">Tỉ lệ đạt</p>
              </div>
            </div>

            {ranks?.map((rank, idx) => (
              <RankCard
                user={rank.user}
                percentPass={rank.total_pass / rank.total_result}
                total={rank.total_result}
                rank={rank.rank}
                url={rank.user.img}
              />
            ))}
          </div>

      <div className="flex justify-center gap-4 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Trang {page}/{lastPage}</span>
            <button
              disabled={page === lastPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranks;
