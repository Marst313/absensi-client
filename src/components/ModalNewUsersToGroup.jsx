import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import useUserStore from '../features/userStore';
import useGroupStore from '../features/groupStore';
import { HeaderModal } from './';

function ModalUsersGroup() {
  const [newUsers, setNewUsers] = useState({ listUsers: '' });
  const { modalGroupUsers, isLoading, setModalGroupUsers, getAllGroup, connectUserToGroup } = useGroupStore((state) => state);

  const { allUser } = useUserStore((state) => state);

  const { idActivity, idGroup } = useParams();

  // ! CLOSE MODAL GROUP
  const handleCloseNewModalGroup = () => {
    setModalGroupUsers(false);
  };

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

  return (
    <div className={`${modalGroupUsers ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* Modal content */}
        <div className="modal-new__container">
          {/* Modal header */}
          <HeaderModal setOpenModal={setModalGroupUsers} title={'Tambahkan Mahasiswa Ke Grup'} isLoading={isLoading} />

          {/* Modal body */}
          <BodyModal allUser={allUser} handleAddUserGroup={handleAddUserGroup} handleChangeListUsers={handleChangeListUsers} handleCloseNewModalGroup={handleCloseNewModalGroup} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

function BodyModal({ handleAddUserGroup, handleChangeListUsers, allUser, handleCloseNewModalGroup, isLoading }) {
  return (
    <div className="modal-new__body">
      {/* SEARCH Field */}
      <form>
        <div className="search">
          <label>Search</label>
          <div className="container-search">
            <IoSearchOutline />
          </div>
          <input type="search" className="input-search" placeholder="Search Mahasiswa" required />
        </div>
      </form>

      <form onSubmit={handleAddUserGroup}>
        {/* NAME Field */}
        <div className="container-input">
          <label>List Mahasiswa</label>
          <select name="listUsers" onChange={handleChangeListUsers}>
            <option value="">Pilih Mahasiswa</option>
            {allUser?.map((user) => {
              if (user.name === '' || user.name === null) return;

              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Modal footer */}
        <div className="modal-new__footer">
          <button type="submit" disabled={isLoading} className="submit-button__medium">
            {isLoading ? 'Loading...' : 'Tambah'}
          </button>
          <button type="button" onClick={handleCloseNewModalGroup} className="cancel-button__medium" disabled={isLoading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalUsersGroup;
