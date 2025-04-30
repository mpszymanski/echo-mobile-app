import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from "~/api/supabase";
import { User, Session } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import AuthContext from './AuthContext';
import { Profile } from './types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Helper function to handle authentication errors
  const handleAuthError = useCallback((err: unknown, errorMessage: string) => {
    console.error(errorMessage, err);
    setError(err instanceof Error ? err : new Error(errorMessage));
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
  }, []);

  // Helper function to check if user has a profile
  const checkUserProfile = useCallback(async (userId: string | null) => {
    if (!userId) {
      setProfile(null);
      setHasProfile(false);
      return;
    }

    setIsCheckingProfile(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          setProfile(null);
          setHasProfile(false);

          // Redirect to profile creation if authenticated
          if (isAuthenticated) {
            router.replace('/profile');
          }
        } else {
          throw error;
        }
      } else if (data) {
        setProfile(data as Profile);
        setHasProfile(true);
      }
    } catch (err) {
      console.error('Error checking profile:', err);
      // Don't set error state here to avoid disrupting the auth flow
    } finally {
      setIsCheckingProfile(false);
    }
  }, [isAuthenticated, router]);

  // Helper function to update user state
  const updateUserState = useCallback(async (currentSession: Session | null) => {
    setSession(currentSession);
    setIsAuthenticated(!!currentSession);

    if (currentSession) {
      const { data: { user: userData }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      setUser(userData);

      // Check if user has a profile
      await checkUserProfile(userData?.id ?? null);
    } else {
      setUser(null);
      setProfile(null);
      setHasProfile(false);
    }

    setError(null);
  }, [checkUserProfile]);

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      await updateUserState(currentSession);
    } catch (err) {
      handleAuthError(err, t('auth.errors.unknown'));
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthError, updateUserState, t]);

  const signOut = useCallback(async () => {
    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setProfile(null);
      setHasProfile(false);
      setError(null);
    } catch (err) {
      handleAuthError(err, t('auth.errors.signOut'));
    }
  }, [handleAuthError, t]);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    await checkAuth();
  }, [checkAuth]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        try {
          await updateUserState(currentSession);
        } catch (err) {
          handleAuthError(err, t('auth.errors.stateChange'));
        } finally {
          setIsLoading(false);
        }
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [checkAuth, handleAuthError, updateUserState, t]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      user, 
      session, 
      profile,
      hasProfile,
      isCheckingProfile,
      error, 
      signOut, 
      refreshAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
