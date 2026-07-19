import { WandSparkles } from "lucide-react";

function GenerateButton() {
  return (
    <div>

      <button
        className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition mt-1"
      >

        <WandSparkles size={18} />

        Generate Image

      </button>

    </div>
  );
}

export default GenerateButton;