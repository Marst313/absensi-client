import { MdLibraryBooks } from 'react-icons/md';

function TableAgendaAdmin({ data }) {
  if (!data) {
    return <h1 className="not-found">Data agenda tidak ditemukan</h1>;
  }

  if (data.length === 0) {
    return <h1 className="not-found">Silahkan buat agenda</h1>;
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
      {data?.map((agenda) => {
        return (
          <li key={agenda?.id} className="flex flex-col justify-between w-full min-h-[150px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow relative">
            {/* Title */}
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 capitalize mb-3 flex items-center gap-3">
              <MdLibraryBooks />
              {agenda?.nama}
            </h5>

            <p className="mb-3 text-slate-800/70 font-light">
              Deskripsi : <span className="font-semibold text-slate-800"> {agenda?.deskripsi} </span>
            </p>

            {/* Bottom Section */}
            <div className="flex items-center justify-between mt-auto">
              {/* Link */}
              <button className={`open-button__small`}>Status</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
export default TableAgendaAdmin;
