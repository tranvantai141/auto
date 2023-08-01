import { Slogan } from '@assets/images';
import { heightPercentageToDP, widthPercentageToDP } from '@assets/sizes/Sizes';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useAppDispatch } from 'src/redux/hooks';
import { setAuthenticated } from 'src/redux/slices/authState/AuthState';
import Style from './Style';
const SPLASH_TIMEOUT = 3000;
const Splash = ({ onSplashHide }: { onSplashHide: () => void }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setAuthenticated(false))
      onSplashHide()
    }, SPLASH_TIMEOUT);
  }, [dispatch, onSplashHide]);

  return (
    <SafeAreaView style={Style.container}>
      {/* <Image resizeMode="contain" style={Style.logoStyle} source={Images.slogan} /> */}
      <Slogan width={widthPercentageToDP(40.987)} height={heightPercentageToDP(10.462)} />
    </SafeAreaView>
  );
};

export default Splash;
