import { MdLibraryAdd } from 'react-icons/md';
import { useEffect } from 'react';

import { TableActivity, ModalActivity, LoadingSkeleton, ModalNewGroup, HeaderSection } from '../components';

import useActivityStore from '../features/activityStore';
import useUserStore from '../features/userStore';
import useGroupStore from '../features/groupStore';

function Activity() {
  const { isLoading, setModalActivity, getAllActivity } = useActivityStore((state) => state);
  const { id, role } = useUserStore((state) => state);
  const { setModalGroup } = useGroupStore((state) => state);

  useEffect(() => {
    if (id) {
      getAllActivity(id);
    }
  }, [id, getAllActivity]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <section>
      {/* MODAL NEW ACTIVITY */}
      <ModalActivity />

      {/* MODAL NEW GROUP */}
      <ModalNewGroup />

      {/* Header Activity */}
      <HeaderSection id={'table-search-activity'} placeholder={'Search for Activity'} role={role} setOpenModal={setModalActivity} title={'Tambah Kegiatan Baru'} icon={MdLibraryAdd} />
      {/* Header Activity */}

      {/* Activity Table */}
      <TableActivity setModalGroup={setModalGroup} />
    </section>
  );
}

export default Activity;
