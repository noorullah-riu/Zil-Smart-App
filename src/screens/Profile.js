import React, {useState} from 'react';
import { SafeAreaView,FlatList } from "react-native";
import Card4 from '../components/ItemsListCard';
import AppText from '../components/AppText';

const Profile = ({navigation}) => {
    const [items, setItems] = useState([
        {
          name:"Servo Hybrid PVC & PC",
          imagePath:require("../assets/mould1.png"),
          price:12
        },
        {
          name:"Servo Hybrid PVC & PC",
          imagePath:require("../assets/mould1.png"),
          price:12
        },
          
         
            {
              name:"Servo Hybrid PVC & PC",
              imagePath:require("../assets/mould1.png"),
              price:12
            },
           
        ]);
        const renderItemsList = () => {
            return (
              <FlatList
                numColumns={2}
                data={items}
                renderItem={({ item, index }) => {
                  return (
                    <Card4
                        name={item.name}
                        imagePath={item.imagePath}
                        price={item.price}
                        navigation={navigation}
                    />
                  );
                }}
                keyExtractor={(item) => item.imagePath}
              />
            );
          };
    return (
        <SafeAreaView style={{flex:1}}>
              
                <AppText>hello world!</AppText>

        </SafeAreaView>
    );
}

export default Profile;