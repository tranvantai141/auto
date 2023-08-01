import Color from '../assets/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import { translate } from '../assets/translations/translate';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, NativeModules } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../assets/Colors';
import { FlatList } from 'react-native-gesture-handler';
import Images from '../assets/Images';
import { ICardReaderInfomation } from '@interfaces/I_CardReader_infomation';
import { CardReaderListInfo, IconCardReaderListCheck, IconBluetoothConnect, IconBluetoothDisconnected } from '@assets/images';

type Props = {
    isVisible?: boolean;
    onBackDropPress?: () => void;
    devices: ICardReaderInfomation[];
    session_expired?: string;
    login_again_text?: string;
    btn_ok_text?: string;
    cardSelected?: ICardReaderInfomation;
    onPressButton: () => void;
    onPressItem: (item: ICardReaderInfomation) => void;
};

const SelectCardReaderModal = (props: Props) => {
    return (
        <Modal
            hasBackdrop={true}
            backdropColor={'transparent'}
            onBackdropPress={props.onBackDropPress}
            isVisible={props?.isVisible}
            style={Styles.modal}
        >
            <View style={Styles.modal_view}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={Styles.text_title}>{'Đầu đọc'}</Text>
                    <TouchableOpacity onPress={props.onBackDropPress} style={{ padding: hp(1) }}>
                        <Image source={Images.icon_close} style={{ height: hp(2.2222), width: hp(2.2222) }} />
                    </TouchableOpacity>
                </View>
                <View style={Styles.view_icon_select}>
                    <CardReaderListInfo />
                    {/* <Image source={Images.rectangle_bg} style={{ height: hp(7.5), width: wp(4) }} /> */}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: wp(2),
                        marginBottom: wp(2),
                    }}
                >
                    {(props.cardSelected && (
                        <View style={Styles.icon_card_select}>
                            <IconCardReaderListCheck height={hp(2.716)} width={hp(2.716)} />
                        </View>
                    )) || <View />}
                    <Text style={{ fontSize: 18 }}>
                        {props.cardSelected ? props.cardSelected.name : 'Không có thiết bị nào đang kết nối'}
                    </Text>
                </View>
                {(props.devices && props.devices.length > 0 && (
                    <FlatList
                        data={props.devices}
                        scrollEnabled={props.devices.length > 3 ? true : false}
                        renderItem={({ item, index }) => {
                            // console.log("devices:", item)
                            return (
                                <View style={Styles.view_container_item_card}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={Styles.view_image_status_connect}>
                                            {!item.isConnected ? <IconBluetoothDisconnected height={50} width={50} /> : <IconBluetoothConnect height={50} width={50} />}
                                            {/* <Image
                        source={
                          !item.isConnected
                            ? Images.icon_bluetooth_disconnect
                            : Images.icon_bluetooth_connect
                        }
                        style={{ height: wp(2.962), width: wp(2.962) }}
                      /> */}
                                        </View>
                                        <Text style={{ fontSize: 18, marginLeft: wp(1) }}>{item.name}</Text>
                                    </View>
                                    <GradientButton
                                        onPress={() => {
                                            props.onPressItem(item);
                                        }}
                                        buttonText={!item.isConnected ? 'Kết nối' : 'Đã kết nối'}
                                        isLoading={item.isLoading}
                                        buttonStyle={Styles.btn_gradien}
                                        textStyle={Styles.text_btn_gradient}
                                    />
                                </View>
                            );
                        }}
                    />
                )) || (
                        <View style={Styles.view_text_no_device}>
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>
                                {'Không tìm thấy thiết bị xung quanh'}
                            </Text>
                        </View>
                    )}
            </View>
        </Modal>
    );
};

const Styles = StyleSheet.create({
    modal: {
        backgroundColor: Color.grey_transparent,
        flex: 1,
        margin: 0,
    },
    modal_view: {
        backgroundColor: Color.white,
        alignSelf: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        width: wp(64),
        paddingBottom: hp(3),
        maxHeight: hp(55)
    },
    info_text: {
        textAlign: 'center',
        color: Color.black,
        fontSize: hp(2.2),
        width: wp(45),
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    info_textInstruction: {
        marginTop: hp(1.5),
        textAlign: 'center',
        color: Colors.black,
        fontSize: hp(1.5),
        width: wp(42),
        fontWeight: '400',
    },
    textView: {
        alignSelf: 'center',
    },
    expiredView: {
        alignSelf: 'center',
    },
    buttonText: { fontSize: hp(1.5), fontWeight: '600' },
    buttonStyle: { paddingHorizontal: hp(2), alignSelf: 'center' },
    text_title: {
        fontSize: 24,
        fontWeight: '600',
        paddingHorizontal: wp(2.222),
        paddingVertical: wp(2.222)
    },
    view_icon_select: {
        width: wp(13.08),
        height: wp(13.08),
        backgroundColor: Colors.grey_10,
        borderRadius: wp(25.18),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(1)
    },
    btn_gradien: {
        paddingHorizontal: wp(2),
        backgroundColor: '#E6F6EC',
        paddingVertical: wp(0.5),
        borderRadius: 5,
        width: wp(16),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    text_btn_gradient: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: '600',
        marginVertical: 8
    },
    view_text_no_device: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(2)
    },
    view_image_status_connect: {
        padding: wp(1)
        // backgroundColor: '#F2F2F2',
        // borderRadius: wp(3),
    },
    view_container_item_card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(2),
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: Colors.light_grey,
        alignItems: 'center'
    },
    icon_card_select: {
        height: hp(2.716),
        width: hp(2.716),
        marginRight: wp(1)
    },
});
export default SelectCardReaderModal;
