import { IconCheck } from '@assets/images';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/Colors';
import { ImageDTO } from '../typings';

export function ListIdImagesView({
  images,
  onPress,
  selectedImageId,
}: {
  images: ImageDTO[];
  onPress: (selectedImage: ImageDTO) => void;
  selectedImageId?: string;
}) {
  function ImageItem({
    isChecked,
    uri,
    onPress,
  }: {
    isChecked: boolean;
    uri: string;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity
        style={isChecked ? Styles.imageItemChecked : Styles.imageItem}
        onPress={onPress}
      >
        <>
          <Image resizeMode="contain" source={{ uri: uri }} style={Styles.image} />
          <View
            style={{
              width: 24,
              aspectRatio: 1,
              backgroundColor: isChecked ? Colors.primary : Colors.white,
              position: 'absolute',
              top: 6,
              right: 6,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: isChecked ? Colors.primary : Colors.gray_30,
            }}
          >
            {isChecked && <IconCheck />}
          </View>
        </>
      </TouchableOpacity>
    );
  }
  const displayImages = images.find((item) => item.imageId === selectedImageId)?.imageBase64Content;
  const displayImageDescription = images.find(
    (item) => item?.imageId === selectedImageId
  )?.imageDescription;
  return (
    <>
      <View style={Styles.previewSection}>
        {displayImages ? (
          <Image
            resizeMode="contain"
            source={{
              uri: displayImages ? `data:image/png;base64,${displayImages}` : '',
            }}
            style={[Styles.selectedImage, { marginBottom: 12 }]}
          />
        ) : (
          <Text style={Styles.previewTitle}>{'Ảnh được chọn sẽ hiện ở đây'}</Text>
        )}
      </View>
      {displayImageDescription ? (
        <Text style={Styles.desTitle}>{displayImageDescription}</Text>
      ) : null}
      <ScrollView horizontal={true} style={{ width: '100%' }} showsHorizontalScrollIndicator>
        {images?.map((item, index) => (
          <ImageItem
            key={index}
            uri={`data:image/png;base64,${item.imageBase64Content}`}
            isChecked={item.imageId === selectedImageId}
            onPress={() => onPress(item)}
          />
        ))}
      </ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  selectedImage: {
    width: '100%',
    height: 170,
    marginTop: 5,
  },
  imageItem: {
    width: 100,
    height: 75,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray_30,
    padding: 6,
    marginRight: 8,
  },
  imageItemChecked: {
    width: 100,
    height: 75,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 6,
    marginRight: 8,
  },
  image: { width: '100%', height: '100%', backgroundColor: Colors.gray_30 },
  titleNoImage: {
    top: 0,
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: 30,
    color: Colors.gray_60,
    alignSelf: 'center',
  },
  previewTitle: {
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    fontSize: 14,
    color: Colors.gray_60,
  },
  previewSection: {
    backgroundColor: Colors.gray_30,
    width: '100%',
    height: 190,
    borderRadius: 10,
    marginBottom: 8.5,
  },
  desTitle: {
    fontSize: 14,
    lineHeight: 14,
  },
});
