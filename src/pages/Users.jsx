import { FaUserPlus } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import useUserStore from '../features/userStore';
import { HeaderSection, ModalUser, TableUsers } from '../components';
import { tableHeaderUser } from '../utils/constants';
import Pagination from '../components/Pagination';

function Users() {
  const { role, searchResults, currentPage, totalPage, pageSize, setModalUser, getAllUser, setCurrentPage, searchUser } = useUserStore((state) => state);

  const handleSearchUser = (e) => {
    searchUser(e.target.value);
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
      <HeaderSection id={'table-search-user'} handleSearch={handleSearchUser} placeholder={'Search for NIM'} role={role} setOpenModal={setModalUser} title={'Tambah Kegiatan Baru'} icon={FaUserPlus} />
      {/* HEADER */}

      {/* TABLE MAHASISWA */}
      <TableUsers data={searchResults} role={role} tableHeader={tableHeaderUser} />

      <Pagination totalPage={totalPage} showedPage={pageSize} currentPage={currentPage} onPrev={handlePrev} onNext={handleNext} />
    </section>
  );
}

export default Users;
