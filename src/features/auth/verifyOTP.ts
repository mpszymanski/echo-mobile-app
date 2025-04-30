import { auth } from "~/data";
import { parsePhone } from "~/utils/phone";

export const verifyOTP = async (phone: string, token: string) => {
    try {
        return await auth.verifyOtp(parsePhone(phone), token);
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};
