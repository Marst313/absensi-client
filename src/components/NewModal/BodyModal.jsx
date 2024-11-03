import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import FooterModal from './FooterModal';

function BodyModalForm({ formFields, handleSubmit, handleChange, formData, isLoading, setOpenModal, title }) {
  return (
    <div className="modal-new__body">
      <form onSubmit={handleSubmit}>
        {formFields.map(({ label, id, type = 'text', placeholder, required, isPassword, toggleVisibilityHandler, options }) => (
          <div className="container-input" key={id}>
            <label htmlFor={id}>{label}</label>
            {type === 'select' ? (
              <select id={id} name={id} value={formData[id]} onChange={handleChange} required={required}>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : isPassword ? (
              <div className="relative">
                <input type={type} id={id} name={id} value={formData[id]} onChange={handleChange} placeholder={placeholder} required={required} />
                <button type="button" onClick={toggleVisibilityHandler} className="eye-button">
                  {type === 'text' ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
            ) : type === 'textarea' ? (
              <textarea id={id} name={id} value={formData[id]} onChange={handleChange} placeholder={placeholder} required={required} />
            ) : (
              <input type={type} id={id} name={id} value={formData[id]} onChange={handleChange} placeholder={placeholder} required={required} />
            )}
          </div>
        ))}
        <FooterModal isLoading={isLoading} setOpenModal={setOpenModal} title={title} />
      </form>
    </div>
  );
}

function BodyModalProfile({ handleFileChange, handleUpdateImageProfile, handleUpdateProfile, handleChangeUpdateProfile, setModalProfile, profileForm, previewUrl, isLoading, name, role }) {
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

export default BodyModalForm;
