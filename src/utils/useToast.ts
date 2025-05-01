import Toast from 'react-native-toast-message';

/**
 * Type for toast message parameters
 */
type ToastMessageParams = 
  | string 
  | { 
      title: string; 
      description?: string;
    };

/**
 * Custom hook for displaying toast notifications.
 * This abstraction makes it easy to replace the toast implementation in the future.
 * Uses react-native-toast-message for displaying toast notifications.
 */
export function useToast() {
  /**
   * Process message parameter to extract title and description
   * @param message - The message to process (string or object with title and description)
   * @returns Object with text1 (title) and text2 (description)
   */
  const processMessage = (message: ToastMessageParams): { text1: string; text2?: string } => {
    if (typeof message === 'string') {
      // If the message is a string, try to split it into title and description
      // For long messages (>50 chars), use the first sentence as title and the rest as description
      if (message.length > 50 && message.includes('.')) {
        const firstDotIndex = message.indexOf('.');
        return {
          text1: message.substring(0, firstDotIndex + 1).trim(),
          text2: message.substring(firstDotIndex + 1).trim(),
        };
      }
      // For short messages or those without a period, use the whole string as title
      return { text1: message };
    }

    // If the message is an object with title and description, use those values
    return {
      text1: message.title,
      text2: message.description,
    };
  };

  /**
   * Display an error toast notification
   * @param message - The error message to display (string or object with title and description)
   */
  const showError = (message: ToastMessageParams) => {
    const { text1, text2 } = processMessage(message);
    Toast.show({
      type: 'error',
      text1,
      text2,
      autoHide: false,
    });
  };

  /**
   * Display a success toast notification
   * @param message - The success message to display (string or object with title and description)
   */
  const showSuccess = (message: ToastMessageParams) => {
    const { text1, text2 } = processMessage(message);
    Toast.show({
      type: 'success',
      text1,
      text2,
    });
  };

  /**
   * Display an info toast notification
   * @param message - The info message to display (string or object with title and description)
   */
  const showInfo = (message: ToastMessageParams) => {
    const { text1, text2 } = processMessage(message);
    Toast.show({
      type: 'info',
      text1,
      text2,
    });
  };

  return {
    showError,
    showSuccess,
    showInfo,
  };
}
