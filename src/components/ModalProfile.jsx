import { useEffect, useState } from 'react';
import useUserStore from '../features/userStore';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function ModalProfile() {
  const { name, email, avatar, nim, isLoading, modalProfile, role, id, setModalProfile, updateUserProfile, updateUserAvatar } = useUserStore((state) => state);
  const [profileForm, setProfileForm] = useState({ avatarProfile: '', name: '', email: '', nim: '', role: 'MHS' });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const navigate = useNavigate();

  const handleCloseModalProfile = () => {
    setModalProfile(false);
  };

  // ! Handle Update Profile User
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const { email, name } = profileForm;

    updateUserProfile(id, { name, email });
    navigate('/profil');
  };

  // ! Handle Update Avatar User
  const handleUpdateImageProfile = async (e) => {
    e.preventDefault();

    if (!uploadedFile) return;

    await updateUserAvatar(id, uploadedFile);
    navigate('/profil');
  };

  //   ! Change local state profile
  const handleChangeUpdateProfile = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  //   ! Preview image when change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);

      //! USE FILE READER TO CREATE FILE
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setProfileForm({ name, email, avatarProfile: avatar, nim });
    setPreviewUrl(avatar);
  }, [name, email, avatar, nim]);

  return (
    <div className={`overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen absolute bg-black/20 backdrop-blur-md`} style={{ display: modalProfile ? 'flex' : 'hidden' }}>
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Ubah Profil</h3>
            <button
              type="button"
              onClick={handleCloseModalProfile}
              disabled={isLoading || name === null}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center   disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400"
            >
              <IoClose className="w-6 h-6" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            {/* Upload Gambar */}
            <form className="flex flex-col md:flex-row items-center gap-5 pb-5" onSubmit={handleUpdateImageProfile}>
              <img className="w-24 h-24 rounded-full shadow-lg" src={previewUrl} alt="Profile" />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button type="submit" className="bg-green-700 px-5 py-2.5 text-white rounded-lg hover:bg-green-800 w-full" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Upload'}
              </button>
            </form>

            {/* Form Edit User */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileForm.name || ''}
                  onChange={handleChangeUpdateProfile}
                  placeholder="Masukkan nama"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* EMAIL FIELD */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email || ''}
                  onChange={handleChangeUpdateProfile}
                  placeholder="Masukkan email"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                />
              </div>

              {/* NIM FIELD */}
              <div className="mb-4">
                <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-1">
                  nim
                </label>
                <input
                  type="nim"
                  id="nim"
                  name="nim"
                  value={profileForm.nim || ''}
                  onChange={handleChangeUpdateProfile}
                  placeholder="Masukkan nim"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition"
                  required
                  disabled={role === 'MHS'}
                />
              </div>

              <div className="flex items-center pt-4 border-t border-gray-200">
                <button type="submit" disabled={isLoading} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5">
                  {isLoading ? 'Loading...' : 'Ubah'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModalProfile}
                  className={`py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 
    bg-white rounded-lg border hover:bg-gray-100 hover:text-red-700 focus:ring-4 focus:ring-gray-100disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400`}
                  disabled={isLoading || name === null}
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

export default ModalProfile;
