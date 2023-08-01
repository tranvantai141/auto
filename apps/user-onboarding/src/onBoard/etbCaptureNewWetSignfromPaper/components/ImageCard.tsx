import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
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
      <Image resizeMode="cover" style={Style.image_view} source={{ uri: item }} />
      <TouchableOpacity style={Style.remove_view} onPress={() => onRemoveImage(index || 0)}>
        <IconRemove height={hp(2.5)} width={hp(2.5)} />
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  image_card: { marginRight: wp(2), width: wp(26), height: hp(11), borderRadius: 8 },
  remove_view: {
    right: wp(1),
    position: 'absolute',
    top: hp(0.5),
    width: hp(2.5),
    height: hp(2.5),
  },
  remove_icon: {
    width: hp(2.5),
    height: hp(2.5),
  },
  image_view: { overflow: 'hidden', width: wp(26), height: hp(11), borderRadius: 8 },
});
export default ImageCard;
