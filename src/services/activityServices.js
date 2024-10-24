import customFetch from '../utils/axios';
import { dateToIso } from '../utils/helper';

// ! Create a new activity
export const createNewActivity = async (data) => {
  const { creatorId, nama, deskripsi, waktumulai, waktuselesai } = data;

  const response = await customFetch.post('/create/kegiatan', {
    creatorId,
    nama,
    deskripsi,
    waktumulai: dateToIso(waktumulai),
    waktuselesai: dateToIso(waktuselesai),
  });

  return response;
};

// ! Fetch all activities
export const getAllActivity = async (id) => {
  const response = await customFetch.post('/find/kegiatan', { id });

  return response;
};
