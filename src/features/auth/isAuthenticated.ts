import {supabase} from "~/api/supabase";

export async function isAuthenticated() {
    return await supabase.auth.getSession() !== null;
}