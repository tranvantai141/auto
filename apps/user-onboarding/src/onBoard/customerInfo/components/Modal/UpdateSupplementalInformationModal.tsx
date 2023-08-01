import { IconEditGreen } from '@assets/images';
import { ICodes } from '@interfaces/apis/I_Contact_Form';
import { JobTitle, Occupation } from '@screens/addSupplementaryInfo/components/DummyData';
import { GetDistrictListOnly } from '@screens/addSupplementaryInfo/redux/actions/DistrictList';
import { GetCityProvinceList } from '@screens/addSupplementaryInfo/redux/actions/GetCityList';
import { GetCommuneList } from '@screens/addSupplementaryInfo/redux/actions/GetCommuneList';
import { resetGetDistrictListResponse } from '@screens/addSupplementaryInfo/redux/slices/DistrictListSlice';
import { resetGetCommuneListResponse } from '@screens/addSupplementaryInfo/redux/slices/GetCommuneListSlice';
import HeadingWithDropdown from '@screens/customerInfo/components/subComponents/HeadingWithDropdown';
import HeadingWithTextInput from '@screens/customerInfo/components/subComponents/HeadingWithTextInput';
import { SupplementalInfoDTO } from '@screens/customerInfo/typings/DTO';
import { SupplementalInformation } from '@screens/customerInfo/typings/request';
import Colors from '@screens/productAndService/assets/Colors';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'src/assets/sizes/Sizes';
import GradientButton from 'src/common/components/Button/GradientButton';
import useTransactionId from '../../../../hooks/useTransactionId';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { updateSupplementalResult } from '../../../../redux/slices/mocResultInfo/SupplementalInfo';
import { RootState } from '../../../../redux/store';
import Color from '../../../customerInformation/assets/Colors';
import { translate } from '../../assets/translations/translate';
import Address from '../Address';

export type TNewSupplementalUpdate = {
  currentAddress: string;
  jobTitle: string;
  currentOccupation: string;
  otherCurrentOccupation?: string;
  currentOtherOccupation?: string;
  jobOtherTitle?: string;
  otherJobTitle?: string;
  contactList: Record<
    string,
    {
      contactType: string;
      contactValue: string;
      currentSeqNo: string;
    }[]
  >;
  infoType: 'CURRENT_INFO' | 'NEW_INFO';
  newMobilePhone: string;
  newHomePhone: string;
  newEmail: string;
};

type Props = {
  isVisible?: boolean;
  isError?: boolean;
  onBackDropPress?: () => void;
  onPressSave?: (newValue: TNewSupplementalUpdate, info?: SupplementalInformation) => void;
  onPressCancel?: () => void;
  display_message?: string;
  dataCity?: any[];
  dataDistrict?: any[];
  dataWard?: any[];
  data: SupplementalInfoDTO[];
};

const UpdateSupplementalInformationModal = (props: Props) => {
  const scrollRef = useRef();

  const [isExpand, setIsExpand] = useState(false);
  const [isExpandPhone, setIsExpandPhone] = useState(false);
  const [isExpandLanding, setIsExpandLanding] = useState(false);
  const [isExpandEmail, setIsExpandEmail] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newOccupation, setNewOccupation] = useState<ICodes>();
  const [newOtherOccupation, setNewOtherOccupation] = useState('');
  const [newJob, setNewJob] = useState<ICodes>();
  const [newOtherJob, setNewOtherJob] = useState('');

  const [provinceCodeSelect, onSelectProvinceValue] = useState<ICodes>(null);
  const [districtCodeSelect, onSelectDistrictValue] = useState<ICodes>(null);
  const [communeCodeSelect, onSelectCommuneValue] = useState<ICodes>(null);

  const provinceList = useAppSelector((state: RootState) => state.getProvinceList);
  const classList = useAppSelector((state: RootState) => state.getClassLevel);
  const economicList = useAppSelector((state: RootState) => state.getEconomicList);
  const districtList = useAppSelector((state: RootState) => state.getDistrictList);
  const communelist = useAppSelector((state: RootState) => state.getCommunelist);

  const [combinedValue, setCombinedValue] = useState('');
  const [paramsFrom, setParams] = useState('');

  const [errorMessageDetailAddress, setErrorMessageDetailAddress] = useState('');
  const [errorMessageMobile, setErrorMessageMobile] = useState(undefined);
  const [errorMessagePhone, setErrorMessagePhone] = useState(undefined);
  const [errorMessageEmail, setErrorMessageEmail] = useState(undefined);
  const [errorMessageOccupation, setErrorMessageOccupation] = useState(undefined);
  const [errorMessageJob, setErrorMessageJob] = useState(undefined);

  const dispatch = useAppDispatch();
  const transactionId = useTransactionId();

  const getSupplementalInfo = useAppSelector(
    (state: RootState) => state.getSupplementalInfoSlice.data
  );

  // const isTwoColumn = props?.data.length > 1;
  const isTwoColumn = useMemo(() => {
    if (props?.data.length === 1) return false;
    if (props?.data[1] === undefined) return false;
    if (Object.keys(props?.data[1]).length < 1) return false;
    if (Object.keys(props?.data[1]).length === 1) {
      if (Object.keys(props?.data[1])[0] === 'contactList')
        if (Object.keys(props?.data[1].contactList).length <= 0) return false;
    }
    return true;
  }, [props?.data]);

  const displayData = useMemo<
    {
      label: string;
      required: boolean;
      value: string[];
      valueUpdate?: string[];
    }[]
  >(() => {
    return [
      {
        label: translate('sup_info_label_address'),
        required: true,
        value: [props?.data[0]?.currentAddress ?? getSupplementalInfo?.currentAddress],
        valueUpdate: isTwoColumn
          ? [props?.data[1]?.currentAddress]
          : Array.of(getSupplementalInfo?.newCurrentAddress),
      },
      {
        label: translate('sup_info_label_phone'),
        required: true,
        value:
          props?.data[0]?.contactList?.['MP']?.map((e) => e.contactValue) ??
          getSupplementalInfo?.mobilePhone?.toString().split(',') ??
          [],
        valueUpdate: isTwoColumn
          ? props?.data[1]?.contactList?.['MP']?.map((e) => e.contactValue)
          : Array.of(getSupplementalInfo?.newMobilePhone),
      },
      {
        label: translate('sup_info_label_landline'),
        required: false,
        value:
          props?.data[0]?.contactList?.['HP']?.map((e) => e.contactValue) ??
          getSupplementalInfo?.homePhone?.toString().split(',') ??
          [],
        valueUpdate: isTwoColumn
          ? props?.data[1]?.contactList?.['HP']?.map((e) => e.contactValue)
          : Array.of(getSupplementalInfo?.newHomePhone),
      },
      {
        label: translate('sup_info_label_email'),
        required: true,
        value:
          props?.data[0]?.contactList?.['EP']?.map((e) => e.contactValue) ??
          getSupplementalInfo?.email?.toString().split(',') ??
          [],
        valueUpdate: isTwoColumn
          ? props?.data[1]?.contactList?.['EP']?.map((e) => e.contactValue)
          : Array.of(getSupplementalInfo?.newEmail),
      },
      {
        label: translate('sup_info_label_occu'),
        required: true,
        value: [
          getSupplementalInfo?.currentOccupation?.trim().toString().includes('Khác')
            ? `Khác (${getSupplementalInfo?.otherCurrentOccupation.trim()})`
            : getSupplementalInfo?.currentOccupation ?? '',
        ],
        valueUpdate: isTwoColumn
          ? [props?.data[1]?.currentOccupation]
          : Array.of(getSupplementalInfo?.newCurrentOccupation),
      },
      {
        label: translate('sup_info_label_job_title'),
        required: true,
        value: [
          getSupplementalInfo?.jobTitle.trim().toString().includes('Khác')
            ? `Khác (${getSupplementalInfo?.otherJobTitle.trim()})`
            : getSupplementalInfo?.jobTitle ?? '',
        ],
        valueUpdate: isTwoColumn
          ? [props?.data[1]?.jobTitle]
          : Array.of(getSupplementalInfo?.newJobTitle),
      },
    ];
  }, [props?.data, isTwoColumn]);

  useEffect(() => {
    if (props.isVisible) {
      getProvinceList();

      // getDistrictByProvinceCode(getSupplementalInfo?.newProvinceCode);
      // getCommuneByDistrictCode(getSupplementalInfo?.newDistrictCode);

      const splitNewAddress = getSupplementalInfo?.newCurrentAddress?.split(',');

      if (getSupplementalInfo?.newProvinceCode?.length === 0 ?? true) onSelectProvinceValue(null);
      else
        handleSelectedProvinceCity({
          code: getSupplementalInfo?.newProvinceCode,
          name: splitNewAddress[splitNewAddress.length - 1] ?? '',
        } as ICodes);

      if (getSupplementalInfo?.newDistrictCode?.length === 0 ?? true) onSelectDistrictValue(null);
      else
        handleSelectedDistrict({
          code: getSupplementalInfo?.newDistrictCode,
          name: splitNewAddress[splitNewAddress.length - 2] ?? '',
        } as ICodes);

      if (getSupplementalInfo?.newCommuneCode?.length === 0 ?? true) onSelectCommuneValue(null);
      else
        handleSelectedCommune({
          code: getSupplementalInfo?.newCommuneCode,
          name: splitNewAddress[splitNewAddress.length - 3] ?? '',
        } as ICodes);

      const newCurrentAddress = displayData[0]?.valueUpdate ? displayData[0]?.valueUpdate[0] : '';

      setCombinedValue(newCurrentAddress ?? '');
      setNewAddress(getSupplementalInfo?.newDetailAddress);
      setNewMobileNumber(displayData[1]?.valueUpdate ? displayData[1]?.valueUpdate[0] : '');
      setNewPhoneNumber(displayData[2]?.valueUpdate ? displayData[2]?.valueUpdate[0] : '');
      setNewEmail(displayData[3]?.valueUpdate ? displayData[3]?.valueUpdate[0] : '');

      const occupation = Occupation.filter((item) =>
        item.name.includes(
          displayData[4]?.valueUpdate[0] && displayData[4]?.valueUpdate[0].length > 0
            ? displayData[4]?.valueUpdate[0]
            : undefined
        )
      );
      const job = JobTitle.filter((item) =>
        item.name.includes(
          displayData[5]?.valueUpdate[0] && displayData[5]?.valueUpdate[0].length > 0
            ? displayData[5]?.valueUpdate[0]
            : undefined
        )
      );

      if (displayData[0]?.value[0]?.trim().length === 0) setIsExpand(true);

      // console.log(occupation)

      setNewOccupation(occupation.length > 0 ? (occupation[0] as ICodes) : undefined);
      setNewJob(job.length > 0 ? (job[0] as ICodes) : undefined);

      setNewOtherOccupation(getSupplementalInfo?.otherOccupationInfo ?? '');
      setNewOtherJob(getSupplementalInfo?.otherJobTitleInfo ?? '');

      setErrorMessageMobile(undefined);
      setErrorMessagePhone(undefined);
      setErrorMessageEmail(undefined);
    }
  }, [props.isVisible]);

  useEffect(() => {
    setCombinedValue(
      `${newAddress?.trim().length > 0 ? newAddress + ',' : ''} ${
        communeCodeSelect?.name?.trim().length > 0 ? communeCodeSelect?.name?.trim() + ',' : ''
      } ${
        districtCodeSelect?.name?.trim().length > 0 ? districtCodeSelect?.name.trim() + ',' : ''
      } ${provinceCodeSelect?.name?.trim().length > 0 ? provinceCodeSelect?.name.trim() : ''}`
    );
  }, [newAddress, provinceCodeSelect, districtCodeSelect, communeCodeSelect]);

  const getProvinceList = React.useCallback(() => dispatch(GetCityProvinceList()), [dispatch]);

  const getDistrictByProvinceCode = React.useCallback((province_code: string) => {
    if (province_code) {
      const params: any = {
        provinceCode: province_code,
      };
      dispatch(GetDistrictListOnly(params));
    }
  }, []);

  const getCommuneByDistrictCode = React.useCallback((district_code: string) => {
    if (district_code) {
      const params: any = {
        districtCode: district_code,
      };
      dispatch(GetCommuneList(params));
    }
  }, []);

  const handleSelectedProvinceCity = React.useCallback((inputValue: ListItem) => {
    onSelectProvinceValue({
      code: inputValue?.code,
      name: inputValue?.name,
    });

    if (inputValue?.code !== '') {
      getDistrictByProvinceCode(inputValue?.code);
      dispatch(resetGetDistrictListResponse());
      dispatch(resetGetCommuneListResponse());
      onSelectCommuneValue(null);
      onSelectDistrictValue(null);
    }
  }, []);

  const handleSelectedDistrict = React.useCallback(
    (inputValue: ListItem) => {
      onSelectDistrictValue({
        code: inputValue?.code,
        name: inputValue?.name,
      });

      if (inputValue?.code !== '') {
        getCommuneByDistrictCode(inputValue?.code);
        dispatch(resetGetCommuneListResponse());
        onSelectCommuneValue(null);
      }
    },
    [provinceCodeSelect]
  );

  const handleSelectedCommune = React.useCallback((communeValue: ListItem) => {
    onSelectCommuneValue({
      code: communeValue?.code,
      name: communeValue?.name,
    });
  }, []);

  const scrollTo = (position: number) => {
    scrollRef.current?.scrollTo({
      y: position,
      animated: true,
    });
  };

  const handleSaveSupplemental = () => {
    if (
      (newAddress && !provinceCodeSelect && newAddress.trim().length > 0) ||
      (provinceCodeSelect && !districtCodeSelect) ||
      (districtCodeSelect && !communeCodeSelect) ||
      (combinedValue && combinedValue?.trim().length > 80) ||
      (districtCodeSelect &&
        communeCodeSelect &&
        provinceCodeSelect &&
        newAddress.trim().length === 0)
    ) {
      setIsExpand(true);
      scrollTo(0);
      return;
    }

    if (newAddress && !provinceCodeSelect && newAddress.trim().length > 0) {
      setIsExpand(true);
      scrollTo(0);

      return;
    }

    if (!provinceCodeSelect && displayData[0]?.value[0]?.trim().length <= 0) {
      setIsExpand(true);
      scrollTo(0);

      return;
    }

    if (
      newMobileNumber?.trim().length === 0 &&
      (displayData[1]?.value[0]?.trim().length <= 0 || displayData[1]?.value?.length <= 0)
    ) {
      scrollTo(hp(isExpand ? 40 : 0));
      return;
    }

    if (newMobileNumber?.trim().length > 0 && newMobileNumber?.trim().length < 10) {
      setErrorMessageMobile('Điện thoại di động cần có 10 chữ số');
      scrollTo(hp(isExpand ? 40 : 0));

      return;
    }

    if (newMobileNumber?.trim().length > 0 && !newMobileNumber.trim().startsWith('0')) {
      setErrorMessageMobile('Điện thoại di động bắt đầu bằng 0');
      scrollTo(hp(isExpand ? 40 : 0));

      return;
    }

    // if( newMobileNumber?.trim().length > 0 && !/[03|05|07|08|09]+([0-9]{9})\b/.test(newMobileNumber)) {
    //   setErrorMessageMobile('Điện thoại di động không đúng định dạng');
    //   scrollTo(hp(40));
    //   return;
    // }

    setErrorMessageMobile(undefined);

    if (newPhoneNumber?.trim().length > 0 && newPhoneNumber?.trim().length < 9) {
      setErrorMessagePhone('Điện thoại cố định cần có từ 9 chữ số');
      scrollTo(hp(isExpand ? 60 : 20));
      return;
    }

    if (newPhoneNumber?.trim().length > 0 && !newPhoneNumber.trim().startsWith('0')) {
      setErrorMessagePhone('Điện thoại cố định bắt đầu bằng 0');
      scrollTo(hp(isExpand ? 60 : 20));
      return;
    }

    // if( newPhoneNumber?.trim().length > 0 && !/[03|05|07|08|09]+([0-9]{12})\b/.test(newPhoneNumber)) {
    //   setErrorMessagePhone('Điện thoại cố định không đúng định dạng');
    //   scrollTo(hp(60));
    //   return;
    // }

    setErrorMessagePhone(undefined);

    if (
      newEmail?.trim().length === 0 &&
      (displayData[3]?.value[0]?.trim().length <= 0 || displayData[3]?.value?.length <= 0)
    ) {
      scrollTo(hp(isExpand ? 80 : 40));
      return;
    }

    if (
      newEmail &&
      newEmail?.trim().length > 0 &&
      // eslint-disable-next-line no-useless-escape
      !/(?:^|,)(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))(?:$|(?=,))/.test(
        newEmail
      )
    ) {
      setErrorMessageEmail('Thư điện tử không đúng định dạng. Vui lòng kiểm tra lại');
      scrollTo(hp(isExpand ? 80 : 40));

      return;
    }

    setErrorMessageEmail(undefined);

    // console.log(!newOccupation);
    // console.log(newOccupation?.name?.trim().length === 0);
    // console.log(displayData[4]?.value[0]?.trim());
    // console.log(newOccupation?.name?.trim());
    // console.log(displayData[4]?.value?.length);
    // console.log((displayData[4]?.value[0]?.trim().length <= 0 || displayData[4]?.value?.length <= 0 ));

    // return;

    if (
      (!newOccupation || newOccupation?.name?.trim().length === 0) &&
      (!displayData[4]?.value[0] ||
        displayData[4]?.value[0]?.trim().length <= 0 ||
        displayData[4]?.value?.length <= 0)
    ) {
      scrollTo(hp(isExpand ? 100 : 60));

      return;
    }

    if (newOccupation && newOccupation?.code === '7' && newOtherOccupation?.trim().length === 0) {
      scrollTo(hp(isExpand ? 100 : 60));

      return;
    }

    if (
      (!newJob || newJob?.name?.trim().length === 0) &&
      (!displayData[5]?.value[0] ||
        displayData[5]?.value[0]?.trim().length <= 0 ||
        displayData[5]?.value?.length <= 0)
    ) {
      scrollTo(hp(isExpand ? 120 : 80));

      return;
    }

    if (newJob && newJob?.code === '4' && newOtherJob?.trim().length === 0) {
      scrollTo(hp(isExpand ? 120 : 80));

      return;
    }

    const supplementalInfo = {
      transactionId: transactionId,
      currentAddress: displayData[0]?.value[0] ?? '',
      newCurrentAddress: combinedValue?.trim(),
      newProvinceCode: provinceCodeSelect?.code ?? '',
      newDistrictCode: districtCodeSelect?.code ?? '',
      newCommuneCode: communeCodeSelect?.code ?? '',
      newDetailAddress: newAddress?.trim() ?? '',
      mobilePhone: displayData[1]?.value ? displayData[1]?.value?.toString().trim() : '',
      newMobilePhone: newMobileNumber?.trim(),
      homePhone: displayData[2]?.value ? displayData[2]?.value?.toString().trim() : '',
      newHomePhone: newPhoneNumber?.trim(),
      email: displayData[3]?.value ? displayData[3]?.value?.toString().trim() : '',
      newEmail: newEmail?.trim(),
      currentOccupation: getSupplementalInfo?.currentOccupation ?? '',
      otherCurrentOccupation: getSupplementalInfo?.otherCurrentOccupation ?? '',
      newCurrentOccupation: newOccupation?.name?.trim(),
      otherOccupationInfo: newOccupation?.code === '7' ? newOtherOccupation?.trim() : '',
      jobTitle: getSupplementalInfo?.jobTitle ?? '',
      otherJobTitle: getSupplementalInfo?.otherJobTitle ?? '',
      newJobTitle: newJob?.name,
      otherJobTitleInfo: newJob?.code === '4' ? newOtherJob?.trim() : '',
    } as SupplementalInformation;

    const valueSupplemental = {} as SupplementalInfoDTO;
    const contactList = {};
    const EP = [];
    const MP = [];
    const HP = [];
    if (combinedValue && combinedValue?.trim().length > 0)
      valueSupplemental.currentAddress = combinedValue;
    if (newJob && newJob?.name?.trim().length > 0) {
      // if(newJob?.code === '4')  valueSupplemental.jobTitle = `Khác (${newOtherJob})`;
      // else
      valueSupplemental.jobTitle = newJob?.name;
      valueSupplemental.jobOtherTitle = newOtherJob.trim();
    }
    if (newOccupation && newOccupation?.name?.trim().length > 0) {
      // if(newOccupation?.code === '7')  valueSupplemental.currentOccupation = `Khác (${newOtherOccupation})`;
      // else
      valueSupplemental.currentOccupation = newOccupation?.name;
      valueSupplemental.currentOtherOccupation = newOtherOccupation.trim();
    }
    if (newEmail && newEmail?.trim().length > 0) {
      EP.push({
        contactType: 'EP',
        contactValue: newEmail,
      });
      contactList.EP = EP;
    }
    if (newMobileNumber && newMobileNumber?.trim().length > 0) {
      MP.push({
        contactType: 'MP',
        contactValue: newMobileNumber,
      });
      contactList.MP = MP;
    }
    if (newPhoneNumber && newPhoneNumber?.trim().length > 0) {
      HP.push({
        contactType: 'HP',
        contactValue: newPhoneNumber,
      });
      contactList.HP = HP;
    }

    valueSupplemental.contactList = contactList;

    dispatch(updateSupplementalResult(supplementalInfo));

    if (props?.onPressSave) {
      props?.onPressSave(valueSupplemental, supplementalInfo);
    }
  };

  const addressForm = React.useCallback(() => {
    return (
      <View style={Styles.component_view}>
        <View style={[Styles.title_view, { marginTop: hp(2) }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={Styles.label_text}>
              Địa chỉ hiện tại{' '}
              <Text numberOfLines={2} style={Styles.info_text_err}>
                *
              </Text>
            </Text>
          </View>
          <View style={{ flex: 2.5 }}>
            <Text numberOfLines={2} style={Styles.info_text}>
              {displayData[0]?.value[0]?.length > 0 ? displayData[0]?.value[0] : ' - ' ?? ' - '}
            </Text>
          </View>
        </View>

        <View style={Styles.title_view}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={Styles.label_text}>
              Địa chỉ hiện tại mới
            </Text>
          </View>
          {!isExpand ? (
            <TouchableOpacity
              style={{ flex: 2.5, flexDirection: 'row' }}
              onPress={() => setIsExpand(true)}
            >
              <IconEditGreen height={hp(2)} width={hp(2)} />
              <Text numberOfLines={2} style={Styles.link_text}>
                Nhập thông tin
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 2.5 }}>
              <Address
                dataCity={provinceList?.response?.provinces || []}
                dataDistrict={districtList?.response?.districts || []}
                dataWard={communelist?.response?.communces || []}
                onChangeCity={(item: ListItem) => handleSelectedProvinceCity(item)}
                onChangeDistrict={(item: ListItem) => handleSelectedDistrict(item)}
                onChangeWard={(item: ListItem) => handleSelectedCommune(item)}
                valueCity={provinceCodeSelect}
                valueDistrict={districtCodeSelect}
                valueWard={communeCodeSelect}
                currentAddress={displayData[0]?.value[0] ?? ''}
                valueDetailAddress={newAddress}
                onChangeDetailAddress={(text: string) => setNewAddress(text)}
                currentAdddress={combinedValue?.trim().length > 0 ? combinedValue : '-'}
                errorMessageDetailAddress={errorMessageDetailAddress}
              />
            </View>
          )}
        </View>
      </View>
    );
  }, [
    isExpand,
    provinceCodeSelect,
    districtCodeSelect,
    communeCodeSelect,
    newAddress,
    provinceList,
    districtList,
    communelist,
    combinedValue,
    errorMessageDetailAddress,
    props?.data,
  ]);

  const mobileContactForm = React.useCallback(() => {
    return (
      <View style={Styles.component_view}>
        <View style={[Styles.title_view, { marginTop: hp(2) }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={Styles.label_text}>
              Điện thoại di động{' '}
              <Text numberOfLines={2} style={Styles.info_text_err}>
                *
              </Text>
            </Text>
          </View>
          <View style={{ flex: 2.5 }}>
            {!isExpandPhone ? (
              <Text numberOfLines={2} style={Styles.info_text}>
                {displayData[1]?.value[0]?.length > 0 ? displayData[1]?.value[0] : ' - ' ?? ' - '}
              </Text>
            ) : (
              displayData[1].value?.map((item) => {
                return (
                  <Text numberOfLines={2} style={Styles.info_text_expand}>
                    {item.toString() ?? ' - '}
                  </Text>
                );
              })
            )}
          </View>
          {displayData[1].value.length > 1 && (
            <TouchableOpacity
              style={{ flexDirection: 'row', position: 'absolute', right: wp(4) }}
              onPress={() => {
                setIsExpandPhone(!isExpandPhone);
              }}
            >
              <Text numberOfLines={2} style={Styles.hyper_link_text}>
                {isExpandPhone ? `Thu gọn` : `Xem thêm (${displayData[1].value.length - 1})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[Styles.title_view, { marginTop: 5 }]}>
          <HeadingWithTextInput
            maxLength={10}
            keyboardType={'numeric'}
            dropdownHeading={'Điện thoại di động mới'}
            clearButtonMode="always"
            valueTextInput={newMobileNumber}
            onChangeText={(text) => {
              setNewMobileNumber(text.replace(/[^0-9]/g, ''));
              //
            }}
            topVieww={{
              flexDirection: 'row',
              marginTop: hp(1),
              width: wp(80),
              paddingHorizontal: wp(3),
            }}
            middleView={{ marginTop: hp(-2.5), marginBottom: hp(2) }}
            textStyle={{ marginLeft: wp(2.5) }}
            errorMessage={
              errorMessageMobile ??
              (newMobileNumber.trim().length > 0 || displayData[1].value[0]
                ? ''
                : 'Vui lòng nhập điện thoại di động mới')
            }
          />
        </View>
      </View>
    );
  }, [newMobileNumber, isExpandPhone, errorMessageMobile, props?.data]);

  const phoneContactForm = React.useCallback(() => {
    return (
      <View style={Styles.component_view}>
        <View style={[Styles.title_view, { marginTop: hp(2) }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={Styles.label_text}>
              Điện thoại cố định
            </Text>
          </View>
          <View style={{ flex: 2.5 }}>
            {!isExpandLanding ? (
              <Text numberOfLines={2} style={Styles.info_text}>
                {displayData[2]?.value[0]?.length > 0 ? displayData[2]?.value[0] : ' - ' ?? ' - '}
              </Text>
            ) : (
              displayData[2].value?.map((item) => {
                return (
                  <Text numberOfLines={2} style={Styles.info_text_expand}>
                    {item.toString() ?? ' - '}
                  </Text>
                );
              })
            )}
          </View>
          {displayData[2].value.length > 1 && (
            <TouchableOpacity
              style={{ flexDirection: 'row', position: 'absolute', right: wp(4) }}
              onPress={() => setIsExpandLanding(!isExpandLanding)}
            >
              <Text numberOfLines={2} style={Styles.hyper_link_text}>
                {isExpandLanding ? `Thu gọn` : `Xem thêm (${displayData[2].value.length - 1})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[Styles.title_view]}>
          <HeadingWithTextInput
            maxLength={79}
            dropdownHeading={'Điện thoại cố định mới'}
            clearButtonMode="always"
            valueTextInput={newPhoneNumber}
            keyboardType={'numeric'}
            onChangeText={(text) => {
              setNewPhoneNumber(text.replace(/[^0-9]/g, ''));
              if (text.replace(/[^0-9]/g, '').trim().length <= 0) setErrorMessagePhone(undefined);
              //
            }}
            topVieww={{
              flexDirection: 'row',
              marginTop: hp(1),
              width: wp(80),
              paddingHorizontal: wp(3),
            }}
            middleView={{ marginTop: hp(-2.5), marginBottom: hp(2) }}
            textStyle={{ marginLeft: wp(2.5) }}
            errorMessage={errorMessagePhone ?? ''}
          />
        </View>
      </View>
    );
  }, [newPhoneNumber, errorMessagePhone, props?.data, isExpandLanding]);

  const emailContactForm = React.useCallback(() => {
    return (
      <View style={Styles.component_view}>
        <View style={[Styles.title_view, { marginTop: hp(2) }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={Styles.label_text}>
              Thư điện tử{' '}
              <Text numberOfLines={2} style={Styles.info_text_err}>
                *
              </Text>
            </Text>
          </View>
          <View style={{ flex: 2.5 }}>
            {!isExpandEmail ? (
              <Text numberOfLines={2} style={Styles.info_text}>
                {displayData[3]?.value[0]?.length > 0 ? displayData[3]?.value[0] : ' - ' ?? ' - '}
              </Text>
            ) : (
              displayData[3].value?.map((item) => {
                return (
                  <Text numberOfLines={2} style={Styles.info_text_expand}>
                    {item.toString() ?? ' - '}
                  </Text>
                );
              })
            )}
          </View>
          {displayData[3].value.length > 1 && (
            <TouchableOpacity
              style={{ flexDirection: 'row', position: 'absolute', right: wp(4) }}
              onPress={() => {
                setIsExpandEmail(!isExpandEmail);
              }}
            >
              <Text numberOfLines={2} style={Styles.hyper_link_text}>
                {isExpandEmail ? `Thu gọn` : `Xem thêm (${displayData[3].value.length - 1})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={[Styles.title_view]}>
          <HeadingWithTextInput
            maxLength={79}
            dropdownHeading={'Thư điện tử mới'}
            clearButtonMode="always"
            valueTextInput={newEmail}
            onChangeText={(text) => {
              // setNewEmail(text)
              setNewEmail(text.replace(/[^0-9a-zA-Z@.]/g, ''));
              //
            }}
            topVieww={{
              flexDirection: 'row',
              marginTop: hp(1),
              width: wp(80),
              paddingHorizontal: wp(3),
            }}
            middleView={{ marginTop: hp(-2.5), marginBottom: hp(2) }}
            textStyle={{ marginLeft: wp(2.5) }}
            errorMessage={
              errorMessageEmail ??
              (newEmail || displayData[3].value[0] ? '' : 'Vui lòng nhập thư điện tử mới')
            }
          />
        </View>
      </View>
    );
  }, [newEmail, errorMessageEmail, props?.data, isExpandEmail]);

  const occupationForm = React.useCallback(() => {
    return (
      <View style={Styles.component_view}>
        <View style={[Styles.title_view, { marginTop: hp(2) }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={Styles.label_text}>
              Nghề nghiệp{' '}
              <Text numberOfLines={2} style={Styles.info_text_err}>
                *
              </Text>
            </Text>
          </View>
          <View style={{ flex: 2.5 }}>
            <Text numberOfLines={2} style={Styles.info_text}>
              {displayData[4]?.value[0]?.length > 0 ? displayData[4]?.value[0] : ' - ' ?? ' - '}
            </Text>
          </View>
        </View>

        <View style={[Styles.title_view, { marginTop: -15 }]}>
          <View style={{ flex: 2.5, justifyContent: 'center' }}>
            <HeadingWithDropdown
              data={Occupation}
              placeholder={translate('wardPlaceholder')}
              value={newOccupation}
              onChangeText={(item) => {
                setNewOccupation(item);
              }}
              dropdownHeading={'Nghề nghiệp mới'}
              isBlueBackground
              view={{ flexDirection: 'row', height: hp(8), justifyContent: 'space-between' }}
              dropStyle={{ flex: 1, flexDirection: 'column', marginLeft: wp(3) }}
              errorMessage={
                newOccupation || displayData[4].value[0] ? '' : 'Vui lòng nhập nghề nghiệp mới'
              }
            />
          </View>
        </View>

        {newOccupation?.code === '7' && (
          <View style={[Styles.title_view, { marginTop: -1 }]}>
            <HeadingWithTextInput
              maxLength={80}
              dropdownHeading={'Nghề nghiệp khác'}
              clearButtonMode="always"
              valueTextInput={newOtherOccupation}
              onChangeText={(text) => {
                setNewOtherOccupation(text);
              }}
              topVieww={{
                flexDirection: 'row',
                marginTop: hp(1),
                width: wp(86),
                paddingHorizontal: wp(3),
              }}
              middleView={{ marginTop: hp(-2.5), marginBottom: hp(2), marginLeft: wp(3) }}
              textStyle={{ marginLeft: wp(6.5) }}
              errorMessage={
                newOtherOccupation?.length === 0 && newOccupation?.code === '7'
                  ? 'Vui lòng nhập nghề nghiệp khác'
                  : ''
              }
            />
          </View>
        )}
      </View>
    );
  }, [newOccupation, newOtherOccupation, props?.data]);

  const jobTitleForm = React.useCallback(() => {
    return (
      <View style={Styles.component_view}>
        <View style={[Styles.title_view, { marginTop: hp(2) }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={Styles.label_text}>
              Chức vụ{' '}
              <Text numberOfLines={2} style={Styles.info_text_err}>
                *
              </Text>
            </Text>
          </View>
          <View style={{ flex: 2.5 }}>
            <Text numberOfLines={2} style={Styles.info_text}>
              {displayData[5]?.value[0]?.length > 0 ? displayData[5]?.value[0] : ' - ' ?? ' - '}
            </Text>
          </View>
        </View>

        <View style={[Styles.title_view, { marginTop: -15 }]}>
          <View style={{ flex: 2.5, justifyContent: 'center' }}>
            <HeadingWithDropdown
              data={JobTitle}
              placeholder={translate('wardPlaceholder')}
              value={newJob}
              onChangeText={(item) => {
                setNewJob(item);
              }}
              dropdownHeading={'Chức vụ mới'}
              isBlueBackground
              view={{ flexDirection: 'row', height: hp(8) }}
              dropStyle={{
                flex: 1,
                flexDirection: 'column',
                marginLeft: wp(5),
                marginRight: wp(7),
              }}
              errorMessage={newJob || displayData[5].value[0] ? '' : 'Vui lòng nhập chức vụ mới'}
            />
          </View>
        </View>
        {newJob?.code === '4' && (
          <View style={[Styles.title_view, { marginTop: -1 }]}>
            <HeadingWithTextInput
              maxLength={80}
              dropdownHeading={'Chức vụ khác'}
              clearButtonMode="always"
              valueTextInput={newOtherJob}
              onChangeText={(text) => {
                setNewOtherJob(text);
              }}
              topVieww={{
                flexDirection: 'row',
                marginTop: hp(1),
                width: wp(86),
                paddingHorizontal: wp(3),
              }}
              middleView={{ marginTop: hp(-2.5), marginBottom: hp(2), marginLeft: wp(3) }}
              textStyle={{ marginLeft: wp(6.5) }}
              errorMessage={
                newOtherJob?.length === 0 && newJob?.code === '4'
                  ? 'Vui lòng nhập chức vụ khác'
                  : ''
              }
            />
          </View>
        )}
      </View>
    );
  }, [newJob, newOtherJob, props?.data]);

  return (
    <Modal
      hasBackdrop={true}
      backdropColor={'transparent'}
      onBackdropPress={props.onBackDropPress}
      isVisible={props?.isVisible}
      style={Styles.modal}
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={hp(0)}>
        <View style={Styles.modal_view}>
          <Text style={Styles.heading_text}>{translate('title_update')}</Text>
          <View style={Styles.middle_view}>
            <ScrollView ref={scrollRef}>
              {addressForm()}
              {mobileContactForm()}
              {phoneContactForm()}
              {emailContactForm()}
              {occupationForm()}
              {jobTitleForm()}
            </ScrollView>
          </View>
          <View style={Styles?.button_view}>
            <TouchableOpacity style={Styles?.button_style1} onPress={props?.onPressCancel}>
              <Text style={Styles?.button_text}>{translate('btn_cancel')}</Text>
            </TouchableOpacity>
            <GradientButton
              buttonText={translate('btn_save')}
              buttonStyle={Styles?.button_style2}
              onPress={handleSaveSupplemental}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  modal: {
    backgroundColor: Color.grey_transparent,
    flex: 1,
    margin: 0,
  },
  heading_text: {
    fontSize: hp(2.4),
    fontWeight: '600',
    color: Color.black,
    marginBottom: hp(1),
  },
  modal_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: hp(2),
    paddingVertical: hp(2.5),
    justifyContent: 'center',
    width: wp(80),
    height: hp(70),
  },
  component_view: {
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 12,
    justifyContent: 'center',
    width: wp(75),
    marginBottom: hp(1),
  },
  middle_view: {
    backgroundColor: Color.background_grey,
    alignSelf: 'center',
    paddingHorizontal: hp(1),
    paddingVertical: hp(2.5),
    justifyContent: 'center',
    width: wp(80),
    height: hp(55),
  },

  modal_view_bottom: {
    width: wp(60),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title_view: {
    marginVertical: hp(0.5),
    marginTop: hp(1),
    marginLeft: hp(2),
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  warn_view: {
    marginVertical: hp(0.3),
    marginLeft: hp(5),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  link_text: {
    color: Color.primary,
    fontWeight: '600',
    marginLeft: hp(1),
    fontSize: hp(1.3),
  },
  hyper_link_text: {
    color: Color.primary,
    fontWeight: '300',
    marginLeft: hp(1),
    fontSize: hp(1.3),
  },
  info_text: {
    color: Color.gray_100,
    fontWeight: '400',
    marginLeft: hp(1),
    fontSize: hp(1.2),
  },
  info_text_expand: {
    color: Color.gray_100,
    fontWeight: '400',
    marginLeft: hp(1),
    marginBottom: hp(1),
    fontSize: hp(1.2),
  },
  info_text_err: {
    color: Color.red,
    fontWeight: 'normal',
    marginLeft: hp(3),
    fontSize: hp(1.5),
    flex: 3,
  },
  info_text_error: {
    color: Color.red,
    fontWeight: 'normal',
    marginLeft: hp(6),
    marginBottom: hp(0.6),
    fontSize: hp(1.5),
    flex: 3,
  },
  info_text_correct: {
    color: '#1FB369',
    fontWeight: 'normal',
    marginLeft: hp(6),
    marginBottom: hp(0.6),
    fontSize: hp(1.5),
    flex: 3,
  },
  label_text: {
    textAlign: 'left',
    color: Color.black,
    fontSize: hp(1.3),
    fontWeight: '600',
    marginBottom: hp(2),
  },
  title_text: {
    textAlign: 'center',
    color: Color.black,
    fontSize: hp(2.1),
    fontWeight: '600',
    marginBottom: hp(5),
  },
  image_icon: { height: hp(4.5), width: hp(4.5), alignSelf: 'center' },
  button_box: { justifyContent: 'space-between' },
  f: {
    backgrounndColor: Color.red,
    flex: 1,
  },
  button_style1: {
    backgroundColor: Color.white,
    width: wp(15),
    height: hp(4.5),
    alignSelf: 'flex-end',
    marginRight: wp(2),
    borderColor: Color?.border_grey,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: Color?.app_black,
    fontWeight: 'normal',
    fontSize: 18,
  },
  button_style2: { width: wp(15), height: hp(4.8), alignSelf: 'flex-end' },
  button_view: { justifyContent: 'flex-end', flexDirection: 'row' },
  inputView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: hp(2),
    marginRight: wp(3),
  },
  inputDropView: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginRight: 13,
    flex: 0.6,
    height: hp(4.5),
  },
});
export default UpdateSupplementalInformationModal;
