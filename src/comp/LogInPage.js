import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { WebView } from "react-native-webview";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #8dc8ff;
`;

const LogInText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
`;

const LogInBox = styled(Pressable)`
  background-color: #ffeb00;
  height: 50px;
  width: 200px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 5px;
`;

const LogInPage = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(false);
  const webviewRef = useRef(null);
  const navigation = useNavigation();

  const handleLogin = () => {
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;

    if (url.includes("https://muddy.com")) {
      const code = extractCodeFromUrl(url);
      if (code) {
        setShowWebView(false);
        getTokenAndProfile(code);
      }
    }
  };

  const extractCodeFromUrl = (url) => {
    const match = url.match(/code=([^&]*)/);
    return match ? match[1] : null;
  };

  const getTokenAndProfile = async (code) => {
    setLoading(true);
    try {
      const tokenResponse = await fetch(`https://kauth.kakao.com/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: "e31961d649db20096b9c38a445e3d04d",
          redirect_uri: "https://muddy.com",
          code: code,
        }).toString(),
      });
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const profileResponse = await fetch(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const profileData = await profileResponse.json();
      console.log("Profile Data:", profileData);

      try {
        // 백엔드에 프로필 정보를 보내고 로그인 응답 받기
        const response = await axios.post(
          "http://172.30.3.177:8080/kakao/login",
          {
            id: profileData.id,
            nickname: profileData.properties.nickname,
            profileImage: profileData.properties.profile_image,
            thumbnailImage: profileData.properties.thumbnail_image,
          }
        );

        // 백엔드에서 받은 응답 처리
        const {
          username,
          accessToken: serverAccessToken,
          refreshToken,
        } = response.data;

        // 필요시 토큰을 저장 (예: AsyncStorage, Context API, Redux 등)
        console.log("Username:", username);
        console.log("AccessToken:", serverAccessToken);
        console.log("RefreshToken:", refreshToken);

        setLoading(false);
        navigation.navigate("Home", {
          username: profileData.properties.nickname,
        });
      } catch (serverError) {
        console.error("Error sending profile data to server:", serverError);
        Alert.alert(
          "서버 전송 실패",
          `서버로 프로필 정보를 전송하는 데 실패했습니다: ${serverError.message}`
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching token or profile:", error);
      Alert.alert(
        "로그인 실패",
        `카카오 로그인에 실패했습니다: ${error.message}`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LogInText>MUDDY</LogInText>
        <LogInText>갯벌을 보는 새로운 시각</LogInText>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!showWebView && !loading ? (
          <LogInBox onPress={handleLogin}>
            <Text>카카오 로그인</Text>
          </LogInBox>
        ) : (
          <View style={styles.webviewContainer}>
            <WebView
              ref={webviewRef}
              source={{
                uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e31961d649db20096b9c38a445e3d04d&redirect_uri=https://muddy.com",
              }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
              startInLoadingState
              javaScriptEnabled
            />
          </View>
        )}
      </Container>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default LogInPage;
