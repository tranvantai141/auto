import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { IconRemove } from '@assets/images';

type Props = {
  item: string | undefined;
  index?: number;
  onRemoveImage: (index: number) => void;
  isLoading?: boolean;
};

const ImageCard = (props: Props) => {
  const { onRemoveImage, item, index, isLoading } = props;
  return (
    <View style={Style.image_card}>
      <Image resizeMode="contain" style={Style.image_view} source={{ uri: item }} />
      <TouchableOpacity
        disabled={isLoading}
        style={Style.remove_view}
        onPress={() => {
          onRemoveImage(index || 0);
        }}
      >
        <IconRemove height={hp(2.5)} width={hp(2.5)} />
      </TouchableOpacity>
    </View>
  );
};

const Style = StyleSheet.create({
  image_card: {
    width: wp(23),
    height: hp(11),
    borderRadius: 8,
    backgroundColor:'#3B3B3B',
    justifyContent:'center',alignItems:'center',
    margin:8
  },
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
  image_view: { width: wp(20), height: hp(10), borderRadius: 8, resizeMode:'contain' ,alignSelf:'center'},
});
export default ImageCard;
