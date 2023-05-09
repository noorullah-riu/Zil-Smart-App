import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStackNav from "./AppStackNav";

const MainNav = () => {
  return (
    <NavigationContainer>
      <AppStackNav />
    </NavigationContainer>
  );
};

export default MainNav;
