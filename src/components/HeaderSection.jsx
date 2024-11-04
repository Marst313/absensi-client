import { IoIosSearch } from 'react-icons/io';

function HeaderSection({ role, title, id, placeholder, setOpenModal, icon: Icon }) {
  return (
    <div className="header-activity">
      {/* Add Activity and Sort Options */}
      <div className="flex items-center">
        {role !== 'MHS' && (
          <button onClick={() => setOpenModal(true)} className="add-button__small">
            {title}
            {Icon && <Icon className="w-4 h-4 ml-2.5" />}
          </button>
        )}

        {/* SELECT OPTION */}
        <SelectOption />
      </div>

      {/* Search Activity */}
      <div className="search">
        <label htmlFor={id}>Search</label>
        <div className="container-search">
          <IoIosSearch />
        </div>
        <input type="text" id={id} placeholder={placeholder} className="input-search" />
      </div>
    </div>
  );
}

function SelectOption() {
  return (
    <select className="select-filter" onChange={(e) => console.log(e.target.value)}>
      <option value="ascending-name">Name (A-Z)</option>
      <option value="descending-name">Name (Z-A)</option>
      <option value="ascending-number">No (asc)</option>
      <option value="descending-number">No (desc)</option>
    </select>
  );
}

export default HeaderSection;
