import { IoArrowBack } from 'react-icons/io5';

function Pagination({ totalPage, showedPage, currentPage, onPrev, onNext }) {
  if (totalPage <= 1) {
    return null; // Tidak perlu pagination jika hanya 1 halaman
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <span className="text-sm text-gray-700">
        Menampilkan <span className="font-semibold text-gray-900">{currentPage}</span>
        {` `}/ <span className="font-semibold text-gray-900">{totalPage}</span> Total <span className="font-semibold text-gray-900">{showedPage}</span>
        {` `}
      </span>

      <div className="inline-flex mt-2 xs:mt-0 gap-5">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          disabled={currentPage === 1} // Disable jika di halaman pertama
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium 
            ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-foreground text-white hover:bg-gray-900'} 
            rounded-s`}
        >
          <IoArrowBack className="w-3.5 h-3.5 me-2 rtl:rotate-180" />
          Prev
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentPage === totalPage} // Disable jika di halaman terakhir
          className={`flex items-center justify-center px-3 h-8 text-sm font-medium 
            ${currentPage === totalPage ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-foreground text-white hover:bg-gray-900'} 
            rounded-e`}
        >
          Next
          <IoArrowBack className="w-3.5 h-3.5 ms-2 rotate-180" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
