import { IconArrowRight, IconBlackHome, IconHome, IconReloadWhite } from '@assets/images';
import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Colors from 'src/common/utils/Colors';

type LeftRightIconType = 'continue' | 'home' | 'reload' | 'home-black' | JSX.Element;

export type AppButtonProps = {
  children: JSX.Element | JSX.Element[] | string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  type: 'gradient' | 'outline' | 'plain';
  left?: LeftRightIconType;
  right?: LeftRightIconType;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function AppButton({
  children,
  onPress,
  disabled,
  style,
  textStyles,
  type,
  left,
  right,
  loading,
  containerStyle,
}: AppButtonProps) {
  const renderIcon = useCallback((icon: LeftRightIconType) => {
    switch (icon) {
      case 'continue':
        return <IconArrowRight width={20} height={20} />;
      case 'home':
        return <IconHome width={20} height={20} />;
      case 'home-black':
        return <IconBlackHome width={20} height={20} />;
      case 'reload':
        return <IconReloadWhite width={20} height={20} />;
      default:
        return icon;
    }
  }, []);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <ButtonBackground
        style={[
          Styles.container,
          Styles[`container_${type}_${disabled ? 'disable' : 'enable'}`],
          style,
        ]}
        isGradient={type === 'gradient'}
        isDisable={disabled}
      >
        <>
          {left && renderIcon(left)}
          {left && <View style={{ width: 8 }} />}
          {typeof children === 'string' ? (
            <Text
              style={[
                Styles.text,
                Styles[`text_${type}_${disabled ? 'disable' : 'enable'}`],
                textStyles,
              ]}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {(right || loading) && <View style={{ width: 8 }} />}
          {right && !loading && renderIcon(right)}
          {loading && <ActivityIndicator color={type === 'gradient' ? '#fff' : Colors.app_green} />}
        </>
      </ButtonBackground>
    </TouchableOpacity>
  );
}

function ButtonBackground({
  children,
  style,
  isGradient,
  isDisable,
}: {
  children: JSX.Element;
  style: StyleProp<ViewStyle>;
  isGradient: boolean;
  isDisable?: boolean;
}) {
  if (isGradient && !isDisable) {
    return (
      <LinearGradient
        colors={['#5FB621', '#008047']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={style}
      >
        {children}
      </LinearGradient>
    );
  } else {
    return <View style={style}>{children}</View>;
  }
}

const Styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  container_gradient_enable: {
    borderWidth: 0,
  },
  container_gradient_disable: {
    borderWidth: 0,
    backgroundColor: '#B5B5B5',
  },
  container_outline_enable: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  container_outline_disable: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  container_plain_enable: {
    borderWidth: 0,
  },
  container_plain_disable: {
    borderWidth: 0,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
  text_gradient_enable: {
    color: 'white',
  },
  text_gradient_disable: {
    color: 'white',
  },
  text_outline_enable: {
    color: '#1B1B1B',
  },
  text_outline_disable: {
    color: '#D9D9D9',
  },
  text_plain_enable: {
    color: '#1B1B1B',
  },
  text_plain_disable: {
    color: '#D9D9D9',
  },
});
