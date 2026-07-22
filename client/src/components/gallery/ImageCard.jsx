import { Download, Heart, Trash2 } from "lucide-react";

function ImageCard() {

    return (

        <div

            className="

bg-[#18181C]

rounded-2xl

overflow-hidden

border

border-white/10

hover:border-violet-500

transition

"

        >

            <img

                src="https://images.unsplash.com/photo-1546182990-dffeafbe841d"

                className="

w-full

h-60

object-cover

"

            />

            <div className="p-4">

                <p className="text-white font-medium line-clamp-2">

                    A beautiful fantasy castle floating above the clouds.

                </p>

                <p className="text-gray-500 text-sm mt-2">

                    2 hours ago

                </p>

                <div className="flex justify-between mt-4">

                    <button>

                        <Heart className="text-gray-400" />

                    </button>

                    <button>

                        <Download className="text-gray-400" />

                    </button>

                    <button>

                        <Trash2 className="text-red-500" />

                    </button>

                </div>

            </div>

        </div>

    )

}

export default ImageCard;