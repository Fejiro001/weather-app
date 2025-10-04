import { useRegisterSW } from "virtual:pwa-register/react";

const UpdatePrompt = () => {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  const handleRefresh = () => {
    updateServiceWorker(true);
  };

  if (!needRefresh) return null;
  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded shadow-lg">
      <p>A new version is available!</p>
      <button onClick={handleRefresh}>Refresh to Update</button>
    </div>
  );
};

export default UpdatePrompt;
