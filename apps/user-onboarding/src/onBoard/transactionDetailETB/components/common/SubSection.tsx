import React from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Colors from '../../assets/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconInfoBlue } from '@assets/images';
import { translate } from '@screens/transactionDetailETB/assets/translations/translate';
import Images from '@screens/transactionDetailETB/assets/Images';

type Props = {
  children: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  isVisible?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const SubSection = ({ children, title, style, isVisible, contentContainerStyle }: Props) => {
  return (
    <View style={[Styles.container, style]}>
      {title && (
        <Text style={[Styles.sectionHeader, { marginBottom: isVisible ? 10 : 20 }]}>{title}</Text>
      )}
      {isVisible ? (
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <IconInfoBlue />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 14,
              fontWeight: '400',
              color: Colors.blue,
            }}
          >
            {translate('ci_moc_marked_information_automaically_updated')}
          </Text>
        </View>
      ) : null}

      <View style={contentContainerStyle || Styles.contentContainer}>{children}</View>
    </View>
  );
};

type HidableSectionProps = {
  children: React.ReactNode;
  expanded: boolean;
  onTogglePressed: () => void;
};

SubSection.HidableSection = function HidableSection({
  children,
  expanded,
  onTogglePressed,
}: HidableSectionProps) {
  return (
    <>
      <View style={expanded ? Styles.container : { display: 'none' }}>{children}</View>
      <TouchableOpacity
        style={{ height: 44, flexDirection: 'row', alignItems: 'center' }}
        onPress={onTogglePressed}
      >
        <Text
          style={{
            color: Colors.app_green,
            paddingVertical: 12,
            marginRight: 8,
          }}
        >
          {translate(expanded ? 'show_less' : 'show_more')}
        </Text>
        <Image
          style={{
            width: 10,
            height: 6,
            tintColor: Colors.app_green,
            transform: expanded ? [{ rotate: '180deg' }] : [],
          }}
          source={Images.dropdown_arrow}
        />
      </TouchableOpacity>
    </>
  );
};

const Styles = StyleSheet.create({
  container: {},
  contentContainer: {
    minHeight: 86,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default SubSection;
