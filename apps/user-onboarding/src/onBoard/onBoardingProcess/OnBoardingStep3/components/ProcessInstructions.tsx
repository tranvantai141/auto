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

const ProcessInstructions = (props: Props) => {
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
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
export default ProcessInstructions;
