import { NavigationEvents } from "react-navigation";
import { useMutation } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useLazyQuery } from "@apollo/client";
import {
  GET_FAVORITE_MATCHES,
  UPDATE_FAVORITE_MATCH,
} from "../../api/gql.queries";

const TrackListScreen = ({ navigation, client }) => {
  const [getData, { loading, error, data }] = useLazyQuery(
    GET_FAVORITE_MATCHES,
    {
      fetchPolicy: "no-cache",
      variables: {},
    }
  );
  const [updateFavoriteTeamReq, {}] = useMutation(UPDATE_FAVORITE_MATCH);

  return (
    <View>
      <NavigationEvents onDidFocus={() => getData()} />
      {data && (
        <FlatList
          data={data.getFavorite.matchesInfo}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.row}>
                <Text style={styles.title}>{item.utcDate}</Text>
                <Text style={styles.title}>{item.homeTeam.name}</Text>
                <Text style={styles.title}>0</Text>
                <Text style={styles.title}>:</Text>
                <Text style={styles.title}>0</Text>
                <Text style={styles.title}>{item.awayTeam.name}</Text>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      await updateFavoriteTeamReq({
                        variables: { userId: 1, matchId: item.id },
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

export default TrackListScreen;
