import React, {useState} from "react";
import MyApp from "./src/MyApp";
import GlobalStyles from "./src/components/GlobalStyles";
import {SafeAreaView} from "react-native";
import {sosqContext} from "./src/context/SoSq";
import {preCategoriesRouteContext} from "./src/context/PreCategoriesRoute";
import {customersList} from "./src/context/customresList";
import {addToCartContext} from './src/context/addToCartContext';

export default function App() {
    const [routeVal, setRouteVal] = useState("");
    const [preCategoriesRouteVal, setPreCategoriesRouteVal] = useState("");
    const [cartItem, setCartItem] = useState([]);
    const [customers, setCustomers] = useState([]);

    return (
        <sosqContext.Provider value={{routeVal, setRouteVal}}>
            <preCategoriesRouteContext.Provider
                value={{preCategoriesRouteVal, setPreCategoriesRouteVal}}>
                <customersList.Provider value={{customers, setCustomers}}>
                <addToCartContext.Provider value={{cartItem, setCartItem}}>

                    <MyApp/>
                </addToCartContext.Provider>
                </customersList.Provider>

            </preCategoriesRouteContext.Provider>
        </sosqContext.Provider>
    );
}
