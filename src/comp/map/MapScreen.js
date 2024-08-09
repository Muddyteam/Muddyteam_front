import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
} from "react-native";
import { WebView } from "react-native-webview";

const PlaceInfo = ({
  name,
  address,
  rating,
  reviews,
  imageUrl,
  animationValue,
  panResponder,
  togglePlaceInfo,
}) => {
  return (
    <TouchableWithoutFeedback onPress={togglePlaceInfo}>
      <Animated.View
        style={[styles.infoContainer, { height: animationValue }]}
        {...panResponder.panHandlers} // PanResponder 핸들러 연결
      >
        <Text style={styles.placeName}>{name}</Text>
        <Animated.View
          style={{
            opacity: animationValue.interpolate({
              inputRange: [50, 300],
              outputRange: [0, 1],
              extrapolate: "clamp",
            }),
          }}
        >
          <Text style={styles.placeAddress}>{address}</Text>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPlaceInfoOpen, setIsPlaceInfoOpen] = useState(false);
  const animationValue = useRef(new Animated.Value(50)).current; // PlaceInfo 기본값을 접힌 상태로 시작

  const handleSearch = () => {
    // 검색 기능 구현
  };

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
    Animated.spring(animationValue, {
      toValue: 300, // PlaceInfo를 완전히 열기
      useNativeDriver: false,
    }).start(() => setIsPlaceInfoOpen(true));
  };

  const togglePlaceInfo = () => {
    if (isPlaceInfoOpen) {
      Animated.spring(animationValue, {
        toValue: 50, // PlaceInfo를 접음 (이름만 보임)
        useNativeDriver: false,
      }).start(() => setIsPlaceInfoOpen(false));
    } else {
      Animated.spring(animationValue, {
        toValue: 300, // PlaceInfo를 펼침
        useNativeDriver: false,
      }).start(() => setIsPlaceInfoOpen(true));
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10; // 수직으로 10픽셀 이상 이동하면 PanResponder 활성화
      },
      onPanResponderMove: (_, gestureState) => {
        // 위로 슬라이드 시 PlaceInfo를 펼치도록 애니메이션 값 조정
        if (gestureState.dy < 0 && !isPlaceInfoOpen) {
          Animated.spring(animationValue, {
            toValue: 300,
            useNativeDriver: false,
          }).start(() => setIsPlaceInfoOpen(true));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // 아래로 크게 드래그했을 때 PlaceInfo를 최소화 (이름만 남김)
          Animated.spring(animationValue, {
            toValue: 50,
            useNativeDriver: false,
          }).start(() => setIsPlaceInfoOpen(false));
        } else if (gestureState.dy < -100) {
          // 위로 크게 드래그했을 때 PlaceInfo를 펼침
          Animated.spring(animationValue, {
            toValue: 300,
            useNativeDriver: false,
          }).start(() => setIsPlaceInfoOpen(true));
        }
      },
    })
  ).current;

  const handleMapPress = () => {
    Animated.spring(animationValue, {
      toValue: 50, // PlaceInfo를 최소화 (이름만 보임)
      useNativeDriver: false,
    }).start(() => setIsPlaceInfoOpen(false));
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>카카오맵 API</title>
      <style>
        body, html, #map {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      </style>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=984758e5ca934480c68000ae01d0f4ce"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        document.addEventListener('DOMContentLoaded', function () {
            var mapContainer = document.getElementById('map'),
                mapOption = {
                    center: new kakao.maps.LatLng(36.586285, 126.839239),
                    level: 11
                };
            var map = new kakao.maps.Map(mapContainer, mapOption);

            var apiKey = 'e31961d649db20096b9c38a445e3d04d';
            var query = '갯벌 체험장 충청';
            var apiUrl = 'https://dapi.kakao.com/v2/local/search/keyword.json?query=' + encodeURIComponent(query) + '&size=10';

            fetch(apiUrl, {
                headers: {
                    'Authorization': 'KakaoAK ' + apiKey
                }
            })
                .then(response => response.json())
                .then(data => {
                    var filteredPlaces = data.documents.filter(doc => !doc.place_name.includes('사무실'));

                    var places = filteredPlaces.map(doc => ({
                        name: doc.place_name,
                        address: doc.address_name,
                        rating: doc.user_rating, // 별점
                        reviews: doc.review_count, // 후기 개수
                        lat: parseFloat(doc.y),
                        lng: parseFloat(doc.x),
                        imageUrl: 'https://example.com/your-image-url.jpg' // 이미지 URL, 실제 API 데이터로 대체 가능
                    }));

                    places.forEach(function(place) {
                        var markerPosition = new kakao.maps.LatLng(place.lat, place.lng);

                        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
                        var imageSize = new kakao.maps.Size(64, 100);
                        var imageOption = {offset: new kakao.maps.Point(27, 69)};
                        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

                        var marker = new kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage
                        });

                        marker.setMap(map);

                        kakao.maps.event.addListener(marker, 'click', function() {
                            window.ReactNativeWebView.postMessage(JSON.stringify(place)); // React Native로 데이터 전송
                        });

                        kakao.maps.event.addListener(map, 'click', function() {
                            window.ReactNativeWebView.postMessage(JSON.stringify({})); // 빈 데이터 전송
                        });
                    });
                })
                .catch(error => console.error('Error:', error));
        });
      </script>
    </body>
    </html>
  `;

  return (
    <TouchableWithoutFeedback onPress={handleMapPress}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="검색" onPress={handleSearch} />

        <WebView
          originWhitelist={["*"]}
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
          onMessage={(event) => {
            const place = JSON.parse(event.nativeEvent.data);
            if (Object.keys(place).length > 0) {
              handlePlaceSelect(place);
            } else {
              setSelectedPlace(null);
            }
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
          onLoad={() => console.log("WebView loaded successfully")}
        />

        {selectedPlace && (
          <PlaceInfo
            name={selectedPlace.name}
            address={selectedPlace.address}
            rating={selectedPlace.rating}
            reviews={selectedPlace.reviews}
            imageUrl={selectedPlace.imageUrl}
            animationValue={animationValue}
            panResponder={panResponder}
            togglePlaceInfo={togglePlaceInfo} // 접힌 상태에서 눌렀을 때 다시 펼쳐지도록
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingLeft: 8,
    margin: 10,
  },
  infoContainer: {
    padding: 10,
    overflow: "hidden", // 컨텐츠가 접힐 때 잘리도록 설정
    borderTopLeftRadius: 30, // 상단 왼쪽 모서리만 둥글게
    borderTopRightRadius: 30, // 상단 오른쪽 모서리만 둥글게
    backgroundColor: "transparent", // 뒷배경이 보이도록 설정
    color: "white",
  },
  placeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeAddress: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  placeRating: {
    fontSize: 14,
    color: "#333",
  },
  placeImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});

export default MapScreen;
