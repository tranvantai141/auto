import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import React from 'react';
import { FlatList, ImageSourcePropType, StyleSheet, View } from 'react-native';
import ProcessInstructionBox from './ProcessInstructionBox';

type Props = {
  data?: Array<itemProp>;
};

type itemProp = {
  id: string;
  title: string;
  icon: ImageSourcePropType;
};

const InstructionsView = (props: Props) => {
  return (
    <View style={styles.viewTop}>
      <FlatList
        numColumns={3}
        data={props?.data}
        renderItem={({ item }) => {
          return <ProcessInstructionBox item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewTop: {
    width: wp(80),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
  },
});
export default InstructionsView;
