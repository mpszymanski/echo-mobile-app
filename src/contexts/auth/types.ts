import { User, Session } from '@supabase/supabase-js';
import { Profile as DataProfile } from '~/data';

export type Profile = DataProfile;

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
};
