import { Link } from 'react-router-dom';
import useActivityStore from '../features/activityStore';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { isoToDate } from '../utils/helper';
import { BsFileEarmarkBarGraph } from 'react-icons/bs';

function TableActivity() {
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
          <p className="mb-6 text-sm text-gray-700 flex-grow">{activity.deskripsi}</p>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-auto">
            {/* Link */}
            <Link to={`${activity.id}`} className="inline-flex items-center px-4 py-2 text-xs lg:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Lihat Kegiatan
              <FaLongArrowAltRight className="w-4 h-4 ms-2" />
            </Link>

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
