import LoadingBox from '@components/LoadingBox';
import ScreenLayout from '@components/screen/ScreenLayout';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import GeneralInfoItem from '@screens/transactionDetail/components/common/GeneralInfoItem';
import { HeaderWithRetry } from './HeaderWithRetry';

export function LoadingSummary() {
  return (
    <ScreenLayout appBar={<ScreenLayout.Appbar left={<ScreenLayout.BackButton />} />}>
      <>
        <HeaderWithRetry title={translate('title')} shouldShowRetry={false} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.sideBar}>
            <LoadingBox maxOpacity={0.6} style={styles.sideBarItem} />
            <LoadingBox maxOpacity={0.6} style={styles.sideBarItem} />
            <LoadingBox maxOpacity={0.6} style={styles.sideBarItem} />
          </View>
          <View style={styles.content}>
            <View style={styles.contentBox}>
              <LoadingBox maxOpacity={0.6} style={{ width: '50%', height: 32, marginBottom: 24 }} />
              <GeneralInfoItem
                left={<LoadingBox style={styles.label} maxOpacity={0.6} />}
                right={<LoadingBox style={styles.label} maxOpacity={0.6} />}
              />
              <GeneralInfoItem
                left={<LoadingBox style={styles.label} maxOpacity={0.6} />}
                right={<LoadingBox style={styles.label} maxOpacity={0.6} />}
              />
              <GeneralInfoItem
                left={<LoadingBox style={styles.label} maxOpacity={0.6} />}
                right={<LoadingBox style={styles.label} maxOpacity={0.6} />}
              />
              <GeneralInfoItem
                left={<LoadingBox style={styles.label} maxOpacity={0.6} />}
                right={<LoadingBox style={styles.label} maxOpacity={0.6} />}
              />
            </View>
          </View>
        </View>
      </>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  sideBar: {
    flex: 0.3,
    backgroundColor: Colors.white,
    paddingTop: 10,
  },
  content: {
    flex: 0.7,
  },
  sideBarItem: {
    height: 48,
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  contentBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 12,
    padding: 24,
  },
  label: {
    height: 21,
    width: '80%',
  },
});
