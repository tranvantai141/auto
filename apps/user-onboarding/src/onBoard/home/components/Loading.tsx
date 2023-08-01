import LoadingBox from '@components/LoadingBox';
import ConfirmModal from '@components/modals/ConfirmModal';
import LoadingIcon from '@screens/onBoardingReader/components/Loading';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP } from '@assets/sizes/Sizes';

function Loading() {
  return (
    <View style={{ flex: 1  }}>
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <View style={Styles.verticalSpacing} />
        <View style={[Styles.section]}>
          <LoadingBox style={[Styles.loadingBox, { height: 20 , width : widthPercentageToDP(40) }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 10 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 10 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 160 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 160 }]} />
        </View>
        <View style={Styles.verticalSpacing} />
        <View style={[Styles.section]}>
        <LoadingBox style={[Styles.loadingBox, { height: 20 , width : widthPercentageToDP(40) }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 10 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 10 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 160 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 160 }]} />
        </View>
        <View style={Styles.verticalSpacing} />
        <View style={[Styles.section]}>
        <LoadingBox style={[Styles.loadingBox, { height: 20 , width : widthPercentageToDP(40) }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 10 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 10 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 160 }]} />
          <View style={Styles.verticalSpacing} />
          <LoadingBox style={[Styles.loadingBox, { height: 160 }]} />
        </View>
      </View>
      {/* <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.4 }} />
        <Image
          style={{ height: 108, width: 108, position: 'absolute', alignSelf: 'center' }}
          source={require('../../../assets/images/loading/loading4x.gif')}
        />
      </View> */}
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
    height: 24,
  },
  horizontalSpacing: {
    width: 24,
  },
});

export default Loading;
