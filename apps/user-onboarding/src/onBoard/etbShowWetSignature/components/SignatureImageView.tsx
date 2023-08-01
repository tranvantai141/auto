import { IconImage } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { mockBase64Image } from '@screens/transactionDetailETB/assets/dummyData/dummyData';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import Images from '../assets/Images';
import Loading from './Loading';

const MOCKLIST = [
  { imageId: '1', imageBase64Content: mockBase64Image },
  { imageId: '2', imageBase64Content: mockBase64Image },
  { imageId: '3', imageBase64Content: mockBase64Image },
  { imageId: '4', imageBase64Content: mockBase64Image },
  { imageId: '5', imageBase64Content: mockBase64Image },
  { imageId: '6', imageBase64Content: mockBase64Image },
  { imageId: '7', imageBase64Content: mockBase64Image },
  { imageId: '8', imageBase64Content: mockBase64Image },
  { imageId: '9', imageBase64Content: mockBase64Image },
  { imageId: '10', imageBase64Content: mockBase64Image },
];
export interface WetSignatureInterface {
  images: Array<{
    imageId?: string;
    imageBase64Content?: string;
    imageDescription?: string;
  }>;
  code?: string;
  message?: string;
}

type Props = {
  isError?: boolean;
  isLoading?: boolean;
  signatureImg?: WetSignatureInterface;
};

const SignatureImageView = (props: Props) => {
  const { isError, isLoading, signatureImg } = props;
  const signatureList: Array<{
    imageId?: string;
    imageBase64Content?: string;
    imageDescription?: string;
  }> = signatureImg?.images?.length ? signatureImg?.images : [];

  return isError ? (
    <View style={Style.errorStyle}>
      <IconImage height={30} />
    </View>
  ) : isLoading ? (
    <Loading />
  ) : !signatureList?.length ? (
    <View>
      <Image style={Style.noImage} source={Images.no_image} resizeMode="contain" />
      <Text style={Style.titleNoImage}>{`Không có ảnh tồn tại`}</Text>
    </View>
  ) : (
    <>
      <Text style={Style.titleSign}>{`Mẫu chữ ký của khách hàng tại hệ thống`}</Text>
      <SafeAreaView style={Style.signContainer}>
        <FlatList
          data={signatureList}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <View style={Style.imageItem}>
                <Image
                  style={Style.image}
                  source={{ uri: `data:image/png;base64,${item?.imageBase64Content}` }}
                  resizeMode="contain"
                />
                <View style={{ bottom: 0, height: 50 }}>
                  <Text style={Style.signName}>{item?.imageDescription ?? ''}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item?.imageId ?? ''}
        />
      </SafeAreaView>
    </>
  );
  //   return (
  //     <>
  //       <Text style={Style.titleSign}>{`Mẫu chữ ký của khách hàng tại hệ thống`}</Text>
  //       <SafeAreaView style={Style.signContainer}>
  //         <FlatList
  //           data={MOCKLIST}
  //           numColumns={2}
  //           renderItem={({ item }) => {
  //             return (
  //               <View style={Style.imageItem}>
  //                 <Image
  //                   style={Style.image}
  //                   source={{ uri: `data:image/png;base64,${item?.imageBase64Content}` }}
  //                   resizeMode="contain"
  //                 />
  //                 <Text style={Style.signName}>{`Chữ ký ${item?.imageId}`}</Text>
  //               </View>
  //             );
  //           }}
  //           keyExtractor={(item) => item?.imageId}
  //         />
  //       </SafeAreaView>
  //     </>
  //   );
  // };
  // Mock Image
};
const Style = StyleSheet.create({
  signContainer: {
    flex: 1,
    backgroundColor: Colors.light_grey,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 4,
    width: '100%',
    height: '100%',
  },
  imgStyle: { width: wp(26), height: hp(26) },
  errorStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: wp(5),
    marginHorizontal: wp(1),
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    height: hp(25),
  },
  imageView: {
    flex: 1,
    marginHorizontal: wp(3),
    marginTop: wp(4),
    marginBottom: hp(3),
  },
  headingText: { fontSize: hp(1.8), fontWeight: '600', marginTop: 5 },
  imageItem: {
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    margin: 10,
    width: 355,
    height: 326,
  },
  signName: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  titleSign: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 30,
    paddingVertical: 20,
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
    color: Colors.grey_text,
    alignSelf: 'center',
  },
});

export default SignatureImageView;
