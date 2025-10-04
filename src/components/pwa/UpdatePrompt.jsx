import { useRegisterSW } from "virtual:pwa-register/react";

const UpdatePrompt = () => {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  const handleRefresh = () => {
    updateServiceWorker(true);
  };

  if (!needRefresh) return null;
  return (
    <div className="fixed z-999 top-4 right-4 bg-white py-2 px-4 rounded shadow-lg flex flex-col items-center gap-2">
      <p>A new version is available!</p>
      <button className="bg-(--blue-700) text-white p-2 rounded text-sm" onClick={handleRefresh}>Update</button>
    </div>
  );
};

export default UpdatePrompt;
