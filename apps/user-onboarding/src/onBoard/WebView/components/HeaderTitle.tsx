import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../assets/Images';
import Colors from '../assets/Colors';
import { IconCancel, IconPrintGreen } from '@assets/images';
import { heightPercentageToDP } from '@assets/sizes/Sizes';

type Props = {
  title: string;
  backTitle: string;
  showShare?: boolean;
  onSharePress?: () => void;
  onBackPress: () => void;
};

const HeaderTitle = ({ title, onBackPress, backTitle, showShare = false, onSharePress }: Props) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.top}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={onBackPress}
        >
            <IconCancel style={{ marginRight: 8 }} height={heightPercentageToDP(1.2)} width={heightPercentageToDP(1.2)}/>
          <Text style={Styles.backTitle}>{backTitle}</Text>
          <View style={{ flex: 1 }} />
          {showShare && (
            <TouchableOpacity onPress={onSharePress}>
              <IconPrintGreen style={{ marginRight: 24 }} height={30} width={30}/>
              {/* <Image style={{ marginRight: 24, width: 30, height: 30 }} source={Images.share} /> */}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      <View style={Styles.titleView}>
        <Text numberOfLines={3} style={Styles.textTitle}>
          {title}
        </Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    minHeight: 96,
    backgroundColor: 'white',
    borderBottomColor: Colors.light_grey,
    borderBottomWidth: 1,
  },
  top: {
    flex: 0.5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  titleView: {
    flex: 0.5,
    paddingLeft: 20,
  },
  textTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: 'black',
  },
  backTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HeaderTitle;
