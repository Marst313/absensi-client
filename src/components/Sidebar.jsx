import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import useUserStore from '../features/userStore';
import { menuItemsAdmin, menuItemsUser } from '../utils/constants';

function Sidebar({ openSidebar, setSidebar }) {
  const { avatar, role, id, name, logout } = useUserStore((state) => state);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const filteredMenu = role === 'MHS' ? menuItemsUser : menuItemsAdmin;

  const handleLogout = async () => {
    const response = await logout(id);

    if (response) return navigate('/login');
  };

  //! Close sidebar if click outside sidebar #MobileView Only
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false); // Tutup sidebar
      }
    };

    if (openSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSidebar, setSidebar]);

  return (
    <aside ref={sidebarRef} className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-100 shadow-lg ${openSidebar ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
      <div className="h-full px-3 flex flex-col py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <h1 className="p-2 text-lg font-semibold">Dashboard Absensi</h1>

          {filteredMenu.map(({ name, icon: Icon, to }) => {
            return (
              <li key={name}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `${isActive ? 'border-r-4 border-slate-800 bg-slate-200' : 'hover:bg-slate-200 hover:border-r-4 hover:border-slate-800 text-gray-500 hover:text-gray-900'} flex items-center p-2 group`}
                >
                  <Icon className={` w-5 h-5 transition duration-75`} aria-label={name} />
                  <span className="ms-3">{name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Tombol Log Out di bagian bawah */}
        <div className="mt-auto">
          <NavLink
            to="profil"
            className={({ isActive }) => `${isActive ? 'border-r-4 border-slate-800 bg-slate-200' : 'hover:bg-slate-200 hover:border-r-4 hover:border-slate-800 text-gray-500 hover:text-gray-900'} flex items-center p-2 group`}
          >
            <img className="w-5 h-5 rounded-full transition duration-75 group-hover:bg-black/30" src={avatar} alt="avatar" />

            <span className="ms-3">Profil Saya</span>
          </NavLink>

          <button type="button" onClick={handleLogout} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
            <RiLogoutBoxRFill className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
            <span className="ms-3">Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
