import ImageCard from "./ImageCard";

function GalleryGrid() {

    const images = [1, 2, 3, 4, 5, 6, 7, 8];

    return (

        <div className="grid grid-cols-4 gap-6">

            {

                images.map((item) => (

                    <ImageCard key={item} />

                ))

            }

        </div>

    )

}

export default GalleryGrid;