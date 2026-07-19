import { ChevronRight } from "lucide-react";

function RecentGenerations() {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  ];

  return (
    <div className="mt-2 h-[180px] bg-[#121214] border border-white/10 p-3 rounded-xl">

      {/* Header */}

      <div className="flex items-center justify-between mb-2">

        <h2 className="text-white text-[15px] font-semibold">
          Recent Generations
        </h2>

        <button className="flex items-center gap-1 text-[12px] text-violet-400 hover:text-violet-300 transition">

          View All

          <ChevronRight size={14} />

        </button>

      </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-5 gap-2">

        {images.map((image, index) => (

          <button
            key={index}
            className="h-30 rounded-xl overflow-hidden border border-white/10 hover:border-violet-500 transition"
          >

            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />

          </button>

        ))}

      </div>

    </div>
  );
}

export default RecentGenerations;