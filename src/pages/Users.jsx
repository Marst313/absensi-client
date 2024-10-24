import { FaUserPlus } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { ModalUser, TableUser } from '../components';
import useUserStore from '../features/userStore';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Users() {
  const { modalUser, role, setModalUser, getAllUser } = useUserStore((state) => state);

  const handleSetModal = (data) => {
    setModalUser(data);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  if (role === 'MHS') {
    return <Navigate to="/" />;
  }

  return (
    <section>
      {modalUser && <ModalUser />}

      <div className="relative overflow-x-auto  sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">
          <div>
            <button
              className="inline-flex items-center text-white bg-green-500 border border-gray-300 focus:outline-none hover:bg-green-600 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
              type="button"
              onClick={() => handleSetModal(true)}
            >
              <span className="sr-only">Add New User Button</span>
              Tambah Mahasiswa Baru
              <FaUserPlus className="w-4 h-4 ms-2.5" />
            </button>
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
          <label htmlFor="table-search-users" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosSearch className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 focus:outline-none"
              placeholder="Search for NIM / NIP"
            />
          </div>
        </div>

        <TableUser />
      </div>
    </section>
  );
}
export default Users;
