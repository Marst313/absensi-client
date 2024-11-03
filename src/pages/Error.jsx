import { useNavigate } from 'react-router-dom';
import { IoWarningOutline } from 'react-icons/io5';

function Error() {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center bg-white shadow-md p-8 rounded-lg max-w-md">
        <IoWarningOutline className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something Went Wrong</h1>
        <p className="text-gray-600 mb-6">We couldn't find the page you're looking for, or an unexpected error has occurred.</p>
        <button onClick={handleBackToDashboard} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">
          Back to Dashboard
        </button>
      </div>
    </section>
  );
}

export default Error;
