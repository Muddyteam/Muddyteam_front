import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import MapScreen from "./map/MapScreen";
import BookScreen from "./BookScreen";
import MyPageScreen from "./MyPageScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const Nav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused
              ? require("../../assets/icon/home_ch.png")
              : require("../../assets/icon/home_un.png");
          } else if (route.name === "Map") {
            iconName = focused
              ? require("../../assets/icon/map_ch.png")
              : require("../../assets/icon/map_un.png");
          } else if (route.name === "Book") {
            iconName = focused
              ? require("../../assets/icon/book_ch.png")
              : require("../../assets/icon/book_un.png");
          } else if (route.name === "MyPage") {
            iconName = focused
              ? require("../../assets/icon/my_ch.png")
              : require("../../assets/icon/my_un.png");
          }

          return <Image source={iconName} style={{ width: 30, height: 30 }} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Book" component={BookScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default Nav;
