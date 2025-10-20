import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Congratulations = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('InitialLogin'); // 홈 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Dora님!</Text>
      <Text style={styles.subMessage}>Seeker가 되신 것을 축하드립니다</Text>

      <TouchableOpacity style={styles.button} onPress={goToHome}>
        <Text style={styles.buttonText}>홈 화면으로 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FCA0BF',
  },
  subMessage: {
    fontSize: 18,
    marginBottom: 30,
    color: 'black',
  },
  button: {
    backgroundColor: '#FCA0BF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Congratulations;
