import { IoClose } from 'react-icons/io5';
import useAgendaStore from '../features/agendaStore';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from '../features/userStore';

function ModalNewAgenda() {
  const [newAgendaForm, setNewAgendaForm] = useState({ name: '', deskripsi: '' });
  const { modalAgenda, isLoading, setModalAgenda, createNewAgenda, getAllAgenda } = useAgendaStore((state) => state);
  const { id } = useUserStore((state) => state);
  const { idGroup: groupId } = useParams();

  const handleCreateNewAgenda = async (e) => {
    e.preventDefault();

    await createNewAgenda({ ...newAgendaForm, grupId: groupId, id });
    // await getAllAgenda({ groupId, userId: id });
  };

  const handleChangeCreateAgenda = (e) => {
    const { name, value } = e.target;
    setNewAgendaForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModalAgenda = () => {
    setModalAgenda(false);
  };

  return (
    <div className={`${modalAgenda ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full absolute bg-black/20 backdrop-blur-md`}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 px-5">Tambah Agenda Baru</h3>
            <button
              type="button"
              onClick={handleCloseModalAgenda}
              disabled={isLoading}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <IoClose className="w-10 h-10" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <form className="px-5 mx-auto" onSubmit={handleCreateNewAgenda}>
              {/* NAME Field */}
              <div className="mb-4">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Agenda
                </label>
                <input
                  type="text"
                  id="nama"
                  name="name"
                  value={newAgendaForm.name}
                  onChange={handleChangeCreateAgenda}
                  placeholder="Nama Agenda"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* DESKRIPSI FIELD */}
              <div>
                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi Agenda
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={newAgendaForm.deskripsi}
                  onChange={handleChangeCreateAgenda}
                  placeholder="Deskripsi Agenda"
                  className="w-full resize-none px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* Modal footer */}
              <div className="flex items-center pt-4 rounded-b ">
                <button type="submit" disabled={isLoading} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center ">
                  {isLoading ? 'Loading...' : 'Tambah'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModalAgenda}
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
export default ModalNewAgenda;
