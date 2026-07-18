import { ChevronDown } from "lucide-react";

function AdvancedSettings() {
  return (
    <button
      className="w-full h-10 px-4 rounded-xl bg-[#18181C] border border-white/10 flex items-center justify-between hover:border-violet-500 transition"
    >

      <span className="text-white text-sm">
        Advanced Settings
      </span>

      <ChevronDown
        size={18}
        className="text-gray-400"
      />

    </button>
  );
}

export default AdvancedSettings;