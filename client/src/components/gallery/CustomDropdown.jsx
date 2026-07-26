import { ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CustomDropdown({
  value,
  onChange,
  options,
  placeholder,
}) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const selected =
    options.find((item) => item.value === value)?.label ||
    placeholder;

  return (
    <div className="w-full" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="
        w-full
        h-11
        rounded-xl
        bg-[#101014]
        border
        border-white/10
        px-4
        flex
        items-center
        justify-between
        text-white
        hover:border-violet-500/50
        transition
        cursor-pointer
        "
      >
        {selected}

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
  className={`
    ${
      open
        ? "mt-2 max-h-80 opacity-100 scale-100"
        : "max-h-0 opacity-0 scale-95 pointer-events-none"
    }

    relative
    w-full
    overflow-hidden
    rounded-xl
    bg-[#18181C]
    border
    border-white/10
    shadow-2xl
    transition-all
    duration-200
  `}
>
        {options.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              onChange(item.value);
              setOpen(false);
            }}
            className={`
            w-full
            px-4
            py-3
            flex
            justify-between
            items-center
            transition
            cursor-pointer

            ${
              value === item.value
                ? "bg-violet-600 text-white"
                : "text-gray-300 hover:bg-violet-500/20 hover:text-white"
            }
          `}
          >
            {item.label}

            {value === item.value && (
              <Check size={16} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CustomDropdown;