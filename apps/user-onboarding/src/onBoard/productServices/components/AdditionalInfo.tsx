import { AdditionalCardIcon, IconArrowDown, IconArrowUp } from '@assets/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { ICodes } from '@interfaces/apis/I_Contact_Form';
import {
  getCommunesByDistrictCode,
  getDistrictsByProvinceCode,
} from '@screens/addSupplementaryInfo/redux/actions/DistrictList';
import { DeliveryInfoInterface } from '@screens/productServices/redux/slices/UpdateDeliveryInfoSlice';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from '../../../redux/store';
import Colors from '../assets/Colors';
import { Accademic_Level, Married_Status } from '../assets/dummyData/Index';
import { translate } from '../assets/translations/translate';
import { updateAddionalInfoSuccess } from '../redux/slices/UpdateAdditionalInfoSlice';
import {
  AddressInterface,
  updateWorkingCommune,
  updateWorkingDistrict,
  updateWorkingProvince,
} from '../redux/slices/UpdateAddressSlice';
import InputField from './InputField';
import HelperManager from '../../../common/utils/HelperManager';

type Props = {
  colapse?: boolean;
  onPressCollapse?: () => void;
  communceErr?: string;
  provinceErr?: string;
  districtErr?: string;
  detailedAddressErr?: string;
  mobileNoErr?: string;
  address: AddressInterface;
  deliveryInfo: DeliveryInfoInterface;
};

const AdditionalInfo = (props: Props) => {
  const {
    colapse,
    onPressCollapse,
    communceErr,
    provinceErr,
    districtErr,
    detailedAddressErr,
    mobileNoErr,
    address,
  } = props;

  const additionalInfo = useAppSelector((state: RootState) => state.updateAdditionalInfo.response);

  const dispatch = useAppDispatch();
  const listProvince = address.province.list;
  const listDistrict = address.district.list;
  const listCommune = address.commune.list;
  const workingProvince = additionalInfo.provinceName;
  const workingDistrict = additionalInfo.districtName;
  const workingCommune = additionalInfo.communceName;
  const detailAddress = additionalInfo.detailedAddress;

  const combineWorkingAddress = ` ${
    detailAddress && detailAddress?.length ? detailAddress + ', ' : ''
  } ${workingCommune && workingCommune.length ? workingCommune + ', ' : ''} ${
    workingDistrict && workingDistrict?.length ? workingDistrict + ', ' : ''
  } ${workingProvince}`;

  // useEffect(() => {
  //
  // } , [address])

  const handleSelectProvince = useCallback(
    (item: ICodes) => {
      dispatch(
        updateAddionalInfoSuccess({
          ...additionalInfo,
          provinceCode: item.code,
          provinceName: item.name,
        })
      );
      dispatch(updateWorkingProvince(item));
      item.code && dispatch(getDistrictsByProvinceCode(item.code));
    },
    [additionalInfo, dispatch]
  );

  const handleSelectDistrict = useCallback(
    (item: ICodes) => {
      dispatch(
        updateAddionalInfoSuccess({
          ...additionalInfo,
          districtCode: item.code,
          districtName: item.name,
        })
      );
      dispatch(updateWorkingDistrict(item));
      item.code && dispatch(getCommunesByDistrictCode(item.code));
    },
    [additionalInfo, dispatch]
  );

  const handleSelectCommune = useCallback(
    (item: ICodes) => {
      dispatch(
        updateAddionalInfoSuccess({
          ...additionalInfo,
          communceCode: item.code,
          communceName: item.name,
        })
      );
      dispatch(updateWorkingCommune(item));
    },
    [additionalInfo, dispatch]
  );

  const workingPlaceForm = useCallback(() => {
    return (
      <>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={[styles.label, { flex: 0.3 }]}>{translate('working_address')}</Text>
          <Text style={styles.addressText}>{combineWorkingAddress}</Text>
        </View>

        <View
          style={{
            padding: 16,
            backgroundColor: Colors.light_grey,
            marginVertical: 12,
            borderRadius: 8,
          }}
        >
          <InputField
            dropdown
            label={translate('city')}
            data={listProvince}
            labelField={'name'}
            valueField={'name'}
            placeholder={
              HelperManager.isValid(additionalInfo?.provinceName)
                ? additionalInfo?.provinceName
                : translate('select')
            }
            value={workingProvince}
            mandatory={
              props?.deliveryInfo?.deliveryMethod === 'Đơn vị công tác' ||
              additionalInfo?.provinceCode ||
              additionalInfo?.detailedAddress
                ? true
                : false
            }
            onChangeDropdown={(item: ICodes) => handleSelectProvince(item)}
          />
          {provinceErr && <Text style={styles.error}>{provinceErr}</Text>}
          <InputField
            dropdown
            label={translate('district')}
            data={listDistrict}
            labelField={'name'}
            valueField={'name'}
            placeholder={
              HelperManager.isValid(additionalInfo?.districtName)
                ? additionalInfo?.districtName
                : translate('select')
            }
            mandatory={
              props?.deliveryInfo?.deliveryMethod === 'Đơn vị công tác' ||
              additionalInfo?.provinceCode ||
              additionalInfo?.detailedAddress
                ? true
                : false
            }
            onChangeDropdown={(item: ICodes) => handleSelectDistrict(item)}
          />

          {districtErr && <Text style={styles.error}>{districtErr}</Text>}
          <InputField
            dropdown
            label={translate('communce')}
            data={listCommune}
            labelField={'name'}
            valueField={'name'}
            placeholder={
              HelperManager.isValid(additionalInfo?.communceName)
                ? additionalInfo?.communceName
                : translate('select')
            }
            mandatory={
              props?.deliveryInfo?.deliveryMethod === 'Đơn vị công tác' ||
              additionalInfo?.provinceCode ||
              additionalInfo?.detailedAddress
                ? true
                : false
            }
            onChangeDropdown={(item: ICodes) => handleSelectCommune(item)}
          />
          {communceErr && <Text style={styles.error}>{communceErr}</Text>}
          <InputField
            label={translate('detailed_address')}
            mandatory={
              props?.deliveryInfo?.deliveryMethod === 'Đơn vị công tác' ||
              additionalInfo?.provinceCode ||
              additionalInfo?.detailedAddress
                ? true
                : false
            }
            onChangeText={(e) => {
              {
                dispatch(updateAddionalInfoSuccess({ ...additionalInfo, detailedAddress: e }));
              }
            }}
            value={detailAddress}
            cancel={() =>
              dispatch(updateAddionalInfoSuccess({ ...additionalInfo, detailedAddress: '' }))
            }
          />
          {detailedAddressErr && <Text style={styles.error}>{detailedAddressErr}</Text>}
        </View>
      </>
    );
  }, [combineWorkingAddress, listProvince, additionalInfo, workingProvince, props?.deliveryInfo?.deliveryMethod, provinceErr, listDistrict, districtErr, listCommune, communceErr, detailAddress, detailedAddressErr, handleSelectProvince, handleSelectDistrict, handleSelectCommune, dispatch]);

  return (
    <>
      {!colapse ? (
        <View style={styles.collapsedContainer}>
          <View style={styles.iconWrapper}>
            <AdditionalCardIcon height={32} width={32} />
            <Text style={styles.titleText}>
              {translate('additional_info')}
              <Text style={{ color: Colors.text_grey }}> ({translate('optional')})</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={onPressCollapse}>
            <IconArrowDown />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.headingView}>
            <View style={styles.iconWrapper}>
              <AdditionalCardIcon height={32} width={32} />
              <Text style={styles.titleText}>
                {translate('additional_info')}
                <Text style={{ color: Colors.text_grey }}> ({translate('optional')})</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={onPressCollapse}>
              <IconArrowUp />
            </TouchableOpacity>
          </View>
          <View style={styles.cardHolderBody}>
            <Text style={styles.heading}>{translate('cardholder_info')}</Text>
            <View
              style={{
                padding: 16,
                backgroundColor: Colors.frame_color,
                marginVertical: 12,
                borderRadius: 8,
              }}
            >
              <InputField
                dropdown
                label={translate('accademic')}
                data={Accademic_Level}
                placeholder={
                  HelperManager.isValid(additionalInfo?.academicLevel)
                    ? additionalInfo?.academicLevel
                    : translate('select')
                }
                labelField={'name'}
                valueField={'name'}
                onChangeDropdown={(item) =>
                  dispatch(
                    updateAddionalInfoSuccess({
                      ...additionalInfo,
                      academicLevel: item.name,
                    })
                  )
                }
              />
              <InputField
                dropdown
                label={translate('married_status')}
                placeholder={
                  HelperManager.isValid(additionalInfo?.marriedStatus)
                    ? additionalInfo?.marriedStatus
                    : translate('select')
                }
                data={Married_Status}
                labelField={'name'}
                valueField={'name'}
                onChangeDropdown={(item) =>
                  dispatch(
                    updateAddionalInfoSuccess({ ...additionalInfo, marriedStatus: item.name })
                  )
                }
              />
              <InputField
                label={translate('mother_name')}
                onChangeText={(e) =>
                  dispatch(updateAddionalInfoSuccess({ ...additionalInfo, motherName: e }))
                }
                value={additionalInfo?.motherName}
                cancel={() =>
                  dispatch(updateAddionalInfoSuccess({ ...additionalInfo, motherName: '' }))
                }
              />
            </View>
            <Text style={[styles.heading, { marginTop: 12 }]}>{translate('career_info')}</Text>
            <View
              style={{
                padding: 16,
                backgroundColor: Colors.frame_color,
                marginVertical: 12,
                borderRadius: 8,
              }}
            >
              <InputField
                styleDropdown={styles.dropDownContainer}
                label={translate('working_org')}
                onChangeText={(e) =>
                  dispatch(updateAddionalInfoSuccess({ ...additionalInfo, workingOrg: e }))
                }
                value={additionalInfo?.workingOrg}
                cancel={() =>
                  dispatch(updateAddionalInfoSuccess({ ...additionalInfo, workingOrg: '' }))
                }
              />
              {workingPlaceForm()}
              <InputField
                styleDropdown={styles.dropDownContainer}
                keyboardType={'numeric'}
                maxLength={80}
                label={translate('work_phone')}
                onChangeText={(e) => {
                  dispatch(
                    updateAddionalInfoSuccess({
                      ...additionalInfo,
                      workingMobileNumber: e.replace(/[^0-9]/g, ''),
                    })
                  );
                }}
                value={additionalInfo?.workingMobileNumber}
                cancel={() =>
                  dispatch(
                    updateAddionalInfoSuccess({ ...additionalInfo, workingMobileNumber: '' })
                  )
                }
              />
              {/* {additionalInfo?.workingMobileNumber &&
              additionalInfo?.workingMobileNumber?.length < 9 ? (
                <Text style={styles.error}>{'Số điện thoại cần có từ 9 chữ số'}</Text>
              ) : null}
              {additionalInfo?.workingMobileNumber &&
              additionalInfo?.workingMobileNumber?.length > 1 &&
              additionalInfo?.workingMobileNumber[0] !== '0' ? (
                <Text style={styles.error}>{'Số điện thoại bắt đầu bằng 0'}</Text>
              ) : null} */}
              {mobileNoErr !== '' && <Text style={styles.error}>{mobileNoErr}</Text>}

            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  collapsedContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    height: hp(4.8),
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: hp(1.6),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2)
  },
  heading: {
    fontSize: hp(1.6),
    lineHeight: hp(1.8),
    color: Colors.grey_black,
    fontWeight: '600',
  },
  headingView: {
    flexDirection: 'row',
    paddingHorizontal: hp(1.6),
    alignItems: 'center',
    height: hp(4.8),
    flex: 1,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.border_color,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    flex: 0.3,
    fontWeight: '600',
    color: Colors.grey_black,
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 0.7,
    fontWeight: '400',
    color: Colors.black,
  },
  error: {
    color: Colors.red,
    fontSize: 16,
    lineHeight: 24,
    flex: 0.7,
    fontWeight: '400',
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    marginLeft: wp(2),
    fontSize: hp(1.6),
    lineHeight: hp(1.8),
    color: Colors.grey_black,
    fontWeight: '600',
  },
  cardHolderBody: {
    marginLeft: wp(8),
    marginTop: 16,
  },
  dropDownContainer: {
    height: 48,
    backgroundColor: Colors.white,
    flex: 0.7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default AdditionalInfo;
