import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import BottomButton from '../../../common/BottomButton';

const RequestStyle = () => {
  const navigation = useNavigation(); // Navigation object

  // State management
  const [clothes, setClothes] = useState<string | number[]>([]); // Selected clothes URIs
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedWith, setSelectedWith] = useState<string | null>(null);
  const [isBodyPublic, setIsBodyPublic] = useState(false);
  const [isComplexPublic, setIsComplexPublic] = useState(false);
  const [additionalRequest, setAdditionalRequest] = useState<string>('');

  // 디버깅을 위해 photos 상태가 업데이트될 때마다 출력
  useEffect(() => {
    console.log('Updated clothes:', clothes);
  }, [clothes]);

  // Navigate to ClosetMain to select clothes
  const handleClothesSelection = () => {
    navigation.navigate('ClosetMain', {
      onSelect: (selectedClothes: string | number[]) => setClothes(selectedClothes),
    });
  };

  // Handle removing a selected piece of clothing
  const handleRemoveClothes = (itemUri: string | number) => {
    setClothes(clothes.filter((item) => item !== itemUri));
  };


  // Proceed to the next page
  const handleNextPress = () => {
    if (!selectedPlace || !selectedSeason || !selectedWeather || !selectedStyle || !selectedWith) {
      Alert.alert("모든 항목을 선택해주세요.");
      return;
    }

    navigation.navigate('RequestPage', {
      selectedPlace,
      selectedSeason,
      selectedWeather,
      selectedStyle,
      selectedWith,
      isBodyPublic,
      isComplexPublic,
      additionalRequest,
      clothes,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Request</Text>


        <Text style={styles.sectionTitle}>Clothes</Text>
        <TouchableOpacity onPress={handleClothesSelection} >
              <Image
                source={require('../../../assets/Closet/hanger.png')}
                style={styles.hangerImage}
              />
        </TouchableOpacity>


        <View style={styles.photosContainer}>
          {clothes.map((itemUri, index) => (
            <View key={index} style={styles.photoContainer}>
                <Image
                  source={typeof itemUri === 'number' ? itemUri : { uri: itemUri }}
                  style={styles.photo}
                />

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveClothes(itemUri)}
              >
                <Text style={styles.removeButtonText}> - </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>


        <Text style={styles.sectionTitle}>Place</Text>
        <View style={styles.buttonGroup}>
          {["공원", "레스토랑", "카페", "여행", "학교", "기타"].map((place) => (
            <TouchableOpacity
              key={place}
              style={[
                styles.button,
                selectedPlace === place && styles.selectedButton,
              ]}
              onPress={() => setSelectedPlace(place)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedPlace === place && styles.selectedButtonText,
                ]}
              >
                {place}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


        <Text style={styles.sectionTitle}>Season</Text>
        <View style={styles.buttonGroup}>
          {["spring/fall", "summer", "winter"].map((season) => (
            <TouchableOpacity
              key={season}
              style={[
                styles.button,
                selectedSeason === season && styles.selectedButton,
              ]}
              onPress={() => setSelectedSeason(season)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedSeason === season && styles.selectedButtonText,
                ]}
              >
                {season}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


        <Text style={styles.sectionTitle}>Weather</Text>
        <View style={styles.buttonGroup}>
          {["비", "바람", "눈", "습함"].map((weather) => (
            <TouchableOpacity
              key={weather}
              style={[
                styles.button,
                selectedWeather === weather && styles.selectedButton,
              ]}
              onPress={() => setSelectedWeather(weather)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedWeather === weather && styles.selectedButtonText,
                ]}
              >
                {weather}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


        <Text style={styles.sectionTitle}>Style</Text>
        <View style={styles.buttonGroup}>
          {["캐주얼", "비즈니스", "포멀", "스포티", "스트리트", "미니멀", "빈티지", "페미닌", "힙", "기타"].map((style) => (
            <TouchableOpacity
              key={style}
              style={[
                styles.button,
                selectedStyle === style && styles.selectedButton,
              ]}
              onPress={() => setSelectedStyle(style)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedStyle === style && styles.selectedButtonText,
                ]}
              >
                {style}
              </Text>
            </TouchableOpacity>
          ))}
        </View>


        <Text style={styles.sectionTitle}>With</Text>
        <View style={styles.buttonGroup}>
          {["친구", "연인", "가족", "비즈니스", "기타"].map((withWho) => (
            <TouchableOpacity
              key={withWho}
              style={[
                styles.button,
                selectedWith === withWho && styles.selectedButton,
              ]}
              onPress={() => setSelectedWith(withWho)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedWith === withWho && styles.selectedButtonText,
                ]}
              >
                {withWho}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

            <View style={{ paddingHorizontal: 45, paddingVertical: 10 }}>
                </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>체형 공개</Text>
            <Switch
              value={isBodyPublic}
              onValueChange={(value) => setIsBodyPublic(value)}
              trackColor={{ false: "#e0e0e0", true: "#f5c6d5" }}
              thumbColor={isBodyPublic ? "#FCA0BF" : "#fff"}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>컴플렉스 공개</Text>
            <Switch
              value={isComplexPublic}
              onValueChange={(value) => setIsComplexPublic(value)}
              trackColor={{ false: "#e0e0e0", true: "#f5c6d5" }}
              thumbColor={isComplexPublic ? "#FCA0BF" : "#fff"}
            />
          </View>
        </View>

              <View style={{ paddingHorizontal: 45, paddingVertical: 20 }}>
        </View>

        <Text style={styles.sectionTitle}>추가 요청사항</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="추가 요청사항을 입력해주세요"
          multiline
          numberOfLines={4}
          value={additionalRequest}
          onChangeText={(text) => setAdditionalRequest(text)}
        />
      </View>

      <View style={{ paddingHorizontal: 45, paddingVertical: 20 }}>
        <BottomButton value='다음' pressed={false} onPress={handleNextPress} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'black',
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e0e0e0", // 기본 버튼 색상: 회색
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#f5c6d5', // 선택된 버튼 색상: 부드러운 핑크색
  },
  buttonText: {
    fontSize: 14,
    color: 'black', // 기본 텍스트 색상
  },
  selectedButtonText: {
    color: 'black', // 선택된 상태의 텍스트 색상
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  grayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 20,
    paddingVertical: 6,
  },
  grayButtonText: {
    color: 'black',
    fontSize: 16,
  },
  hangerImage: {
    width: 51,
    height: 27,
  },
  removeButton: {
    position: 'absolute',
    right: 5,
    backgroundColor: '#FCA0BF',
    borderRadius: 100,
  },
  removeButtonText: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: 'black',
  },
  switchTrackColor: {
    true: '#f5c6d5', // 스위치가 켜졌을 때 트랙 색상: 부드러운 핑크색
    false: '#e0e0e0', // 스위치가 꺼졌을 때 트랙 색상: 회색
  },
  switchThumbColor: {
    true: '#fff', // 스위치가 켜졌을 때 thumb 색상
    false: '#fff', // 스위치가 꺼졌을 때 thumb 색상
  },
  bottomButton: {
    backgroundColor: '#ffe4e9', // 부드러운 핑크색 (다음 버튼)
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RequestStyle;