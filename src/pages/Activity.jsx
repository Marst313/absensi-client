import { MdLibraryAdd } from 'react-icons/md';
import { useEffect } from 'react';

import { ModalActivity, LoadingSkeleton, ModalNewGroup, HeaderSection } from '../components';

import useActivityStore from '../features/activityStore';
import useUserStore from '../features/userStore';
import useGroupStore from '../features/groupStore';
import Pagination from '../components/Pagination';
import TableActivity from './Admin/components/TableActivityAdmin';

function Activity() {
  const { isLoading, totalPage, pageSize, currentPage, setModalActivity, getAllActivity, searchActivity, setCurrentPage } = useActivityStore((state) => state);
  const { id, role } = useUserStore((state) => state);
  const { setModalGroup, setGroupId } = useGroupStore((state) => state);

  const handleSearchActivity = (e) => {
    searchActivity(e.target.value);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <HeaderSection id={'table-search-activity'} placeholder={'Search for Activity'} role={role} setOpenModal={setModalActivity} handleSearch={handleSearchActivity} title={'Tambah Kegiatan Baru'} icon={MdLibraryAdd} />
      {/* Header Activity */}

      {/* Activity Table */}
      <TableActivity setModalGroup={setModalGroup} setGroupId={setGroupId} />

      <Pagination totalPage={totalPage} showedPage={pageSize} currentPage={currentPage} onPrev={handlePrev} onNext={handleNext} />
    </section>
  );
}

export default Activity;
