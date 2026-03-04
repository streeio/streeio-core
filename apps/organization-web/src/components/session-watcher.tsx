"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export function SessionWatcher() {
  useEffect(() => {
    const channel = new BroadcastChannel("auth_channel");

    // Poll the session every 10 seconds
    const interval = setInterval(async () => {
      try {
        const { data } = await authClient.getSession({
          fetchOptions: {
            cache: "no-store",
          },
        });
        if (
          !data &&
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup"
        ) {
          channel.postMessage("session_expired");
          window.location.href = "/login";
        } else if (
          data &&
          (window.location.pathname === "/login" ||
            window.location.pathname === "/signup")
        ) {
          window.location.href = "/dashboard";
        }
      } catch (err) {
        // Ignore network errors or fetch blockages by browser extensions
        console.error("Session polling failed:", err);
      }
    }, 10_000);

    // Broadcast channel to listen for auth events from other tabs
    channel.onmessage = (event) => {
      if (
        (event.data === "session_expired" || event.data === "logout") &&
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        window.location.href = "/login";
      } else if (
        event.data === "login" &&
        (window.location.pathname === "/login" ||
          window.location.pathname === "/signup")
      ) {
        window.location.href = "/dashboard";
      } else if (event.data === "login") {
        window.location.reload();
      }
    };

    return () => {
      clearInterval(interval);
      channel.close();
    };
  }, []);

  return null;
}
