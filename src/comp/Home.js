import React, { useState, useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HeaderBackground = styled.View`
  height: 200px;
  background-color: ${({ theme }) => theme.background || "#8DC8FF"};
  padding: 20px;
  justify-content: flex-start;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
`;

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTextLeft = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  font-family: ${({ theme }) => theme.font};
`;

const Content = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  font-family: ${({ theme }) => theme.font};
`;

const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (route.params?.username) {
      setUsername(route.params.username);
      setIsLoggedIn(true);
    }
  }, [route.params?.username]);

  return (
    <Container>
      <StatusBar backgroundColor="#8DC8FF" barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderBackground>
          <HeaderContainer>
            <HeaderTextLeft>MUDDY</HeaderTextLeft>
          </HeaderContainer>
          {isLoggedIn ? (
            <>
              <HeaderText style={{ fontSize: 15 }}>
                즐거운 하루 보내세요
                <HeaderText style={{ fontSize: 30 }}>
                  {"\n"}
                  {username} 님
                </HeaderText>
              </HeaderText>
            </>
          ) : (
            <>
              <HeaderText style={{ fontSize: 20 }}>
                로그인 하고 모든 서비스를 이용하세요
              </HeaderText>
              <TouchableOpacity
                onPress={() => navigation.navigate("LogInPage")}
              >
                <HeaderText>로그인 하기</HeaderText>
              </TouchableOpacity>
            </>
          )}
        </HeaderBackground>
        <Content>{/* 이곳에 다른 콘텐츠를 추가하세요 */}</Content>
      </SafeAreaView>
    </Container>
  );
};

export default HomeScreen;
