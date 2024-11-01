import { Link, useParams } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { GrNewWindow } from 'react-icons/gr';
import { MdGroups } from 'react-icons/md';

import useGroupStore from '../features/groupStore';
import useAgendaStore from '../features/agendaStore';

function TableGroup() {
  const { allGroup } = useGroupStore((state) => state);
  const { setModalAgenda } = useAgendaStore((state) => state);

  const { id: idActivity } = useParams();

  //! Check if there's no data to display
  if (!allGroup || allGroup.length === 0) {
    return <h1 className="text-lg text-primary">Belum Ada Grup Yang Mengikuti Kegiatan.</h1>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
      {allGroup?.map((activity) => {
        return (
          <li key={activity?.id} className="flex flex-col justify-between w-full min-h-[150px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow relative">
            <div className="flex justify-between  items-start">
              {/* Title */}
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize mb-3 flex items-center gap-3">
                <MdGroups />
                {activity?.nama_grup}
              </h5>

              <button className="add-button__small" onClick={() => setModalAgenda(true)}>
                Tambah Agenda
                <GrNewWindow className="w-4 h-4 ms-2" />
              </button>
            </div>

            <p className="mb-3 text-slate-800/70 font-light">
              Jumlah mahasiswa terdaftar : <span className="font-semibold text-slate-800"> {activity?.mahasiswa?.length}</span>
            </p>

            {/* Bottom Section */}
            <div className="flex items-center justify-start gap-3 mt-auto">
              {/* Link */}
              <Link to={`/kegiatan/${idActivity}/grup/${activity?.id}`} className="open-button__small">
                Lihat Grup
                <FaLongArrowAltRight className="w-4 h-4 ms-2" />
              </Link>

              <Link to={`/agenda/${activity?.id}`} className={`open-button__small`}>
                Lihat Agenda Grup
                <FaLongArrowAltRight className="w-4 h-4 ms-2" />
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TableGroup;
