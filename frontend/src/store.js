export const initialStore = () => {
  return {
    token: null,
    user: null,
    profile: null,
    // --- Add these ---
    message: null,       // To store success/error strings
    error: null,         // To store specific error details
    isSubmitting: false, // To disable buttons while the API is working
    estimates: [],       // (Optional) if you want to show a history of quotes
  };
};
export default function storeReducer(store, action) {
  switch (action.type) {
    case "SET_USER": {
      const { token, user, profile } = action.payload;
      return { ...store, token, user, profile };
    }

    case "SET_MESSAGE":
      return { ...store, message: action.payload };

    case "SET_ERROR":
      return { ...store, error: action.payload };

    case "SET_SUBMITTING":
      return { ...store, isSubmitting: action.payload };

    case "LOGOUT":
      return initialStore(); // Resets everything on logout

    default:
      return store;
  }
}