import { useState } from "react";
import { CircleHelp, Shuffle, Copy, Check } from "lucide-react";

function PromptSection({
  prompt,
  setPrompt,
}) {

  const randomPrompts = [
    "A futuristic cyberpunk city at night with neon lights",
    "An astronaut riding a horse on Mars",
    "A majestic dragon flying over snowy mountains",
    "A cozy cabin beside a frozen lake at sunrise",
    "A magical forest with glowing mushrooms",
    "A samurai standing in heavy rain",
    "A floating island with waterfalls and castles",
    "A photorealistic tiger wearing royal armor",
    "A spaceship entering a black hole",
    "An underwater city with glass domes",
    "A medieval village during autumn",
    "A cute robot watering flowers in a garden",
    "A phoenix rising from flames",
    "A fantasy library with floating books",
    "A giant whale swimming through the clouds",
    "An ancient temple hidden in the jungle",
    "A futuristic Formula 1 car in Tokyo",
    "A realistic portrait of a Viking warrior",
    "A snowy mountain village at Christmas",
    "A mystical wolf with glowing blue eyes"
  ];

  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    if (!prompt.trim()) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRandomPrompt = () => {
    let random;

    do {
      random =
        randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    } while (random === prompt);

    setPrompt(random);
  };

  return (
    <div>

      {/* Heading */}

      <div className="flex items-center justify-between mb-2">

        <div className="flex items-center gap-2">

          <h3 className="text-white text-lg font-semibold">
            Prompt
          </h3>

          <CircleHelp
            size={16}
            className="text-gray-500"
          />

        </div>

        <button onClick={handleRandomPrompt} className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition">

          <Shuffle size={15} />

          Random Prompt

        </button>

      </div>

      {/* Textarea */}

      <div className="relative mb-[-2px]">

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={1000}
          placeholder="Describe anything you want AI to create..."
          className="prompt-scroll w-full h-24 bg-[#18181C] border border-white/10 rounded-lg p-4 pr-8 text-white placeholder:text-gray-500 outline-none resize-none focus:border-violet-500 transition"
        />

        <span className="absolute bottom-3 right-5 text-xs text-gray-500">
          {prompt.length}/1000
        </span>

        <button
          onClick={copyPrompt}
          className="
        absolute
        top-2
        right-2
        w-6
        h-6
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
        "
        >
          {copied ? (
            <Check size={12} className="text-green-500" />
          ) : (
            <Copy size={12} className="text-gray-300" />
          )}
        </button>

      </div>

    </div>
  );
}

export default PromptSection;