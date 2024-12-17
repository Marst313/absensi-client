import { tableHeaderGroupUser } from '../../../utils/constants';
import defaultProfile from '../../../assets/images/defaultProfile.jpg';
import useGroupStore from '../../../features/groupStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TableUserGroup() {
  const { singleGroup, allGroup, setSingleGroup } = useGroupStore((state) => state);

  const { idGroup } = useParams();

  // ! DELETE BUTTON USER
  const handleDeleteUser = (id) => {
    console.log(id);
  };

  useEffect(() => {
    setSingleGroup(idGroup, allGroup);
  }, [allGroup]);

  // ! IF THERE IS NO MAHASISWA RETURN THIS
  if (singleGroup?.mahasiswa?.length === 0) {
    return <h1 className="text-lg text-red-500">Belum Ada Mahasiswa Yang Mengikuti Grup Ini.</h1>;
  }

  return (
    <div className="w-full overflow-x-auto ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-slate-300 ">
          <tr>
            {tableHeaderGroupUser.map((name, index) => {
              return (
                <th key={index} scope="col" className={`text-center px-2 py-3`}>
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
