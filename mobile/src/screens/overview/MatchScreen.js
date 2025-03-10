import React from "react";
import { useQuery } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@apollo/client";
import { GET_MATCHES, UPDATE_MATCH } from "../../api/gql.queries";

const MatchScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables: { leagueId: navigation.getParam("id") },
  });
  const [updateFavoriteMatchReq] = useMutation(UPDATE_MATCH);

  return (
    <View>
      {data && (
        <FlatList
          data={data.getLeague.matches}
          keyExtractor={(team) => team.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                <Text style={styles.date}>
                  {new Date(item.utcDate).toTimeString()}
                </Text>
                <Text style={styles.team1}>{item.homeTeam.name}</Text>
                <Text style={styles.team1Scored}>{0}</Text>
                <Text>:</Text>
                <Text style={styles.team2Scored}>{0}</Text>
                <Text style={styles.team2}>{item.awayTeam.name}</Text>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await updateFavoriteMatchReq({
                        variables: { userId: 1, matchId: item.id },
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

export default MatchScreen;
