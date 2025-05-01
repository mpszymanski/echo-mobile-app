import Toast from 'react-native-toast-message';

/**
 * Custom hook for displaying toast notifications.
 * This abstraction makes it easy to replace the toast implementation in the future.
 * Uses react-native-toast-message for displaying toast notifications.
 */
export function useToast() {
  /**
   * Display an error toast notification
   * @param title - The error message title
   * @param description - Optional error message description
   */
  const showError = (title: string, description?: string) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: description,
      autoHide: false,
    });
  };

  /**
   * Display a success toast notification
   * @param title - The success message title
   * @param description - Optional success message description
   */
  const showSuccess = (title: string, description?: string) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: description,
    });
  };

  /**
   * Display an info toast notification
   * @param title - The info message title
   * @param description - Optional info message description
   */
  const showInfo = (title: string, description?: string) => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: description,
      autoHide: false,
    });
  };

  return {
    showError,
    showSuccess,
    showInfo,
  };
}
