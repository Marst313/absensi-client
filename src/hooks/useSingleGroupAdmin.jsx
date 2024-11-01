import { useEffect } from 'react';
import useGroupStore from '../features/groupStore';
import useUserStore from '../features/userStore';
import useAgendaStore from '../features/agendaStore';

export function useSingleGroupData(idActivity, idGroup) {
  const { id: userId, getAllUser, isLoading: loadingUser } = useUserStore((state) => state);
  const { singleGroup, isLoading, getAllGroup, setSingleGroup, setModalGroupUsers, clearSingleGroup } = useGroupStore((state) => state);
  const { allAgenda, setModalAgenda, getAllAgenda } = useAgendaStore((state) => state);

  useEffect(() => {
    const fetchGroupData = async () => {
      clearSingleGroup();
      await getAllUser();
      const groups = await getAllGroup(idActivity);
      setSingleGroup(idGroup, groups);
    };
    fetchGroupData();
  }, [idActivity, idGroup, userId, getAllGroup, getAllUser, getAllAgenda, clearSingleGroup, setSingleGroup]);

  return { singleGroup, isLoading, loadingUser, allAgenda, setModalGroupUsers, setModalAgenda };
}
