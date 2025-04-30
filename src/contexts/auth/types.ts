import { User, Session } from '@supabase/supabase-js';

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  error: Error | null;
};