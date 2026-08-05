import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import CustomDropdown from "./CustomDropdown";

function GalleryHeader({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  sortBy,
  setSortBy,
  selectedModel,
  setSelectedModel,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeFilters =
    (selectedModel !== "all" ? 1 : 0) + (sortBy !== "newest" ? 1 : 0);

  return (
    <div className="flex items-center justify-between">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Gallery</h1>

        <p className="text-gray-400 mt-2">Your AI generated images.</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-4 text-gray-500" size={18} />

          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);

              setCurrentPage(1);
            }}
            placeholder="Search images..."
            className="w-[425px] h-12 rounded-xl bg-[#18181C]
    border
    border-white/10
    pl-11
    text-white
    outline-none
    focus:border-violet-500"
          />
        </div>
        <div className="relative overflow-visible" ref={filterRef}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="
    px-6
    rounded-xl
    bg-[#18181C]
    border
    h-12
    border-white/10
    text-white
    flex
    items-center
    gap-2
    relative
    cursor-pointer
  "
          >
            <SlidersHorizontal size={18} />
            Filters
            {activeFilters > 0 && (
              <span className="text-violet-400">({activeFilters})</span>
            )}
          </button>
          {showFilters && (
            <div
              className="
      absolute
      right-0
      top-16
      w-72
      rounded-xl
      bg-[#18181C]
      border
      border-white/10
      shadow-2xl
      p-5
      z-50
      origin-top-right
      animate-[fadeIn_.18s_ease-out]
    "
            >
              <h3 className="text-white font-semibold mb-4">Sort By</h3>

              <CustomDropdown
                value={sortBy}
                onChange={setSortBy}
                placeholder="Sort"
                options={[
                  {
                    label: "Newest First",
                    value: "newest",
                  },
                  {
                    label: "Oldest First",
                    value: "oldest",
                  },
                ]}
              />

              <h3 className="text-white font-semibold mt-6 mb-4">Model</h3>

              <CustomDropdown
                value={selectedModel}
                onChange={setSelectedModel}
                placeholder="All Models"
                options={[
                  {
                    label: "All Models",
                    value: "all",
                  },
                  {
                    label: "Flux Schnell",
                    value: "@cf/black-forest-labs/flux-1-schnell",
                  },
                  {
                    label: "SDXL Lightning",
                    value: "@cf/bytedance/stable-diffusion-xl-lightning",
                  },
                  {
                    label: "Stable Diffusion XL",
                    value: "@cf/stabilityai/stable-diffusion-xl-base-1.0",
                  },
                  {
                    label: "DreamShaper XL",
                    value: "@cf/lykon/dreamshaper-8-lcm",
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryHeader;
