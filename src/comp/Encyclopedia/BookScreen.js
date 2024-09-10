import React, { useContext, useEffect, useState } from "react";
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import { ThemeContext } from "styled-components";
import SpeciesCard from "./SpeciesCard";

const ChatbotBox = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={styles.chatbotContainer}>
      <Image
        source={require("../../../assets/icon/robot.png")}
        style={styles.chatbotImage}
      />
      <Text style={[styles.chatbotText, { fontFamily: theme.font }]}>
        챗봇에게 물어보기
      </Text>
    </View>
  );
};

const BookScreen = () => {
  const theme = useContext(ThemeContext);
  const [speciesData, setSpeciesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await fetch("http://172.25.81.165:8080/mudbio/info");
        const data = await response.json();
        console.log(data); // 응답 데이터 구조를 확인

        // 데이터가 배열인지, 객체인지 확인 후 처리
        const items = data.body.items.item;
        const speciesArray = Array.isArray(items) ? items : [items]; // 단일 객체일 경우 배열로 변환

        setSpeciesData(speciesArray); // 배열로 설정
        setLoading(false);
      } catch (error) {
        console.error("Error fetching species data:", error);
        setLoading(false);
      }
    };

    fetchSpeciesData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8DC8FF" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <Text style={[styles.bookText, { fontFamily: theme.font }]}>
            갯벌 생태 도감
          </Text>
          <ChatbotBox />
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="검색"
            returnKeyType="search"
          />
        </View>

        {/* ScrollView to display species cards */}
        <ScrollView>
          {speciesData.map((species, index) => (
            <SpeciesCard
              key={index} // 인덱스를 키로 사용
              name={species.mdftLvbNm} // mdftLvbNm 값을 name으로 사용
              category={species.mdftFrmtPlaceCn} // mdftFrmtPlaceCn 값을 category로 사용
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: 5,
  },
  bookText: {
    fontSize: 25,
  },
  chatbotContainer: {
    backgroundColor: "#8DC8FF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
  },
  chatbotText: {
    fontSize: 15,
    color: "white",
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    marginTop: 5,
  },
  searchBar: {
    borderColor: "#8DC8FF",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookScreen;
