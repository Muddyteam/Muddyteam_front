import React, { useState, useEffect, useContext } from "react";
import {
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ThemeContext } from "styled-components";

const Home = ({ navigation }) => {
  const route = useRoute();
  const theme = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (route.params?.username) {
      setUsername(route.params.username);
      setIsLoggedIn(true);
    }
  }, [route.params?.username]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8DC8FF" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerBackground}>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTextLeft, { fontFamily: theme.font }]}>
                MUDDY
              </Text>
              <View style={styles.userGreetingContainer}>
                {isLoggedIn ? (
                  <>
                    <Text
                      style={[
                        styles.userGreetingText,
                        { fontFamily: theme.font },
                      ]}
                    >
                      즐거운 하루 보내세요
                    </Text>
                    <TouchableOpacity onPress={handleLogout}>
                      <Text
                        style={[
                          styles.usernameText,
                          { fontFamily: theme.font },
                        ]}
                      >
                        {username} 님
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text
                      style={[
                        styles.userGreetingText,
                        { fontFamily: theme.font },
                      ]}
                    >
                      로그인 하고 모든 서비스를 이용하세요
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("LogInPage")}
                    >
                      <Text
                        style={[
                          styles.usernameText,
                          { fontFamily: theme.font },
                        ]}
                      >
                        로그인 하기
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/imgs/black.png")}
                style={styles.styledImage}
              />
            </View>
          </View>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Text style={[styles.boxText, { fontFamily: theme.font }]}>
                입장
              </Text>
              <Text style={[styles.timeText, { fontFamily: theme.font }]}>
                12:00
              </Text>
            </View>
            <View style={styles.box}>
              <Text style={[styles.boxText, { fontFamily: theme.font }]}>
                퇴장
              </Text>
              <Text style={[styles.timeText, { fontFamily: theme.font }]}>
                16:00
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.iconcontainer}>
              <View style={styles.item}>
                <Image
                  source={require("../../assets/icon/tide.png")}
                  style={styles.icon}
                />
                <Text style={[styles.text, { fontFamily: theme.font }]}>
                  물때표
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.item}>
                <Image
                  source={require("../../assets/icon/weather.png")}
                  style={styles.icon}
                />
                <Text style={[styles.text, { fontFamily: theme.font }]}>
                  지역 날씨
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.item}>
                <Image
                  source={require("../../assets/icon/warning.png")}
                  style={styles.icon}
                />
                <Text style={[styles.text, { fontFamily: theme.font }]}>
                  기상 특보
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.recommendationSection}>
            <Text style={[styles.sectionTitle, { fontFamily: theme.font }]}>
              여기는 어떠세요?
            </Text>
            <TouchableOpacity
              style={styles.recommendationBox}
              //onPress={() => navigation.navigate("Retro")}
            >
              <Image
                source={require("../../assets/imgs/placethumbnail.png")}
                style={styles.recommendationImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.reviewSection}>
            <Text style={[styles.sectionTitle, { fontFamily: theme.font }]}>
              최신 리뷰
            </Text>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewBox} />
              <View style={styles.reviewBox} />
              <View style={styles.reviewBox} />
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: 20,
  },
  headerBackground: {
    height: 220,
    backgroundColor: "#8DC8FF",
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 2,
    justifyContent: "center",
  },
  headerTextLeft: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  userGreetingContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  userGreetingText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#213F5A",
  },
  usernameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#213F5A",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  styledImage: {
    width: 150,
    height: 170,
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -60,
  },
  box: {
    width: 160,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  boxText: {
    fontSize: 25,
    color: "#6290BA",
    margin: 5,
  },
  timeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6290BA",
  },
  content: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  iconcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#6290BA",
  },
  separator: {
    width: 1,
    height: 35,
    backgroundColor: "#c1c1c1",
    marginHorizontal: 0,
  },
  recommendationSection: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  recommendationBox: {
    width: "100%",
    height: 190,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  recommendationImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  reviewSection: {
    padding: 10,
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewBox: {
    width: "30%",
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
});

export default Home;
