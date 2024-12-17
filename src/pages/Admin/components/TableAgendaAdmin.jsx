import { MdLibraryBooks } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import useAgendaStore from '../../../features/agendaStore';

function TableAgendaAdmin({ data }) {
  const navigate = useNavigate();

  const handleOnClick = (id, idAgenda) => {
    navigate(`/agenda/${idAgenda}?id=${id}`);
  };

  if (!data) {
    return <h1 className="not-found">Data agenda tidak ditemukan</h1>;
  }

  if (data.length === 0) {
    return <h1 className="not-found">Silahkan buat agenda</h1>;
  }

  return (
    <ul className="container-card">
      {data?.map((agenda) => {
        return (
          <li key={agenda?.id} className="flex flex-col justify-between w-full min-h-[150px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow relative">
            {/* Title */}
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize mb-3 flex items-center gap-3">
              <MdLibraryBooks />
              {agenda?.nama}
            </h5>

            <p className="mb-3 text-slate-800/70 font-light">
              Deskripsi : <span className="font-semibold text-slate-800"> {agenda?.deskripsi} </span>
            </p>

            {/* Bottom Section */}
            <div className="flex items-center justify-between mt-auto">
              {/* Link */}
              <button className={`open-button__small`}>Status</button>
              <button onClick={() => handleOnClick(agenda?.idUser, agenda?.id)} className={`open-button__small`} disabled={!agenda.status_berkas}>
                Detail
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
export default TableAgendaAdmin;
