import React, { useMemo } from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Colors from '../assets/Colors';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../assets/Images';
import { SideBarItemID, SideBarItemModel } from '../typings';
import { translate } from '../assets/translations/translate';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

type Props = {
  style?: StyleProp<ViewStyle>;
  data: SideBarItemModel[];
  selectedSideBarItemID: SideBarItemID | null;
  onSelecteSideBarItem: (item: SideBarItemModel) => void;
};

type SidebarItemModelWithLevel = SideBarItemModel & {
  level: number;
  parentID: SideBarItemID | null;
};

const SideBar = ({ style, selectedSideBarItemID, onSelecteSideBarItem, data }: Props) => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const badgeCount = response?.informationForProductRequest?.numberOfIssue;

  const flatData = useMemo(() => {
    const flatItems = data.reduce((acc, item) => {
      acc.push({
        ...item,
        level: 0,
        parentID: null,
      });
      if (item.subItems.length > 0) {
        acc.push(
          ...item.subItems.map((subItem) => ({
            ...subItem,
            level: 1,
            parentID: item.id,
          }))
        );
      }
      return acc;
    }, [] as SidebarItemModelWithLevel[]);
    return flatItems;
  }, [data]);

  const selectedRootParentID = useMemo(() => {
    const selectedRootParent = flatData.find((item) => item.id === selectedSideBarItemID);
    return selectedRootParent?.parentID ?? selectedSideBarItemID;
  }, [selectedSideBarItemID, flatData]);

  const displayedItems = useMemo(() => {
    return flatData.filter((item) => {
      if (item.level === 1 && item.parentID !== selectedRootParentID) {
        return false;
      }
      return true;
    });
  }, [flatData, selectedRootParentID]);

  const getBadgeCount = (item: SidebarItemModelWithLevel) => {
    if (item.errorCount === undefined || item.errorCount === 0) {
      return item.id === 'product_info' && (badgeCount ?? 0) > 0 ? badgeCount : undefined;
    }
    return item.errorCount;
  };

  return (
    <View style={[Styles.container, style]}>
      <FlatList
        data={displayedItems}
        renderItem={({ item }) => (
          <SideBarItemView
            item={item}
            badgeCount={getBadgeCount(item)}
            state={
              selectedSideBarItemID === item.id
                ? 'selected'
                : selectedRootParentID === item.id
                ? 'subItemSelected'
                : 'normal'
            }
            onPress={() => onSelecteSideBarItem(item)}
          />
        )}
      />
    </View>
  );
};

type SideBarItemViewState = 'normal' | 'selected' | 'subItemSelected';

const SideBarItemView = ({
  item,
  state,
  badgeCount,
  onPress,
}: {
  item: SidebarItemModelWithLevel;
  state: SideBarItemViewState;
  badgeCount?: number;
  onPress: () => void;
}) => {
  const containerStyle = (state: SideBarItemViewState, level: number) => {
    return {
      ...SideBarItemStyles.container,
      backgroundColor:
        state === 'selected'
          ? Colors.app_green
          : state === 'subItemSelected'
          ? Colors.light_grey
          : Colors.white,
      paddingLeft: 8 + level * 20,
    };
  };

  const titleStyle = (state: SideBarItemViewState) => {
    return {
      ...SideBarItemStyles.titleText,
      color: state === 'selected' ? Colors.white : Colors.black,
    };
  };

  const accessoryImageStyle = (state: SideBarItemViewState) => {
    return {
      ...SideBarItemStyles.accessoryImage,
      tintColor: state === 'selected' ? Colors.white : Colors.black,
      transform: state === 'selected' || state === 'subItemSelected' ? [] : [{ rotate: '270deg' }],
    };
  };

  return (
    <TouchableOpacity style={containerStyle(state, item.level)} onPress={onPress}>
      <Text style={titleStyle(state)}>{translate(item.title)}</Text>
      {badgeCount && (
        <>
          <View style={{ flex: 1 }} />
          <View style={SideBarItemStyles.badgeContainer}>
            <Text style={SideBarItemStyles.badgeText}>{badgeCount}</Text>
          </View>
        </>
      )}
      {item.subItems.length > 0 && (
        <Image style={accessoryImageStyle(state)} source={Images.dropdown_arrow} />
      )}
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRightColor: Colors.light_grey,
    borderRightWidth: 1,
  },
});

const SideBarItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 1,
    borderBottomColor: Colors.light_grey,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black,
  },
  accessoryImage: {
    width: 9,
    height: 5,
    marginLeft: 4,
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F84932',
    borderRadius: 10,
    height: 20,
    minWidth: 20,
    marginLeft: 4,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.white,
  },
});

export default SideBar;
