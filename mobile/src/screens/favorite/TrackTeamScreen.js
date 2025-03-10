import React from "react";
import { NavigationEvents } from "react-navigation";
import { useMutation } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLazyQuery } from "@apollo/client";
import {
  GET_FAVORITE_TEAMS,
  UPDATE_FAVORITE_TEAM,
} from "../../api/gql.queries";

const FavoriteTeamsScreen = () => {
  const [getData, { loading, error, data }] = useLazyQuery(GET_FAVORITE_TEAMS, {
    fetchPolicy: "no-cache",
    variables: {},
  });
  const [updateFavoriteTeamReq, {}] = useMutation(UPDATE_FAVORITE_TEAM);

  return (
    <View>
      <NavigationEvents onDidFocus={() => getData()} />
      {data && (
        <FlatList
          data={data.getFavorite.teamsInfo}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                <Image
                  style={styles.tinyLogo}
                  source={{ uri: item.crestUrl }}
                />
                <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await updateFavoriteTeamReq({
                        variables: { userId: 1, teamId: item.id },
                      });
                      getData();
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <Text style={styles.trackButton}>Untrack</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

FavoriteTeamsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Matches",
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
    alignContent: "center",
  },
  tinyLogo: {
    width: 25,
    height: 25,
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {},
  icon: {
    fontSize: 24,
  },
  trackButton: {
    backgroundColor: "red",
    color: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default FavoriteTeamsScreen;
