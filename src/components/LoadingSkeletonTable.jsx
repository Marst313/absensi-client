function LoadingSkeletonTable() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoadingSkeletonTable;
