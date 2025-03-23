
import React, { createContext, useContext, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType } from './auth/types';
import { useAuthState } from './auth/useAuthState';
import { useAuthActions } from './auth/useAuthActions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Extract auth state management
  const { user: stateUser, session: stateSession, loading: stateLoading, setLoading, isAuthenticated } = useAuthState();
  const [user, setUser] = useState<User | null>(stateUser);
  const [session, setSession] = useState<Session | null>(stateSession);
  const [loading, setLoadingState] = useState(stateLoading);

  // Sync state from useAuthState
  React.useEffect(() => {
    setUser(stateUser);
    setSession(stateSession);
    setLoadingState(stateLoading);
  }, [stateUser, stateSession, stateLoading]);

  // Extract auth action handlers
  const { signIn, signUp, signOut } = useAuthActions({
    setLoading: setLoadingState,
    setUser,
    setSession
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
