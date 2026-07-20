import { CircleHelp, Shuffle } from "lucide-react";

function PromptSection({
  prompt,
  setPrompt,
}) {

  return (
    <div>

      {/* Heading */}

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-2">

          <h3 className="text-white text-lg font-semibold">
            Prompt
          </h3>

          <CircleHelp
            size={16}
            className="text-gray-500"
          />

        </div>

        <button className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition">

          <Shuffle size={15} />

          Random Prompt

        </button>

      </div>

      {/* Textarea */}

      <div className="relative">

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={1000}
          placeholder="Describe anything you want AI to create..."
          className="w-full h-24 bg-[#18181C] border border-white/10 rounded-xl p-4 pr-6 text-white placeholder:text-gray-500 outline-none resize-none focus:border-violet-500 transition"
        />

        <span className="absolute bottom-3 right-5 text-xs text-gray-500">
          {prompt.length}/1000
        </span>

      </div>

    </div>
  );
}

export default PromptSection;