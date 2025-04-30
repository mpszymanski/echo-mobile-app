import {supabase} from "~/api/supabase";

export async function getUserData() {
    const { data, error } =  await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    return data;
}