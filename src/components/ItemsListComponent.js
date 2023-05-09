import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import StockList from "../components/StockList";
import Card4 from "../components/ItemsListCard";

const ItemsListComponent = ({ searchPhrase, setClicked, data, navigation, selectedItem }) => {
  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return (
        <Card4
          name={item.Name} //ItemName
          itemCode={item.ItemCode} //ItemName
          imagePath={
            "http://182.176.160.19:44502/pics/AliBabaUplodedpicture/" +
            item.FileName
          }
          price={item.Price} // Price
          navigation={navigation}
          currentItem={item}
          availableQty={item.AvailableQty} //Quantity
        //   allItems={itemList}
          itemGroupCode={selectedItem}
        />
      );
    }
    // filter of the 'name' / item code in my case
    if (
      item.ItemCode.toUpperCase().includes(
        searchPhrase.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return (
        <Card4
          name={item.Name} //ItemName
          itemCode={item.ItemCode} //ItemName
          imagePath={
            "http://182.176.160.19:44502/pics/AliBabaUplodedpicture/" +
            item.FileName
          }
          price={item.Price} // Price
          navigation={navigation}
          currentItem={item}
          availableQty={item.AvailableQty} //Quantity
        //   allItems={itemList}
          itemGroupCode={selectedItem}
        />
      );
    }
    // filter of the 'description' / item name in my case
    if (
      item.Name.toUpperCase().includes(
        searchPhrase.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return (
        <Card4
          name={item.Name} //ItemName
          itemCode={item.ItemCode} //ItemName
          imagePath={
            "http://182.176.160.19:44502/pics/AliBabaUplodedpicture/" +
            item.FileName
          }
          price={item.Price} // Price
          navigation={navigation}
          currentItem={item}
          availableQty={item.AvailableQty} //Quantity
        //   allItems={itemList}
          itemGroupCode={selectedItem}
        />
      );
    }
  };
  // style={{alignItems:"center",}
  return (
    <SafeAreaView style={styles.list_container}>
      <View onStartShouldSetResponder={() => setClicked(false)}>
        <FlatList
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.ItemCode}
        />
      </View>
    </SafeAreaView>
  );
};

export default ItemsListComponent;

const styles = StyleSheet.create({
  list_container: {
    // margin: 10,
    alignItems:"center",
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
