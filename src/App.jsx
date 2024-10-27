import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Activity, Dashboard, Error, GroupsPageUser, HomeLayout, Login, Profile, ProtectedRoutes, SingleActivity, SingleGroupAdmin, SingleGroupUser, Users } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/mahasiswa',
        element: (
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/kegiatan',
        element: (
          <ProtectedRoutes>
            <Activity />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/kegiatan/:id',
        element: (
          <ProtectedRoutes>
            <SingleActivity />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/grup',
        element: <GroupsPageUser />,
      },
      {
        path: '/grup/:idGroup',
        element: <SingleGroupUser />,
      },
      {
        path: 'kegiatan/:idActivity/grup/:idGroup',
        element: (
          <ProtectedRoutes>
            <SingleGroupAdmin />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/profil',
        element: <Profile />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
