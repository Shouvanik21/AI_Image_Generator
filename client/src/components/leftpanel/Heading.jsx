import { Sparkles } from "lucide-react";

function Heading() {
  return (
    <div>

      <div className="flex items-center gap-3">

        <h1 className="text-[30px] font-bold leading-none">

          <span className="text-white">
            Create
          </span>

          <span className="ml-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            anything
          </span>

        </h1>

        <Sparkles
          size={18}
          className="text-violet-400"
        />

      </div>

      <p className="mt-1 text-sm text-gray-400">
        Turn your ideas into stunning images with AI.
      </p>

    </div>
  );
}

export default Heading;