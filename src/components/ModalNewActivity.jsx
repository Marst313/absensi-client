import { IoClose, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useState } from 'react';
import useActivityStore from '../features/activityStore';
import useUserStore from '../features/userStore';

function ModalActivity() {
  const [newActivityForm, setNewActivityForm] = useState({ nama: '', deskripsi: '', waktumulai: '', waktuselesai: '' });

  const { modalActivity, isLoading, setModalActivity, createNewActivity, getAllActivity } = useActivityStore((state) => state);
  const { id } = useUserStore((state) => state);

  // ! HANDLE CHANGE NIM PASSWORD and ROLE
  const handleChangeCreateUser = (e) => {
    const { name, value } = e.target;
    setNewActivityForm((prev) => ({ ...prev, [name]: value }));
  };

  // ! CREATE NEW ACTIVITY
  const handleCreateNewActivity = async (e) => {
    e.preventDefault();

    await createNewActivity({ ...newActivityForm, creatorId: id });
    await getAllActivity(id);

    setNewActivityForm({ nama: '', deskripsi: '', waktumulai: '', waktuselesai: '' });
  };

  // ! Close modal menu
  const handleCloseModalUser = () => {
    setModalActivity(false);
  };

  return (
    <div className={`${modalActivity ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full absolute bg-black/20 backdrop-blur-md`}>
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 px-5">Tambah Kegiatan Baru</h3>
            <button
              type="button"
              onClick={handleCloseModalUser}
              disabled={isLoading}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <IoClose className="w-10 h-10" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">
            <form className="px-5 mx-auto" onSubmit={handleCreateNewActivity}>
              {/* NAME Field */}
              <div className="mb-4">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Kegiatan
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={newActivityForm.nama}
                  onChange={handleChangeCreateUser}
                  placeholder="Nama Kegiatan"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* DESKRIPSI FIELD */}
              <div>
                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi Kegiatan
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={newActivityForm.deskripsi}
                  onChange={handleChangeCreateUser}
                  placeholder="Deskripsi Kegiatan"
                  className="w-full resize-none px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* WAKTU MULAI FIELD */}
              <div className="mb-4">
                <label htmlFor="waktumulai" className="block text-sm font-medium text-gray-700 mb-1">
                  Waktu Mulai Kegiatan
                </label>
                <input
                  id="waktumulai"
                  name="waktumulai"
                  type="date"
                  value={newActivityForm.waktumulai}
                  onChange={handleChangeCreateUser}
                  placeholder="Kegiatan belajar teknologi baru"
                  className="w-full resize-none px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* WAKTU SELESAI FIELD */}
              <div className="mb-4">
                <label htmlFor="waktuselesai" className="block text-sm font-medium text-gray-700 mb-1">
                  Waktu Selesai Kegiatan
                </label>
                <input
                  id="waktuselesai"
                  name="waktuselesai"
                  type="date"
                  value={newActivityForm.waktuselesai}
                  onChange={handleChangeCreateUser}
                  placeholder="Kegiatan belajar teknologi baru"
                  className="w-full resize-none px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* Modal footer */}
              <div className="flex items-center pt-4 border-t border-gray-200 rounded-b ">
                <button type="submit" disabled={isLoading} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center ">
                  {isLoading ? 'Loading...' : 'Tambah'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModalUser}
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
export default ModalActivity;
