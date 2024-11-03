import customFetch from '../utils/axios';
import { dateToIso } from '../utils/helper';

// ! Create a new activity
export const createNewActivity = async (data) => {
  const response = await customFetch.post('/create/kegiatan', {
    creatorId: data.creatorId,
    nama: data.activityName,
    deskripsi: data.activityDescription,
    waktumulai: dateToIso(data.activityWaktuMulai),
    waktuselesai: dateToIso(data.activityWaktuSelesai),
  });

  return response;
};

// ! Fetch all activities
export const getAllActivity = async (id) => {
  const response = await customFetch.post('/find/kegiatan', { id });

  return response;
};
