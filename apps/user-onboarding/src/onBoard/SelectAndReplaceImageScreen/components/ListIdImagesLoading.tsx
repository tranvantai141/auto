import LoadingBox from '@components/LoadingBox';
import React from 'react';
import { View } from 'react-native';

export function ListIdImagesLoading() {
  return (
    <>
      <LoadingBox
        style={{
          width: '100%',
          aspectRatio: 2.3,
          marginTop: 14,
          marginBottom: 14,
          borderRadius: 10,
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignSelf: 'flex-start' }}>
        <LoadingBox
          style={{
            width: 90,
            height: 80,
            borderRadius: 8,
            padding: 12,
            marginRight: 8,
          }}
        />
        <LoadingBox
          style={{
            width: 90,
            height: 80,
            borderRadius: 8,
            padding: 12,
            marginRight: 8,
          }}
        />
      </View>
    </>
  );
}
