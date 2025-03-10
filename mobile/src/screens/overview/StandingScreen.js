import React from "react";
import { useMutation } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_STANDING, UPDATE_TEAM } from "../../api/gql.queries";

const StandingScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_STANDING, {
    variables: { leagueId: navigation.getParam("id") },
  });
  const [updateFavoriteTeamReq] = useMutation(UPDATE_TEAM);

  return (
    <View>
      {data && (
        <FlatList
          data={data.getLeague.standings[0].table}
          keyExtractor={(team) => team.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                <Text style={styles.title}>{item.team.name}</Text>
                <Text style={styles.wins}>{item.won}</Text>
                <Text style={styles.draws}>{item.draw}</Text>
                <Text style={styles.loses}>{item.lost}</Text>
                <Text style={styles.points}>{item.points}</Text>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await updateFavoriteTeamReq({
                        variables: { userId: 1, teamId: item.team.id },
                      });
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <Text style={styles.trackButton}>Track</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

StandingScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Match", { id: 2015 })}
      >
        <Text>Matches</Text>
      </TouchableOpacity>
    ),
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
  image: {
    width: 70,
    height: 70,
  },
  icon: {
    fontSize: 24,
  },
  trackButton: {
    backgroundColor: "green",
    color: "white",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default StandingScreen;
