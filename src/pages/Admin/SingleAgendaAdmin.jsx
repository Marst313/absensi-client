import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import useAgendaStore from '../../features/agendaStore';
import useUserStore from '../../features/userStore';
import TableAgendaAdmin from '../../components/TableAgendaAdmin';
import LoadingSkeletonTable from '../../components/LoadingSkeletonTable';
import useGroupStore from '../../features/groupStore';

function SingleAgendaAdmin() {
  const navigate = useNavigate();
  const params = useParams();
  const { allAgenda, isLoading, getAllAgenda } = useAgendaStore((state) => state);
  const { id } = useUserStore((state) => state);
  const { singleGroup } = useGroupStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      await getAllAgenda({ groupId: params.idGroup, userId: id });
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingSkeletonTable />;

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
