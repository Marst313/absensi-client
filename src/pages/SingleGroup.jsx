import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';

import useGroupStore from '../features/groupStore';
import useUserStore from '../features/userStore';
import { Loading, ModalUsersGroup, TableUserGroup } from '../components';

function useSingleGroup(idActivity, idGroup) {
  const { getAllUser } = useUserStore((state) => state);
  const { singleGroup, isLoading, getAllGroup, setSingleGroup, clearSingleGroup } = useGroupStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      clearSingleGroup();
      await getAllGroup(idActivity);
      await getAllUser();
      setSingleGroup(idGroup);
    };

    fetchData();
  }, [idActivity, idGroup, getAllUser, getAllGroup, setSingleGroup]);

  return { singleGroup, isLoading };
}

function SingleGroup() {
  const { idGroup, idActivity } = useParams();
  const { singleGroup, isLoading } = useSingleGroup(idActivity, idGroup);
  const { setModalGroupUsers } = useGroupStore((state) => state);

  const openModalUserGroup = () => {
    setModalGroupUsers(true);
  };

  if (isLoading || !singleGroup) {
    return <Loading />;
  }

  return (
    <div>
      <ModalUsersGroup />

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
          <h1 className="font-semibold text-2xl text-center capitalize">{singleGroup.nama_grup}</h1>
        </div>

        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />

        <h1 className="font-semibold text-lg my-3">Table Mahasiswa Yang Mengikuti Kegiatan</h1>
        <TableUserGroup />
      </div>
    </div>
  );
}

export default SingleGroup;
