import {supabase} from "~/api/supabase";

export const sendOTP = async (phone: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        phone
    })

    if (error) {
        throw error;
    }

    return data;
};