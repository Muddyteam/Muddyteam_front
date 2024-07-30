import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView, // ScrollView를 올바르게 import합니다.
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const imageHeight = (windowWidth * 8875) / 2418; // 화면 너비에 맞춘 이미지 높이

export default function Retro() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/imgs/retro.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: windowWidth,
    height: imageHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
