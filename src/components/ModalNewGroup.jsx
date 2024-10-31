import { useState, useEffect } from 'react';
import useGroupStore from '../features/groupStore';
import { IoClose } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import useUserStore from '../features/userStore';

function ModalNewGroup() {
  const [newGroup, setNewGroup] = useState({ groupName: '' });
  const { modalGroup, isLoading, setModalGroup, createNewGroup, getAllGroup } = useGroupStore((state) => state);
  const { id } = useUserStore((state) => state);

  const { id: idActivity } = useParams();

  // ! CLOSE MODAL GROUP
  const handleCloseNewModalGroup = () => {
    setModalGroup(false);
  };

  //! Function to handle form submission
  const handleCreateGroup = async (e) => {
    e.preventDefault();

    await createNewGroup({ idActivity, groupName: newGroup.groupName, id });

    // ! GET THE NEWEST GROUP
    await getAllGroup(idActivity);

    setNewGroup({ groupName: '' });
  };

  // ! Handle input change for searching the group
  const handleChangeCreateGroup = (e) => {
    const { name, value } = e.target;
    setNewGroup((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${modalGroup ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full absolute  backdrop-blur-md bg-black/30`}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg  ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 px-5">Masukkan Nama Grup</h3>

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
            <form className="px-5 mx-auto" onSubmit={handleCreateGroup}>
              {/* NAME Field */}
              <div className="mb-4">
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Grup
                </label>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  value={newGroup.groupName}
                  onChange={handleChangeCreateGroup}
                  placeholder="Nama Grup"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
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

export default ModalNewGroup;
