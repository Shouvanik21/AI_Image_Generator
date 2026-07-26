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
  "A mystical wolf with glowing blue eyes",
  "A futuristic Tokyo street during heavy rain",
  "A luxury treehouse overlooking a waterfall",
  "A castle floating above the clouds",
  "A glowing crystal cave with underground rivers",
  "A futuristic airport on the Moon",
  "A peaceful Japanese temple during cherry blossom season",
  "A giant octopus attacking a pirate ship",
  "A realistic lion sitting on a golden throne",
  "A luxury penthouse overlooking a futuristic city",
  "A magical portal opening inside an ancient forest",
  "A steampunk city powered by giant gears",
  "A knight battling a fire dragon at sunset",
  "A giant turtle carrying an entire city on its back",
  "A realistic eagle flying above snowy peaks",
  "A hidden waterfall inside a glowing cave",
  "A fantasy kingdom illuminated by the northern lights",
  "A cyberpunk motorcycle speeding through neon streets",
  "A mysterious abandoned amusement park at night",
  "A giant mechanical spider walking across a desert",
  "A pirate captain standing on a stormy cliff",
  "A crystal palace built inside an iceberg",
  "A futuristic underwater research laboratory",
  "A magical owl carrying glowing letters through the night",
  "A beautiful desert oasis under a full moon",
  "A realistic elephant with golden tribal ornaments",
  "A fantasy bridge connecting floating mountains",
  "A wizard casting lightning inside an ancient castle",
  "A colossal robot protecting a futuristic metropolis",
  "A luxury yacht sailing through bioluminescent waters",
  "A hidden village inside giant mushrooms",
  "A breathtaking sunset over lavender fields",
  "A futuristic hospital powered by AI",
  "A realistic snow leopard walking across icy cliffs",
  "A fantasy battlefield with dragons and knights",
  "A mysterious lighthouse surrounded by giant waves",
  "A futuristic train passing through glowing mountains",
  "A magical deer made of stars",
  "A cyberpunk detective walking through neon alleys",
  "A giant crystal dragon sleeping inside a cave",
  "A beautiful European street after fresh rain",
  "A fantasy blacksmith forging a legendary sword",
  "A realistic panda enjoying bamboo in a misty forest",
  "A Viking ship sailing through frozen oceans",
  "A glowing jellyfish floating through outer space",
  "A futuristic smart home on a tropical island",
  "A fantasy queen sitting on an emerald throne",
  "A breathtaking waterfall inside a hidden canyon",
  "A realistic horse galloping across golden fields",
  "A giant ancient tree with glowing houses inside",
  "A luxury sports car parked beside a mountain lake",
  "A mystical fox with nine glowing tails",
  "A futuristic skyline viewed from a rooftop cafe",
  "A beautiful galaxy reflected on a calm ocean",
  "An enchanted garden filled with glowing butterflies",
  "A realistic polar bear beneath the northern lights",
  "A cinematic volcano erupting behind an ancient temple",
  "A tiny cottage inside a giant pumpkin",
  "A futuristic observatory overlooking Saturn",
  "A breathtaking hot air balloon festival at sunrise",
  "A magical castle surrounded by dragons"
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