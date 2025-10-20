import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet,ScrollView,Alert,Image,} from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParams } from '../../../pages/Home'; // 네비게이션 타입 추가
import BottomButton from '../../../common/BottomButton';


const RequestPage = ({ route, navigation }: StackScreenProps<HomeStackParams, 'RequestPage'>) => {
  // RequestPage에서 전달된 데이터 가져오기
  const {
  clothes = [],
    photos = [],
    selectedPlace,
    selectedSeason,
    selectedWeather,
    selectedStyle,
    selectedWith,
    isBodyPublic,
    isComplexPublic,
    additionalRequest,
  } = route.params || {}; // route.params를 통해 데이터 받아오기

  const handleNextPress = () => {
    navigation.navigate('RequestSent');
  };


useEffect(() => {
  console.log('Received clothes:', clothes);
}, [clothes]);


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Request Confirmation</Text>

      {clothes.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Selected Clothes</Text>
          <View style={styles.photosContainer}>
            {clothes.map((itemUri, index) => (
              <Image
                key={index}
                  source={typeof itemUri === 'number' ? itemUri : { uri: itemUri }}
                style={styles.photo}
              />
            ))}
          </View>
        </>
      )}



      <Text style={styles.sectionTitle}>Place</Text>
      <View style={styles.buttonGroup}>
        {["공원", "레스토랑", "카페", "여행", "학교", "기타"].map((place) => (
          <View
            key={place}
            style={[
              styles.button,
              selectedPlace === place && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedPlace === place && styles.selectedButtonText,
              ]}
            >
              {place}
            </Text>
          </View>
        ))}
      </View>


      <Text style={styles.sectionTitle}>Season</Text>
      <View style={styles.buttonGroup}>
        {["spring/fall", "summer", "winter"].map((season) => (
          <View
            key={season}
            style={[
              styles.button,
              selectedSeason === season && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedSeason === season && styles.selectedButtonText,
              ]}
            >
              {season}
            </Text>
          </View>
        ))}
      </View>


      <Text style={styles.sectionTitle}>Weather</Text>
      <View style={styles.buttonGroup}>
        {["비", "바람", "눈", "습함"].map((weather) => (
          <View
            key={weather}
            style={[
              styles.button,
              selectedWeather === weather && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedWeather === weather && styles.selectedButtonText,
              ]}
            >
              {weather}
            </Text>
          </View>
        ))}
      </View>


      <Text style={styles.sectionTitle}>Style</Text>
      <View style={styles.buttonGroup}>
        {["캐주얼", "비즈니스", "포멀", "스포티", "스트리트", "미니멀", "빈티지", "페미닌", "힙", "기타"].map((style) => (
          <View
            key={style}
            style={[
              styles.button,
              selectedStyle === style && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedStyle === style && styles.selectedButtonText,
              ]}
            >
              {style}
            </Text>
          </View>
        ))}
      </View>


      <Text style={styles.sectionTitle}>With</Text>
      <View style={styles.buttonGroup}>
        {["친구", "연인", "가족", "비즈니스", "기타"].map((withWho) => (
          <View
            key={withWho}
            style={[
              styles.button,
              selectedWith === withWho && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selectedWith === withWho && styles.selectedButtonText,
              ]}
            >
              {withWho}
            </Text>
          </View>
        ))}
      </View>


      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>체형 공개</Text>
          <Text style={styles.value}>{isBodyPublic ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>컴플렉스 공개</Text>
          <Text style={styles.value}>{isComplexPublic ? 'Yes' : 'No'}</Text>
        </View>
      </View>


      <Text style={styles.sectionTitle}>추가 요청사항</Text>
      <View style={styles.additionalRequestContainer}>
        <Text style={styles.value}>{additionalRequest}</Text>
      </View>

      <View style={{ paddingHorizontal: 45, paddingVertical: 50 }}>
        <BottomButton value='SEND' pressed={false} onPress={handleNextPress} />
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
    color: '#8E8E8E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'black'
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 14,
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  switchContainer: {
    marginTop: 20,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  additionalRequestContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  photo: {
    width: 130,
    height: 130,
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#ffe4e9',
  },

});

export default RequestPage;