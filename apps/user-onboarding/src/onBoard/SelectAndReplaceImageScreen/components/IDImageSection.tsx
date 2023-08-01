import { IconImage } from '@assets/images';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { ImageDTO } from '../typings';
import { ListIdImagesLoading } from './ListIdImagesLoading';
import { ListIdImagesView } from './ListIdImagesView';

type Props = {
  status: 'loading' | 'error_highlight' | 'failure' | 'success';
  onPress: (selectedImage: ImageDTO) => void;
  corebankingImageUris: ImageDTO[];
  newImageUris: string[];
  selectedImageId?: string;
};

function IDImageSection({
  status,
  onPress,
  corebankingImageUris,
  selectedImageId,
  newImageUris,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: status === 'error_highlight' ? Colors.red_60 : 'transparent',
        borderWidth: 1,
      }}
    >
      <View style={Styles.leftSection}>
        <Text style={Styles.title}>{translate('id_card_new_image')}</Text>
        <Image
          resizeMode="contain"
          source={{ uri: newImageUris.length > 0 ? newImageUris[0] : '' }}
          style={Styles.currentImage}
        />
        <Image
          resizeMode="contain"
          source={{ uri: newImageUris.length > 1 ? newImageUris[1] : '' }}
          style={Styles.currentImage}
        />
      </View>
      <View style={{ backgroundColor: Colors.gray_30, width: 1 }}></View>
      <View style={Styles.rightSection}>
        <Text style={Styles.title}>{translate('id_card_old_image')}</Text>
        {status === 'error_highlight' && (
          <Text style={{ color: Colors.red, marginBottom: 5, fontSize: 14 }}>
            {translate('wet_signature_error')}
          </Text>
        )}
        {status === 'loading' ? (
          <ListIdImagesLoading />
        ) : status === 'failure' || !corebankingImageUris?.length ? (
          <View
            style={{
              borderRadius: 10,
              width: '95%',
              aspectRatio: 2,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}
          >
            <IconImage height={30} />
            <Text style={Styles.titleNoImage}>{`Không có ảnh tồn tại`}</Text>
          </View>
        ) : (
          <ListIdImagesView
            onPress={onPress}
            images={corebankingImageUris}
            selectedImageId={selectedImageId}
          />
        )}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  leftSection: {
    flex: 2,
    minHeight: 100,
    padding: 15,
    alignItems: 'center',
  },
  rightSection: {
    flex: 3,
    minHeight: 100,
    padding: 15,
    alignItems: 'center',
  },
  title: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: '600',
  },
  currentImage: {
    width: '70%',
    aspectRatio: 1.5,
    marginTop: 12,
    backgroundColor: Colors.gray_30,
  },
  noImage: {
    marginTop: 20,
    alignSelf: 'center',
    width: 400,
    height: 200,
  },
  titleNoImage: {
    top: 0,
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: 30,
    color: Colors.gray_60,
    alignSelf: 'center',
  },
});

export default IDImageSection;
