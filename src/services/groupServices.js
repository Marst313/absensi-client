import customFetch from '../utils/axios';

export const fetchCreateNewGroup = async (data) => {
  return customFetch.post('/add/group', {
    creatorId: data.id,
    nama_grup: data.groupName,
    id_kegiatan: data.idActivity,
  });
};

export const fetchGetAllGroup = async (idActivity) => {
  return customFetch.get(`/find/group/${idActivity}`);
};

export const fetchConnectUserToGroup = async (data) => {
  return customFetch.post('/add/user', {
    id: data.idGroup,
    mahasiswaId: [...data.idUser],
  });
};
