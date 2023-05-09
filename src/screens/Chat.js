import React, { useState, useEffect }from 'react';
import { StyleSheet, SafeAreaView,  FlatList } from "react-native";
import AppHeader from '../components/AppHeader';
import colors from "../components/colors";
import ChatCard from '../components/ChatCard';


const Chat = ({navigation}) => {

   

    const [chat, setChat] = useState([
        {
            id:0,
            name:"Johny & Jugnu",
            message:"Thank you ali raza farooqi",
            count: 6,
            messageDate:"2:40 PM",
            imagePath:require("../assets/me.png"),
        },
        {
            name:"Johny & Jugnu",
            message:"Thank you ali raza farooqi how are you",
            id:1,
            count: 6,
            messageDate:"2:40 PM",
            imagePath:require("../assets/me.png"),
  
          },
          {
            name:"Johny & Jugnu",
            message:"Thank you ali raza farooqi",
            id:3,
            count: 6,
            messageDate:"2:40 PM",
            imagePath:require("../assets/me.png"),
  
          },
          {
            name:"Johny & Jugnu",
            message:"Thank you ali raza farooqi",
            id:4,
            count: 6,
            messageDate:"2:40 PM",
            imagePath:require("../assets/me.png"),
          },
          {
            name:"Johny & Jugnu",
            message:"Thank you ali raza farooqi",
            id:4,
            count: 326,
            messageDate:"20/23/12",
            imagePath:require("../assets/me.png"),
  
          },
          
       
      ]);

      useEffect(() => {
    }, []);

   
      
      const renderChatList = (navigation) => {
        return (
          <FlatList
            contentContainerStyle={{paddingBottom: 70,}}
            data={chat}
            renderItem={({ item, index }) => {
              return (
                <ChatCard 
                    name={item.name}
                    count={item.count}
                    message={item.message}
                    messageDate={item.messageDate}
                    imagePath={require("../assets/me.png")}
                    navigation = { navigation } 
                />
              );
            }}
            keyExtractor={(item) => item.SAPCardCode}
          />
        );
      };

    return (
        <SafeAreaView>
            <AppHeader 
            doubleBtn 
            doubleBtnContainerStyle = {{}}
            doubleBtnImg1 =  {require("../assets/back-button.png")}
            titleImg1="Back"
            styleImg1={{
              width: Platform.OS === "ios" ? 35 : 30,
          height: Platform.OS === "ios" ? 35 : 30,
              marginLeft:10,
            }}
            doubleBtnImg2 = {require("../assets/search.png")}
            doubleBtnImg2Style = {{
              width: 20,
              height: 20,
              marginRight:27,
              }}
            navigation = { navigation } 
            headerTitle = "Chat List"
        />
         
             {renderChatList(navigation)}
             
        </SafeAreaView>
    );
}

export default Chat;

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
 
     

})