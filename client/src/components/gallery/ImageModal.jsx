import { X } from "lucide-react";

function ImageModal({ image, onClose }) {

  if (!image) return null;

  return (
    <div
      onClick={onClose}
      className="
      fixed
      inset-0
      z-50
      bg-black/80
      backdrop-blur-md
      flex
      items-center
      justify-center
      p-10
      "
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="
        relative
        max-w-6xl
        max-h-[90vh]
        "
      >

        <img
          src={image.image}
          alt={image.prompt}
          className="
          max-w-full
          max-h-[90vh]
          rounded-2xl
          object-contain
          "
        />

        <button
          onClick={onClose}
          className="
          absolute
          top-4
          right-4
          w-10
          h-10
          rounded-full
          bg-black/60
          text-white
          hover:bg-violet-600
          transition
          "
        >
          <X size={18} className="mx-auto" />
        </button>

      </div>

    </div>
  );
}

export default ImageModal;