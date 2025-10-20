import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SeekerSignup = () => {
 const navigation = useNavigation(); // 네비게이션 훅 추가
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [complex, setComplex] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');

  // 비밀번호 검증
  const validatePassword = (text) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(text)) {
      setPasswordError('비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
    setPassword(text);
  };


  const validateHeight = (text) => {
    const heightRegex = /^[0-9]*$/;
    if (!heightRegex.test(text)) {
      setHeightError('숫자만 입력해주세요.');
    } else {
      setHeightError('');
    }
    setHeight(text);
  };


  const validateWeight = (text) => {
    const weightRegex = /^[0-9]*$/;
    if (!weightRegex.test(text)) {
      setWeightError('숫자만 입력해주세요.');
    } else {
      setWeightError('');
    }
    setWeight(text);
  };

  const handleNext = () => {
    navigation.navigate('StyleSelection'); // StyleSelection 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seeker</Text>


      <TextInput
        style={styles.input}
        placeholder="이메일 입력"
        value={id}
        onChangeText={setId}

          autoCompleteType="off" // Disable auto-fill
          autoComplete="off" // Newer React Native versions
          textContentType="none" // Disable auto-fill
        />

      <TextInput
        style={[styles.input, passwordError && styles.errorInput]}
        placeholder="비밀번호 (영문, 숫자 혼합 8자 이상)"
        secureTextEntry
        value={password}
        onChangeText={(text) => validatePassword(text)}

          autoCompleteType="off" // Disable auto-fill
            autoComplete="off" // Newer React Native versions
          textContentType="none" // Disable auto-fill
          />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


      <TextInput
        style={styles.input}
        placeholder="닉네임 입력"
        value={nickname}
        onChangeText={setNickname}
      />


      <TextInput
        style={[styles.input, heightError && styles.errorInput]}
        placeholder="키 (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => validateHeight(text)}
      />
      {heightError ? <Text style={styles.errorText}>{heightError}</Text> : null}


      <TextInput
        style={[styles.input, weightError && styles.errorInput]}
        placeholder="몸무게 (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={validateWeight}
      />
      {weightError ? <Text style={styles.errorText}>{weightError}</Text> : null}


      <TextInput
        style={styles.input}
        placeholder="컴플렉스 입력 (예: 하체비만)"
        value={complex}
        onChangeText={setComplex}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FCA0BF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#FCA0BF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeekerSignup;
