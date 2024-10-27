import { useState } from 'react';
import useGroupStore from '../features/groupStore';
import { IoClose, IoSearchOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import useUserStore from '../features/userStore';

function ModalUsersGroup() {
  const [newUsers, setNewUsers] = useState({ listUsers: '' });
  const { modalGroupUsers, isLoading, allGroup, setModalGroupUsers, getAllGroup, connectUserToGroup, setSingleGroup } = useGroupStore((state) => state);

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
    setSingleGroup(idGroup, allGroup);

    setNewUsers({ listUsers: '' });
  };

  // ! Handle input change for searching the group
  const handleChangeListUsers = (e) => {
    const { name, value } = e.target;
    setNewUsers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${modalGroupUsers ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full absolute  backdrop-blur-md bg-black/30`}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg  ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 px-5">Tambahkan Mahasiswa Ke Grup</h3>

            {/* BUTTON CLOSE MODAL */}
            <button
              type="button"
              onClick={handleCloseNewModalGroup}
              disabled={isLoading}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <IoClose className="w-10 h-10" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            {/* SEARCH Field */}
            <form className="px-5  mx-auto ">
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IoSearchOutline className="w-4 h-4 text-gray-500" />
                </div>
                <input type="search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-slate-500 outline-none focus:border-slate-500" placeholder="Search Mahasiswa" required />
              </div>
            </form>

            <form className="px-5 mx-auto" onSubmit={handleAddUserGroup}>
              {/* NAME Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">List Mahasiswa</label>
                <select className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition" name="listUsers" onChange={handleChangeListUsers}>
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
              <div className="flex items-center pt-4 border-t border-gray-200 rounded-b ">
                <button type="submit" disabled={isLoading} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center">
                  {isLoading ? 'Loading...' : 'Tambah'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseNewModalGroup}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalUsersGroup;
