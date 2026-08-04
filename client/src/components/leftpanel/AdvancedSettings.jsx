import axios from "axios";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import StylePresetDropdown from "./StylePresetDropdown";

function AdvancedSettings({
  prompt,
  setPrompt,
  originalPrompt,
  setOriginalPrompt,
  enhancePrompt,
  setEnhancePrompt,
  stylePreset,
  setStylePreset,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative mt-1">
      {/* Floating Panel */}

      {open && (
        <div className="absolute bottom-full left-0 w-full mb-3 bg-[#18181C] border border-white/10 rounded-2xl p-4 shadow-2xl z-50">
          {/* Style Preset */}

          <div className="mb-5">
            <label className="text-sm text-gray-300 block mb-2">
              Style Preset
            </label>

            <StylePresetDropdown
              value={stylePreset}
              onChange={setStylePreset}
            />
          </div>

          {/* Enhance Prompt */}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Enhance Prompt</p>

              <p className="text-xs text-gray-500">
                Improve prompts using Groq AI
              </p>
            </div>

            <button
              onClick={async () => {
                if (!enhancePrompt) {
                  if (!prompt.trim()) return;

                  setOriginalPrompt(prompt);

                  const { data } = await axios.post(
                    "http://localhost:5000/api/auth/enhanceprompt",
                    {
                      prompt,
                    },
                  );

                  setPrompt(data.prompt);

                  setEnhancePrompt(true);
                } else {
                  setPrompt(originalPrompt);

                  setEnhancePrompt(false);
                }
              }}
              className={`w-12 h-6 rounded-full transition ${
                enhancePrompt ? "bg-violet-600" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition ${
                  enhancePrompt ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* Collapsed Button */}

      <div
        onClick={() => setOpen(!open)}
        className="bg-[#18181C] border border-white/10 rounded-xl p-2.75 px-5 flex items-center justify-between cursor-pointer"
      >
        <span className="text-white font-semibold">Advanced Settings</span>

        <ChevronDown
          size={18}
          className={`text-white transition ${open ? "rotate-180" : ""}`}
        />
      </div>
    </div>
  );
}

export default AdvancedSettings;
