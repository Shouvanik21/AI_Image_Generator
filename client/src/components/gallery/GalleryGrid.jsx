import { useState } from "react";
import ImageModal from "./ImageModal";
import ImageCard from "./ImageCard";

function GalleryGrid({ images, loading, setImages }) {

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