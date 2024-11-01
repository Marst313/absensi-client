import { FaUserPlus } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { ModalUser, TableUsers } from '../components';
import useUserStore from '../features/userStore';
import { tableHeaderUser } from '../utils/constants';

function Users() {
  const { role, allUser, setModalUser, getAllUser } = useUserStore((state) => state);

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
      {/* MODAL CREATE NEW USER */}
      <ModalUser />

      {/* HEADER */}
      <HeaderUser handleSetModal={handleSetModal} />

      {/* TABLE MAHASISWA */}
      <TableUsers data={allUser} role={role} tableHeader={tableHeaderUser} />
    </section>
  );
}

function HeaderUser({ handleSetModal }) {
  return (
    <div className="header-user">
      <div>
        <button className="add-button__small" type="button" onClick={() => handleSetModal(true)}>
          Tambah Mahasiswa Baru
          <FaUserPlus className="w-4 h-4 ms-2.5" />
        </button>

        {/* FILTER BY NO */}
        <SelectOption />
      </div>

      {/* Search Mahasiswa */}
      <div className="search">
        <label htmlFor="table-search-users">Search</label>
        <div className="container-search">
          <IoIosSearch />
        </div>
        <input type="text" id="table-search-users" placeholder="Search for NIM/NIP" className="input-search" />
      </div>
    </div>
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

export default Users;
