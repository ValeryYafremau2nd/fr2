import React, { useContext, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/BlogContext";
import { GET_LEAGUES } from "../../api/gql.queries";

const IndexScreen = ({ navigation }) => {
  const { state, getLeagues } = useContext(Context);
  const { loading, error, data } = useQuery(GET_LEAGUES);
  useEffect(() => {
    data && getLeagues(data);
  }, [data, error, loading]);

  return (
    <View>
      <Text>{data?.helloWorld}</Text>
      <FlatList
        data={state}
        keyExtractor={(league) => league.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Standing", { id: item.id })}
            >
              <View style={styles.row}>
                <Image
                  style={styles.image}
                  source={{ uri: item.emblemUrl }}
                ></Image>
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  title: {
    fontSize: 20,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
