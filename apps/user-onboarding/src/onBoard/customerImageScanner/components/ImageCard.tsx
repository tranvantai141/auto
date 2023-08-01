import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import Images from '../assets/Images';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';
import { RouteNames } from '@routeNames';
import { IconRemove } from '@assets/images';

type Props = {
  item: string | undefined;
  index?: number;
  onRemoveImage: (index: number) => void;
};
const ImageCard = (props: Props) => {
  const { onRemoveImage, item, index } = props;
  return (
    <View style={Style.image_card}>
      <Image resizeMode="contain" style={Style.image_view} source={{ uri: item }} />
      <TouchableOpacity style={Style.remove_view} onPress={() => onRemoveImage(index || 0)}>
        <IconRemove  />
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  image_card: { marginRight: wp(2), width: hp(19), height: hp(19), borderRadius: 12 },
  remove_view: {
    right: hp(0.5),
    position: 'absolute',
    top: hp(0.5),
    width: hp(2.5),
    height: hp(2.5),
  },
  remove_icon: {
    width: hp(2.5),
    height: hp(2.5),
  },
  image_view: { width: hp(19), height: hp(19), borderRadius: 12 },
});
export default ImageCard;
