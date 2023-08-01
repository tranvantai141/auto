import { IconRemove } from '@assets/images';
import React from 'react';
import { Image, StyleProp, View, ViewStyle } from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Colors from '../assets/Colors';

function PreviewImageList({
  style,
  imageUris,
  onImagePress,
  onDeleteImagePress,
}: {
  style?: StyleProp<ViewStyle>;
  imageUris: string[];
  onImagePress?: (index: number) => void;
  onDeleteImagePress?: (index: number) => void;
}) {
  return (
    <ScrollView
      style={[
        {
          flexDirection: 'row',
          paddingVertical: 16,
        },
        style,
      ]}
      horizontal={true}
    >
      {imageUris.map((item, index) => (
        <TouchableWithoutFeedback
          key={index}
          style={{
            marginLeft: 16,
            backgroundColor: Colors.gray_100,
            width: 129,
            height: 129,
            borderRadius: 8,
            overflow: 'hidden',
          }}
          onPress={() => onImagePress?.(index)}
        >
          <Image
            resizeMode="contain"
            style={{ flex: 1, zIndex: 0, backgroundColor: 'transparent' }}
            source={{ uri: item }}
          />
          <View
            style={{
              height: 32,
              width: 32,
              top: 0,
              right: 0,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                onDeleteImagePress?.(index);
              }}
            >
              <IconRemove height={22} width={22} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

export default PreviewImageList;
