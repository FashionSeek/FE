import React from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App'; // RootStackParamList을 App.tsx에서 export 해야 함
import { HomeStackParams } from '../../../pages/Home'; // 네비게이션 타입 추가


// 색상 값 직접 지정
const DEEPPINK = '#FCA0BF'; // 예시: 보라색
const LIGHTGRAY = '#d3d3d3'; // 예시: 연한 회색
const WHITE = '#FFFFFF'; // 흰색
const GRAY = '#808080'; // 회색
const BLACK = '#000000'; // 검정

// 타입 정의
type Request = {
  id: string;
  name: string;
  requestDate: string;
  status: 'before' | 'progress' | 'completed';
};

// 스타일 정의 (템플릿 리터럴 사용)
const RequestBox = styled.View`
  padding: 15px;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 3;
`;

// RequestBox 내부의 헤더를 위한 스타일
const RequestHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

// 버튼 텍스트 스타일
const ButtonText = styled.Text`
  color: black;
  font-size: 14px;
  text-decoration: underline;
`;

// 추가적인 텍스트 스타일 (옵션)
const RequestId = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const RequestName = styled.Text`
  font-size: 14px;
  color: #555;
`;

const RequestDate = styled.Text`
  font-size: 12px;
  color: #888;
`;

const MatchingPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const requestlist: Request[] = [
    {
      id: 'Cindy',
      name: '#데이트 #레스토랑 #페미닌',
      requestDate: '2024-12-03',
      status: 'progress',
    },
    {
      id: 'Dora',
      name: '#학교 #발표 #비즈니스',
      requestDate: '2024-12-03',
      status: 'completed',
    },
    {
      id: 'Ariana',
      name: '#비즈니스 #회사 #미니멀',
      requestDate: '2024-12-04',
      status: 'before',
    },
    {
      id: 'Minki',
      name: '#친구 #여행 #캐쥬얼',
      requestDate: '2024-12-03',
      status: 'before',
    },
    {
          id: 'Sabrina',
          name: '#친구 #공원 #스트리트',
          requestDate: '2024-11-23',
          status: 'before',
        },
  ];

  // 상태별 데이터 필터링
  const filteredRequests = {
    before: requestlist.filter(request => request.status === 'before'), // 거래 전
    progress: requestlist.filter(request => request.status === 'progress'), // 거래 중
    completed: requestlist.filter(request => request.status === 'completed'), // 거래 완료
  };

  // 요청서 확인 버튼 클릭 시 호출되는 함수
  const handleViewRequest = (id: string) => {
    navigation.navigate('RequestPage', { requestId: id });
  };

  // 공통으로 사용하는 FlatList 컴포넌트
  const renderRequestItem = ({ item }: { item: Request }) => (
    <RequestBox>
      <RequestHeader>
        <View>
          <RequestId>{item.id}</RequestId>
        </View>
        <TouchableOpacity onPress={() => handleViewRequest(item.id)}>
          <ButtonText>요청서 확인</ButtonText>
        </TouchableOpacity>
      </RequestHeader>

      <RequestName>{item.name}</RequestName>
      <RequestDate>{item.requestDate}</RequestDate>
    </RequestBox>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <Tabs.Container
        renderTabBar={(props) => (
          <MaterialTabBar
            {...props}
            activeColor={DEEPPINK} // 활성 탭 글씨 색상
            inactiveColor={LIGHTGRAY} // 비활성 탭 글씨 색상
            indicatorStyle={{
              backgroundColor: DEEPPINK, // 인디케이터 색상
              height: 4,
            }}
            labelStyle={{
              fontSize: 16,
              fontWeight: 'bold',
            }}
            tabBarStyle={{
              backgroundColor: WHITE,
              borderBottomWidth: 1,
              borderBottomColor: GRAY,
            }}
          />
        )}
      >
        <Tabs.Tab name="대기중">
          <Tabs.FlatList
            data={filteredRequests.before}
            renderItem={renderRequestItem}
            keyExtractor={(item) => item.id}
          />
        </Tabs.Tab>

        {/* 거래 중 탭 */}
        <Tabs.Tab name="작성중">
          <Tabs.FlatList
            data={filteredRequests.progress}
            renderItem={renderRequestItem}
            keyExtractor={(item) => item.id}
          />
        </Tabs.Tab>

        {/* 거래 완료 탭 */}
        <Tabs.Tab name="전송완료">
          <Tabs.FlatList
            data={filteredRequests.completed}
            renderItem={renderRequestItem}
            keyExtractor={(item) => item.id}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </SafeAreaView>
  );
};

export default MatchingPage;

const styles = StyleSheet.create({
  tabContent: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
