export const initialStore = () => {
  return {
    token: null,
    user: null,
    profile: null,
  };
};

export default function storeReducer(store, action) {
  switch (action.type) {
    case "SET_USER": {
      const { token, user, profile } = action.payload;

      return {
        ...store,
        token,
        user,
        profile,
      };
    }

    case "LOGOUT":
      return {
        ...store,
        token: null,
        user: null,
        profile: null,
      };

    default:
      return store;
  }
}