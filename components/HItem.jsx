import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HStack, VStack } from "@react-native-material/core";

const HItem = ({ item }) => {
  return (
    <VStack style={styles.root} spacing={10}>
      <HStack spacing={10}>
        <Text style={styles.text}>Currency1:{item.currency1}</Text>
        <Text style={styles.text}>Currency2:{item.currency2}</Text>
      </HStack>
      <Text style={styles.text}>Rate:{item.exchangeRate}</Text>
    </VStack>
  );
};

export default HItem;

const styles = StyleSheet.create({
  root: {
    // backgroundColor: "cyan",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  text: {
    fontWeight: 600,
    fontSize: 15,
  },
});
