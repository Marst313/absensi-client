import { IoArrowBack } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { Loading } from '../../components';
import { isoToDate } from '../../utils/helper';

import useUserStore from '../../features/userStore';
import useAgendaStore from '../../features/agendaStore';
import useGroupStore from '../../features/groupStore';

function useSingleGroup(idGroup) {
  const { singleGroup, setSingleGroup } = useGroupStore((state) => state);
  const {} = useAgendaStore((state) => state);

  const { Groups, isLoading } = useUserStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      // await getAllAgenda()
      setSingleGroup(idGroup, Groups);
    };

    fetchData();
  }, [idGroup, Groups]);

  return { singleGroup, isLoading };
}

function SingleGroupUser() {
  const { idGroup } = useParams();

  const { singleGroup, isLoading } = useSingleGroup(idGroup);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-3">
        <Link to={`/grup`} className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 flex items-center text-sm md:text-base">
          <IoArrowBack />
          Kembali
        </Link>
        <h1 className="capitalize font-medium text-lg">{singleGroup?.kegiatan?.nama}</h1>
      </div>

      <hr className="h-1  bg-primary/20 rounded-full border-0 dark:bg-gray-700 w-full my-3" />

      <div className="border-2  shadow-sm px-3 py-3 rounded-md">
        {/* HEADER */}
        <div className="w-full my-2 flex items-center justify-between">
          {/* PROFILE DOSEN */}
          <div className={`flex w-fit items-center p-2 group`}>
            <img className="w-10 h-10 rounded-full transition duration-75 group-hover:bg-black/30" src={singleGroup?.kegiatan?.creator?.avatar} alt="profile dosen" />

            <h2 className="ms-3 capitalize">{singleGroup?.kegiatan?.creator?.name}</h2>
          </div>

          {/* Time Info */}
          <div className="text-xs text-center flex flex-col  w-fit  text-gray-500">
            <p>{isoToDate(singleGroup?.kegiatan?.waktumulai)} </p>-<p>{isoToDate(singleGroup?.kegiatan?.waktuselesai)}</p>
          </div>
        </div>
        {/* HEADER */}

        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        {/* CONTENT */}
        <p className="opacity-50">Deskripsi Kegiatan : </p>

        <p className="mt-2">{singleGroup?.kegiatan?.deskripsi}</p>
      </div>
    </div>
  );
}
export default SingleGroupUser;
