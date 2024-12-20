import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAgendaStore from '../../features/agendaStore';
import { LoadingSkeletonTable } from '../../components';

function SingleAgendaDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { idAgenda } = useParams();

  const { singleAgenda, isLoading, getSingleAgenda } = useAgendaStore((state) => state);

  const initialFetch = async () => {
    await getSingleAgenda({ id: idAgenda, idUser: id });
  };

  useEffect(() => {
    initialFetch();
  }, []);

  if (isLoading) {
    return <LoadingSkeletonTable />;
  }

  return (
    <div>
      <HeaderSectionBack />
      <ContentSection agenda={singleAgenda} />
    </div>
  );
}

function HeaderSectionBack() {
  return (
    <div className="w-full flex justify-between items-center gap-3">
      <Link to={-1} className="back-button__medium">
        <IoArrowBack />
        Kembali
      </Link>
    </div>
  );
}

function ContentSection({ agenda }) {
  const gps = agenda?.gps;
  const latitude = gps ? gps.split(',')[0] : '';
  const longitude = gps ? gps.split(',')[1] : '';

  const [previewImage, setPreviewImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const images = [agenda?.gambar1 || agenda?.gambar1_b64, agenda?.gambar2 || agenda?.gambar2_b64].filter(Boolean);

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleNext = () => {
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handlePrev = () => {
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev === 1 ? 0 : 1));
  };

  return (
    <>
      <hr />
      <div className="flex items-start flex-col self-start gap-3 relative">
        <h1 className="text-xl text-slate-400 font-light">
          Detail Agenda : <span className="font-semibold text-xl text-center capitalize text-slate-800">{agenda?.detail || 'Detail tidak tersedia'}</span>
        </h1>

        {/* PROFILE */}
        <div className="flex gap-5 items-center">
          <img className="w-10 h-10 rounded-full" src={agenda.mahasiswa.avatar} alt="Rounded avatar" />

          <div>
            <h1>Nama : {agenda.mahasiswa.name}</h1>
            <h1>NIM : {agenda.mahasiswa.nim}</h1>
          </div>
        </div>
        {/* PROFILE */}
      </div>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="mt-5 flex flex-col gap-5 lg:flex-row items-start text-start justify-start  ">
        {/* Gambar Section */}
        <div className="flex  gap-3">
          <h2 className="text-lg font-semibold">Gambar :</h2>
          <div className="flex gap-5 flex-col lg:flex-row">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                loading="lazy"
                alt={`Gambar ${index + 1}`}
                className="max-h-96 cursor-pointer hover:opacity-70"
                onClick={() => {
                  setPreviewImage(img);
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="flex gap-5 mb-20">
          <h2 className="text-lg font-semibold">Lokasi :</h2>
          {gps ? (
            <iframe className="h-96 w-96" title="Google Maps" src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=id&z=15&output=embed`} allowFullScreen="" loading="lazy"></iframe>
          ) : (
            <p className="text-red-500">Koordinat GPS tidak tersedia.</p>
          )}
        </div>
      </div>

      {/* Modal Preview */}
      {previewImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closePreview}>
          <button
            className="absolute top-1/2 left-20 bg-white/30 rounded-full hover:scale-105 text-primary text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <IoArrowBack />
          </button>

          {/* Tampilkan loader jika gambar belum selesai dimuat */}
          {isImageLoading && (
            <div className="absolute flex items-center justify-center">
              <span className="text-white text-xl animate-pulse">Loading...</span>
            </div>
          )}

          <img
            src={images[currentIndex]}
            alt="Preview"
            className={`max-w-full max-h-[90%] mx-4 mb-4 ${isImageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            onLoad={() => setIsImageLoading(false)} // Gambar selesai dimuat
            onClick={(e) => e.stopPropagation()} // Mencegah close saat klik gambar
          />

          <button
            className="absolute top-5 right-5 hover:scale-105 text-red-500 text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              closePreview();
            }}
          >
            &times;
          </button>
          <button
            className="absolute top-1/2 right-20 bg-white/30 rounded-full hover:scale-105 text-primary text-3xl font-bold"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <IoArrowForward />
          </button>
        </div>
      )}
    </>
  );
}

export default SingleAgendaDetail;
