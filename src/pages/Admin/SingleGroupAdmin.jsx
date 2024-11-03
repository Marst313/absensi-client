import { useParams, Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

import { LoadingSkeletonTable, ModalNewAgenda, ModalUsersGroup, TableUsersGroup } from '../../components';

import { NotFound } from '../';
import { useSingleGroupData } from '../../hooks/useSingleGroupAdmin';

function SingleGroup() {
  const { idGroup, idActivity } = useParams();
  const { singleGroup, isLoading, loadingUser, setModalGroupUsers } = useSingleGroupData(idActivity, idGroup);

  if (isLoading || loadingUser) {
    return <LoadingSkeletonTable />;
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
        <Link to={`/kegiatan/${idActivity}`} className="back-button__medium">
          <IoArrowBack />
          Kembali
        </Link>

        <button onClick={() => setModalGroupUsers(true)} className="add-button__medium">
          Tambah Mahasiswa Ke Grup
        </button>
      </div>

      <hr />

      {/* Content */}
      <div>
        {/* Group Information */}
        <div className="flex justify-between mb-2 gap-5 relative items-center">
          <h1 className="text-xl text-slate-400 font-light">
            Nama Grup : <span className="font-semibold text-xl text-center capitalize text-slate-800">{singleGroup?.nama_grup}</span>
          </h1>

          {/* Agenda Table */}
          <Link to={`/kegiatan/${idActivity}/agenda/${singleGroup?.id}`} className="open-button__medium">
            Lihat Agenda Grup
          </Link>
        </div>

        <hr />

        {/* Students Table */}
        <h1 className="font-semibold text-lg my-3">Table Mahasiswa Yang Mengikuti Kegiatan</h1>
        <TableUsersGroup />
      </div>
    </div>
  );
}

export default SingleGroup;
