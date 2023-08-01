import React, { useEffect, useState } from 'react';
import { Image, ImageStyle, View, ViewStyle } from 'react-native';
import Styles from './Styles.LoadingComponent';

interface Props {
  isLoading: boolean;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  displayName?: string;
}
const GlobalLoading = (props: Props) => {
  const [count, setCount] = useState<boolean>(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setCount(false);
    }, 45 * 1000);
    return () => {
      setCount(true);
      clearTimeout(loadingTimeout);
    };
  }, []);

  const { containerStyle, imageStyle, isLoading } = props;

  if (!(isLoading && count)) return null;

  return (
    <View style={[Styles.container, containerStyle]}>
      <Image
        resizeMode="contain"
        style={[Styles.imageContainer, imageStyle]}
        source={require('../../../assets/images/loading/loadingnew.gif')}
      />
    </View>
  );
};

export default GlobalLoading;
