import { IoClose, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import useUserStore from '../features/userStore';
import { useState } from 'react';

function ModalUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ nim: '', password: '', role: 'MHS' });

  const { isLoading, modalUser, setModalUser, register, getAllUser } = useUserStore((state) => state);

  // ! Toggle password vissible or not
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // ! For Change NIM PASSWORD and ROLE
  const handleChangeCreateUser = (e) => {
    const { name, value } = e.target;
    setNewUserForm((prev) => ({ ...prev, [name]: value }));
  };

  // ! Close modal menu
  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    await register(newUserForm);
    await getAllUser();
  };

  // ! Close modal menu
  const handleCloseModalUser = () => {
    setModalUser(false);
  };

  return (
    <>
      {/* Main modal */}
      <div className={`${modalUser ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full absolute bg-black/20 backdrop-blur-md`}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow ">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 px-5">Tambah Mahasiswa Baru</h3>
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
              <form className="px-5 mx-auto" onSubmit={handleCreateNewUser}>
                {/* NIM Field */}
                <div className="mb-4">
                  <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-1">
                    NIM / NIP
                  </label>
                  <input
                    type="text"
                    id="nim"
                    name="nim"
                    value={newUserForm.nim}
                    onChange={handleChangeCreateUser}
                    placeholder="21.11.4110"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                    required
                  />
                </div>

                {/* PASSWORD FIELD */}
                <div className="mb-5 relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={newUserForm.password}
                    onChange={handleChangeCreateUser}
                    placeholder="********"
                    className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                    required
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-3 top-5 flex items-center">
                    {showPassword ? <IoEyeOutline className="w-5 h-5 text-slate-600 hover:text-slate-900" /> : <IoEyeOffOutline className="w-5 h-5 text-slate-600 hover:text-slate-900" />}
                  </button>
                </div>

                {/* ROLE FIELD */}
                <div className="mb-5 relative">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select name="role" id="role" className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50  outline-none transition bg-white" onChange={handleChangeCreateUser}>
                    <option value="MHS">Mahasiswa</option>
                    <option value="DOSEN">Dosen</option>
                  </select>
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
    </>
  );
}
export default ModalUser;
