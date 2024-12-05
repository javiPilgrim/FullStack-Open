import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  language: {
    backgroundColor: "#0366d6",
    color: "white",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
  },
});

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={{ fontWeight: "bold" }}>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{item.stargazersCount}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{item.forksCount}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{item.reviewCount}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{item.ratingAverage}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
