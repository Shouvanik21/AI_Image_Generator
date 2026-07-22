import GalleryNavbar from "../components/gallery/GalleryNavbar";
import GalleryHeader from "../components/gallery/GalleryHeader";
// import SearchBar from "../components/gallery/SearchBar";
import FilterTabs from "../components/gallery/FilterTabs";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryPagination from "../components/gallery/GalleryPagination";

function Gallery() {

    return (

        <div className="prompt-scroll min-h-screen bg-[#08080b]">

            <GalleryNavbar />

            <div className="px-8 py-8">

                <GalleryHeader />

                {/* <SearchBar /> */}

                <FilterTabs />

                <GalleryGrid />

                <GalleryPagination />

            </div>

        </div>

    )

}

export default Gallery;