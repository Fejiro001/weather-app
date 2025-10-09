import { useRegisterSW } from "virtual:pwa-register/react";

const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const handleRefresh = async () => {
    await updateServiceWorker(true);
  };

  if (!needRefresh) return null;

  return (
    <div
      className="fixed z-999 top-4 right-4 bg-white py-2 px-4 rounded shadow-lg flex flex-col items-center gap-3 border border-gray-100 max-w-xs"
      aria-live="polite"
    >
      <p>A new app update is available!</p>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium 
                   py-2 rounded-lg text-sm transition-colors duration-200 
                   shadow-md"
        onClick={handleRefresh}
      >
        Reload Now
      </button>

      <button
        className="w-full text-gray-500 hover:text-gray-700 text-xs mt-1"
        onClick={() => setNeedRefresh(false)}
      >
        Later
      </button>
    </div>
  );
};

export default UpdatePrompt;
