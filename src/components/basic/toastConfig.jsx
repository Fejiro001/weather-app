import { Slide, toast } from "react-toastify";
import Toast from "./Toast";

const defaultToastOptions = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  closeButton: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
};

const notifySuccess = (message) => {
  toast.success(<Toast>{message}</Toast>, defaultToastOptions);
};

const notifyError = (message) => {
  toast.error(<Toast>{message}</Toast>, defaultToastOptions);
};

export { notifySuccess, notifyError };
