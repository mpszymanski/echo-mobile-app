import {supabase} from "~/api/supabase";

export const verifyOTP = async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms'})

    if (error) {
        throw error;
    }

    return data;
};