import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const imageHeight = windowWidth; // 화면 너비에 비례한 이미지 높이 설정

export default function Time() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/cartoon/clothes1.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <ImageBackground
          source={require("../../../assets/cartoon/clothes2.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <ImageBackground
          source={require("../../../assets/cartoon/clothes3.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <ImageBackground
          source={require("../../../assets/cartoon/clothes4.png")}
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
