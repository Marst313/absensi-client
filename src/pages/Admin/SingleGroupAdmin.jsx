import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

import { LoadingSkeleton, LoadingSkeletonTable, ModalNewAgenda, ModalUsersGroup, TableAgenda, TableUsersGroup } from '../../components';

import useUserStore from '../../features/userStore';
import useGroupStore from '../../features/groupStore';
import useAgendaStore from '../../features/agendaStore';

import { NotFound } from '../';

function useSingleGroup(idActivity, idGroup) {
  const { isLoading: loadingUser, id, getAllUser } = useUserStore((state) => state);
  const { singleGroup, isLoading, getAllGroup, setSingleGroup, setModalGroupUsers, clearSingleGroup } = useGroupStore((state) => state);
  const { setModalAgenda, getAllAgenda } = useAgendaStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      clearSingleGroup();
      await getAllUser();

      const groups = await getAllGroup(idActivity);
      await getAllAgenda({ groupId: idGroup, userId: id });

      setSingleGroup(idGroup, groups);
    };

    fetchData();
  }, [idActivity, idGroup]);

  return { singleGroup, isLoading, loadingUser, setModalGroupUsers, setModalAgenda };
}

function SingleGroup() {
  const { idGroup, idActivity } = useParams();
  const { singleGroup, isLoading, loadingUser, setModalAgenda, setModalGroupUsers } = useSingleGroup(idActivity, idGroup);

  const openModalUserGroup = () => {
    setModalGroupUsers(true);
  };

  const openModalAgendaGroup = () => {
    setModalAgenda(true);
  };

  if (isLoading || loadingUser) {
    return (
      <>
        <LoadingSkeletonTable />
      </>
    );
  }
  if (!singleGroup) {
    return <NotFound />;
  }

  return (
    <div>
      <ModalUsersGroup />
      <ModalNewAgenda />

      {/* Header */}
      <div className="w-full flex justify-between items-center gap-3">
        <Link to={`/kegiatan/${idActivity}`} className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 flex items-center text-sm md:text-base">
          <IoArrowBack />
          Kembali
        </Link>

        <button onClick={openModalUserGroup} className="text-sm md:text-base px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-700">
          Tambah Mahasiswa Ke Grup
        </button>
      </div>

      <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />

      {/* Content */}
      <div>
        <div className="flex items-center flex-col lg:flex-row gap-5 relative">
          <h1 className="font-semibold text-2xl text-center capitalize">{singleGroup?.nama_grup}</h1>

          <button onClick={openModalAgendaGroup} className="text-sm md:text-base px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-700">
            Tambah Agenda Ke Grup
          </button>
        </div>

        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />

        <h1 className="font-semibold text-lg my-3">Table Mahasiswa Yang Mengikuti Kegiatan</h1>
        <TableUsersGroup />

        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />

        <TableAgenda />
      </div>
    </div>
  );
}

export default SingleGroup;
