import {supabase} from "~/api/supabase";
import {parsePhone} from "~/utils/phone";

export const verifyOTP = async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ phone: parsePhone(phone), token, type: 'sms'})

    if (error) {
        throw error;
    }

    return data;
};