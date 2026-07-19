import { Download } from "lucide-react";

function ImagePreview() {
  return (
    <div className="relative">

      <div className="w-full h-[340px] rounded-xl overflow-hidden bg-[#18181C] border border-white/10">

        <img
          src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1400"
          alt=""
          className="w-full h-full object-cover"
        />

      </div>

      <button
        className="
        absolute
        top-4
        right-4
        w-10
        h-10
        rounded-xl
        bg-black/50
        backdrop-blur-md
        border
        border-white/10
        flex
        items-center
        justify-center
        hover:bg-black/70
        transition
        "
      >
        <Download
          size={18}
          className="text-white"
        />
      </button>

    </div>
  );
}

export default ImagePreview;