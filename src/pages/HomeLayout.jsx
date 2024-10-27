import { useEffect, useState } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { Outlet, useNavigate } from 'react-router-dom';

import { ModalProfile, Sidebar } from '../components';
import useUserStore from '../features/userStore';
import { IoMdNotifications } from 'react-icons/io';

function HomeLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { token, name, email, modalProfile, isLoading, setModalProfile, validateToken } = useUserStore((store) => store);

  const navigate = useNavigate();

  // ! Set Sidebar in Mobile View
  const setSideBar = (data) => setOpenSidebar(data);

  useEffect(() => {
    // ! Check if token exist and valid
    const checkToken = async () => {
      if (token) {
        const isValid = await validateToken(token);
        if (!isValid) {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
    checkToken();
  }, [token, validateToken, navigate]);

  // ! Initial Render If no name or email
  useEffect(() => {
    if (name === null || !email) {
      setModalProfile(true);
    } else {
      setModalProfile(false);
    }
  }, [name, email]);

  return (
    <div>
      <div className="w-full flex items-center justify-between mt-2 p-2">
        <button
          onClick={() => setSideBar(true)}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-primary hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <span className="sr-only">Open sidebar</span>
          <RiMenu2Line className="w-7 h-7" />
        </button>
        <button className="w-10 h-10">
          <IoMdNotifications className="w-7 h-7 text-primary hover:text-slate-600" />
        </button>
      </div>

      {/* SIDEBAR */}
      <Sidebar openSidebar={openSidebar} setSidebar={setSideBar} />

      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>

      {modalProfile && !isLoading && <ModalProfile />}
    </div>
  );
}
export default HomeLayout;

/* 
Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quaerat nam corporis placeat quia, ipsum magnam harum voluptas sequi rerum iste doloremque iure reiciendis voluptates quam repellendus exercitationem expedita nihil omnis mollitia eaque incidunt dolorum? Dolore est vel ullam exercitationem totam aspernatur in explicabo, magnam consequuntur quam consequatur cupiditate ea placeat veritatis. Eos ex, consequatur voluptatem nulla architecto sint voluptas qui saepe. Sunt hic culpa labore voluptas recusandae. Perferendis, quis est ratione aliquid quam nulla vero. Distinctio tempore ex autem qui vero sapiente odio soluta voluptas consequatur a placeat eaque porro incidunt ipsum facilis aliquid, pariatur corrupti, modi dignissimos. Ipsum accusamus est, deleniti unde, ullam pariatur tempora fugiat aut culpa, eaque et maiores nulla? Ab unde possimus hic fugiat, voluptate accusamus suscipit sapiente, sequi itaque esse earum laudantium repellendus mollitia ex eveniet quod corrupti laborum similique rerum aliquam praesentium odio consectetur! Pariatur laborum fuga alias voluptates quisquam. Quidem aliquid laboriosam pariatur iusto nisi, repellendus aliquam dicta temporibus voluptas dolor est inventore illo labore suscipit minima deserunt beatae! Doloribus facere suscipit consectetur illo ea. Ducimus quod nesciunt quos eius! Totam impedit nostrum amet! Eos, ipsam quos? Quas, corrupti odio. Itaque sit ipsa optio pariatur voluptate quasi reprehenderit laboriosam eaque minus aut porro nesciunt iusto, quaerat suscipit praesentium unde quisquam. Fugit, voluptatem velit repudiandae cupiditate accusamus deleniti ex, molestias voluptas, necessitatibus rerum sit quod unde! Recusandae facilis ipsa rem iure minus, distinctio nihil quibusdam illo mollitia. Omnis exercitationem sunt veritatis necessitatibus velit esse in impedit accusantium hic ipsum quasi architecto alias laborum consequatur voluptatum, officiis quo eligendi fugiat suscipit cupiditate quas itaque? Minus doloremque suscipit recusandae consequuntur deleniti corrupti optio tenetur magni? Quaerat alias vitae totam ea minima doloremque asperiores, facere, neque quisquam expedita sequi omnis dolores ad natus vel doloribus libero veniam voluptatum ducimus. Aspernatur, quis nobis modi maxime magnam recusandae!
 */
