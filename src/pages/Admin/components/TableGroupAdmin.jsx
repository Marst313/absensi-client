import { Link, useParams } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { GrNewWindow } from 'react-icons/gr';
import { MdGroups } from 'react-icons/md';

import useGroupStore from '../../../features/groupStore';
import useAgendaStore from '../../../features/agendaStore';
import { useEffect } from 'react';

function TableGroup() {
  const { allGroup, setGroupId } = useGroupStore((state) => state);
  const { setModalAgenda } = useAgendaStore((state) => state);

  const { id: idActivity } = useParams();

  //! Check if there's no data to display
  if (!allGroup || allGroup.length === 0) {
    return <h1 className="text-lg text-primary text-red-500">Belum Ada Grup Yang Mengikuti Kegiatan.</h1>;
  }

  return (
    <ul className="container-card">
      {allGroup?.map((grup) => {
        return (
          <li key={grup?.id} className="flex flex-col justify-between w-full min-h-[150px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow relative">
            <div className="grid grid-cols-2    items-start gap-1">
              {/* Title */}
              <h5 className="lg:text-xl font-semibold tracking-tight text-gray-900 capitalize mb-3 text-base flex items-center gap-3">
                <MdGroups />
                {grup?.nama_grup}
              </h5>

              <button
                className="add-button__small "
                onClick={() => {
                  setModalAgenda(true);
                  setGroupId(grup?.id);
                }}
              >
                Tambah Agenda
                <GrNewWindow className="w-4 h-4 ms-2" />
              </button>
            </div>

            <p className="mb-3 text-slate-800/70 font-light">
              Jumlah mahasiswa terdaftar : <span className="font-semibold text-slate-800"> {grup?.mahasiswa?.length}</span>
            </p>

            {/* Bottom Section */}
            <div className="flex items-center justify-between sm:justify-start gap-3 mt-auto">
              {/* Link */}
              <Link to={`/kegiatan/${idActivity}/grup/${grup?.id}`} className="open-button__small">
                Lihat Grup
                <FaLongArrowAltRight className="w-4 h-4 ms-2" />
              </Link>

              <Link to={`/kegiatan/${idActivity}/agenda/${grup?.id}`} className={`open-button__small`}>
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
