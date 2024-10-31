import useAgendaStore from '../features/agendaStore';

function TableAgenda() {
  const { isLoading } = useAgendaStore((state) => state);

  return <div>TableAgenda</div>;
}
export default TableAgenda;
