function LoadingSkeletonTable() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3 h-8 bg-gray-300 rounded"></div>
          <div className="w-1/5 h-8 bg-gray-300 rounded"></div>
        </div>

        {/* Group Details Skeleton */}
        <div className="mb-4 p-4 bg-gray-100 shadow rounded-md">
          <div className="w-1/2 h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        </div>

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
