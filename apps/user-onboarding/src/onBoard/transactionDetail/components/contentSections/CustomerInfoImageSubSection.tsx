import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import Images from '../../assets/Images';
import GeneralInfoItem from '../common/GeneralInfoItem';
import SubSection from '../common/SubSection';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { RouteNames } from '@routeNames';

const CustomerInfoImageSubSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);

  const {
    customerInfo: { images },
  } = response ?? { customerInfo: {} };

  if (!images) {
    return null;
  }

  return (
    <SubSection title="Thư viện ảnh">
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={'Ảnh mặt trước và mặt sau CCCD'} />}
        right={
          <View>
            <ImageView uri={images.idCardFrontSide} placeholder={Images.dummy.id_front} />
            <ImageView uri={images.idCardBackSide} placeholder={Images.dummy.id_back} />
          </View>
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={'Ảnh chân dung trong thẻ'} />}
        right={
          <View style={{}}>
            <ImageView uri={images.faceWithIdCard ?? ''} placeholder={Images.dummy.id_portrait} />
          </View>
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={'Ảnh chụp khuôn mặt'} />}
        right={
          <View style={{}}>
            <ImageView uri={images.face} placeholder={Images.dummy.real_portrait} />
          </View>
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={'Chữ ký trên máy tính bảng'} />}
        right={
          <View style={{}}>
            <ImageView uri={images.tabletSignature} placeholder={Images.dummy.sign_draw} />
          </View>
        }
      />
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={'Chữ ký tươi'} />}
        right={
          <View style={{}}>
            <ImageView uri={images.paperSignature} placeholder={Images.dummy.sign_image} />
          </View>
        }
      />
    </SubSection>
  );
};

const ImageView = ({ uri, placeholder }: { uri: string; placeholder: any }) => {
  const { navigate } = useRootNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate(RouteNames.webView.name, {
          title: '',
          url: uri,
        });
      }}
    >
      { uri.length !== 0 &&
      <Image
        style={Styles.image}
        source={{ uri: uri ?? ''}}
        resizeMode="contain"
      />
      }
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  image: {
    width: 200,
    minHeight: 150,
  },
});

export default CustomerInfoImageSubSection;
