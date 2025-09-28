import { toast } from "sonner";

// Key default options for all toasts
const defaultOptions = {
  duration: 3000,
  position: "top-right",
  closeButton: true,
};

export const notifySuccess = (message, title = "Success") => {
  toast.success(title, {
    description: message,
    ...defaultOptions,
  });
};

export const notifyError = (message, title = "Error") => {
  toast.error(title, {
    description: message,
    ...defaultOptions,
    duration: 4000,
  });
};

export const notifyInfo = (message, title = "Information") => {
  toast.info(title, {
    description: message,
    ...defaultOptions,
  });
};

export const notifyWarning = (message, title = "Warning") => {
  toast.warning(title, {
    description: message,
    ...defaultOptions,
  });
};
