import imageApi from "../../services/imageApi";
import { Download, Heart, Trash2 } from "lucide-react";

function ImageCard({
  image,
  onClick,
  setImages,
  setFilteredImages,
  showFavorites,
}) {
  const modelNames = {
    "@cf/black-forest-labs/flux-1-schnell": "Flux Schnell",
    "@cf/bytedance/stable-diffusion-xl-lightning": "SDXL Lightning",
    "@cf/stabilityai/stable-diffusion-xl-base-1.0": "Stable Diffusion XL",
    "@cf/lykon/dreamshaper-8-lcm": "DreamShaper XL",
  };

  const downloadImage = async (e) => {
    e.stopPropagation();

    try {
      const response = await fetch(image.image);

      const blob = await response.blob();

      let extension = "png";

      if (blob.type === "image/jpeg") extension = "jpg";
      else if (blob.type === "image/png") extension = "png";
      else if (blob.type === "image/webp") extension = "webp";

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `ImagineAI-${Date.now()}.${extension}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      alert("Failed to download image.");
    }
  };

  const deleteImage = async (e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!confirmDelete) return;

    try {
      const { data } = await imageApi.delete(`/deleteimage/${image._id}`);

      if (data.success) {
        setImages((prev) => prev.filter((img) => img._id !== image._id));

        setFilteredImages((prev) =>
          prev.filter((img) => img._id !== image._id),
        );

        alert("Image deleted successfully.");
      }
    } catch (error) {
      console.log(error);

      alert("Failed to delete image.");
    }
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    const confirmFavorite = window.confirm(
      image.favorite
        ? "Remove this image from favorites?"
        : "Add this image to favorites?",
    );

    if (!confirmFavorite) return;

    try {
      const { data } = await imageApi.patch(`/favoriteimage/${image._id}`);

      if (data.success) {
        const updateList = (prev) => {
          let updated = prev.map((img) =>
            img._id === image._id ? { ...img, favorite: data.favorite } : img,
          );

          if (showFavorites) {
            updated = updated.filter((img) => img.favorite);
          }

          return updated;
        };

        setImages(updateList);
        setFilteredImages(updateList);
      }
    } catch (error) {
      console.log(error);

      alert("Failed to update favorite.");
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);

    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

    const weeks = Math.floor(days / 7);

    if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);

    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(days / 365);

    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  return (
    <div
      className="bg-[#18181C] rounded-2xl overflow-hidden border border-white/10 group
transition-all
duration-500
ease-out
hover:-translate-y-3
hover:scale-[1.03]
hover:shadow-[0_10px_20px_rgba(168,85,247,0.35)]
hover:shadow-violet-500/30
hover:border-violet-500/40
hover:ring-1
hover:ring-violet-500/30"
    >
      <img
        src={image.image}
        onClick={onClick}
        className="w-full h-60 object-cover cursor-pointer"
      />

      <div className="p-4">
        <p className="text-white font-medium line-clamp-2">{image.prompt}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-violet-400 font-medium bg-violet-500/10 px-2 py-1 rounded-lg">
            {modelNames[image.model] || image.model}
          </span>

          <span className="text-xs text-gray-500">
            {getTimeAgo(image.createdAt)}
          </span>
        </div>

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
        transition
        cursor-pointer"
            onClick={toggleFavorite}
          >
            <Heart
              className={`${
                image.favorite
                  ? "text-violet-500 fill-violet-500"
                  : "text-gray-400"
              }`}
            />
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
        transition
        cursor-pointer"
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
