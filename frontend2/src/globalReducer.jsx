import { useReducer } from "react";
import { useEffect } from "react";
import storeReducer from "./store.js";
import { initialStore } from "./store.js";
import { StoreContext } from "./storeContext.js";

const parseStoredJson = (value) => {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  // Load token and user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const profile = localStorage.getItem("profile");
    
    if (store.token) {
      // If token exists in store, ensure it's in localStorage
      localStorage.setItem("token", store.token);
    } else if (token) {
      // If token exists in localStorage but not in store, update store
      dispatch({
        type: "SET_USER",
        payload: {
          token,
          user: parseStoredJson(user),
          profile: parseStoredJson(profile),
        },
      });
    }
  }, [store.token]);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
