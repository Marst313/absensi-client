import { tableHeaderGroupUser } from '../utils/constants';
import defaultProfile from '../assets/images/defaultProfile.jpg';
import useGroupStore from '../features/groupStore';

function TableUserGroup() {
  const { singleGroup } = useGroupStore((state) => state);

  // ! DELETE BUTTON USER
  const handleDeleteUser = (id) => {
    console.log(id);
  };

  if (singleGroup?.mahasiswa?.length === 0) {
    return <h1 className="text-lg text-red-500">Belum Ada Mahasiswa Yang Mengikuti Grup Ini.</h1>;
  }

  return (
    <div className="w-full overflow-x-auto ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-slate-300 ">
          <tr>
            {tableHeaderGroupUser.map((name, index) => {
              if (name.type === 'Checkbox') {
                return (
                  <th scope="col" className="p-4" key={index}>
                    <div className="flex items-center">
                      <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 " />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                );
              }

              return (
                <th key={index} scope="col" className={` ${name.type === 'No' ? 'py-3' : 'px-6 py-3'}`}>
                  {name.type}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {singleGroup?.mahasiswa?.map((user, index) => {
            return (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id={`checkbox-table-search-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                    <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="py-4 text-center">{index + 1}</td>

                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                  <img className="w-10 h-10 rounded-full" src={user.avatar || defaultProfile} alt={user.name} />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.name || '-'}</div>
                    <div className="font-normal text-gray-500">{user.email || '-'}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{user.nim || '-'}</td>

                <td className=" py-4">
                  <button type="button" onClick={() => handleDeleteUser(user.id)} className="font-medium text-red-600 hover:underline ms-5">
                    Hapus Dari Grup
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default TableUserGroup;
