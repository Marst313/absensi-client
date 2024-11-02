import { Link } from 'react-router-dom';
import useActivityStore from '../features/activityStore';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { isoToDate } from '../utils/helper';
import { BsFileEarmarkBarGraph } from 'react-icons/bs';
import { MdGroupAdd } from 'react-icons/md';

function TableActivity({ setModalGroup }) {
  const { allActivity } = useActivityStore((state) => state);

  if (allActivity.length === 0) {
    return <h1 className="text-lg text-primary">Belum Menambahkan Kegiatan.</h1>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
      {allActivity?.map((activity) => (
        <li key={activity.id} className="flex flex-col justify-between w-full min-h-[250px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow relative">
          {/* Title */}

          <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize mb-4 flex gap-3 items-center">
            <BsFileEarmarkBarGraph /> {activity.nama}
          </h5>

          {/* Description */}
          <p className="mb-6 text-sm text-gray-700 flex-grow line-clamp-4">{activity.deskripsi}</p>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col gap-2">
              {/* Link */}
              <Link to={`${activity.id}`} className="open-button__small">
                Lihat Kegiatan
                <FaLongArrowAltRight className="w-4 h-4 ms-2" />
              </Link>

              <button onClick={() => setModalGroup(true)} type="button" className="add-button__small">
                Tambah Grup
                <MdGroupAdd className="w-4 h-4 ms-2" />
              </button>
            </div>

            {/* Time Info */}
            <div className="text-xs text-center text-gray-500">
              <p>{isoToDate(activity.waktumulai)}</p>
              <span>-</span>
              <p>{isoToDate(activity.waktuselesai)}</p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className={`w-3 h-3 rounded-full  absolute top-5 right-5 ${activity.visible ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </li>
      ))}
    </ul>
  );
}

export default TableActivity;
