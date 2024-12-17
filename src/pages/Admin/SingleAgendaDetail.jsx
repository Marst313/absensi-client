import { IoArrowBack } from 'react-icons/io5';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
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
  const gps = agenda?.gps; // Pastikan gps ada
  const latitude = gps ? gps.split(',')[0] : '';
  const longitude = gps ? gps.split(',')[1] : '';

  return (
    <>
      <hr />
      <div className="flex items-start flex-col self-start gap-3 relative">
        <h1 className="text-xl text-slate-400 font-light">
          Detail Agenda : <span className="font-semibold text-xl text-center capitalize text-slate-800">{agenda?.detail || 'Detail tidak tersedia'}</span>
        </h1>
      </div>
      <div className="mt-5 flex flex-col gap-5 lg:flex-row items-start text-start justify-start ">
        {/* Gambar Section */}
        <div>
          <h2 className="text-lg font-semibold">Gambar :</h2>
          <img src={agenda?.gambar1 || agenda?.gambar1_b64 || 'default_image.jpg'} loading="lazy" alt="Gambar agenda" className="max-h-96 " />
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-lg font-semibold">Lokasi :</h2>
          {gps ? (
            <iframe className="h-96 w-96" title="Google Maps" src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=id&z=15&output=embed`} allowFullScreen="" loading="lazy"></iframe>
          ) : (
            <p className="text-red-500">Koordinat GPS tidak tersedia.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SingleAgendaDetail;
