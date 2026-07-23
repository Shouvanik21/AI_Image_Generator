import imageApi from "../../services/imageApi";
import { Download, Heart, Trash2 } from "lucide-react";

function ImageCard({ image, onClick,
    setImages }) {

  const downloadImage = (e) => {

  // Prevent opening the preview when clicking download
  e.stopPropagation();

  if (!image.image) {
    alert("Image not found!");
    return;
  }

  let extension = "png";

  if (image.image.startsWith("data:image/jpeg")) {
    extension = "jpg";
  } else if (image.image.startsWith("data:image/png")) {
    extension = "png";
  } else if (image.image.startsWith("data:image/webp")) {
    extension = "webp";
  }

  const link = document.createElement("a");

  link.href = image.image;

  link.download = `ImagineAI-${Date.now()}.${extension}`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};

const deleteImage = async (e) => {

    e.stopPropagation();

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    try {

        const { data } = await imageApi.delete(
            `/deleteimage/${image._id}`
        );

        if (data.success) {

            setImages((prev) =>
                prev.filter(
                    (img) => img._id !== image._id
                )
            );

            alert("Image deleted successfully.");

        }

    } catch (error) {

        console.log(error);

        alert("Failed to delete image.");

    }

};

  return (
    <div className="bg-[#18181C] rounded-2xl overflow-hidden border border-white/10 group
transition-all
duration-500
ease-out
hover:-translate-y-3
hover:scale-[1.03]
hover:shadow-[0_10px_20px_rgba(168,85,247,0.35)]
hover:shadow-violet-500/30
hover:border-violet-500/40
hover:ring-1
hover:ring-violet-500/30">
      <img src={image.image} onClick={onClick} className="w-full h-60 object-cover cursor-pointer" />

      <div className="p-4">
        <p className="text-white font-medium line-clamp-2">{image.prompt}</p>

        <p className="text-gray-500 text-sm mt-2">2 hours ago</p>

        <div className="flex justify-center items-center mt-4 gap-8">
          <button
            className="w-10
        h-10
        rounded-lg
        bg-black/50
        backdrop-blur-md
        border
        border-white/10
        flex
        items-center
        justify-center
        hover:bg-black/70
        transition"
          >
            <Heart className="text-gray-400" />
          </button>

          <button
            className="w-10
        h-10
        rounded-lg
        bg-black/50
        backdrop-blur-md
        border
        border-white/10
        flex
        items-center
        justify-center
        hover:bg-black/70
        transition cursor-pointer"
        onClick={downloadImage}
          >
            <Download className="text-gray-400" />
          </button>

          <button
            className="w-10
        h-10
        rounded-lg
        bg-black/50
        backdrop-blur-md
        border
        border-white/10
        flex
        items-center
        justify-center
        hover:bg-black/70
        transition"
        onClick={deleteImage}
          >
            <Trash2 className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
