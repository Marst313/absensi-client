import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

import useGroupStore from '../features/groupStore';
import { FooterModal, HeaderModal } from './';
import { getAllUser } from '../services/userServices';

function ModalUsersGroup() {
  const { modalGroupUsers, isLoading, listMahasiswaCanAdd, setModalGroupUsers, getAllGroup, connectUserToGroup, setListMahasiswaCanAdd } = useGroupStore((state) => state);
  const { idActivity, idGroup } = useParams();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');

  //! Update filtered users based on search input
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (search.trim() === '') {
        setFilteredUsers(listMahasiswaCanAdd);
      } else {
        const searchResult = listMahasiswaCanAdd.filter((user) => user.nim.toLowerCase().includes(search.toLowerCase()));
        setFilteredUsers(searchResult);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [search, listMahasiswaCanAdd]);

  useEffect(() => {
    setFilteredUsers(listMahasiswaCanAdd);
  }, []);

  //! Handle form submission
  const handleAddUserGroup = async (e) => {
    e.preventDefault();

    await connectUserToGroup({ idGroup, idUser: selectedUsers });

    await getAllGroup(idActivity);

    const { data } = await getAllUser(idActivity, idGroup);
    setListMahasiswaCanAdd(data);

    setSelectedUsers([]);
  };

  //! Handle "Select All" checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  //! Handle individual checkbox selection
  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers((prev) => prev.filter((id) => id !== userId));
    } else {
      setSelectedUsers((prev) => [...prev, userId]);
    }
  };

  //! Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={`${modalGroupUsers ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTENT */}
        <div className="modal-new__container">
          {/* MODAL HEADER */}
          <HeaderModal setOpenModal={setModalGroupUsers} title={'Tambahkan Mahasiswa Ke Grup'} isLoading={isLoading} />

          {/* MODAL BODY */}
          <BodyModal
            allUser={filteredUsers} // Use filteredUsers for display
            handleAddUserGroup={handleAddUserGroup}
            isLoading={isLoading}
            setModalGroupUsers={setModalGroupUsers}
            handleSearch={handleSearch}
            handleSelectAll={handleSelectAll}
            selectAll={selectAll}
            selectedUsers={selectedUsers}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}

function BodyModal({ handleAddUserGroup, allUser, isLoading, setModalGroupUsers, handleSearch, handleSelectAll, selectAll, selectedUsers, handleCheckboxChange }) {
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

      <form id="form-addUser-grup" className="relative overflow-x-auto sm:rounded-lg pb-5" onSubmit={handleAddUserGroup}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md h-fit max-h-80 overflow-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                NIM
              </th>
              <th scope="col" className="px-6 py-3">
                NAMA
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIl
              </th>
            </tr>
          </thead>
          <tbody>
            {allUser.length !== 0 ? (
              allUser?.map((user, index) => {
                return (
                  <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          onChange={() => handleCheckboxChange(user.id)}
                          checked={selectedUsers.includes(user.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="checkbox-table-search-1" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.nim}
                    </th>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Tidak ada user yang bisa dimasukkan ke dalam grup.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* MODAL FOOTER */}
        <FooterModal isLoading={isLoading} setOpenModal={setModalGroupUsers} />
      </form>
    </div>
  );
}

export default ModalUsersGroup;
