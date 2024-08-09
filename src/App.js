import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogInPage from "./comp/LogInPage";
import Nav from "./comp/Nav"; // Nav.js 파일을 가져옵니다
import Retro from "./comp/Recommended_Place/retro";
import Time from "./comp/Cartoon/Time";
import Clothes from "./comp/Cartoon/Clothes";

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
          initialRouteName="Nav" // 처음 로드될 화면을 Nav로 설정합니다
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Nav" component={Nav} />
          <Stack.Screen name="LogInPage" component={LogInPage} />
          <Stack.Screen name="Retro" component={Retro} />
          <Stack.Screen name="Time" component={Time} />
          <Stack.Screen name="Clothes" component={Clothes} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
