"use client";

import { getGuestSession } from "@/services/auth/getGuestSession";
import { createContext, useContext, useEffect, useState } from "react";

const GuestSessionContext = createContext<{
  guestSessionId: string | null;
  setGuestSessionId: (id: string) => void;
}>({
    // Initial state of the context
  guestSessionId: null, // Holds the current guest session id or null
  setGuestSessionId: () => {} // Placeholder function
});

// This component wraps other components and provides access to guest session data
export const GuestSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [guestSessionId, setGuestSessionIdState] = useState<string | null>(null);

  const setGuestSessionId = (id: string) => {
    localStorage.setItem('guestSessionId', id);
    setGuestSessionIdState(id);
  };

  const fetchGuestSession = async () => {
    const data = await getGuestSession();
    if (data.guest_session_id) {
      setGuestSessionId(data.guest_session_id);
    }
  };

  useEffect(() => {
    const existingId = localStorage.getItem('guestSessionId');
    if (existingId) { // If there's an existing id in local storage, use that stored session
        setGuestSessionIdState(existingId);
    } else { // If there's no existing id, fetch a new one
      fetchGuestSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
       // A context has two key components: the context itself and its provider
       // When creating a context, react gives you a provider for that context
       // This provider is responsible for passing down values to all components that consume this context
      <GuestSessionContext.Provider value={{ guestSessionId, setGuestSessionId }}>
        {children}
      </GuestSessionContext.Provider>
  );
};

export const useGuestSession = () => useContext(GuestSessionContext);
    