import { BsFillCalendarDateFill } from 'react-icons/bs';
import { IoArrowBack } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { isoToDate } from '../../utils/helper';
import { useEffect } from 'react';
import useAgendaStore from '../../features/agendaStore';
import { LoadingSkeleton } from '../../components';

function SingleAgendaDetail() {
  const { idAgenda } = useParams();

  const { id, singleAgenda, isLoading, getSingleAgenda } = useAgendaStore((state) => state);

  const initialFetch = async () => {
    await getSingleAgenda({ id: idAgenda, idUser: id });
  };

  useEffect(() => {
    initialFetch();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
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
  return (
    <>
      <hr />
      <div className="flex items-start flex-col self-start gap-3 relative">
        <h1 className="text-xl text-slate-400 font-light">
          Detail Agenda : <span className="font-semibold text-xl text-center capitalize text-slate-800">{agenda?.detail}</span>
        </h1>
      </div>
      <div className="mt-5 lg:mt-10">
        <p className="text-opacity-70">Gambar :</p>
        <img src={agenda?.gambar1 || agenda.gambar1_b64} loading="lazy" alt="Gambar agenda" className="w-52 max-h-60" />
      </div>
      <hr />
      {/* Map Section */}
      <div className="my-5">
        <h2 className="text-lg font-semibold">Lokasi : </h2>
        <iframe
          title="Google Maps"
          src={`https://www.google.com/maps?q=${agenda?.gps.split(',')[0]},${agenda?.gps.split(',')[1]}&hl=id&z=15&output=embed`}
          style={{ width: '100%', height: '300px', border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}

export default SingleAgendaDetail;
