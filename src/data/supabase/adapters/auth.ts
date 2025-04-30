import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../client';
import { AuthRepository } from '~/data/interfaces/auth';
import { parsePhone } from '~/utils/phone';

export class SupabaseAuthRepository implements AuthRepository {
  async signInWithOtp(phone: string): Promise<void> {
    const { error } = await supabase.auth.signInWithOtp({
      phone: parsePhone(phone),
    });

    if (error) {
      throw error;
    }
  }

  async verifyOtp(phone: string, otp: string): Promise<{ user: User; session: Session }> {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: parsePhone(phone),
      token: otp,
      type: 'sms',
    });

    if (error) {
      throw error;
    }

    return {
      user: data.user!,
      session: data.session!,
    };
  }

  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return {
      unsubscribe: () => {
        if (data && data.subscription) {
          data.subscription.unsubscribe();
        }
      },
    };
  }
}
