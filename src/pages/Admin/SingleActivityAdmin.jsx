import { Link, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useEffect } from 'react';
import { BsFillCalendarDateFill } from 'react-icons/bs';

import useUserStore from '../../features/userStore';
import { isoToDate } from '../../utils/helper';
import useGroupStore from '../../features/groupStore';
import useActivityStore from '../../features/activityStore';
import { LoadingSkeleton, ModalNewAgenda, TableGroupAdmin } from '../../components';
import { NotFound } from '../';

function SingleActivity() {
  const { id: userId } = useUserStore((state) => state);
  const { id: idActivity } = useParams();

  const { allActivity, singleActivity, isLoading, getAllActivity, setSingleActivity } = useActivityStore((state) => state);
  const { isLoading: loadingGroup, getAllGroup } = useGroupStore((state) => state);

  useEffect(() => {
    if (userId) {
      getAllActivity(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (!idActivity) return;

    getAllGroup(idActivity);
  }, [idActivity]);

  useEffect(() => {
    if (allActivity && idActivity) {
      setSingleActivity(idActivity, allActivity);
    }
  }, [allActivity]);

  if (loadingGroup) return <LoadingSkeleton />;
  if (!singleActivity && !isLoading) return <NotFound />;

  return (
    <div>
      <ModalNewAgenda />

      <HeaderSectionBack />

      <ContentSection activity={singleActivity} />
    </div>
  );
}

function HeaderSectionBack() {
  return (
    <div className="w-full flex justify-between items-center gap-3">
      <Link to="/kegiatan" className="back-button__medium">
        <IoArrowBack />
        Kembali
      </Link>
    </div>
  );
}

function ContentSection({ activity }) {
  return (
    <>
      <hr />
      <div className="flex items-start flex-col self-start gap-3 relative">
        <h1 className="text-xl text-slate-400 font-light">
          Nama Kegiatan : <span className="font-semibold text-xl text-center capitalize text-slate-800">{activity?.nama}</span>
        </h1>
        <p className="text-sm mt-3 lg:mt-0 flex items-center gap-2">
          <BsFillCalendarDateFill /> : <span> {isoToDate(activity?.waktumulai)}</span> | <span> {isoToDate(activity?.waktuselesai)}</span>
        </p>
        <div className={`w-3 h-3 rounded-full absolute top-0 right-0 ${activity?.visible ? 'bg-green-500' : 'bg-red-500'}`}></div>
      </div>
      <div className="mt-5 lg:mt-10">
        <p className="text-opacity-70">Deskripsi : {activity?.deskripsi}</p>
      </div>
      <hr />
      <h1 className="font-semibold text-lg my-3 underline italic">List Grup Yang Mengikuti Kegiatan</h1>
      <TableGroupAdmin />
    </>
  );
}

export default SingleActivity;
