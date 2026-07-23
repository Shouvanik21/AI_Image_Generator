function GalleryPagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-center mt-10 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-4 h-10 rounded-xl bg-[#18181C] text-gray-300 disabled:opacity-40 cursor-pointer"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={`w-10 h-10 rounded-xl transition cursor-pointer

                        ${
                          currentPage === index + 1
                            ? "bg-violet-600 text-white"
                            : "bg-[#18181C] text-gray-300"
                        }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-4 h-10 rounded-xl bg-[#18181C] text-gray-300 disabled:opacity-40 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

export default GalleryPagination;
