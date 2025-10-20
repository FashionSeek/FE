import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Circle } from 'react-native-progress'; // 라이브러리에서 가져오기

const SeekerMainPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Main Page</Text>
      <Text style={styles.subHeader}>Matching</Text>

  <TouchableOpacity onPress={() => navigation.navigate('MatchingPageSeeker')}>
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
         <Text style={styles.progressText}>20%</Text>
       </View>
     </View>
   </TouchableOpacity>


      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WeatherPage')}
        >
          <Icon name="weather-sunny" size={24} color="#333" />
          <Text style={styles.buttonText}>날씨 확인하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RequestStyle')}
        >
          <Icon name="plus-circle-outline" size={24} color="#333" />
          <Text style={styles.buttonText}>요청서 작성</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddCloset')}
        >
          <Icon name="wardrobe-outline" size={24} color="#333" />
          <Text style={styles.buttonText}>옷장 등록</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CalendarWithCloset')}
        >
          <Icon name="calendar-outline" size={24} color="#333" />
          <Text style={styles.buttonText}>캘린더</Text>
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
    fontWeight: 'bold',
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
    marginBottom: 15,
  },
  progressWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCA0BF', // 핑크 텍스트
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffe4e9', // 연한 핑크 배경
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    flexDirection: 'row',
    shadowColor: '#000', // 그림자 추가
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
});

export default SeekerMainPage;
