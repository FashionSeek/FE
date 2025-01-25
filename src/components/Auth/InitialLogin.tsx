import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InitialLogin = ({ setUserType = () => {} }) => {
  const navigation = useNavigation(); // 네비게이션 객체 사용

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.header, color: 'deeppink' }}>Fashion</Text>
      <Text style={{ ...styles.header, marginBottom: 10, color: 'black' }}>Seeker</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SeekerLogin')}
        >
          <Text style={styles.buttonText}>SeekerLogin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SetterLogin')}
        >
          <Text style={styles.buttonText}>SetterLogin</Text>
        </TouchableOpacity>
      </View>

      <View style={{ ...styles.textButtonContainer, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => { /* 비밀번호찾기 기능 */ }}>
          <Text style={styles.textButton}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChooseUserType')}>
          <Text style={styles.textButton}>회원가입</Text>
        </TouchableOpacity>
      </View>

      {/* Seeker 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setUserType('seeker'); // 사용자 유형 설정
          navigation.navigate('SeekerMainPage'); // SeekerMainPage로 이동
        }}
      >
        <Text style={styles.buttonText}>Seeker</Text>
      </TouchableOpacity>

      {/* Setter 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setUserType('setter'); // 사용자 유형 설정
          navigation.navigate('SetterMainPage'); // SetterMainPage로 이동
        }}
      >
        <Text style={styles.buttonText}>Setter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 50,
    fontWeight: '900',
    color: 'Black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffe4e9',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 60,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginTop: 10,
  },
  textButton: {
    fontSize: 14,
    color: 'black',
  },
});

export default InitialLogin;
