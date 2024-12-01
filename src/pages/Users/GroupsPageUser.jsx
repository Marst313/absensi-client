import { MdGroups } from 'react-icons/md';
import useUserStore from '../../features/userStore';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BsFileEarmarkBarGraph } from 'react-icons/bs';
import { isoToDate } from '../../utils/helper';
import { LoadingSkeleton } from '../../components';

function GroupsPageUser() {
  const { isLoading, Groups } = useUserStore((state) => state);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (Groups.length === 0) {
    return <h1 className="text-lg text-primary">Belum Bergabung dengan Grup</h1>;
  }
  return (
    <div>
      <h1 className="text-lg font-semibold mb-3">Total Grup Bergabung : {Groups?.length}</h1>

      <ul className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
        {Groups?.map((grup) => {
          return (
            <li key={grup?.id} className="flex flex-col justify-between w-full min-h-[150px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow relative">
              {/* GROUP NAME */}
              <h5 className="text-xl font-semibold tracking-tight text-primary capitalize mb-2 flex items-center gap-3">
                <MdGroups />
                {grup?.nama_grup}
              </h5>

              <hr />

              {/* Title */}
              <h5 className="text-base tracking-tight text-gray-900 capitalize my-2 mb-3 flex font-light items-center gap-3">
                <BsFileEarmarkBarGraph />
                {grup?.kegiatan.nama}
              </h5>

              {/* Bottom Section */}
              <div className="flex items-center justify-between mt-auto">
                {/* Link */}
                <Link to={`/grup/${grup.id}`} className="open-button__small">
                  Detail Kegiatan
                  <FaLongArrowAltRight className="w-4 h-4 ms-2" />
                </Link>

                {/* Time Info */}
                <div className="text-xs text-center flex flex-col text-gray-500">
                  <p>{isoToDate(grup.kegiatan?.waktumulai)} </p>-<p>{isoToDate(grup?.kegiatan?.waktuselesai)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default GroupsPageUser;
