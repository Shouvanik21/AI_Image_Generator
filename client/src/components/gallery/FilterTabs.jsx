import { Heart } from "lucide-react";

function FilterTabs() {

    return (

        <div className="flex gap-4 mb-9">

            <button className="px-5 py-2 rounded-xl bg-violet-600 text-white">

                All Images

            </button>

            <button className="px-5 py-2 rounded-xl bg-[#18181C] text-gray-300 flex items-center justify-center gap-2">

                <Heart size={18} className="text-white" />
                Favorites

            </button>

        </div>

    )

}

export default FilterTabs;