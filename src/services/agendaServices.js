import customFetch from '../utils/axios';

// ! Create a new agenda
export const createNewAgenda = async (data) => {
  const { id, name, grupId, deskripsi } = data;

  const response = await customFetch.post('/create/agenda', {
    id,
    name,
    grupId,
    deskripsi,
  });

  return response;
};

// ! Get all agenda
export const getAllAgenda = async (data) => {
  const { groupId, userId } = data;

  const response = await customFetch.post('/find/agenda', { groupId, creatorId: userId });

  return response;
};
