import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RequestAccepted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* 메시지 */}
      <Text style={styles.message}>
        <Text style={styles.highlight}>Dora </Text>님의 요청서를 수락하셨습니다!
      </Text>

      {/* 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChatDetail', { chatId: 'fashionlover' })}
      >
        <Text style={styles.buttonText}>제안서 작성하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // 연한 회색 배경
    padding: 20,
  },
  message: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333', // 어두운 회색
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 30, // 텍스트 간격
  },
  highlight: {
    color: '#FCA0BF', // 핑크 강조
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FCA0BF', // 핑크 배경
    paddingVertical: 15, // 버튼 높이
    paddingHorizontal: 40, // 버튼 폭
    borderRadius: 30, // 둥근 버튼
    shadowColor: '#000', // 그림자
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // 안드로이드 그림자
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RequestAccepted;
