import React, { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';
import AuthContext from './AuthContext';
import { Profile } from './types';
import { auth } from '~/data';
import { getProfile } from '~/features/profile';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState<boolean>(false);

  // Helper function to handle authentication errors
  const handleAuthError = useCallback((err: unknown) => {
    console.error(err);
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
  }, []);

  // Helper function to check if user has a profile
  const checkUserProfile = useCallback(
    async (userId: string | null) => {
      if (!userId) {
        setProfile(null);
        setHasProfile(false);
        return;
      }

      setIsCheckingProfile(true);

      try {
        const profile = await getProfile(userId);

        if (!profile) {
          setProfile(null);
          setHasProfile(false);

          // Redirect to onboarding flow if authenticated
          if (isAuthenticated) {
            router.replace('/onboarding');
          }
        } else {
          setProfile(profile);
          setHasProfile(true);
        }
      } catch (err) {
        console.error('Error checking profile:', err);
      } finally {
        setIsCheckingProfile(false);
      }
    },
    [isAuthenticated, router]
  );

  // Helper function to update user state
  const updateUserState = useCallback(
    async (currentSession: Session | null) => {
      setSession(currentSession);
      setIsAuthenticated(!!currentSession);

      if (currentSession) {
        const userData = await auth.getUser();

        if (!userData) {
          throw new Error('Failed to get user data');
        }

        setUser(userData);

        // Check if user has a profile
        await checkUserProfile(userData?.id ?? null);
      } else {
        setUser(null);
        setProfile(null);
        setHasProfile(false);
      }
    },
    [checkUserProfile]
  );

  const checkAuth = useCallback(async () => {
    try {
      const currentSession = await auth.getSession();
      await updateUserState(currentSession);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthError, updateUserState]);

  const signOut = useCallback(async () => {
    try {
      await auth.signOut();

      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setProfile(null);
      setHasProfile(false);
    } catch (err) {
      handleAuthError(err);
    }
  }, [handleAuthError]);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    await checkAuth();
  }, [checkAuth]);

  // Check authentication status on the mount
  useEffect(() => {
    checkAuth();

    // Set up auth state change listener
    const authListener = auth.onAuthStateChange(async (event, currentSession) => {
      try {
        await updateUserState(currentSession);
      } catch (err) {
        handleAuthError(err);
      } finally {
        setIsLoading(false);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [checkAuth, handleAuthError, updateUserState]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        session,
        profile,
        hasProfile,
        isCheckingProfile,
        signOut,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
