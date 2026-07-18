import { useState } from "react";

function AspectRatio() {
  const ratios = [
    "1:1",
    "16:9",
    "9:16",
    "4:3",
    "3:4",
  ];

  const [selected, setSelected] = useState("1:1");

  return (
    <div>

      <h3 className="text-white text-sm font-semibold mb-2">
        Aspect Ratio
      </h3>

      <div className="grid grid-cols-5 gap-1.5">

        {ratios.map((ratio) => (

          <button
            key={ratio}
            onClick={() => setSelected(ratio)}
            className={`h-10 rounded-xl border text-sm font-medium transition

            ${
              selected === ratio
                ? "bg-violet-600 border-violet-600 text-white"
                : "bg-[#18181C] border-white/10 text-gray-300 hover:border-violet-500"
            }`}
          >
            {ratio}
          </button>

        ))}

      </div>

    </div>
  );
}

export default AspectRatio;