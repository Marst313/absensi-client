import { useEffect } from 'react';
import useGroupStore from '../features/groupStore';
import useUserStore from '../features/userStore';
import useAgendaStore from '../features/agendaStore';
import { getAllUser } from '../services/userServices';

export function useSingleGroupData(idActivity, idGroup) {
  const { id: userId, isLoading: loadingUser } = useUserStore((state) => state);
  const { singleGroup, isLoading, getAllGroup, setSingleGroup, setModalGroupUsers, clearSingleGroup, setListMahasiswaCanAdd } = useGroupStore((state) => state);
  const { allAgenda, setModalAgenda, getAllAgenda } = useAgendaStore((state) => state);

  useEffect(() => {
    const fetchGroupData = async () => {
      clearSingleGroup();

      const groups = await getAllGroup(idActivity);
      setSingleGroup(idGroup, groups);

      const { data } = await getAllUser();
      setListMahasiswaCanAdd(data);
    };
    fetchGroupData();
  }, [idActivity, idGroup, userId, getAllGroup, getAllAgenda, clearSingleGroup, setSingleGroup]);

  return { singleGroup, isLoading, loadingUser, allAgenda, setModalGroupUsers, setModalAgenda };
}
