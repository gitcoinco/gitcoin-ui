import { PropsWithChildren, useReducer } from "react";

import { CheckerContext, CheckerDispatchContext, initialState } from "./CheckerContext";
import { checkerReducer } from "./checkerReducer";

export const CheckerProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(checkerReducer, initialState);
  return (
    <CheckerContext.Provider value={state}>
      <CheckerDispatchContext.Provider value={dispatch}>{children}</CheckerDispatchContext.Provider>
    </CheckerContext.Provider>
  );
};
