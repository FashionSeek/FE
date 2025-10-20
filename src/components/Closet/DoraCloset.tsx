import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCloset } from '../../contexts/ClosetContext';

const DoraCloset = () => {
  const navigation = useNavigation();
  const { addClothes } = useCloset();

  const [selectedCategory, setSelectedCategory] = useState('아우터'); // 기본 카테고리

  // 카테고리별 미리 등록된 옷 이미지 (로컬 이미지)
  const allClothes = {
    아우터: [
      require('../../assets/Closet/outer1.png'),
      require('../../assets/Closet/outer2.png'),
      require('../../assets/Closet/outer3.png'),
      require('../../assets/Closet/outer4.png'),
    ],
    상의: [
      require('../../assets/Closet/sweater.png'),
      require('../../assets/Closet/tshirt1.png'),
      require('../../assets/Closet/tshirt2.png'),
      require('../../assets/Closet/hoodie.png'),
    ],
    하의: [
      require('../../assets/Closet/brownpants.png'),
      require('../../assets/Closet/pants1.png'),
      require('../../assets/Closet/skirt1.png'),
      require('../../assets/Closet/skirt2.png'),
      require('../../assets/Closet/skirt3.png'),
    ],
  };

  const clothesForCategory = allClothes[selectedCategory]; // 선택된 카테고리에 해당하는 옷들

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dora's CLOSET</Text>

      {/* 카테고리 버튼 */}
      <View style={styles.categoryContainer}>
        {['아우터', '상의', '하의'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton, // 선택된 버튼 스타일
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.selectedCategoryButtonText, // 선택된 버튼 텍스트 스타일
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}> </Text>

      {/* 옷장 컴포넌트 */}
      <View style={styles.closetContainer}>
        {clothesForCategory.map((item, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.hangerContainer}>
              <Image
                source={require('../../assets/Closet/hanger.png')}
                style={styles.hangerImage}
              />
              <Image
                source={item} // 로컬 이미지 사용
                style={styles.clothesImage}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('ClosetMain')}>
        <Image source={require('../../assets/common/next.png')} style={styles.nextButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'magenta',
    marginTop: 20,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#FCA0BF', // 선택된 버튼 배경
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedCategoryButtonText: {
    color: '#fff', // 선택된 버튼 텍스트 색상
  },
  closetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  hangerContainer: {
    width: 130,
    height: 70,
    margin: 10,
    position: 'relative',
  },
  hangerImage: {
    width: '100%',
    height: '100%',
  },
  clothesImage: {
    width: 140,
    height: 80,
    position: 'absolute',
    top: '0%',
    left: '0%',
    resizeMode: 'contain',
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default DoraCloset;
