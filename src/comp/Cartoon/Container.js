import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import useInterval from "./Interval";

const windowWidth = Dimensions.get("window").width;
const margin = 12;

export default function CartoonContainer() {
  const data = useMemo(
    () => [
      {
        mainImageUrl: require("../../../assets/imgs/black.png"),
      },
      {
        mainImageUrl: require("../../../assets/imgs/black.png"),
      },
      {
        mainImageUrl: require("../../../assets/imgs/black.png"),
      },
    ],
    []
  );

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useInterval(() => {
    // 3초마다 실행되는 함수
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
  }, 5000);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.touchable}>
            <ImageBackground
              style={styles.card}
              imageStyle={styles.image}
              source={item.mainImageUrl}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => String(index)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: "#fff",
    paddingTop: 8,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  touchable: {
    marginRight: margin,
  },
  card: {
    width: 250,
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
