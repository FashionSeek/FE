import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StyleResult = () => {
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigation = useNavigation();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
    const goToBodyType = () => {
      navigation.navigate('BodyType');
    };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const imageTimer = setTimeout(() => {
        setImageLoaded(true);
      }, 2000);
      return () => clearTimeout(imageTimer);
    }
  }, [loading]);

  return (
     <View style={styles.container}>
       {loading ? (
         <ActivityIndicator size="large" color="#FCA0BF" />
       ) : (
         <View style={styles.resultContainer}>
           <Text style={styles.description}>당신의 스타일은</Text>
           <Text style={styles.result}>캐주얼</Text>

           {imageLoaded ? (
             <Image
               source={require('../../assets/StyleResult/Casual.jpg')}
               style={styles.image}
               onLoad={handleImageLoad}  // 이미지 로드 완료 시 호출
             />
           ) : (
             <ActivityIndicator size="large" color="#FCA0BF" />
           )}
         </View>
       )}

       <TouchableOpacity style={styles.button} onPress={goToBodyType}>
         <Text style={styles.buttonText}>다음</Text>
       </TouchableOpacity>
     </View>
   );
 };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  resultContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: 20,
    color: '#4F4F4F',
    marginBottom: 10,
  },
  result: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FCA0BF',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  button: {
      position: 'absolute',  // 버튼을 고정
      bottom: 10,            // 하단에 고정
      left: 0,
      right: 0,
      backgroundColor: '#FCA0BF',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,  // 좌우 여백
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default StyleResult;
