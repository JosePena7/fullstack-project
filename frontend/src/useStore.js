import { useContext } from "react";

import { StoreContext } from "./storeContext.js";

export function useStore() {
  const { dispatch, store } = useContext(StoreContext);
  return { dispatch, store };
}
