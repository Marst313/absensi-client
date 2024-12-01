import { useEffect, useState } from 'react';
import useUserStore from '../features/userStore';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FooterModal, HeaderModal } from './';

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
    <div className={`${modalProfile ? 'flex' : 'hidden'} modal-new`}>
      <div>
        {/* MODAL CONTAINER */}
        <div className="modal-new__container">
          <div>
            {/* MODAL HEADER */}
            <HeaderModal isLoading={isLoading} name={name} setOpenModal={setModalProfile} title={'Ubah Profil'} />

            {/* MODAL BODY */}
            <BodyModal
              handleChangeUpdateProfile={handleChangeUpdateProfile}
              setModalProfile={setModalProfile}
              handleFileChange={handleFileChange}
              handleUpdateImageProfile={handleUpdateImageProfile}
              handleUpdateProfile={handleUpdateProfile}
              isLoading={isLoading}
              previewUrl={previewUrl}
              profileForm={profileForm}
              name={name}
              role={role}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BodyModal({ handleFileChange, handleUpdateImageProfile, handleUpdateProfile, handleChangeUpdateProfile, setModalProfile, profileForm, previewUrl, isLoading, name, role }) {
  return (
    <div className="modal-new__body">
      {/* IMAGE UPLOAD */}
      <ImageFormModal handleFileChange={handleFileChange} handleUpdateImageProfile={handleUpdateImageProfile} isLoading={isLoading} previewUrl={previewUrl} />
      {/* IMAGE UPLOAD */}

      {/* FORM EDIT USER */}
      <form onSubmit={handleUpdateProfile}>
        <div className="container-input">
          <label htmlFor="name">Nama</label>
          <input type="text" id="name" name="name" value={profileForm.name || ''} onChange={handleChangeUpdateProfile} placeholder="Masukkan nama" required />
        </div>

        {/* EMAIL FIELD */}
        <div className="container-input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={profileForm.email || ''} onChange={handleChangeUpdateProfile} placeholder="Masukkan email" required />
        </div>

        {/* NIM FIELD */}
        <div className="container-input">
          <label htmlFor="nim">NIM</label>
          <input type="nim" id="nim" name="nim" value={profileForm.nim || ''} onChange={handleChangeUpdateProfile} placeholder="Masukkan nim" required disabled={role === 'MHS'} />
        </div>

        {/* MODAL FOOTER */}
        <FooterModal isLoading={isLoading} setOpenModal={setModalProfile} title={'Ubah'} name={name} />
      </form>
    </div>
  );
}

function ImageFormModal({ handleUpdateImageProfile, previewUrl, handleFileChange, isLoading }) {
  return (
    <form className="flex flex-col md:flex-row items-start lg:items-center gap-5 pb-5" onSubmit={handleUpdateImageProfile}>
      <img className="w-24 h-24 rounded-full shadow-lg" src={previewUrl} alt="Profile" />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" className="submit-button__medium" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Upload'}
      </button>
    </form>
  );
}

export default ModalProfile;
