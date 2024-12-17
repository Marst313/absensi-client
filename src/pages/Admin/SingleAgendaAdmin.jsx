import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import useAgendaStore from '../../features/agendaStore';
import useUserStore from '../../features/userStore';
import useGroupStore from '../../features/groupStore';

import TableAgendaAdmin from './components/TableAgendaAdmin';
import LoadingSkeletonTable from '../../components/LoadingSkeletonTable';

function SingleAgendaAdmin() {
  const navigate = useNavigate();
  const params = useParams();
  const { allAgenda, isLoading, getAllAgenda } = useAgendaStore((state) => state);
  const { singleGroup, isLoading: loadingGroup, clearSingleGroup, setSingleGroup, getAllGroup } = useGroupStore((state) => state);
  const { id } = useUserStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      clearSingleGroup();

      const groups = await getAllGroup(params.idActivity);

      setSingleGroup(params.idGroup, groups);

      if (id) {
        await getAllAgenda({ groupId: params.idGroup, userId: id });
      }
    };

    fetchData();
  }, [params, id]);

  if (isLoading || loadingGroup) return <LoadingSkeletonTable />;

  return (
    <div>
      <button className="back-button__medium" onClick={() => navigate(-1)}>
        <IoArrowBack />
        Kembali
      </button>

      <hr />
      <h1 className="text-xl text-slate-400 font-light">
        Nama Grup : <span className="font-semibold text-xl text-center capitalize text-slate-800">{singleGroup?.nama_grup}</span>
      </h1>

      <hr />

      <TableAgendaAdmin data={allAgenda} />
    </div>
  );
}
export default SingleAgendaAdmin;
