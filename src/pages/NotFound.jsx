import { IoArrowBack } from 'react-icons/io5';
import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="bg-primary/5 container flex items-center min-h-[calc(100vh-8rem)] px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-primary rounded-full bg-blue-50 ">
            <TbError404 className="w-6 h-6" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">Halaman tidak ditemukan</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Halaman yang coba kamu cari tidak ditemukan. Berikut halman yang mungkin bisa membantu:</p>
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button onClick={() => navigate(-1)} className="back-button__medium">
              <IoArrowBack />
              Kembali
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default NotFound;
