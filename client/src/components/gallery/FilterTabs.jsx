import { Heart } from "lucide-react";

function FilterTabs({
  showFavorites,
  setShowFavorites,
  setCurrentPage,
  allImagesCount,
  favoriteImagesCount,
}) {
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
        <div className="flex items-center gap-2">
          <span>All Images</span>

          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              !showFavorites
                ? "bg-white/20 text-white"
                : "bg-violet-500/20 text-violet-300"
            }`}
          >
            {allImagesCount}
          </span>
        </div>
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

        <span>Favorites</span>

        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            showFavorites
              ? "bg-white/20 text-white"
              : "bg-violet-500/20 text-violet-300"
          }`}
        >
          {favoriteImagesCount}
        </span>
      </button>
    </div>
  );
}

export default FilterTabs;
