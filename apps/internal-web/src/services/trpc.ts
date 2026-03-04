import type { AppRouter } from "@streeio-core/api/routers/index";

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink, TRPCClientError } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { toast } from "sonner";

function handleGlobalError(error: unknown, query?: unknown) {
  if (
    error instanceof TRPCClientError &&
    (error.data?.code === "UNAUTHORIZED" || error.data?.httpStatus === 401)
  ) {
    if (typeof window !== "undefined") {
      new BroadcastChannel("auth_channel").postMessage("session_expired");
      window.location.href = "/login";
    }
    return;
  }

  const errorMessage =
    error instanceof Error ? error.message : "An error occurred";
  if (errorMessage.includes("401") || errorMessage.includes("UNAUTHORIZED")) {
    if (typeof window !== "undefined") {
      new BroadcastChannel("auth_channel").postMessage("session_expired");
      window.location.href = "/login";
    }
    return;
  }

  const action =
    query &&
    typeof query === "object" &&
    "invalidate" in query &&
    typeof (query as Record<string, unknown>).invalidate === "function"
      ? {
          label: "retry",
          onClick: () => {
            ((query as Record<string, unknown>).invalidate as () => void)();
          },
        }
      : undefined;

  toast.error(errorMessage, {
    action,
  });
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
});

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
