import { useState } from "react";

function AspectRatio({ aspectRatio, setAspectRatio }) {
  const ratios = [
  "default",
  "1:1",
  "16:9",
  "9:16",
  "4:3",
  "3:4",
];

  return (
    <div>

      <h3 className="text-white text-sm font-semibold mb-2">
        Aspect Ratio
      </h3>

      <div className="grid grid-cols-6 gap-2">

        {ratios.map((ratio) => (

          <button
            key={ratio}
            onClick={() => setAspectRatio(ratio)}
            className={`h-10 rounded-xl border text-sm font-medium transition

            ${
              aspectRatio === ratio
                ? "bg-violet-600 border-violet-600 text-white"
                : "bg-[#18181C] border-white/10 text-gray-300 hover:border-violet-500"
            }`}
          >
            {ratio === "default" ? "Default" : ratio}
          </button>

        ))}

      </div>

    </div>
  );
}

export default AspectRatio;