import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RequestApproval = () => {
  const navigation = useNavigation();

  // 이름과 해시태그 데이터
  const hashtags = [
    "Dora #학교 #발표 #비즈니스",
    "Ariana #비즈니스 #회사 #미니멀",
    "Minki #친구 #여행 #캐쥬얼",
    "Sabrina #친구 #공원 #스트리트"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Request</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {hashtags.map((item, index) => {
          const [name, ...tags] = item.split(' '); // 이름과 해시태그 분리
          return (
            <View key={index} style={styles.rowContainer}>
              {/* 이름과 해시태그 */}
              <Text>
                <Text style={styles.name}>{name.trim()}</Text>{' '}
                <Text style={styles.hashtags}>{tags.join(' ')}</Text>
              </Text>

              {/* 버튼 컨테이너 */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                  <Text style={[styles.buttonText, { color: 'white' }]}>거절</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.acceptButton]}
                  onPress={() => navigation.navigate('RequestAccepted')}
                >
                  <Text style={[styles.buttonText, { color: '#FCA0BF' }]}>수락</Text>
                </TouchableOpacity>
              </View>

              {/* 주문서 확인 */}
              <TouchableOpacity
                style={styles.orderCheckButton}
                onPress={() => navigation.navigate('RequestPage')}
              >
                <Text style={styles.orderCheckText}>요청서 확인</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 50,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
   rowContainer: {
     backgroundColor: '#FFFFFF',
     borderRadius: 15,
     padding: 20,
     marginBottom: 20,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3,
   },
   name: {
     fontSize: 18,
     fontWeight: 'bold', // 이름은 굵게
     color: '#333', // 어두운 색상
     marginBottom: 10, // 이름과 해시태그 간격
   },
   hashtags: {
     fontSize: 16,
     color: '#555', // 밝은 회색
     fontWeight: '500', // 일반적인 굵기
     marginBottom: 15, // 해시태그와 버튼 간격
   },
   buttonContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginTop: 15, // 버튼을 위에서 떨어뜨림
   },
   button: {
     flex: 1,
     alignItems: 'center',
     paddingVertical: 12,
     marginHorizontal: 5, // 버튼 간 간격
     borderRadius: 20,
   },
   rejectButton: {
     backgroundColor: '#d3d3d3', // 연한 회색
     borderWidth: 1,
     borderColor: '#a9a9a9', // 테두리 회색
     paddingHorizontal: 20, // 수평 패딩 추가
   },
   acceptButton: {
     backgroundColor: '#ffe4e9', // 연한 핑크색
     borderWidth: 1,
     borderColor: '#FCA0BF', // 테두리 핑크색
     paddingHorizontal: 20, // 수평 패딩 추가 (거절과 균일하게)
   },
   buttonText: {
     fontSize: 18,
     fontWeight: 'bold',
   },
  orderCheckButton: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  orderCheckText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RequestApproval;
