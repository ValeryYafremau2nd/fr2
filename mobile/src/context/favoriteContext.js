import createDataContext from "./graphqlContext";

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "setFavorite":
      return { ...action.payload };
    default:
      return state;
  }
};

const setFavorite = (dispatch) => {
  return (callback) => {
    dispatch({ type: "setFavorite", payload });
    if (callback) {
      callback();
    }
  };
};

const updateFavoriteTeam = (dispatch) => {};

export const { Context, Provider } = createDataContext(
  favoriteReducer,
  { updateFavoriteTeam, setFavorite },
  []
);
