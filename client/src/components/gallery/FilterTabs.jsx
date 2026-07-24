import { Heart } from "lucide-react";

function FilterTabs({ showFavorites, setShowFavorites, setCurrentPage }) {
  return (
    <div className="flex gap-4 mb-9">
      <button
        onClick={() => {
          setShowFavorites(false);
          setCurrentPage(1);
        }}
        className={`px-5 py-2 rounded-xl transition cursor-pointer

        ${
          !showFavorites
            ? "bg-violet-600 text-white"
            : "bg-[#18181C] text-gray-300"
        }`}
      >
        All Images
      </button>

      <button
        onClick={() => {
          setShowFavorites(true);
          setCurrentPage(1);
        }}
        className={`px-5 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer

        ${
          showFavorites
            ? "bg-violet-600 text-white"
            : "bg-[#18181C] text-gray-300"
        }`}
      >
        <Heart size={18} className={showFavorites ? "fill-white" : ""} />
        Favorites
      </button>
    </div>
  );
}

export default FilterTabs;
