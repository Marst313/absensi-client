function LoadingSkeletonTable() {
  return (
    <div class="w-full max-w-4xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <div class="animate-pulse">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div class="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div class="w-1/4 h-4 bg-gray-300 rounded"></div>
          <div class="w-1/4 h-4 bg-gray-300 rounded"></div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
            <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoadingSkeletonTable;
