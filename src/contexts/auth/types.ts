import { User, Session } from '@supabase/supabase-js';

export type Profile = {
  profile_id: string;
  user_id: string;
  display_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  hasProfile: boolean;
  isCheckingProfile: boolean;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  error: Error | null;
};
