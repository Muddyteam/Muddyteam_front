import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogInPage from "./comp/LogInPage";
import Home from "./comp/Home";
import Retro from "./comp/Recommended_Place/retro";

const loadFonts = async () => {
  await Font.loadAsync({
    "WavvePADO-Regular": require("../assets/fonts/WavvePADO-Regular-2.ttf"),
  });
};

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch((error) => console.error("Error loading fonts: ", error));
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={{ ...theme, font: "WavvePADO-Regular" }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="LogInPage" component={LogInPage} />
          <Stack.Screen name="Retro" component={Retro} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
