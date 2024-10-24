export const dateToIso = (date) => {
  const newDate = new Date(date);

  return newDate.toISOString();
};

export const isoToDate = (date) => {
  const dateString = date;
  const newDate = new Date(dateString);

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const day = days[newDate.getUTCDay()];
  const dayOfMonth = newDate.getUTCDate();
  const month = months[newDate.getUTCMonth()];
  const year = newDate.getUTCFullYear();

  const formattedDate = `${day} - ${dayOfMonth} ${month} ${year}`;

  return formattedDate;
};
