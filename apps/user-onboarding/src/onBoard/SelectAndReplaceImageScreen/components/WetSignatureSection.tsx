import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../assets/Colors';
import { IconCheck } from '@assets/images';
import LoadingBox from '@components/LoadingBox';
import { IconImage } from '@assets/images';
import { translate } from '../assets/translations/translate';
import { mockBase64Image } from '@screens/transactionDetailETB/assets/dummyData/dummyData';
import Images from '../assets/Images';
// import replace

const MOCKLIST = [
  { imageId: '1', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '2', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '3', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '4', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '5', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '6', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '7', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '8', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '9', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
  { imageId: '10', imageBase64Content: mockBase64Image, imageDescription: 'huyfrog' },
];

type Props = {
  status: 'loading' | 'error_highlight' | 'failure' | 'success';
  newImageUri: string;
  coreBankingImagesUrl: Array<{
    imageId?: string;
    imageBase64Content?: string;
    imageDescription?: string;
  }>;
  callback?: any;
};

export function WetSignatureSection({
  status,
  newImageUri,
  coreBankingImagesUrl,
  callback,
}: Props) {
  // const [isChecked, setIsChecked] = useState<boolean>(true);
  const [checkedImageId, setCheckedImageId] = useState<string>('');
  const renderCoreBankingImage = useCallback(() => {
    const displayImageUrl =
      coreBankingImagesUrl?.find((item) => item?.imageId === checkedImageId)?.imageBase64Content ??
      '';
    const displayImageDescription =
      coreBankingImagesUrl?.find((item) => item?.imageId === checkedImageId)?.imageDescription ??
      '';
    if (status === 'loading') {
      return <LoadingBox style={{ width: '85%', aspectRatio: 1.4, marginTop: 16 }} />;
    }
    if (status === 'failure') {
      return (
        <View
          style={{
            width: '85%',
            aspectRatio: 1.4,
            marginTop: 16,
            backgroundColor: Colors.gray_20,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconImage height={30} />
        </View>
      );
    }

    return (
      <>
        {coreBankingImagesUrl?.length ? (
          <>
            {status === 'error_highlight' && (
              <Text style={{ color: Colors.red, marginBottom: 5, fontSize: 14 }}>
                {translate('wet_signature_error')}
              </Text>
            )}
            <View style={Styles.previewSection}>
              {displayImageUrl ? (
                <Image
                  resizeMode="contain"
                  source={{ uri: `data:image/png;base64,${displayImageUrl}` }}
                  // source={{ uri: displayImageUrl }}
                  style={{
                    borderRadius: 8,
                    width: '100%',
                    height: '100%',
                    backgroundColor: Colors.gray_30,
                  }}
                />
              ) : (
                <Text style={Styles.previewTitle}>{'Ảnh được chọn sẽ hiện ở đây'}</Text>
              )}
            </View>
            {displayImageDescription ? (
              <Text style={Styles.desTitle}>{displayImageDescription}</Text>
            ) : null}
          </>
        ) : (
          <View>
            <Image style={Styles.noImage} source={Images.no_image} resizeMode="contain" />
            <Text style={Styles.titleNoImage}>{`Không có ảnh tồn tại`}</Text>
          </View>
        )}

        <>
          <SafeAreaView style={Styles.scrollViewSection}>
            {coreBankingImagesUrl?.length ? (
              <FlatList
                showsHorizontalScrollIndicator
                horizontal
                // data={MOCKLIST}
                data={coreBankingImagesUrl}
                renderItem={({ item }) => {
                  const isChecked = checkedImageId === item?.imageId;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        isChecked
                          ? (setCheckedImageId(''), callback(''))
                          : (setCheckedImageId(item?.imageId ?? ''), callback(item?.imageId));
                      }}
                    >
                      <View style={isChecked ? Styles.imageItemChecked : Styles.imageItem}>
                        <Image
                          style={Styles.image}
                          source={{ uri: `data:image/png;base64,${item?.imageBase64Content}` }}
                          // source={{ uri: item?.imageBase64Content }}
                          resizeMode="contain"
                        />

                        {isChecked ? (
                          <IconCheck style={Styles.iconCheck} />
                        ) : (
                          <View style={Styles.circle} />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item?.imageId ?? ''}
              />
            ) : null}
          </SafeAreaView>
        </>
      </>
    );
  }, [status, coreBankingImagesUrl, checkedImageId, callback]);

  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 12,
        borderColor: status === 'error_highlight' ? Colors.red_60 : 'transparent',
        borderWidth: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={Styles.leftSection}>
        <Text style={Styles.title}>{translate('wet_signature_new_image')}</Text>
        <Image resizeMode="contain" source={{ uri: newImageUri }} style={Styles.currentImage} />
      </View>
      <View style={{ backgroundColor: Colors.gray_30, width: 1 }}></View>
      <View style={Styles.rightSection}>
        <Text style={Styles.title}>{translate('wet_signature_old_image')}</Text>
        {renderCoreBankingImage()}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  iconCheck: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: 5,
    right: 5,
  },

  circle: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 30 / 2,
    borderWidth: 1,
    borderColor: Colors.gray_30,
  },
  imageItem: {
    borderColor: Colors.gray_30,
    borderWidth: 1,
    height: 70,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
  },
  imageItemChecked: {
    borderColor: Colors.primary,
    borderWidth: 1,
    height: 70,
    width: 100,
    backgroundColor: Colors.gray_30,
    borderRadius: 10,
    marginRight: 10,
  },
  image: {
    marginTop: 5,
    height: '85%',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  leftSection: {
    flex: 2,
    minHeight: 150,
    padding: 15,
    alignItems: 'center',
  },
  rightSection: {
    flex: 3,
    minHeight: 150,
    padding: 15,
    alignItems: 'center',
  },
  title: {
    marginBottom: 5,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  previewSection: {
    backgroundColor: Colors.gray_30,
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  scrollViewSection: {
    borderRadius: 10,
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    marginTop: 8,
  },
  currentImage: {
    width: '90%',
    aspectRatio: 1,
    marginTop: 16,
    backgroundColor: Colors.gray_20,
  },
  selectedImage: { width: '85%', aspectRatio: 1, marginTop: 16, backgroundColor: Colors.gray_30 },
  signName: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  previewTitle: {
    marginTop: 90,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    fontSize: 14,
    color: Colors.gray_60,
  },
  noImage: {
    marginTop: 50,
    alignSelf: 'center',
    width: 100,
    height: 50,
  },
  titleNoImage: {
    top: 0,
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: 30,
    color: Colors.gray_60,
    alignSelf: 'center',
  },
  previewDes: {
    flexDirection: 'column',
  },
  desTitle: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 14,
  },
});
