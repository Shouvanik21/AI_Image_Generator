import { useEffect, useState } from "react";
import imageApi from "../services/imageApi";

import GalleryNavbar from "../components/gallery/GalleryNavbar";
import GalleryHeader from "../components/gallery/GalleryHeader";
import FilterTabs from "../components/gallery/FilterTabs";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryPagination from "../components/gallery/GalleryPagination";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedModel, setSelectedModel] = useState("all");

  const imagesPerPage = 8;

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredImages([...images]);
    }
  }, [images, searchQuery]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await imageApi.get("/getimages");

        if (data.success) {
          setImages(data.images);
          setFilteredImages(data.images);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    let ignore = false;

    const searchImages = async () => {
      if (!debouncedQuery.trim()) {
        setFilteredImages([...images]);
        return;
      }

      try {
        const { data } = await imageApi.get(
          `/searchimages?query=${encodeURIComponent(debouncedQuery)}`,
        );

        if (!ignore && data.success) {
          setFilteredImages([...data.images]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    searchImages();

    return () => {
      ignore = true;
    };
  }, [debouncedQuery, images]);

  console.log("Images:", images.length);
  console.log("Filtered:", filteredImages.length);

  let displayImages = [...filteredImages];

  if (showFavorites) {
    displayImages = displayImages.filter((img) => img.favorite);
  }

  if (selectedModel !== "all") {
    displayImages = displayImages.filter((img) => img.model === selectedModel);
  }

  if (sortBy === "newest") {
    displayImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sortBy === "oldest") {
    displayImages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  const totalPages = Math.ceil(displayImages.length / imagesPerPage);

  const startIndex = (currentPage - 1) * imagesPerPage;

  const currentImages = displayImages.slice(
    startIndex,
    startIndex + imagesPerPage,
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const allImagesCount = filteredImages.length;

  const favoriteImagesCount = filteredImages.filter(
    (img) => img.favorite,
  ).length;

  return (
    <div className="prompt-scroll min-h-screen bg-[#08080b]">
      <GalleryNavbar />

      <div className="px-8 py-8">
        <GalleryHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        <FilterTabs
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          setCurrentPage={setCurrentPage}
          allImagesCount={allImagesCount}
          favoriteImagesCount={favoriteImagesCount}
        />

        <GalleryGrid
          images={currentImages}
          setImages={setImages}
          setFilteredImages={setFilteredImages}
          loading={loading}
          showFavorites={showFavorites}
        />

        <GalleryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Gallery;
