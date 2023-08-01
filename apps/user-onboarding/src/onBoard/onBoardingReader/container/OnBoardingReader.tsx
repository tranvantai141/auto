import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  NativeModules,
  Alert,
  SafeAreaView,
  View,
  NativeEventEmitter,
} from 'react-native';
import { TestIds } from '../assets/TestIds';
import Style from './Style';
import HeaderTitle from '../components/HeaderTitle';
import { RouteNames } from '@routeNames';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import GradientButton from '@components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import { isEmulator } from 'react-native-device-info';
import usePermission from 'src/hooks/usePermissions';
import SelectCardReaderModal from '../components/SelectCardReaderModal';
import { ICardReaderInfomation } from '@interfaces/I_CardReader_infomation';
import { CardReaderAnim, CardReaderBar, IconBluetoothConnect } from '@assets/images';
import HeaderBar from '@screens/WebView/components/HeaderBar';
import FooterButton from '@screens/WebView/components/FooterButton';

const OnBoardingReader = (props: any) => {
  const { navigation } = props;
  const scale = useRef(new Animated.Value(0)).current;
  const [deviceInfo, setDeviceInfo] = useState();
  const [cardSelected, setCardSelected] = useState<ICardReaderInfomation>();
  const [listCardReader, setListCardReader] = useState<ICardReaderInfomation[]>([]);
  const [showSelectCardReader, setShowSelectCardReader] = useState(false);
  const [isRealDevice, setIsRealDevice] = useState(false);
  const { requestBluetoothPermission } = usePermission();

  useEffect(() => {
    isEmulator().then((_isEmulator) => {
      if (!_isEmulator) {
        setIsRealDevice(true);
        NativeModules.eIDViewController.getCardConnected((err: string, r: string) => {
          getCardConnected(r);
        });
      }
    });
  }, []);

  //MARK: create emit to listen event device connect

  useEffect(() => {
    isEmulator().then((_isEmulator) => {
      if (!_isEmulator) {
        const CardEventEmitter = new NativeEventEmitter(NativeModules.eIDViewController);
        const subscription = CardEventEmitter.addListener('DeviceConnected', (data: string) => {
          if (data && data != '') {
            const initCard = { name: data, isConnected: true, isLoading: false };
            listCardReader.map((item) => {
              if (item.name === data) {
                item = initCard;
              }
              item.isLoading = false;
            });
            setShowSelectCardReader(false);
            setCardSelected(initCard);
            // setListCardReader(listCardReader);
          } else {
            setCardSelected(undefined);
          }
        });

        return () => {
          subscription.remove(); // Gỡ bỏ lắng nghe sự kiện khi component unmount
        };
      }
    });
  }, []);

  useEffect(() => {
    animation();
    requestBluetoothPermission((status) => {
      console.log(`Bluetooth permission is ${status}`);
    });
    isEmulator().then((value) => {
      if (!value) {
        if (!deviceInfo) {
          bridgeController();
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: -hp(8),
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0,
          duration: 1000,
          delay: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  function bridgeController() {
    if (Platform.OS == 'android') {
      console.log('Bridge Controller');
    } else if (Platform.OS == 'ios') {
      // NativeModules.eIDViewController.callbackMethod((err: string, r: string) =>
      //   deviceDataStatus(r)
      // );
    }
  }

  function onPressContinue() {
    isEmulator().then((_isEmulator) => {
      if (!_isEmulator) {
        goToCardSelection();
      } else {
        navigation.navigate(RouteNames.customerImageScanner.name);
      }
    });
  }
  function goToCardSelection() {
    if (cardSelected) {
      navigation.navigate(RouteNames.customerImageScanner.name);
    } else {
      Alert.alert(translate('title_notification'), translate('no_card_reader_connect'), [
        {
          text: translate('cancel'),
          onPress: () => {
            //Handle on Press event here if required
          },
        },
        {
          text: translate('accept'),
          onPress: () => {
            setShowSelectCardReader(true);
          },
        },
      ]);
    }
  }

  //MARK : - get list card reader in native code
  async function getCardConnected(r: any) {
    if (r['cardSelected']) {
      setCardSelected({ name: r['cardSelected'], isConnected: true, isLoading: false });
    }
  }

  //MARK : - get list card reader in native code
  async function getListCardReader(r: any) {
    const arrDevice: ICardReaderInfomation[] = [];
    r['listCardReader'].map((item: any) => {
      arrDevice.push({ name: item, isConnected: false, isLoading: false });
    });
    setListCardReader(arrDevice);
  }

  //MARK: - onpress button connect device

  function onpressConnectCardReader(item: ICardReaderInfomation) {
    if (cardSelected && cardSelected.name === item.name) {
      Alert.alert(translate('title_notification'), translate('question_cancel_connection'), [
        {
          text: translate('cancel'),
          onPress: () => {
            //Handle on press block here
          },
        },
        {
          text: translate('accept'),
          onPress: () => {
            setCardSelected(undefined);
            listCardReader.map((card) => {
              if (card.name === item.name) {
                card.isConnected = false;
              }
            });
            setListCardReader(listCardReader);
            NativeModules.eIDViewController.disconnectCardReader(item.name);
          },
        },
      ]);
    } else {
      try {
        listCardReader.map((card, index) => {
          setCardSelected(card);
          if (item.name == card.name) {
            card.isLoading = true;
          }
        });
        setListCardReader(listCardReader);
        NativeModules.eIDViewController.disconnectCardReader();
        NativeModules.eIDViewController.connectCardReader(item.name);
      } catch (error) {
        //handle error here
      }
    }
    NativeModules.eIDViewController.scanListDevies();
  }

  function scanListDevice() {
    NativeModules.eIDViewController.scanListDevies();
    setTimeout(() => {
      NativeModules.eIDViewController.getListCardReader((err: string, r: string) =>
        getListCardReader(r)
      );
      setShowSelectCardReader(true);
    }, 1550);
  }

  const handleBackPress = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={Style.container}>
      {/* <HeaderTitle
        testId={TestIds.reader}
        onPress={() => navigation.goBack()}
        onPressText={() => navigation.goBack()}
        title={translate('come_back')}
      /> */}
      <HeaderBar
        testId={TestIds.reader}
        isHiddenRight
        onPressBack={handleBackPress}
        navigation={navigation}
      />
      <View style={Style.textView}>
        <Text testID={TestIds.reader + TestIds.title} style={Style.section_title}>
          {translate('cccd_tab_to_user')}
        </Text>
        <Text style={Style.info_title}>{translate('info')}</Text>
      </View>

      <View style={Style.animatedView}>
        <TouchableOpacity
          disabled={!isRealDevice ? false : !cardSelected ? true : false}
          onPress={() => navigation.navigate(RouteNames.customerImageScanner.name)}
        >
          <Animated.View
            style={{
              top: 150,
              left: 370,
              transform: [
                {
                  translateX: scale,
                },
              ],
            }}
          >
            <CardReaderAnim />
            {/* <Image source={Images.card_back} style={{ height: hp(13), width: hp(22) }} /> */}
          </Animated.View>
          <View style={Style.view2}>
            <CardReaderBar />
          </View>
          {/* <Image source={Images.rectangle_bg} style={Style.view2} /> */}
        </TouchableOpacity>
      </View>
      <SelectCardReaderModal
        isVisible={showSelectCardReader}
        devices={listCardReader}
        cardSelected={cardSelected}
        login_again_text="loginAgain"
        onBackDropPress={() => setShowSelectCardReader(false)}
        onPressButton={() => setShowSelectCardReader(false)}
        onPressItem={(item) => onpressConnectCardReader(item)}
      />
      <TouchableOpacity
        onPress={() => {
          scanListDevice();
        }}
        style={Style?.selectCard_button_style}
      >
        <View style={Style?.style_view_card_selected}>
          <IconBluetoothConnect />
          {/* <Image source={Images.icon_bluetooth_connect} style={{ height: wp(2.962), width: wp(2.962) }} /> */}
        </View>
        <Text style={Style?.style_text_card_name}>
          {cardSelected ? cardSelected.name : translate('select_card_reader')}
        </Text>
      </TouchableOpacity>
      {/* <GradientButton
        onPress={onPressContinue}
        buttonText={translate('continue_text')}
        disabled={!isRealDevice ? false : !cardSelected ? true : false}
        buttonStyle={Style?.continue_button_style}
        textStyle={Style?.continue_button_text}
      /> */}
      <FooterButton
        isDisabled={!isRealDevice ? false : !cardSelected ? true : false}
        onPress={onPressContinue}
        styles={{ position: 'absolute', bottom: 0, width: '100%' }}
      />
    </SafeAreaView>
  );
};
// !cardSelected ? true : false
export default OnBoardingReader;
