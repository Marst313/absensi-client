import customFetch from '../utils/axios';

// ! Create a new agenda
export const createNewAgenda = async (data) => {
  const response = await customFetch.post('/create/agenda', {
    id: data.id,
    name: data.agendaName,
    grupId: data.grupId,
    deskripsi: data.agendaDescription,
  });

  return response;
};

// ! Get all agenda
export const getAllAgenda = async (data) => {
  const { groupId, userId } = data;

  const response = await customFetch.post('/find/agenda', { groupId, creatorId: userId });

  return response;
};

// ! Get all agenda
export const getSingleAgenda = async (data) => {
  const { id, idUser } = data;

  const response = await customFetch.post('/detail/form', { id, idUser });

  return response;
};
