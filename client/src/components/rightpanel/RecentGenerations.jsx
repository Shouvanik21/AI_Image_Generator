import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function RecentGenerations({ recentImages, loadingRecentImages }) {

  const navigate = useNavigate();

  return (
    <div className="mt-2 h-[180px] bg-[#121214] border border-white/10 p-3 rounded-xl">

      {/* Header */}

      <div className="flex items-center justify-between mb-2">

        <h2 className="text-white text-[15px] font-semibold">
          Recent Generations
        </h2>

        <button className="flex items-center gap-1 text-[12px] text-violet-400 hover:text-violet-300 transition" onClick={() => navigate("/gallery")}>

          View All

          <ChevronRight size={14} />

        </button>

      </div>

      {/* Thumbnails */}

      {loadingRecentImages ? (
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-30 rounded-xl bg-[#1b1b20] border border-white/10 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {recentImages.map((img, index) => (
            <button
              key={index}
              className="h-30 rounded-xl overflow-hidden border border-white/10 hover:border-violet-500 transition"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}

export default RecentGenerations;