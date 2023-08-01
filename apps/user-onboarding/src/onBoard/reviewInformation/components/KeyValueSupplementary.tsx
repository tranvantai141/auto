import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import Colors from '../assets/Colors';


type Props = {
    leftHeading?: string
    rightValue?: string

};

const KeyValueSupplementary = (props: Props) => {
    return (
        <View style={Style.option_view}>
            <Text style={Style.option_heading}>
                {props.leftHeading}
            </Text>
            <Text numberOfLines={2} style={Style.option_info}>{props.rightValue}</Text>
        </View>
    );
};

const Style = StyleSheet.create({
    option_view: {
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: Colors.light_grey,
        flexDirection: 'row',
        paddingVertical: hp(1),
        flex: 1,

    },
    container: {
        alignSelf: 'center',
        width: wp(94),
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginVertical: hp(1.5),
        justifyContent: 'center',
        paddingHorizontal: wp(2),
        paddingVertical: hp(2),
    },
    option_heading: {
        fontWeight: '600',
        color: Colors.light_black,
        fontSize: hp(1.6),
        textAlign: 'left',
        flex: 0.4,
    },
    option_info: {
        fontWeight: '400',
        color: Colors.light_black,
        fontSize: hp(1.6),
        flex: 0.6,
    },
});
export default KeyValueSupplementary;
