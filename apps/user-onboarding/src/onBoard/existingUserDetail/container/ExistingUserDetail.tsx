import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Color from '../assets/Colors';
import { TestIds } from '../assets/TestIds';
import Style from './Style';
import Images from '../assets/Images';
import { translate } from '../assets/translations/translate';
import BackButtonHeader from 'src/common/components/Button/BackButtonHeader';
import CheckInfoModal from '../components/CheckInfoModal';
import { userDetailList } from '@dummy/ListItems';

const ExistingUserDetail = (props: any) => {
  const { navigation } = props;
  const [showModal, setShowModal] = useState(false);
  type ListItemInterface = {
    item: itemList;
  };

  type itemList = {
    id: string;
    title: string;
    value: string;
  };

  const renderItem = (item: ListItemInterface) => {
    return (
      <>
        <View style={Style.itemView}>
          <Text style={Style.title}>{item.item.title}</Text>
          <Text style={{ ...Style.title, textAlign: 'right' }}>{item.item.value}</Text>
        </View>
        <View style={Style.itemBorder}></View>
      </>
    );
  };

  function listItems() {
    return (
      <FlatList
        data={userDetailList}
        renderItem={(item: any) => renderItem(item)}
        keyExtractor={(item: any) => item.id}
        style={Style.flatlistView}
      />
    );
  }

  return (
    <SafeAreaView style={Style.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Color.app_background} />
      <BackButtonHeader testId={TestIds.step5_progress_bar} onPress={() => navigation.goBack()} />
      <ScrollView style={Style.scroll}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Image source={Images.checked_round} resizeMode={'center'} style={Style.image} />
        </TouchableOpacity>

        <View style={{ margin: 20 }}>
          <Text style={Style.header} testID={TestIds.select_id}>
            {translate('existing_user_heading')}
          </Text>
          <Text style={Style.id} testID={TestIds.chip_mounted_cccd}>
            {translate('existing_user_id')}
          </Text>
        </View>
        {listItems()}
        <CheckInfoModal
          isVisible={showModal}
          status="cancelled"
          image_icon_id={TestIds.modal_image_icon}
          notify_text_id={TestIds.notify_text_id}
          indicator_id={TestIds?.indicator_id}
          check_info_id={TestIds.check_info_text_id}
          message_id={TestIds.message_text_id}
          button_1_id={TestIds.gradient_button}
          button_2_id={TestIds.continue_text}
          isLoading={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExistingUserDetail;
