import { RiDashboardFill, RiUser3Fill, RiBarChart2Fill } from 'react-icons/ri';

export const menuItemsAdmin = [
  { name: 'Kegiatan', icon: RiBarChart2Fill, to: '/' },
  { name: 'Mahasiswa', icon: RiUser3Fill, to: '/mahasiswa' },
];

export const menuItemsUser = [{ name: 'Group', icon: RiBarChart2Fill, to: '/' }];

export const tableHeaderUser = [
  {
    id: 1,
    type: 'No',
  },
  {
    id: 2,
    type: 'Nama',
  },
  {
    id: 3,
    type: 'NIM / NIP',
  },
  {
    id: 4,
    type: 'Role',
  },
];

export const tableHeaderGroupUser = [
  {
    id: 1,
    type: 'No',
  },
  {
    id: 2,
    type: 'Nama',
  },
  {
    id: 3,
    type: 'NIM / NIP',
  },
  {
    id: 4,
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
