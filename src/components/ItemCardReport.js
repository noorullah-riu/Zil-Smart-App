import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import Card5 from "../components/Card5";

// the filter
const ItemCardReport = ({
  searchPhrase,
  setClicked,
  data,
  navigation,
  route,
}) => {
  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return (
        <Card5
          item={item}
          name={item.CardName}
          code={item.CardCode}

          balance={item.AccountBalance}
          limit={item.CreditLimit}
          remaining={item.RemainingLimit}
          imagePath={require("../assets/hiTechSq.png")}
         // route={route}
          navigation={navigation}
        />
      );
    }
    if (
      item.name.toUpperCase().includes(
        searchPhrase.toUpperCase().trim().replace(/\s/g, "")
      )
    ) {
      return (
        <Card5
          item={item}
          name={item.CardName}
     //  name={item.name}  
       
          code={item.CardCode}
          balance={item.AccountBalance}
          limit={item.CreditLimit}
          remaining={item.RemainingLimit}
          imagePath={require("../assets/hiTechSq.png")}
          route={route}
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

export default ItemCardReport;

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
