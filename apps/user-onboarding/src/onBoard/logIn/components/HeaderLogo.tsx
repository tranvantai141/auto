import { HeaderLogo as HeaderSvg } from '@assets/images';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const HeaderLogo = () => {
  // return <Image source={Images.slogan} resizeMode={'contain'} style={styles.header} />;
  return (
    <View style={styles.header}>
      <HeaderSvg />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems:'center',
    justifyContent: 'center',
  },
});
export default HeaderLogo;
