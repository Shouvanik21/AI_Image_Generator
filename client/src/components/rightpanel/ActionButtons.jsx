import {
  Download,
  Copy,
  Sparkles,
  Heart
} from "lucide-react";

function ActionButtons() {

  return (

    <div className="grid grid-cols-4 gap-2 mt-2">

      <button className="h-9 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center gap-2 text-gray-200 text-[13px] hover:border-violet-500 transition">
        <Download size={16}/>
        Download
      </button>

      <button className="h-9 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center gap-2 text-gray-200 text-[13px] hover:border-violet-500 transition">
        <Copy size={16}/>
        Copy Prompt
      </button>

      <button className="h-9 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center gap-2 text-gray-200 text-[13px] hover:border-violet-500 transition">
        <Sparkles size={16}/>
        Enhance
      </button>

      <button className="h-9 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-center gap-2 text-gray-200 text-[13px] hover:border-violet-500 transition">
        <Heart size={16}/>
        Favorite
      </button>

    </div>

  );

}

export default ActionButtons;