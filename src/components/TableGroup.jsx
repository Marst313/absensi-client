import { Link, useParams } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useEffect } from 'react';

import useGroupStore from '../features/groupStore';
import { MdGroups } from 'react-icons/md';

function TableGroup() {
  const { allGroup } = useGroupStore((state) => state);

  const { id: idActivity } = useParams();

  if (allGroup.length === 0) {
    return <h1 className="text-lg text-primary">Belum Ada Grup Yang Mengikuti Kegiatan.</h1>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
      {allGroup?.map((activity) => {
        return (
          <li key={activity?.id} className="flex flex-col justify-between w-full min-h-[150px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow relative">
            {/* Title */}
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize mb-3 flex items-center gap-3">
              <MdGroups />
              {activity?.nama_grup}
            </h5>
            <p className="mb-3 text-slate-800/70 font-light">
              {' '}
              Jumlah mahasiswa terdaftar : <span className="font-semibold text-slate-800"> {activity?.mahasiswa.length}</span>
            </p>

            {/* Bottom Section */}
            <div className="flex items-center justify-between mt-auto">
              {/* Link */}
              <Link
                to={`/kegiatan/${idActivity}/group/${activity?.id}`}
                className="inline-flex items-center px-4 py-2 text-xs lg:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Lihat Grup
                <FaLongArrowAltRight className="w-4 h-4 ms-2" />
              </Link>

              {/* Time Info */}
              <div className="text-xs text-center text-gray-500"></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TableGroup;
