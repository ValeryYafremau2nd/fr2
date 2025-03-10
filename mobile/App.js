import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import AccountScreen from "./src/screens/auth/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import FavoriteTeamsScreen from "./src/screens/favorite/TrackTeamScreen";
import TrackListScreen from "./src/screens/favorite/TrackListScreen";
import { Provider as AuthProvider } from "./src/context/authContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/auth/ResolveAuthScreen";
import IndexScreen from "./src/screens/LeaguesScreen";
import { Provider as OverviewProvider } from "./src/context/leagueContext";
import { Provider as FavoriteProvider } from "./src/context/favoriteContext";
import StandingScreen from "./src/screens/overview/StandingScreen";
import MatchScreen from "./src/screens/overview/MatchScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apolloDevToolsInit } from "react-native-apollo-devtools-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, concat } from "apollo-link";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// env var
const httpLink = new HttpLink({ uri: "http://192.168.18.138:3333/graphql/" });

const authMiddleware = new ApolloLink(async (operation, forward) => {
  const token = await AsyncStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
apolloDevToolsInit(client);

const switchNavigator = createMaterialBottomTabNavigator({
  Overview: createStackNavigator(
    {
      Index: IndexScreen,
      Standing: StandingScreen,
      Match: MatchScreen,
    },
    {
      initialRouteName: "Index",
      defaultNavigationOptions: {
        title: "Match Tracker",
      },
    }
  ),
  Tracked: createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      Signin: SigninScreen,
    }),
    mainFlow: createMaterialBottomTabNavigator({
      Matches: createStackNavigator({ TrackListScreen }),
      Teams: createStackNavigator({ FavoriteTeamsScreen }),
      Account: AccountScreen,
    }),
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <OverviewProvider>
        <ApolloProvider client={client}>
          <FavoriteProvider>
            <App
              ref={(navigator) => {
                setNavigator(navigator);
              }}
            />
          </FavoriteProvider>
        </ApolloProvider>
      </OverviewProvider>
    </AuthProvider>
  );
};
