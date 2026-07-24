import { useState } from "react";
import ImageModal from "./ImageModal";
import ImageCard from "./ImageCard";
import { Heart } from "lucide-react";

function GalleryGrid({ images, loading, setImages,showFavorites }) {

    if (loading) {

        return (
            <div className="grid grid-cols-4 gap-8">

                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (

                    <div
                        key={item}
                        className="aspect-square rounded-2xl bg-[#18181C] animate-pulse"
                    />

                ))}

            </div>
        );

    }
    if (images.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-2xl bg-[#121214]">

      <Heart
        size={52}
        className="text-gray-600 mb-5"
      />

      <h2 className="text-2xl font-semibold text-white">
        No favorite images
      </h2>

      <p className="text-gray-400 mt-2 text-center max-w-md">
        Images you mark as favorites will appear here.
      </p>

    </div>
  );
}

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <div className="grid grid-cols-4 gap-8">

            {images.map((image) => (

                <ImageCard
                    key={image._id}
                    image={image}
                    setImages={setImages}
                    onClick={() => setSelectedImage(image)}
                    showFavorites={showFavorites}
                />

            ))}

        </div>
            <ImageModal

                image={selectedImage}

                onClose={() => setSelectedImage(null)}

            />
        </>
        
        

    );

}

export default GalleryGrid;