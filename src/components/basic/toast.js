import { toast } from "sonner";

// Key default options for all toasts
const defaultOptions = {
  duration: 3000,
  position: "bottom-right",
};

export const notifySuccess = (message, title = "Success") => {
  toast.success(message, {
    ...defaultOptions,
    title: title,
  });
};

export const notifyError = (message, title = "Error") => {
  toast.error(message, {
    ...defaultOptions,
    title: title,
    duration: 4000, 
  });
};

export const notifyInfo = (message, title = "Information") => {
  toast.info(message, {
    ...defaultOptions,
    title: title,
  });
};

export const notifyWarning = (message, title = "Warning") => {
  toast.warning(message, {
    ...defaultOptions,
    title: title,
  });
};
