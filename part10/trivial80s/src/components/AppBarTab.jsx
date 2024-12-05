import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
  tabText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

const AppBarTab = ({ title, onPress }) => (
  <TouchableHighlight
    style={styles.tab}
    underlayColor="#3b3f45"
    onPress={onPress}
  >
    <Text style={styles.tabText}>{title}</Text>
  </TouchableHighlight>
);

export default AppBarTab;
