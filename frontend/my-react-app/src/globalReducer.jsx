import { useContext } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import storeReducer from "./store.js";
import { initialStore } from "./store.js";

const StoreContext = createContext();

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
        payload: { token, user: JSON.parse(user), profile: JSON.parse(profile) },
      });
    }
  }, [store.token]);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default function globalReducer() {
    const {dispatch,store} = useContext(StoreContext);
    return {dispatch,store};
}

