import { useEffect, useState } from "react";
import imageApi from "../services/imageApi";

import GalleryNavbar from "../components/gallery/GalleryNavbar";
import GalleryHeader from "../components/gallery/GalleryHeader";
// import SearchBar from "../components/gallery/SearchBar";
import FilterTabs from "../components/gallery/FilterTabs";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryPagination from "../components/gallery/GalleryPagination";

function Gallery() {

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const imagesPerPage = 8;

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data } = await imageApi.get("/getimages");

                if (data.success) {
                    setImages(data.images);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const totalPages = Math.ceil(images.length / imagesPerPage);

    const startIndex = (currentPage - 1) * imagesPerPage;

    const currentImages = images.slice(
        startIndex,
        startIndex + imagesPerPage
    );

    useEffect(() => {

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

}, [currentPage]);

    return (

        <div className="prompt-scroll min-h-screen bg-[#08080b]">

            <GalleryNavbar />

            <div className="px-8 py-8">

                <GalleryHeader />

                {/* <SearchBar /> */}

                <FilterTabs />

                <GalleryGrid
                    images={currentImages}
                    setImages={setImages}
                    loading={loading}
                />

                <GalleryPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />

            </div>

        </div>

    )

}

export default Gallery;