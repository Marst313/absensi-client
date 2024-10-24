import { IoIosSearch } from 'react-icons/io';
import { MdLibraryAdd } from 'react-icons/md';

import { TableActivity, ModalActivity, LoadingSkeleton } from '../components';
import useActivityStore from '../features/activityStore';
import { useEffect } from 'react';
import useUserStore from '../features/userStore';

function Activity() {
  const { modalActivity, isLoading, setModalActivity, getAllActivity } = useActivityStore((state) => state);
  const { id, role } = useUserStore((state) => state);

  const handleSetModal = (data) => {
    setModalActivity(data);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      if (id) {
        await getAllActivity(id);
      }
    };

    fetchActivities();
  }, [id]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <section>
      {modalActivity && <ModalActivity />}

      <div className="relative overflow-x-auto  sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">
          <div>
            {role !== 'MHS' && (
              <button
                className="inline-flex items-center text-white bg-green-500 border border-gray-300 focus:outline-none hover:bg-green-600 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
                type="button"
                onClick={() => handleSetModal(true)}
              >
                <span className="sr-only">Add New Activity Button</span>
                Tambah Kegiatan Baru
                <MdLibraryAdd className="w-4 h-4 ms-2.5" />
              </button>
            )}
            <select
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 ms-5"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value="ascending-number">No (asc)</option>
              <option value="descending-number">No (desc)</option>
              <option value="ascending-name">Name (A-Z)</option>
              <option value="descending-name">Name (Z-A)</option>
            </select>
          </div>
          <label htmlFor="table-search-activity" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosSearch className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              id="table-search-activity"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
              placeholder="Search for Activity"
            />
          </div>
        </div>

        <TableActivity />
      </div>
    </section>
  );
}
export default Activity;
