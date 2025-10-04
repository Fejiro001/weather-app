// import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const UpdatePrompt = () => {
  const { needRefresh, updateServiceWorker } = useRegisterSW();
  // const [showPrompt, setShowPrompt] = useState(needRefresh); 

  const handleRefresh = async () => {
    await updateServiceWorker(true);
    
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    
    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href; 
  };

  // const handleDismiss = () => {
  //   setShowPrompt(false); 
  // };

  // if (!showPrompt) return null;
  if (!needRefresh) return null;

  return (
    <div className="fixed z-999 top-4 right-4 bg-white py-2 px-4 rounded shadow-lg flex flex-col items-center gap-2">
      <p>A new version is available!</p>
      <button className="bg-(--blue-700) text-white p-2 rounded text-sm" onClick={handleRefresh}>Update</button>
      {/* <button className="text-(--blue-700) text-sm" onClick={handleDismiss}>Dismiss</button> */}
    </div>
  );
};

export default UpdatePrompt;
