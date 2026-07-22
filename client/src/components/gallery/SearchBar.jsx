import { Search, SlidersHorizontal } from "lucide-react";

function SearchBar() {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-4 text-gray-500" size={18} />

        <input
          placeholder="Search images..."
          className="

w-full

h-12

rounded-xl

bg-[#18181C]

border

border-white/10

pl-11

text-white

outline-none

focus:border-violet-500

"
        />
      </div>

      <button
        className="

px-6

rounded-xl

bg-[#18181C]

border

border-white/10

text-white

flex

items-center

gap-2

"
      >
        <SlidersHorizontal size={18} />
        Filters
      </button>
    </div>
  );
}

export default SearchBar;
