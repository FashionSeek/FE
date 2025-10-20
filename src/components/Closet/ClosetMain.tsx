import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCloset } from '../../contexts/ClosetContext';

const ClosetMain = ({ navigation, route }) => {
  const { clothes } = useCloset(); // clothes 배열 가져오기
  const [availableClothes, setAvailableClothes] = useState<string | number[]>([
    require('../../assets/Closet/sweater.png'),
    require('../../assets/Closet/brownpants.png'),
    require('../../assets/StyleResult/img.png'),
    ]); // 선택되지 않은 옷들  , sweater.png 임의로 기본값으로 추가
  const [chosenClothes, setChosenClothes] = useState<string | number[]>([
      ]); // 선택된 옷들

  // clothes 값이 변경될 때 availableClothes 초기화
  useEffect(() => {
    setAvailableClothes((prev) => [...prev, ...clothes]);
  }, [clothes]);

  const handleChooseClothes = (itemUri: string | numver) => {
    // 선택된 옷을 availableClothes에서 제거하고 chosenClothes에 추가
    setAvailableClothes(availableClothes.filter((item) => item !== itemUri));
    setChosenClothes([...chosenClothes, itemUri]);
  };

  const handleRemoveFromChosen = (itemUri: string | number) => {
    // 선택된 옷을 chosenClothes에서 제거하고 availableClothes에 다시 추가
    setChosenClothes(chosenClothes.filter((item) => item !== itemUri));
    setAvailableClothes([...availableClothes, itemUri]);
  };

  const handleDone = () => {
    // 선택된 옷을 RequestForm에 전달
    if (route.params?.onSelect) {
      const formattedClothes = chosenClothes.map((itemUri) =>
        typeof itemUri === 'number' ? itemUri : { uri: itemUri }
      ); // `require`와 URI를 구분하여 전달
      route.params.onSelect(formattedClothes); // 콜백 호출
    }
    navigation.navigate('RequestStyle');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CLOSET</Text>

      {/* 선택되지 않은 옷들 */}
      <View style={styles.closetContainer}>
        {availableClothes.map((itemUri, index) => (
          <TouchableOpacity key={index} onPress={() => handleChooseClothes(itemUri)}>
            <View style={styles.clothesContainer}>
              <Image
                source={typeof itemUri === 'number' ? itemUri : { uri: itemUri }}
                style={styles.clothesImage}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>CHOSEN CLOTHES</Text>

      {/* 선택된 옷들 */}
      <View style={styles.chosenClothesContainer}>
        {chosenClothes.map((itemUri, index) => (
          <TouchableOpacity key={index} onPress={() => handleRemoveFromChosen(itemUri)}>
            <View style={styles.chosenClothesItem}>
            <Image
              source={typeof itemUri === 'number' ? itemUri : { uri: itemUri }}
              style={styles.clothesImage}
            />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 완료 버튼 */}
      <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
        <Text style={styles.doneButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  clothesContainer: {
    width: 130,
    height: 130,
    margin: 10,
  },
  clothesImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  chosenClothesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
  },
  chosenClothesItem: {
    width: 130,
    height: 130,
    margin: 10,
    borderColor: '#8E8E8E',
    borderWidth: 2,
    borderRadius: 8,
  },
  doneButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClosetMain;