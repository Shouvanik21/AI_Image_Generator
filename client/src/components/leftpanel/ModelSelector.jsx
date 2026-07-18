import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState("Flux");
  const [open, setOpen] = useState(false);

  const models = [
    "Flux",
    "Turbo",
    "Flux Realism",
    "Flux Anime",
    "Flux 3D",
  ];

  return (
    <div>

      {/* Label */}

      <div className="flex items-center gap-2 mb-2">

        <h3 className="text-white text-lg font-semibold">
          Image Model
        </h3>

        <span className="text-[10px] bg-violet-600/20 text-violet-400 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles size={12} />
          Recommended
        </span>

      </div>

      {/* Dropdown */}

      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="w-full h-10 rounded-xl bg-[#18181C] border border-white/10 px-5 flex items-center justify-between hover:border-violet-500 transition"
        >
          <span className="text-white">
            {selectedModel}
          </span>

          <ChevronDown
            size={20}
            className={`text-gray-400 transition ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute mt-2 w-full rounded-2xl border border-white/10 bg-[#18181C] overflow-hidden z-50">

            {models.map((model) => (

              <button
                key={model}
                onClick={() => {
                  setSelectedModel(model);
                  setOpen(false);
                }}
                className="w-full text-left px-5 py-4 text-white hover:bg-violet-600/20 transition"
              >
                {model}
              </button>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default ModelSelector;