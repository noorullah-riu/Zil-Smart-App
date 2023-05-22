import React, { useState }from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import AppText from '../components/AppText';
import AppHeader from '../components/AppHeader';
import colors from "../components/colors";

import AppRow from '../components/AppRow';
import OrderDetailCard from '../components/OrderDetailCard';
const OrderDetail = ({navigation}) => {
   
    const [customers, setCustomers] = useState([
        {
          name:"ADA Technologies pvt.",
          quantity: "25",
          price:"10",
          imagePath:require("../assets/me.png"),
        },
        
         {
            name:"ADA Technologies",
            quantity: "1002",
            price:"10000",
            imagePath:require("../assets/me.png"),
  
  
          },
          {
            name:"HI TECH Plastics Engineering",
            quantity: "100",
            price:"10000",
            imagePath:require("../assets/me.png"),
  
          },
          {
            name:"ADA Technologies",
            quantity: "2",
            price:"100",
            imagePath:require("../assets/me.png"),
    
     
            },
           
      ]);
            
      const footer = () => {
          return(
            <View style={styles.bottomContainer}>
                <AppRow style={{justifyContent:"space-between"}}>
                    <AppText style={styles.h}>Sub Total</AppText>
                    <AppText style={styles.num}>$50k</AppText>
                </AppRow>
                <AppRow style={{justifyContent:"space-between"}}>
                <AppText style={styles.h}>Discount</AppText>
                    <AppText style={styles.num}>$50</AppText>
                </AppRow>
                <AppRow style={{justifyContent:"space-between"}}>
                <AppText style={styles.h}>VAT</AppText>
                    <AppText style={styles.num}>$50</AppText>
                </AppRow>
                <View
                    style={{
                        borderBottomColor: colors.light_grey,
                        borderBottomWidth: 1,
                        marginVertical:10,
                    }}
                />
                <AppRow style={{justifyContent:"space-between"}}>
                     <AppText style={styles.h}>Grand Total</AppText>
                    <AppText style={styles.total}>$50</AppText>
                </AppRow>
                <View
                    style={{
                        borderBottomColor: colors.light_grey,
                        borderBottomWidth: 1,
                        marginVertical:10,
                    }}
                />
             </View>
          )
      }

      
      const renderCustomersList = (navigation) => {
        return (
          <FlatList
            data={customers}
            ListFooterComponent={footer}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
              return (
                <OrderDetailCard
                    currentItem={item}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    navigation = { navigation }
                />
              );
            }}
            keyExtractor={(item) => item.index}
          />
        );
      };
    return (
        <SafeAreaView>
           
         <AppHeader 
            doubleBtn 
            doubleBtnContainerStyle = {{}}
            doubleBtnImg1 = {require("../assets/back-button.png")} 
            titleImg1="Back"
            styleImg1={{
              width: Platform.OS === "ios" ?  45 : 35,
              height: Platform.OS === "ios" ?  45 : 35,
              marginLeft:33,
            }}
            doubleBtnImg2 = {require("../assets/search.png")}
            doubleBtnImg2Style = {{
              width: 20,
              height: 20,
              marginRight:33,
              }}
            navigation = { navigation } 
            headerTitle = "Order Detail "
            navigateTo = "CustomersList"
            myRoute="Orders"

        />

        <AppRow style={styles.r1}>
            <AppText style={styles.p1}>Item Name</AppText>
            <AppText style={styles.p2}>Qty</AppText>
            <AppText style={styles.p3}>Price</AppText>
        </AppRow>

             {renderCustomersList()}

            
        </SafeAreaView>
    );
}

export default OrderDetail;
const styles = StyleSheet.create({
    card1:{
        backgroundColor:colors.white,
        padding:10,
        marginHorizontal:20,
        borderRadius:10,
        marginVertical:10,
       
    },

    row1:{
        justifyContent:"space-between",
        
    },
    row2:{
        marginVertical:2,
        
    },
    p2:{
        color:colors.secondary,
        fontWeight:"bold",
      
        paddingVertical:4,
        borderRadius:5,
        fontSize: Platform.OS === "ios" ? 18 : 16,

    },
    p3:{
        color:colors.yellow,
        fontSize: Platform.OS === "ios" ? 18 : 16,
        fontWeight:"bold",

    },
    p4:{
        color:colors.card_h2,
        fontWeight:"bold",
        fontSize:Platform.OS === "ios" ? 18 : 16,

    },
    p5:{
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,

    },
    
    p6:{
      
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,
        marginTop:5,
    },
    p6b:{
        color:colors.yellow,
        fontSize:Platform.OS === "ios" ? 16 : 14,
        fontWeight:"bold"
    },
    p7:{
      
        color:colors.card_h2,
        fontSize:Platform.OS === "ios" ? 16 : 14,
    },
    p7b:{
        color:colors.yellow,
        fontSize:Platform.OS === "ios" ? 16 : 14,
        fontWeight:"bold"

    },
    img:{
        borderRadius:10,
        width:70,
        height:70,
    },



    r1:{
        justifyContent:"space-between",
        backgroundColor:colors.white,
        padding:15,
        borderRadius:10,
        marginHorizontal:20,
        marginTop:30,
        marginBottom:10

    },
    p1:{
        color:colors.secondary,
        fontWeight:"bold",
        fontSize:16,
        width:"55%"
    },
    p2:{
        color:colors.secondary,
        fontWeight:"bold",
        fontSize:16,
        width:"25%"
    },
    p3:{
        color:colors.secondary,
        fontWeight:"bold",
        fontSize:16,
        width:"30%"
    },

   h:{
       color:colors.secondary,
       marginVertical:5,
       fontWeight:"bold",
       fontSize:18
   },
   num:{
    color:colors.yellow,
    fontSize:Platform.OS === "ios" ? 16 : 14,
    fontWeight:"bold",
   },
   total:{
    color:colors.yellow,
    fontWeight:"bold",
    fontSize:18
   },
   row:{
       paddingBottom:100,
   },
   bottomContainer:{
   
    marginHorizontal:20
   
   },
   listContainer:{
       paddingBottom: Platform.OS === "ios" ? 180 : 170,
    }
    



})