import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const openPinterestSearch = async () => {
  const query = "business winter outfit";
  const webUrl = `https://kr.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;

  try {
    await Linking.openURL(webUrl);
  } catch (error) {
    console.error("Pinterest 열기 오류:", error);
    alert("Pinterest를 열 수 없습니다.");
  }
};

const ChatDetail = ({ route }) => {
  const chatId = route?.params?.chatId || 'defaultChatId';
  const navigation = useNavigation();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Dora의 요청서 확인', user: 'Dora', isRequest: true, expanded: false },
    { id: '2', text: '간단한 제안서의 내용', user: 'me', isRequest: false },
  ]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ 갤러리에서 이미지 선택하는 함수
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };

  // ✅ 요청서 클릭 이벤트 (자세히 보기 기능)
  const toggleRequestDetails = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, expanded: !msg.expanded } : msg
      )
    );
  };

  // ✅ 메시지 전송 함수 (sendMessage 복구!)
  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { id: Date.now().toString(), text: input, user: 'me', isRequest: false };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
    }
  };

  // ✅ 메시지 렌더링 함수
  const renderMessage = ({ item }) => {
    const isMyMessage = item.user === 'me';
    return (
      <View style={[styles.message, isMyMessage ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>

        {item.isRequest && (
          <>
            {!item.expanded && (
              <TouchableOpacity style={styles.detailButton} onPress={() => toggleRequestDetails(item.id)}>
                <Text style={styles.detailButtonText}>자세히 보기</Text>
              </TouchableOpacity>
            )}
            {item.expanded && (
              <View style={styles.expandedContent}>
                <Image source={require('../../assets/StyleResult/img.png')} style={styles.image} />
                <Text style={styles.detailText}>장소: 학교</Text>
                <Text style={styles.detailText}>계절: winter</Text>
                <Text style={styles.detailText}>날씨: 눈</Text>
                <Text style={styles.detailText}>스타일: 비즈니스</Text>
                <Text style={styles.detailText}>동행: 비즈니스</Text>
                <View style={styles.separator} />
                <Text style={styles.detailText}>체형: apple</Text>
                <Text style={styles.detailText}>컴플렉스: 하체비만</Text>

                {/* Pinterest 검색 버튼 */}
                <TouchableOpacity style={styles.recommendationButton} onPress={openPinterestSearch}>
                  <Text style={styles.recommendationButtonText}>Search in Pinterest</Text>
                </TouchableOpacity>

                {/* DoraCloset 버튼 */}
                <TouchableOpacity style={styles.recommendationButton} onPress={() => navigation.navigate('DoraCloset')}>
                  <Text style={styles.recommendationButtonText}>Seek Dora’s Closet</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{chatId}님의 채팅</Text>
      </View>

      {/* ✅ 메시지 리스트 */}
      <ScrollView contentContainerStyle={styles.messages}>
        {messages.map((item) => (
          <View key={item.id}>{renderMessage({ item })}</View>
        ))}
      </ScrollView>

      {/* ✅ 선택한 이미지 표시 */}
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        </View>
      )}

      {/* 입력창 */}
      <View style={styles.inputContainer}>
        {/* ✅ + 버튼 클릭 시 갤러리 이동 */}
        <TouchableOpacity onPress={pickImage} style={styles.plusButton}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>


        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
image: {
    width: 120,  // ✅ 크기 줄이기 (원하는 값으로 조정 가능)
    height: 160, // ✅ 높이 조정
    resizeMode: 'contain', // ✅ 원본 비율 유지하면서 축소
    alignSelf: 'center',  // ✅ 중앙 정렬
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    backgroundColor: '#FFDDE3',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  messages: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: '70%',
    borderColor: '#FFB6C1',
    borderWidth: 1,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFE4E9',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  detailButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  expandedContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    backgroundColor: '#ddd',
  },
  recommendationButton: {
    marginTop: 10,
    backgroundColor: '#FFDDE3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  recommendationButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },

  inputContainer: {
    flexDirection: 'row', // ✅ 가로 정렬
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5, // ✅ 패딩 수정
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },

  plusButton: {
    width: 40, // ✅ 더 명확한 크기 설정
    height: 40,
    borderRadius: 20, // ✅ 완전한 원형 유지
    backgroundColor: '#FFDDE3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, // ✅ 간격 조정
  },
  plusIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  input: {
    flex: 1, // ✅ 입력창이 최대한 가로로 확장되도록 함
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12, // ✅ 가로 패딩 수정
    paddingVertical: 8, // ✅ 세로 패딩 수정
    fontSize: 16,
    marginRight: 10, // ✅ 오른쪽 간격 추가
  },

  sendButton: {
    backgroundColor: '#FFDDE3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15, // ✅ 크기 줄임
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatDetail;
