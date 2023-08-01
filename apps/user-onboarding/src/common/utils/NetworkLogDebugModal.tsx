import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import Modal from 'react-native-modal';
interface Props {
  onPress?: () => void;
}
export const NetworkLogDebugModal: React.FC<Props> = (props: Props) => {
  const [isNetworkModalVisible, setIsNetworkVIsible] = useState(false);
  return (
    <>
      <Modal
        style={styles.modal}
        isVisible={isNetworkModalVisible}
        onBackButtonPress={() => setIsNetworkVIsible(false)}
        backdropTransitionOutTiming={0}
      >
        <SafeAreaView style={styles.contentContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsNetworkVIsible(false)}>
            <Text style={styles.closeButtonTitle}>{'CLOSE'}</Text>
          </TouchableOpacity>
          <NetworkLogger />
        </SafeAreaView>
      </Modal>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          props.onPress && props.onPress();
          setIsNetworkVIsible(true);
        }}
      >
        <Text style={styles.content}>{'Network Logs'}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: 'white',
  },
  container: {
    width: 65,
    height: 65,
    position: 'absolute',
    left: 24,
    bottom: '10%',
    borderRadius: 45,
    backgroundColor: '#008047',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  closeButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButtonTitle: {
    textAlign: 'center',
  },
});
