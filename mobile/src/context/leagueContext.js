import createDataContext from "./graphqlContext";

const leagueReducer = (state, action) => {
  switch (action.type) {
    case "add_leagues":
      return [...action.payload];
    case "get_league":
      return [action.payload];
    default:
      return state;
  }
};

const getLeagues = (dispatch) => {
  return (data) => {
    dispatch({
      type: "add_leagues",
      payload: data.leagues,
    });
  };
};

const getLeagueById = (dispatch) => {
  return (data) => {
    dispatch({
      type: "get_league",
      payload: data.getLeague,
    });
  };
};

export const { Context, Provider } = createDataContext(
  leagueReducer,
  { getLeagues, getLeagueById },
  []
);
