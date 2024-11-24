import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import useUserStore from '../features/userStore';
import useGroupStore from '../features/groupStore';
import { FooterModal, HeaderModal } from './';

function ModalUsersGroup() {
  const [newUsers, setNewUsers] = useState({ listUsers: '' });
  const { modalGroupUsers, isLoading, setModalGroupUsers, getAllGroup, connectUserToGroup } = useGroupStore((state) => state);

  const { allUser } = useUserStore((state) => state);

  const { idActivity, idGroup } = useParams();

  const [dataUser, setDataUser] = useState([]);
  const [search, setSearch] = useState('');

  //! Function to handle form submission
  const handleAddUserGroup = async (e) => {
    e.preventDefault();

    await connectUserToGroup({ idGroup, idUser: newUsers.listUsers });
    await getAllGroup(idActivity);

    setNewUsers({ listUsers: '' });
  };

  // ! Handle input change for searching the group
  const handleChangeListUsers = (e) => {
    const { name, value } = e.target;
    setNewUsers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (search.trim() === '') {
        setDataUser(allUser);
      } else {
        const searchUser = allUser.filter((user) => user.nim.toLowerCase().includes(search.toLowerCase()));
        setDataUser(searchUser);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [search, allUser]);

  useEffect(() => {
    setDataUser(dataUser);
  }, [allUser, dataUser]);

  return (
    <div className={`${modalGroupUsers ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal setOpenModal={setModalGroupUsers} title={'Tambahkan Mahasiswa Ke Grup'} isLoading={isLoading} />

          {/* MODAL BODY */}
          <BodyModal allUser={dataUser} handleAddUserGroup={handleAddUserGroup} handleChangeListUsers={handleChangeListUsers} isLoading={isLoading} setModalGroupUsers={setModalGroupUsers} handleSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

function BodyModal({ handleAddUserGroup, handleChangeListUsers, allUser, isLoading, setModalGroupUsers, handleSearch }) {
  return (
    <div className="modal-new__body">
      {/* SEARCH Field */}
      <form>
        <div className="search">
          <label>Search</label>
          <div className="container-search">
            <IoSearchOutline />
          </div>
          <input type="search" className="input-search" placeholder="Search NIM" required onChange={handleSearch} />
        </div>
      </form>

      <form onSubmit={handleAddUserGroup}>
        {/* NAME Field */}
        <div className="container-input">
          <label>List Mahasiswa</label>
          <select name="listUsers" onChange={handleChangeListUsers}>
            <option value="">Pilih Mahasiswa</option>
            {allUser?.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.nim}
                </option>
              );
            })}
          </select>
        </div>

        {/* MODAL FOOTER */}
        <FooterModal isLoading={isLoading} setOpenModal={setModalGroupUsers} />
      </form>
    </div>
  );
}

export default ModalUsersGroup;
