import {supabase} from "~/api/supabase";
import {parsePhone} from "~/utils/phone";

export const sendOTP = async (phone: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        phone: parsePhone(phone)
    })

    if (error) {
        throw error;
    }

    return data;
};