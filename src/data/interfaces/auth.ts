import { User, Session } from '@supabase/supabase-js';

export interface AuthData {
  phone: string;
  otp: string;
}

export interface AuthRepository {
  signInWithOtp(phone: string): Promise<void>;
  verifyOtp(phone: string, otp: string): Promise<{ user: User; session: Session }>;
  getSession(): Promise<Session | null>;
  getUser(): Promise<User | null>;
  signOut(): Promise<void>;
  onAuthStateChange(callback: (event: string, session: Session | null) => void): {
    unsubscribe: () => void;
  };
}
