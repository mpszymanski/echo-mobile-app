import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from "~/api/supabase";
import { User, Session } from '@supabase/supabase-js';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  error: Error | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Helper function to handle authentication errors
  const handleAuthError = useCallback((err: unknown, errorMessage: string) => {
    console.error(errorMessage, err);
    setError(err instanceof Error ? err : new Error(errorMessage));
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
  }, []);

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
    } else {
      setUser(null);
    }

    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      await updateUserState(currentSession);
    } catch (err) {
      handleAuthError(err, 'Unknown authentication error');
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthError, updateUserState]);

  const signOut = useCallback(async () => {
    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setIsAuthenticated(false);
      setUser(null);
      setSession(null);
      setError(null);
    } catch (err) {
      handleAuthError(err, 'Unknown sign out error');
    }
  }, [handleAuthError]);

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
          handleAuthError(err, 'Auth state change error');
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
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      user, 
      session, 
      error, 
      signOut, 
      refreshAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
