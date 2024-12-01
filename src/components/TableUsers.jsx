function TableUsers({ data, tableHeader }) {
  if (!data) {
    return <h1 className="not-found">Data mahasiswa tidak ditemukan</h1>;
  }

  return (
    <div className="w-full overflow-x-auto ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-slate-300 ">
          <tr>
            {tableHeader?.map((name, index) => {
              return (
                <th key={index} scope="col" className={`text-center px-2 py-3 whitespace-pre'}`}>
                  {name.type}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((user, index) => {
            return (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="py-4 text-center">{index + 1}</td>

                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                  <img className="w-10 h-10 rounded-full" src={user.avatar || defaultProfile} alt={user.name} />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.name || '-'}</div>
                    <div className="font-normal text-gray-500">{user.email || '-'}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.nim || '-'}</td>
                <td className="px-6 py-4">{user.role || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default TableUsers;
