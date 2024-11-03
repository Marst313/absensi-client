import { FaUserPlus } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import useUserStore from '../features/userStore';
import { HeaderSection, ModalUser, TableUsers } from '../components';
import { tableHeaderUser } from '../utils/constants';

function Users() {
  const { role, allUser, setModalUser, getAllUser } = useUserStore((state) => state);

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
      <HeaderSection id={'table-search-user'} placeholder={'Search for NIM'} role={role} setOpenModal={setModalUser} title={'Tambah Kegiatan Baru'} icon={FaUserPlus} />
      {/* HEADER */}

      {/* TABLE MAHASISWA */}
      <TableUsers data={allUser} role={role} tableHeader={tableHeaderUser} />
    </section>
  );
}

export default Users;
