import { Image, Moon, CircleHelp } from "lucide-react";

function Navbar() {
  return (
    <header className="h-14 border-b border-white/10 px-6 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center">
          <Image size={18} className="text-white" />
        </div>

        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-white">Imagine</span>
          <span className="text-violet-500">AI</span>
        </h1>

      </div>

      <div className="flex items-center gap-3">

        <button className="h-9 px-4 rounded-xl bg-[#18181C] border border-white/10 text-white text-sm hover:bg-[#202025] transition">
          Gallery
        </button>

        <button className="w-10 h-9 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center text-white">
          <Moon size={16}/>
        </button>

        <button className="h-9 px-4 rounded-xl bg-[#18181C] border border-white/10 text-white text-sm flex items-center gap-2 hover:bg-[#202025] transition">
          <CircleHelp size={16}/>
          Learn More
        </button>

      </div>

    </header>
  );
}

export default Navbar;