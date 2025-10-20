import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BodyType = () => {
  const [selectedGender, setSelectedGender] = useState('female'); // Default to 'female'
  const [selectedBodyType, setSelectedBodyType] = useState(null); // Track selected body type
   const navigation = useNavigation(); // navigation 객체 사용

  const femaleBodyTypes = [
    { id: 1, image: require('../../assets/BodyType/1.jpg'), label: 'Petite' },
    { id: 2, image: require('../../assets/BodyType/2.jpg'), label: 'Column' },
    { id: 3, image: require('../../assets/BodyType/3.jpg'), label: 'Inverted Triangle' },
    { id: 4, image: require('../../assets/BodyType/4.jpg'), label: 'Apple' },
    { id: 5, image: require('../../assets/BodyType/5.jpg'), label: 'Brick' },
    { id: 6, image: require('../../assets/BodyType/6.jpg'), label: 'Pear' },
    { id: 7, image: require('../../assets/BodyType/7.jpg'), label: 'Hourglass' },
    { id: 8, image: require('../../assets/BodyType/8.jpg'), label: 'Full Hourglass' },
  ];

  const maleBodyTypes = [
    { id: 9, image: require('../../assets/BodyType/9.jpg'), label: 'Column' },
    { id: 10, image: require('../../assets/BodyType/10.jpg'), label: 'Trapezium' },
    { id: 11, image: require('../../assets/BodyType/11.jpg'), label: 'Circle' },
    { id: 12, image: require('../../assets/BodyType/12.jpg'), label: 'Oval' },
    { id: 13, image: require('../../assets/BodyType/13.jpg'), label: 'Rectangle' },
    { id: 14, image: require('../../assets/BodyType/14.jpg'), label: 'Square' },
    { id: 15, image: require('../../assets/BodyType/15.jpg'), label: 'Inverted Triangle' },
    { id: 16, image: require('../../assets/BodyType/16.jpg'), label: 'Triangle' },
  ];

  const bodyTypes = selectedGender === 'female' ? femaleBodyTypes : maleBodyTypes;

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedBodyType(null); // Reset body type selection when gender changes
  };

  const renderBodyType = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedBodyType(item.id)} style={styles.bodyTypeContainer}>
      <Image source={item.image} style={styles.bodyImage} />
      <Text style={styles.bodyLabel}>{item.label}</Text>
      {selectedBodyType === item.id && <Text style={styles.checkmark}>✔️</Text>}
    </TouchableOpacity>
  );

  const handleConfirm = () => {
    if (selectedBodyType) {
      navigation.navigate('Congratulations'); // Congratulation 페이지로 이동
    } else {
      alert('체형을 선택해주세요.');
    }
    // Handle the confirmation action
    console.log('Selected Body Type:', selectedBodyType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>당신의 체형은?</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          onPress={() => handleGenderChange('female')}
          style={[styles.genderButton, selectedGender === 'female' && styles.selectedGender]}
        >
          <Text>여성</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleGenderChange('male')}
          style={[styles.genderButton, selectedGender === 'male' && styles.selectedGender]}
        >
          <Text>남성</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={bodyTypes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBodyType}
        numColumns={2}
        contentContainerStyle={styles.bodyTypeList}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedGender: {
    backgroundColor: 'lightpink',
  },
  bodyTypeContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  bodyImage: {
    width: 100,
    height: 150,
    marginBottom: 10,
  },
  bodyLabel: {
    textAlign: 'center',
  },
  checkmark: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 24,
    color: 'green',
  },
  confirmButton: {
    backgroundColor: '#FCA0BF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyTypeList: {
    justifyContent: 'center',
  },
});

export default BodyType;

