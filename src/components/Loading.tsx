export function Loading({
  showInCenterOfPage = true,
}: {
  showInCenterOfPage?: boolean;
}) {
  if (showInCenterOfPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
