import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import HeaderTitle from '../components/HeaderTitle';

const WebViewScreen = (props: any) => {
  const { navigation, route } = props;
  const { url, title } = route.params;
  const ref = React.useRef(null);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderTitle
        title={title}
        backTitle="Đóng"
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <WebView
        ref={ref}
        onFileDownload={(event) => {
          console.log('onFileDownload', event);
        }}
        containerStyle={{ flex: 1, backgroundColor: 'red' }}
        source={{
          uri: url,
        }}
      />
    </SafeAreaView>
  );
};

export default WebViewScreen;
