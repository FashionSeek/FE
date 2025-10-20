import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const images = [
  { id: 1, image: require('../../assets/StyleSelection/IMG_2754.jpg') },
  { id: 2, image: require('../../assets/StyleSelection/IMG_2755.jpg') },
  { id: 3, image: require('../../assets/StyleSelection/IMG_2760.jpg') },
  { id: 5, image: require('../../assets/StyleSelection/IMG_2758.jpg') },
  { id: 6, image: require('../../assets/StyleSelection/IMG_2761.jpg') },
  { id: 7, image: require('../../assets/StyleSelection/IMG_2759.jpg') },
  { id: 8, image: require('../../assets/StyleSelection/IMG_2775.jpg') },
  { id: 9, image: require('../../assets/StyleSelection/IMG_2762.jpg') },
  { id: 10, image: require('../../assets/StyleSelection/IMG_2763.jpg') },
  { id: 11, image: require('../../assets/StyleSelection/IMG_2764.jpg') },
  { id: 12, image: require('../../assets/StyleSelection/IMG_2766.jpg') },
  { id: 13, image: require('../../assets/StyleSelection/IMG_2767_2.jpg') },
  { id: 14, image: require('../../assets/StyleSelection/IMG_2768_2.jpg') },
  { id: 15, image: require('../../assets/StyleSelection/IMG_2769.jpg') },
  { id: 16, image: require('../../assets/StyleSelection/IMG_2770.jpg') },
  { id: 17, image: require('../../assets/StyleSelection/IMG_2771.jpg') },
  { id: 18, image: require('../../assets/StyleSelection/IMG_2772.jpg') },
  { id: 19, image: require('../../assets/StyleSelection/IMG_2773.jpg') },
  { id: 20, image: require('../../assets/StyleSelection/IMG_2774.jpg') },
];

const StyleSelection = () => {
  const navigation = useNavigation();
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imageId => imageId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };


   const handleComplete = () => {
          navigation.navigate('StyleResult');
      };

  const renderItem = ({ item }: { item: { id: number; image: any } }) => (
    <TouchableOpacity onPress={() => toggleSelection(item.id)}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.heart}>
        {selectedImages.includes(item.id) ? '❤️' : '🤍'}
      </Text>
    </TouchableOpacity>
  );


  return (
     <View style={styles.container}>
       <FlatList
         data={images}
         numColumns={2}  // 2열로 이미지 나열
         keyExtractor={(item) => item.id.toString()}
         renderItem={renderItem}
       />
       <TouchableOpacity style={styles.button} onPress={handleComplete}>
         <Text style={styles.buttonText}>완료</Text>
       </TouchableOpacity>
     </View>
   );
 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  heart: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#FCA0BF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StyleSelection;
