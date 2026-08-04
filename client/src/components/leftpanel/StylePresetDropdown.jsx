import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function StylePresetDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: "None", value: "none" },
    { label: "Photorealistic", value: "photorealistic" },
    { label: "Anime", value: "anime" },
    { label: "Fantasy", value: "fantasy" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[#111114] border border-white/10 rounded-xl p-2.75 flex justify-between items-center text-white"
      >
        <span>
          {options.find((o) => o.value === value)?.label}
        </span>

        <ChevronDown
          size={18}
          className={`text-white transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#18181C] border border-white/10 rounded-xl shadow-2xl z-[9999]">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full text-left p-2.75 hover:bg-violet-600/20 transition ${
                value === option.value
                  ? "text-violet-400"
                  : "text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StylePresetDropdown;