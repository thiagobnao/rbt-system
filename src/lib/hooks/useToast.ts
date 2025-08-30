import { toast } from 'sonner';

export const useToast = () => {
  const success = (message: string, options?: { description?: string }) => {
    toast.success(message, {
      description: options?.description,
    });
  };

  const error = (message: string, options?: { description?: string }) => {
    toast.error(message, {
      description: options?.description,
    });
  };

  const info = (message: string, options?: { description?: string }) => {
    toast.info(message, {
      description: options?.description,
    });
  };

  const warning = (message: string, options?: { description?: string }) => {
    toast.warning(message, {
      description: options?.description,
    });
  };

  const loading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    dismiss,
  };
};
