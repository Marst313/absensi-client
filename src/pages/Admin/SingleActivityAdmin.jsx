import { Link, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useEffect } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';

import useUserStore from '../../features/userStore';
import { isoToDate } from '../../utils/helper';
import useGroupStore from '../../features/groupStore';
import useActivityStore from '../../features/activityStore';
import { LoadingSkeleton, ModalNewGroup, TableGroupAdmin } from '../../components';

function SingleActivity() {
  const { allActivity, singleActivity, isLoading, getAllActivity, setSingleActivity } = useActivityStore((state) => state);
  const { id: userId } = useUserStore((state) => state);
  const { setModalGroup, getAllGroup } = useGroupStore((state) => state);

  const { id: idActivity } = useParams();

  const openModalGroup = () => {
    setModalGroup(true);
  };

  // ! GET ALL ACTIVITY
  useEffect(() => {
    const fetchActivities = async () => {
      if (userId) {
        await getAllActivity(userId);
      }
    };

    fetchActivities();
  }, [userId, getAllActivity]);

  // ! SET SINGLE ACTIVITY TO STATE
  useEffect(() => {
    if (allActivity && idActivity) {
      const filteredActivity = allActivity.find((activity) => activity.id === idActivity);
      setSingleActivity(filteredActivity || null);
    }
  }, [allActivity, idActivity]);

  const initialFetch = async () => {
    await getAllGroup(idActivity);
  };

  // ! INITIAL FETCHING
  useEffect(() => {
    initialFetch();
  }, []);

  // ! Tampilkan loading jika aktivitas belum ada
  if (!singleActivity || isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <ModalNewGroup />

      {/* HEADERS */}
      <div className="w-full flex  justify-between items-center gap-3">
        <Link to="/kegiatan" className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 flex items-center text-sm md:text-base">
          <IoArrowBack />
          Kembali
        </Link>

        <button type="button" onClick={openModalGroup} className="text-sm md:text-base px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-700">
          Tambah Grup Baru
        </button>
      </div>
      <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />

      {/* CONTENT */}
      <div>
        {/* HEADERS CONTENT */}
        <div className="flex items-start  flex-col self-start  gap-3 relative">
          <h1 className="text-xl text-slate-400 font-light">
            Nama Kegiatan : <span className="font-semibold text-xl text-center capitalize text-slate-800">{singleActivity?.nama}</span>
          </h1>
          <p className="text-sm mt-3 lg:mt-0   flex items-center">
            <BsFillCalendarDateFill /> : {isoToDate(singleActivity?.waktumulai)} - {isoToDate(singleActivity?.waktuselesai)}
          </p>

          <div className={`w-3 h-3 rounded-full absolute top-0 right-0 ${singleActivity.visible ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>

        {/* BODY CONTENT */}
        <div className="mt-5 lg:mt-10">
          <p className="text-opacity-70">Deskripsi : {singleActivity?.deskripsi}</p>
        </div>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />

        <h1 className="font-semibold text-lg my-3 underline italic">List Grup Yang Mengikuti Kegiatan</h1>
        <TableGroupAdmin />
      </div>
    </div>
  );
}
export default SingleActivity;
