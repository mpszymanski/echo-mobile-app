import { auth } from '~/data';
import { parsePhone } from '~/utils/phone';

export const sendOTP = async (phone: string) => {
  try {
    await auth.signInWithOtp(parsePhone(phone));
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};
