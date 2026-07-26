import { WandSparkles } from "lucide-react";
import imageApi from "../../services/imageApi";

function GenerateButton({
  prompt,
  setGeneratedImage,
  loading,
  setLoading,
  aspectRatio,
  model,
  setGeneratedAspectRatio,
  fetchRecentImages,
}) {
  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
  setLoading(true);

  const { data } = await imageApi.post("/generateimage", {
    prompt,
    model,
    aspectRatio,
  });

  setGeneratedImage(data.image);
  setGeneratedAspectRatio(aspectRatio);

  setLoading(false);

  fetchRecentImages();

} catch (error) {
  console.log(error);
  alert("Image generation failed.");

  setLoading(false);
}
  };

  return (
    <button
      onClick={generateImage}
      disabled={loading}
      className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition mt-1 disabled:opacity-60"
    >
      <WandSparkles size={18} />

      {loading ? "Generating..." : "Generate Image"}
    </button>
  );
}

export default GenerateButton;
