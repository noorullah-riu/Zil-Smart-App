import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, Alert } from "react-native";
import StockList from "../components/StockList";

// definition of the Item, which will be rendered in the FlatList

const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

// the filter
const StockListComponent = ({
  ifEndReached,
  searchPhrase,
  setClicked,
  data,
  navigation,
}) => {
  const renderItem = ({ item }) => {
    
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <StockList
          item={item}
          ItemCode={item.ItemCode}
          ItemName={item.ItemName}
          Description={item.Dscription}
          Price={item.Price}
          Stock={item.Stock}
          navigation={navigation}
        />
      );
    }
    // else return Alert.alert("No data found.")
    // filter of the 'name' / item code in my case
    if (
      item.ItemCode.toUpperCase().includes(
        searchPhrase.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      // console.log(item.ItemCode, searchPhrase);
      return (
        <StockList
          item={item}
          ItemCode={item.ItemCode}
          ItemName={item.ItemName}
          Description={item.Dscription}
          Price={item.Price}
          Stock={item.Stock}
          navigation={navigation}
        />
      );
    }
    // else return Alert.alert("No data found.")
    // filter of the 'description' / item name in my case
    if (
      item.ItemName.toUpperCase().includes(
        searchPhrase.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return (
        <StockList
          item={item}
          ItemCode={item.ItemCode}
          ItemName={item.ItemName}
          Description={item.Dscription}
          Price={item.Price}
          Stock={item.Stock}
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
          keyExtractor={(item) => item.ItemCode}
          // onEndReached={ifEndReached}
          // onEndReachedThreshold={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default StockListComponent;

const styles = StyleSheet.create({
  list__container: {
    // margin: 10,
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
