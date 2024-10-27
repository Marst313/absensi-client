import { RiDashboardFill, RiUser3Fill, RiBarChart2Fill } from 'react-icons/ri';

export const menuItemsAdmin = [
  { name: 'Dashboard', icon: RiDashboardFill, to: '/' },
  { name: 'Kegiatan', icon: RiBarChart2Fill, to: '/kegiatan' },
  { name: 'Mahasiswa', icon: RiUser3Fill, to: '/mahasiswa' },
];

export const menuItemsUser = [
  { name: 'Dashboard', icon: RiDashboardFill, to: '/' },
  { name: 'Group', icon: RiBarChart2Fill, to: '/grup' },
];

export const tableHeaderUser = [
  {
    id: 1,
    type: 'Checkbox',
  },
  {
    id: 2,
    type: 'No',
  },
  {
    id: 3,
    type: 'Nama',
  },
  {
    id: 4,
    type: 'NIM / NIP',
  },
  {
    id: 5,
    type: 'Role',
  },
  {
    id: 6,
    type: 'Aksi',
  },
];

export const tableHeaderGroupUser = [
  {
    id: 1,
    type: 'Checkbox',
  },
  {
    id: 2,
    type: 'No',
  },
  {
    id: 3,
    type: 'Nama',
  },
  {
    id: 4,
    type: 'NIM / NIP',
  },
  {
    id: 5,
    type: 'Aksi',
  },
];
