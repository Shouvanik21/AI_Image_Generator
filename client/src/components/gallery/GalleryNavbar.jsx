import { useNavigate } from "react-router-dom";
import { Image, Moon, CircleHelp } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b border-white/10 px-3 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
          <Image size={18} className="text-white" />
        </div>

        <h1 className="text-lg md:text-xl font-bold tracking-tight">
          <span className="text-white">Imagine</span>
          <span className="text-violet-500">AI</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="h-9 px-4 rounded-xl bg-[#18181C] border border-white/10 text-white text-sm hover:bg-[#202025] transition"
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button className="group relative h-9 px-4 rounded-xl bg-[#18181C] border border-white/10 text-white text-sm flex items-center gap-2 hover:bg-[#202025] transition">
          <CircleHelp size={16} />
          <span className="hidden md:inline">Learn More</span>
          <div
            className="
    absolute
    top-full
    right-0
    mt-3
    w-72
    rounded-xl
    border
    border-white/10
    bg-[#18181C]
    p-4
    text-left
    opacity-0
    invisible
    group-hover:opacity-100
    group-hover:visible
    transition-all
    duration-300
    shadow-2xl
    z-50
  "
          >
            <h3 className="text-violet-500 font-semibold mb-2">ImagineAI</h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Generate stunning AI images using powerful models like Flux
              Schnell, enhance prompts with Groq AI, customize aspect ratios,
              guidance, and style presets, then save your creations securely to
              your gallery.
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
