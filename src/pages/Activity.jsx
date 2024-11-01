import { IoIosSearch } from 'react-icons/io';
import { MdLibraryAdd } from 'react-icons/md';
import { useEffect } from 'react';

import { TableActivity, ModalActivity, LoadingSkeleton, ModalNewGroup } from '../components';
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
      <ModalActivity />
      <ModalNewGroup />

      {/* Header Activity */}
      <div className="header-activity">
        {/* Add Activity and Sort Options */}
        <div className="flex items-center">
          {role !== 'MHS' && (
            <button onClick={() => setModalActivity(true)} className="add-button__small">
              Tambah Kegiatan Baru
              <MdLibraryAdd className="w-4 h-4 ml-2.5" />
            </button>
          )}

          {/* SELECT OPTION */}
          <SelectOption />
        </div>

        {/* Search Activity */}
        <div className="search">
          <label htmlFor="table-search-activity">Search</label>
          <div className="container-search">
            <IoIosSearch />
          </div>
          <input type="text" id="table-search-activity" placeholder="Search for Activity" className="input-search" />
        </div>
      </div>
      {/* Header Activity */}

      {/* Activity Table */}
      <TableActivity setModalGroup={setModalGroup} />
    </section>
  );
}

function SelectOption() {
  return (
    <select className="select-filter" onChange={(e) => console.log(e.target.value)}>
      <option value="ascending-number">No (asc)</option>
      <option value="descending-number">No (desc)</option>
      <option value="ascending-name">Name (A-Z)</option>
      <option value="descending-name">Name (Z-A)</option>
    </select>
  );
}

export default Activity;
