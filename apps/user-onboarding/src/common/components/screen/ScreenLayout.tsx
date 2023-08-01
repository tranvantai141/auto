import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppBar from './AppBar';

export type ScreenLayoutProps = {
  safeAreaEdges?: Edge[];
  style?: StyleProp<ViewStyle>;
  children: JSX.Element | JSX.Element[];
  appBar?: JSX.Element;
  statusBarBackgroundColor?: string;
};

function ScreenLayout(props: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        edges={['bottom', 'left', 'right']}
        style={[{ backgroundColor: '#EEEEEE' }, props.style, { flex: 1, margin: 0 }]}
      >
        {/* Status Bar */}
        <View
          style={{ height: insets.top, backgroundColor: props.statusBarBackgroundColor ?? 'white' }}
        />

        {/* App Bar */}
        {props.appBar}

        {/* Content */}
        {props.children}
      </SafeAreaView>
    </View>
  );
}

ScreenLayout.Appbar = AppBar;
ScreenLayout.Title = AppBar.Title;
ScreenLayout.BackButton = AppBar.BackButton;
ScreenLayout.CancelTransactionButton = AppBar.CancelTransactionButton;

export default ScreenLayout;
