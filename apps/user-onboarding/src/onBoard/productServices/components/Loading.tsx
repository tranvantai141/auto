import LoadingBox from '@components/LoadingBox';
import ConfirmModal from '@components/modals/ConfirmModal';
import LoadingIcon from '@screens/onBoardingReader/components/Loading';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '@assets/sizes/Sizes';

function Loading() {
  return (
    <View style={{ flex: 1 , height : heightPercentageToDP(20)  }}>
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <View style={[Styles.section]}>
          <LoadingBox style={[Styles.loadingBox, { height: 20 , width : widthPercentageToDP(40) }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 20 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 20 , width : widthPercentageToDP(40) }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 20 }]} />
          <View style={Styles.verticalSpacing} />
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  loadingBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    minHeight: 80,
  },
  verticalSpacing: {
    height: 14,
  },
  horizontalSpacing: {
    width: 24,
  },
});

export default Loading;
