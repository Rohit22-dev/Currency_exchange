import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  TextInput,
  VStack,
} from "@react-native-material/core";
import axios from "axios";
import { SelectList } from "react-native-dropdown-select-list";
import Icon from "react-native-vector-icons/FontAwesome";
import { currency } from "./Data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HItem from "./HItem";

const Home = () => {
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [currencyRate, setCurrencyRate] = useState(1);
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("currency")
      .then((data) => {
        const arrayData = JSON.parse(data);
        setHistory(arrayData);
      })
      .catch((error) => console.log(`Error retrieving data: ${error}`));
  }, [loading]);

  const handlePress = async () => {
    try {
      setLoading(true);
      setData(true);
      console.log("object");
      const res = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=QjNv7bASqKxE1ZYzciWQGMSJNKmjDp35LyiY25jM&base_currency=${currency1}&currencies=${currency2}`
      );
      const foo = currency2;
      setCurrencyRate(res.data.data[foo]);
      console.log(res.data.data[foo]);
      const arrayData = [
        {
          currency1: currency1,
          currency2: currency2,
          exchangeRate: currencyRate,
        },
        ...history,
      ];
      setTimeout(() => setData(false), 3000);
      const stringData = JSON.stringify(arrayData);
      AsyncStorage.setItem("currency", stringData)
        .then(() => {
          console.log("Data stored successfully");
          setLoading(false);
        })
        .catch((error) => console.log(`Error storing data: ${error}`));
    } catch (error) {
      console.log("eded", error);
    }
  };

  return (
    <Flex center style={styles.root}>
      <Text style={styles.header}>
        The rate is relative to the first currency.
      </Text>
      <Box p={20} style={styles.container}>
        <VStack spacing={15} style={{ width: "100%" }}>
          <HStack>
            <SelectList
              setSelected={(val) => setCurrency1(val)}
              data={currency}
              arrowicon={<Icon name="chevron-down" size={14} color={"black"} />}
              searchicon={<Icon name="search" size={14} color={"black"} />}
              search={true}
              boxStyles={styles.box}
              defaultOption={{ key: "EUR", value: "EUR" }}
              dropdownStyles={{
                backgroundColor: "#00000040",
                paddingHorizontal: 30,
                overflow: "hidden",
              }}
              dropdownTextStyles={{ fontWeight: "800", fontSize: 15 }}
              inputStyles={{
                fontWeight: "800",
                fontSize: 15,
                color: "black",
              }}
              save="value"
            />
            <SelectList
              setSelected={(val) => setCurrency2(val)}
              data={currency}
              arrowicon={<Icon name="chevron-down" size={14} color={"black"} />}
              searchicon={<Icon name="search" size={14} color={"black"} />}
              search={true}
              boxStyles={styles.box}
              defaultOption={{ key: "INR", value: "INR" }}
              dropdownStyles={{
                backgroundColor: "#00000040",
                paddingHorizontal: 30,
              }}
              dropdownTextStyles={{ fontWeight: "800", fontSize: 15 }}
              inputStyles={{
                fontWeight: "800",
                fontSize: 15,
                color: "black",
              }}
              save="value"
            />
          </HStack>
          <Button
            title="Rate"
            color="secondary"
            onPress={() => handlePress()}
            loading={loading}
          />
        </VStack>
        {data && (
          <Text
            style={{ fontSize: 25, fontWeight: 600 }}
          >{`1 ${currency1} = ${currencyRate} ${currency2}`}</Text>
        )}
      </Box>
      <Text style={{ fontSize: 30, fontWeight: 600 }}>Recent Search</Text>
      {history && (
        <FlatList
          data={history}
          scrollEnabled={true}
          renderItem={({ item }) => <HItem item={item} />}
        />
      )}
    </Flex>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    backgroundColor: "tomato",
    flex: 1,
    gap: 20,
    paddingTop: 40,
  },
  container: { backgroundColor: "#ccc", borderRadius: 5 },
  header: { fontSize: 20, color: "white", fontWeight: 500 },
  box: {
    borderRadius: 10,
    margin: 10,
    gap: 30,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
