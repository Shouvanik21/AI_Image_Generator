import { Download, Heart } from "lucide-react";

function ImagePreview({ generatedImage, aspectRatio }) {
  const downloadImage = () => {
    if (!generatedImage || generatedImage.includes("placehold.co")) {
      alert("Generate an image first!");
      return;
    }

    // Detect image extension from the data URL
    let extension = "png";

    if (generatedImage.startsWith("data:image/jpeg")) {
      extension = "jpg";
    } else if (generatedImage.startsWith("data:image/png")) {
      extension = "png";
    } else if (generatedImage.startsWith("data:image/webp")) {
      extension = "webp";
    }

    const link = document.createElement("a");

    link.href = generatedImage;

    link.download = `ImagineAI-${Date.now()}.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="relative">
      <div className="w-full h-[405px] rounded-xl overflow-hidden bg-[#18181C] border border-white/10">
        <img
          src={
            generatedImage ||
            "https://placehold.co/1024x768/18181C/FFFFFF?text=Generate+an+Image"
          }
          alt="Generated"
          className={`w-full h-full ${
            aspectRatio === "default" ? "object-cover" : "object-contain"
          } bg-black`}
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
        onClick={downloadImage}
      >
        <Download size={18} className="text-white" />
      </button>
      {/* <button
        className="
        absolute
        top-4
        right-16
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
        <Heart size={18} className="text-white" />
      </button> */}
    </div>
  );
}

export default ImagePreview;
