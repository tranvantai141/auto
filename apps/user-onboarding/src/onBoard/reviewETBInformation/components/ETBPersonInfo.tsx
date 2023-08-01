import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, Image, View, ViewStyle } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import { IReviewInfoResponse } from '../typings/ReviewInfoResponse';
import { IconNoteBlue } from '@assets/images';
import Images from '../assets/Images';
import { useAppSelector } from 'src/redux/hooks';

type Props = {
  data?: IReviewInfoResponse;
};
const ETBPersonInfo = ({ data }: Props) => {
  const { resultFlow: result } = useAppSelector((state) => state.customerInfoData);
  //MARK: - Render View Line
  const RenderViewLine = ({
    isHidden,
    color,
    style,
  }: {
    isHidden?: boolean;
    color?: string;
    style?: ViewStyle;
  }) => {
    return (
      <View
        style={[
          style,
          styles.view_line,
          {
            backgroundColor: color ? color : Colors.border_grey,
            opacity: isHidden ? 0 : 1,
          },
        ]}
      />
    );
  };

  //MARK: - Render warning view
  const RenderWarningView = () => {
    return (
      <View>
        <View style={styles.warning_view}>
          <IconNoteBlue />
          <Text style={styles.text_warning}>
            Những thông tin được đánh dấu sẽ được tự động cập nhật lên Corebanking
          </Text>
        </View>
        <RenderViewLine color={Colors.border_color} style={{ marginTop: 14 }} />
      </View>
    );
  };

  //MARK: - Render Row Image
  const RenderRowImage = ({
    title,
    image,
    description,
    isDifferent,
    isHiddenBottomLine,
  }: {
    title?: string;
    image?: any;
    description?: string;
    isDifferent?: boolean;
    isHiddenBottomLine?: boolean;
  }) => {
    return (
      <View
        style={{
          backgroundColor: isDifferent ? Colors.green_10 : Colors.white,
          paddingBottom: !isHiddenBottomLine ? 0 : 8,
        }}
      >
        <View style={{ flexDirection: 'row', paddingTop: 8 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.textDescription, { fontWeight: '600', marginLeft: 8 }]}>
              {title}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {(image && (
              <Image source={image ? { uri: image } : Images.newUser} style={[styles.user_img]} />
            )) || (
              <Text
                style={[
                  styles.textDescription,
                  { color: isDifferent ? Colors.green_60 : Colors.light_black },
                ]}
              >
                {description ? description : '-'}
              </Text>
            )}
          </View>
        </View>
        {(!isHiddenBottomLine && (
          <RenderViewLine color={Colors.light_grey} style={{ marginTop: 8 }} />
        )) || <View />}
      </View>
    );
  };

  if (result?.result !== 'ETB') {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading_text}>{translate('personal_doc_info')}</Text>
      <RenderViewLine color={Colors.border_green} style={{ marginTop: 16, marginBottom: 14 }} />
      {(result.diffInfos && result.diffInfos.length > 0 && <RenderWarningView />) || <View />}

      {/*info*/}
      <RenderRowImage title={translate('face_photo')} image={data?.face_image} />
      <RenderRowImage
        title={translate('full_name')}
        description={data?.full_name}
        isDifferent={result.diffInfos.includes('NAME')}
      />
      <RenderRowImage
        title={translate('dob')}
        description={data?.dob}
        isDifferent={result.diffInfos.includes('BIRTHDATE')}
      />
      <RenderRowImage
        title={translate('sex')}
        description={data?.gender}
        isDifferent={result.diffInfos.includes('GENDER')}
      />
      <RenderRowImage
        title={translate('Supplemental_Information')}
        description={data?.personal_identification}
      />
      <RenderRowImage
        title={translate('cccd_num')}
        description={data?.cccd}
        isDifferent={result.diffInfos.includes('ID_NO')}
      />
      <RenderRowImage title={translate('id_num')} description={data?.cmnd} />
      <RenderRowImage
        title={translate('date_range')}
        description={data?.issuing_date}
        isDifferent={result.diffInfos.includes('ISSUE_DATE')}
      />
      <RenderRowImage
        title={translate('limited_date')}
        description={data?.expiry_date}
        isDifferent={result.diffInfos.includes('EXPIRED_DATE')}
      />
      <RenderRowImage
        title={translate('issued_by')}
        description={data?.issued_by}
        isDifferent={result.diffInfos.includes('ISSUE_PLACE')}
      />
      <RenderRowImage
        title={translate('nationality')}
        description={data?.nationality}
        isDifferent={result.diffInfos.includes('NATIONALITY')}
      />
      <RenderRowImage
        title={translate('home_town')}
        description={data?.hometown}
        isDifferent={result.diffInfos.includes('HOME_TOWN')}
      />
      <RenderRowImage
        title={translate('residence')}
        description={data?.place_of_residence}
        isDifferent={result.diffInfos.includes('RESIDENT')}
        isHiddenBottomLine={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
  },
  heading_text: {
    fontSize: 20,
    fontWeight: '600',
  },
  warning_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_warning: {
    fontSize: 14,
    color: Colors.blue_70,
    marginLeft: 10,
  },
  textDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.light_black,
  },
  view_line: {
    height: 1,
    width: '100%',
  },
  user_img: {
    height: hp(9),
    width: hp(9),
    borderRadius: 12,
    backgroundColor: Colors.light_grey,
  },
});
export default ETBPersonInfo;
