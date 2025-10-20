import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity, Modal, ScrollView, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { launchImageLibrary } from 'react-native-image-picker';

const CalendarWithCloset = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-12'); // 기본 달
  const [dateClothes, setDateClothes] = useState({}); // 날짜별 옷 데이터를 저장하는 상태
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [modalVisible, setModalVisible] = useState(false); // 모달 표시 여부

  // 날짜에 옷 추가
  const addClothesToDate = (date) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to select image.');
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;

        setDateClothes((prev) => ({
          ...prev,
          [date]: [...(prev[date] || []), selectedImageUri],
        }));
        Alert.alert('Success', 'Clothes added to the date.');
      }
    });
  };

  // 날짜에 옷 삭제
  const removeClothesFromDate = (date) => {
    setDateClothes((prev) => {
      const updatedClothes = { ...prev };
      delete updatedClothes[date]; // 해당 날짜 데이터 삭제
      return updatedClothes;
    });
    Alert.alert('Success', 'All clothes removed from the date.');
  };

  // 날짜를 눌렀을 때 동작
  const onDayPress = (day) => {
    setSelectedDate(day.dateString); // 선택된 날짜 업데이트
    setModalVisible(true); // 모달 열기
  };

  // 달 변경 핸들러
  const onMonthChange = (month) => {
    const newMonth = `${month.year}-${String(month.month).padStart(2, '0')}`;
    setSelectedMonth(newMonth);
  };

  // 날짜 렌더링
  const renderDay = ({ date }) => {
    const clothes = dateClothes[date.dateString] || [];

    return (
      <TouchableOpacity onPress={() => onDayPress(date)} style={styles.dayContainer}>
        <Text style={styles.dayText}>{date.day}</Text>
        {clothes.slice(0, 1).map((item, index) => (
          <Image key={index} source={{ uri: item }} style={styles.clothesImage} />
        ))}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedMonth} Calendar</Text>
      <Calendar
        current={selectedMonth}
        onDayPress={onDayPress}
        onMonthChange={onMonthChange}
        dayComponent={(props) => renderDay(props)}
        style={styles.calendar}
        theme={{
          arrowColor: 'black',
          monthTextColor: 'black',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          todayTextColor: 'red',
        }}
      />
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Options for {selectedDate}</Text>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {selectedDate && dateClothes[selectedDate] ? (
              <>
                <Text style={styles.clothesTitle}>Current Clothes</Text>
                <View style={styles.clothesContainer}>
                  {dateClothes[selectedDate].map((item, index) => (
                    <Image key={index} source={{ uri: item }} style={styles.modalClothesImage} />
                  ))}
                </View>
                <TouchableOpacity
                  style={[styles.modalButton, styles.addButton]}
                  onPress={() => addClothesToDate(selectedDate)}
                >
                  <Text style={styles.modalButtonText}>Add Clothes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.removeButton]}
                  onPress={() => {
                    removeClothesFromDate(selectedDate);
                    setModalVisible(false); // 모달 닫기
                  }}
                >
                  <Text style={styles.modalButtonText}>Remove All Clothes</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.noClothesText}>No clothes added yet.</Text>
                <TouchableOpacity
                  style={[styles.modalButton, styles.addButton]}
                  onPress={() => addClothesToDate(selectedDate)}
                >
                  <Text style={styles.modalButtonText}>Add Clothes</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: '#808080' }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Go to Calendar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 70,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  clothesImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  clothesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  clothesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalClothesImage: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 5,
  },
  modalButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noClothesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: '#FCA0BF', // 핑크색 (Add Clothes)
  },
  removeButton: {
    backgroundColor: '#808080', // 회색 (Remove All Clothes)
  },
});

export default CalendarWithCloset;
