import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import Card911 from "./Card911";

// the filter
const ItemCardNew = ({ searchPhrase, setClicked, data, navigation, route }) => {
  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return (
        <Card911
          item={item}
          name={item.itemName}
          code={item.itemCode}
          // route={route}
          navigation={navigation}
        />
      );
    }
    if (
      item.itemName
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Card911
          item={item}
          //   name={item.CardName}
          name={item.itemName}
          code={item.itemCode}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View onStartShouldSetResponder={() => setClicked(false)}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.itemCode}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemCardNew;

const styles = StyleSheet.create({
  list__container: {
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
