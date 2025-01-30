import { PropsWithChildren, useReducer, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/Toaster";

import {
  CheckerContext,
  CheckerDispatchContext,
  initialState,
} from "~checker/store/CheckerContext";
import { checkerReducer } from "~checker/store/checkerReducer";

const queryClient = new QueryClient();

export const CheckerProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(checkerReducer, initialState);

  useEffect(() => {
    // Initialize history state on first load
    if (window.history.state === null) {
      window.history.replaceState(
        {
          from: "external",
          route: state.route,
        },
        "",
      );
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.route) {
        // If navigating back to external route, let parent app handle it
        if (event.state.from === "external") {
          return;
        }
        dispatch({
          type: "SET_ROUTE_HISTORY",
          payload: {
            route: event.state.route,
            replace: true,
          },
        });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CheckerContext.Provider value={state}>
        <CheckerDispatchContext.Provider value={dispatch}>
          <Toaster />
          {children}
        </CheckerDispatchContext.Provider>
      </CheckerContext.Provider>
    </QueryClientProvider>
  );
};
