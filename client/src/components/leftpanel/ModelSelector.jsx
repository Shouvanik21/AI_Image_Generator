import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

function ModelSelector({ model, setModel }) {
  const [open, setOpen] = useState(false);

  const models = [
    {
      name: "Flux Schnell",
      value: "@cf/black-forest-labs/flux-1-schnell",
    },

    {
      name: "SDXL",
      value: "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    },

    {
      name: "SDXL Lightning",
      value: "@cf/bytedance/stable-diffusion-xl-lightning",
    },

    {
      name: "DreamShaper 8",
      value: "@cf/lykon/dreamshaper-8-lcm",
    },
  ];

  return (
    <div>
      {/* Label */}

      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-white text-lg font-semibold">Image Model</h3>

        <span className="text-[10px] bg-violet-600/20 text-violet-400 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles size={12} />
          Recommended
        </span>
      </div>

      {/* Dropdown */}

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full h-10 rounded-xl bg-[#18181C] border border-white/10 px-5 p-2.75 flex items-center justify-between hover:border-violet-500 transition"
        >
          <span className="text-white">
            {models.find((m) => m.value === model)?.name}
          </span>

          <ChevronDown
            size={20}
            className={`text-gray-400 transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute mt-2 w-full rounded-xl border border-white/10 bg-[#18181C] overflow-hidden z-50">
            {models.map((model) => (
              <button
                key={model.value}
                onClick={() => {
                  setModel(model.value);
                  setOpen(false);
                }}
                className="w-full text-left p-2.75 text-white hover:bg-violet-600/20 transition"
              >
                {model.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelSelector;
