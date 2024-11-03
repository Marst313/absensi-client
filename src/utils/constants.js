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

export const formFieldsActivity = [
  { label: 'Nama Kegiatan', id: 'activityName', placeholder: 'Nama Kegiatan', required: true },
  { label: 'Deskripsi Kegiatan', id: 'activityDescription', type: 'textarea', placeholder: 'Deskripsi Kegiatan', required: true },
  { label: 'Waktu Mulai Kegiatan', id: 'activityWaktuMulai', type: 'date', required: true },
  { label: 'Waktu Selesai Kegiatan', id: 'activityWaktuSelesai', type: 'date', required: true },
];

export const formFieldsAgenda = [
  { label: 'Nama Agenda', id: 'agendaName', placeholder: 'Nama Agenda', required: true },
  { label: 'Deskripsi Agenda', id: 'agendaDescription', type: 'textarea', placeholder: 'Deskripsi Agenda', required: true },
];

export const formFieldsGroup = [{ label: 'Nama Grup', id: 'groupName', placeholder: 'Nama Grup', required: true }];
