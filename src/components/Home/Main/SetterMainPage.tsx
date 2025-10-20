import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Circle } from 'react-native-progress'; // 라이브러리에서 가져오기

const SetterMainPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Main Page</Text>
      <Text style={styles.subHeader}>Matching</Text>

  <TouchableOpacity onPress={() => navigation.navigate('MatchingPage')}>
    <View style={styles.chartContainer}>
      <Text style={styles.chartText}>현재 요청서의 수락 현황은.....</Text>
      <View style={styles.progressWrapper}>
        {/* Circular Progress */}
        <Circle
          size={100} // 원 크기
          progress={0.2} // 진행률 (0~1 사이 값)
          thickness={8} // 원 테두리 두께
          color="#FCA0BF" // 진행된 부분 색상
          unfilledColor="#e0e0e0" // 미진행 부분 색상
          showsText={false} // 기본 텍스트 비활성화
        />
        {/* Custom 중앙 텍스트 */}
        <Text style={styles.progressText}>20%</Text>
      </View>
    </View>
  </TouchableOpacity>


      {/* 버튼 컨테이너 */}
      <View style={[styles.buttonContainer, { justifyContent: 'center' }]}>
        {/* 요청서 수락하기 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RequestApproval')}
        >
          <Icon name="check" size={20} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>요청서 수락하기</Text>
        </TouchableOpacity>

        {/* 제안서 작성하기 버튼 숨김 */}
        <TouchableOpacity
          style={[styles.hiddenButton]}
          onPress={() => navigation.navigate('ChatDetail', { chatId: 'fashionlover' })}
        >
          <View style={styles.iconWrapper}>
            <Icon name="plus" size={16} color="#fff" />
          </View>
          <Text style={styles.buttonText}>제안서 작성하기</Text>
        </TouchableOpacity>
      </View>

      {/* 마이페이지 버튼 */}
      <View style={styles.singleButtonContainer}>
        <TouchableOpacity
          style={styles.singleButton}
          onPress={() => navigation.navigate('MyPageTabView')}
        >
          <Text style={styles.singleButtonText}>마이페이지</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // 연한 회색 배경
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FCA0BF',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff', // 흰색 배경
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // 그림자 추가
  },
  chartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
     backgroundColor: '#ffe4e9', // 더 부드러운 핑크 배경
     paddingVertical: 15,
     paddingHorizontal: 20,
     borderRadius: 12,
     alignItems: 'center',
     justifyContent: 'center',
     flexDirection: 'row',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.2,
     shadowRadius: 4,
     elevation: 5,
     width: '80%',
   },
   buttonText: {
     fontSize: 16,
     fontWeight: 'bold',
     color: '#333', // 더 부드러운 텍스트 색상
   },
   singleButtonContainer: {
     alignItems: 'center',
     width: '80%',
     marginTop: 10,
   },
   singleButton: {
     backgroundColor: '#d9d9d9', // 더 부드러운 회색
     paddingVertical: 15,
     borderRadius: 12,
     alignItems: 'center',
     justifyContent: 'center',
     width: '80%',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.2,
     shadowRadius: 4,
     elevation: 5,
   },
   singleButtonText: {
     fontSize: 16,
     fontWeight: 'bold',
     color: '#333', // 텍스트 색상 유지
   },
   hiddenButton: {
     display: 'none',
   },
   iconWrapper: {
     width: 24,
     height: 24,
     borderRadius: 12,
     backgroundColor: '#ffe4e9', // 부드러운 핑크
     alignItems: 'center',
     justifyContent: 'center',
     marginRight: 5,
   },
   progressWrapper: {
     position: 'relative', // 부모 요소를 기준으로 자식 요소 겹치기
     alignItems: 'center',
     justifyContent: 'center',
     marginTop: 10,
   },
   progressText: {
     position: 'absolute', // 부모 뷰의 중앙에 배치
     fontSize: 18, // 텍스트 크기
     fontWeight: 'bold', // 굵은 텍스트
     color: '#FCA0BF', // 핑크 텍스트
   },
 });

export default SetterMainPage;
