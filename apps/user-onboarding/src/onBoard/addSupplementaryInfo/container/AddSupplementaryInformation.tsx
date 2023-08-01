import GradientButton from '@components/Button/GradientButton';
import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import {
  ICodes,
  ISupplementaryForm,
  ISupplementaryFormError,
} from '@interfaces/apis/I_Contact_Form';
import { RouteNames } from '@routeNames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { ListItem } from 'src/typings/global';
import { TestIds } from '../assets/TestIds';
import { translate } from '../assets/transalations/translate';
import Address from '../components/Address';
import BackButtonHeaderForSupplementary from '../components/BackButtonHeader';
import Contact from '../components/Contact';
import DatePickerModal from '../components/DatePicker';
import { JobTitle, Occupation } from '../components/DummyData';
import Job from '../components/Job';
import Nationality from '../components/Nationality';
import OtherInformation from '../components/OtherInformation';
import { GetDistrictListOnly } from '../redux/actions/DistrictList';
import { GetEconomicList } from '../redux/actions/EconomicList';
import { GetCityProvinceList } from '../redux/actions/GetCityList';
import { GetClassLevelList } from '../redux/actions/GetClassLevelList';
import { GetCommuneList } from '../redux/actions/GetCommuneList';
import { GetNationListing } from '../redux/actions/GetNationList';
import { SaveSupplementaryDetailRequest } from '../redux/actions/SaveSupplementaryDetail';
import { UpdateSupplementaryDetailRequest } from '../redux/actions/UpdateSupplementaryDetail';
import { GetSupplementalDetail } from '../redux/actions/getSupplementaryDetail';
import { resetGetDistrictListResponse } from '../redux/slices/DistrictListSlice';
import { resetGetCommuneListResponse } from '../redux/slices/GetCommuneListSlice';
import { resetSaveSupplementaryDetailResponse } from '../redux/slices/SaveSupplementaryDetailSlice';
import { resetUpdateSupplementaryDetailResponse } from '../redux/slices/UpdateSupplementaryDetailSlice';
import Style from './Style';

const AddSupplementaryInformation = (props: any) => {
  const { navigation } = props;
  const [selectResidence, setResidence] = useState(true);
  const [isHomeless, setHomeless] = useState(false);
  const [selectOccupation, setSelectOccupation] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [openCalender, setOpenCalender] = useState(false);
  const [dateCalender, setDateCalender] = useState('');
  const [transaction_id, setTransactionId] = useState<string>('');
  const [provinceCodeSelect, onSelectProvinceValue] = useState<ICodes>();
  const [districtCodeSelect, onSelectDistrictValue] = useState<ICodes>();
  const [communeCodeSelect, onSelectCommuneValue] = useState<ICodes>();
  const [positionSelect, onSelectPositionValue] = useState({});
  const [occupationSelect, onSelectOccupationValue] = useState({});
  const [economicCodeSelect, onSelectEconomicValue] = useState<ICodes>();
  const [classLevelCodeSelect, onSelectClassLevelValue] = useState<ICodes>();
  const [nationCodeSelect, onSelectNationalityValue] = useState<ICodes>();
  const [combinedValue, setCombinedValue] = useState('');
  const [paramsFrom, setParams] = useState('');
  const [changed, setChanged] = useState(false);
  const dispatch = useAppDispatch();
  const nationList = useAppSelector((state: RootState) => state.nationlisting);
  const provinceList = useAppSelector((state: RootState) => state.getProvinceList);
  const classList = useAppSelector((state: RootState) => state.getClassLevel);
  const economicList = useAppSelector((state: RootState) => state.getEconomicList);
  const districtList = useAppSelector((state: RootState) => state.getDistrictList);
  const communelist = useAppSelector((state: RootState) => state.getCommunelist);
  const saveSupplementaryDetails = useAppSelector((state: RootState) => state.saveDetails);
  const getSupplementalInfo = useAppSelector((state: RootState) => state.getSupplementaryDetail);
  const updateSupplementary = useAppSelector((state: RootState) => state.updateSupplementaryInfo);
  const refScrollView = useRef<ScrollView>(null);

  const [supplementaryForm, setSupplementaryForm] = useState<ISupplementaryForm>({
    transactionId: '',
    mobilePhone: '',
    registrationPriority: '',
    landlinePhone: '',
    email: '',
    currentAddress: '',
    provinceCode: '',
    districtCode: '',
    communceCode: '',
    detailedAddress: '',
    timeAtCurrentAddress: '',
    currentOccupation: '',
    otherOccupationInfo: '',
    jobTitle: '',
    otherJobTitleInfo: '',
    nationCode: '',
    foreignAddress: '',
    statusOfResidence: '',
    termOfResidenceInVietnam: '',
    taxCode: '',
    economicSectorCode: '',
    classLevelCode: 'A21101',
  });
  const noErrorState = {
    transactionId: '',
    mobilePhone: '',
    registrationPriority: '',
    landlinePhone: '',
    email: '',
    currentAddress: '',
    provinceCode: '',
    districtCode: '',
    communceCode: '',
    detailedAddress: '',
    timeAtCurrentAddress: '',
    currentOccupation: '',
    otherOccupationInfo: '',
    jobTitle: '',
    otherJobTitleInfo: '',
    nationCode: '',
    foreignAddress: '',
    statusOfResidence: '',
    termOfResidenceInVietnam: '',
    taxCode: '',
    economicSectorCode: '',
    classLevelCode: '',
  };
  const [supplementaryFormError, setSupplementaryFormError] =
    useState<ISupplementaryFormError>(noErrorState);

  const [fieldsPositions, setFieldsPositions] = useState({
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    getNationList();
    getProvinceList();
    getClassList();
    getEcoList();
  }, [navigation, date]);

  useEffect(() => {
    try {
      getData(TRANSACTION_ID).then((t: any) => {
        setTransactionId(t);
        const params = {
          transactionId: t,
        };
        dispatch(GetSupplementalDetail(params));
      });
    } catch (error) {
      console.log('transaction error', error);
    }
  }, []);

  useEffect(() => {
    setParams(props?.route?.params?.detailAddressParam);
  }, []);

  useEffect(() => {
    if (saveSupplementaryDetails) {
      if (
        saveSupplementaryDetails?.response !== undefined &&
        saveSupplementaryDetails?.response?.supplementalInformation
      ) {
        dispatch(resetSaveSupplementaryDetailResponse());
        navigation.navigate(RouteNames.userInformation.name);
      } else if (saveSupplementaryDetails?.error) {
        console.log(saveSupplementaryDetails?.error, 'error');
      }
    }
  }, [navigation, saveSupplementaryDetails, saveSupplementaryDetails?.response]);

  useEffect(() => {
    if (updateSupplementary) {
      if (updateSupplementary?.response && updateSupplementary?.response?.supplementalInformation) {
        const params = {
          transactionId: transaction_id,
        };
        dispatch(GetSupplementalDetail(params));
        dispatch(resetUpdateSupplementaryDetailResponse());
        navigation.navigate(RouteNames.reviewInformation.name);
      } else if (updateSupplementary?.error) {
        console.log(updateSupplementary?.error, 'error');
      }
    }
  }, [dispatch, navigation, transaction_id, updateSupplementary, updateSupplementary?.response]);

  useEffect(() => {
    if (getSupplementalInfo) {
      if (getSupplementalInfo?.response && getSupplementalInfo?.response !== undefined) {
        if (getSupplementalInfo?.response?.supplementalInformation?.provinceName) {
          if (getSupplementalInfo?.response?.supplementalInformation?.provinceCode) {
            getDistrictByProvinceCode(
              getSupplementalInfo?.response?.supplementalInformation?.provinceCode
            );
          }
        }

        if (getSupplementalInfo?.response?.supplementalInformation?.districtName) {
          if (getSupplementalInfo?.response?.supplementalInformation?.districtCode) {
            getCommuneByDistrictCode(
              getSupplementalInfo?.response?.supplementalInformation?.districtCode
            );
          }
        }

        setSupplementaryForm({
          ...supplementaryForm,
          timeAtCurrentAddress:
            getSupplementalInfo?.response?.supplementalInformation?.timeAtCurrentAddress,
          mobilePhone: getSupplementalInfo?.response?.supplementalInformation?.mobilePhone,
          registrationPriority: '',
          landlinePhone: getSupplementalInfo?.response?.supplementalInformation?.landlinePhone,
          email: getSupplementalInfo?.response?.supplementalInformation?.email,
          currentAddress: getSupplementalInfo?.response?.supplementalInformation?.currentAddress,
          provinceCode: getSupplementalInfo?.response?.supplementalInformation?.provinceName,
          districtCode: getSupplementalInfo?.response?.supplementalInformation?.districtName,
          communceCode: getSupplementalInfo?.response?.supplementalInformation?.communceName,
          detailedAddress: getSupplementalInfo?.response?.supplementalInformation?.detailedAddress,
          currentOccupation:
            getSupplementalInfo?.response?.supplementalInformation?.currentOccupation,
          otherOccupationInfo:
            getSupplementalInfo?.response?.supplementalInformation?.otherOccupationInfo,
          jobTitle: getSupplementalInfo?.response?.supplementalInformation?.jobTitle,
          otherJobTitleInfo:
            getSupplementalInfo?.response?.supplementalInformation?.otherJobTitleInfo,
          nationCode: getSupplementalInfo?.response?.supplementalInformation?.nationName,
          foreignAddress: getSupplementalInfo?.response?.supplementalInformation?.foreignAddress,
          statusOfResidence:
            getSupplementalInfo?.response?.supplementalInformation?.statusOfResidence,
          termOfResidenceInVietnam:
            getSupplementalInfo?.response?.supplementalInformation?.termOfResidenceInVietnam,
          taxCode: getSupplementalInfo?.response?.supplementalInformation?.taxCode,
          economicSectorCode:
            getSupplementalInfo?.response?.supplementalInformation?.economicSectorName,
          classLevelCode: getSupplementalInfo?.response?.supplementalInformation?.classLevelName,
        });
      } else if (getSupplementalInfo?.error) {
        console.log('get supplementary details error', getSupplementalInfo?.error);
      }
    }
  }, [navigation, getSupplementalInfo]);

  const getNationList = React.useCallback(() => dispatch(GetNationListing()), [dispatch]);

  const getProvinceList = React.useCallback(() => dispatch(GetCityProvinceList()), [dispatch]);

  const getClassList = React.useCallback(() => dispatch(GetClassLevelList()), [dispatch]);

  const getEcoList = React.useCallback(() => dispatch(GetEconomicList()), [dispatch]);

  function onPressUnselect() {
    setHomeless(true);
    setSupplementaryForm({ ...supplementaryForm, statusOfResidence: 'Non-resident' });
    setResidence(false);
  }

  function onPressSelected() {
    setResidence(true);
    setSupplementaryForm({ ...supplementaryForm, statusOfResidence: 'Resident' });
    setHomeless(false);
  }

  function openOccupationModal() {
    setSelectOccupation(true);
  }

  function closeOccupationModal() {
    setSelectOccupation(false);
  }

  const onTextChange = React.useCallback(
    (key: string, value: string) => {
      setSupplementaryForm({ ...supplementaryForm, [key]: value });
      if (key === 'detailedAddress') {
        setParams(value);
      }
    },

    [supplementaryForm]
  );

  function formatDate(dateSelected: any): void {
    setOpen(false);
    const date = dateSelected.getDate();
    const month = dateSelected.getMonth() + 1;
    const year = dateSelected.getFullYear();
    if (month < 10) {
      const final_value = date + '/' + '0' + month + '/' + year;
      setSupplementaryForm({ ...supplementaryForm, termOfResidenceInVietnam: final_value });
      setDateCalender(final_value);
    } else {
      const final_value = date + '/' + month + '/' + year;
      setSupplementaryForm({ ...supplementaryForm, termOfResidenceInVietnam: final_value });
      setDateCalender(final_value);
    }
    setOpenCalender(false);
  }

  function formatDateAddress(dateSelect: any): void {
    setOpenCalender(false);
    const date = dateSelect.getDate();
    const month = dateSelect.getMonth() + 1;
    const year = dateSelect.getFullYear();
    if (month < 10) {
      const final_date = '0' + month + '/' + year;
      setSupplementaryForm({ ...supplementaryForm, timeAtCurrentAddress: final_date });
      setDate(final_date);
    } else {
      const final_date = month + '/' + year;
      setSupplementaryForm({ ...supplementaryForm, timeAtCurrentAddress: final_date });
      setDate(final_date);
    }
    setOpen(false);
  }

  const resetError = React.useCallback(
    (key: keyof ISupplementaryFormError) => {
      setSupplementaryFormError({ ...supplementaryFormError, [key]: '' });
    },
    [supplementaryFormError]
  );

  const handleMobileChange = React.useCallback(
    (inputValue: string) => {
      const sanitizedText = inputValue.replace(/\s/g, '');
      onTextChange('mobilePhone', sanitizedText);
      if (sanitizedText.trim().length > 0) {
        if (sanitizedText.startsWith('0')) {
          resetError('mobilePhone');
        } else {
          setSupplementaryFormError({
            ...supplementaryFormError,
            mobilePhone: translate('mobileFormat'),
          });
        }
      } else {
        resetError('mobilePhone');
      }
    },
    [onTextChange, resetError, supplementaryFormError]
  );

  const handleSelectedProvinceCity = React.useCallback(
    (inputValue: ListItem) => {
      setChanged(true);
      onSelectProvinceValue({
        code: inputValue?.code,
        name: inputValue?.name,
      });

      setSupplementaryForm({
        ...supplementaryForm,
        provinceCode: inputValue?.name,
        districtCode: '',
        communceCode: '',
      });

      if (inputValue?.code !== '') {
        getDistrictByProvinceCode(inputValue?.code);
      }
      if (props?.route?.params?.update === 'updateSupplementaryInfo') {
        setSupplementaryForm({ ...supplementaryForm, districtCode: '', communceCode: '' });
        dispatch(resetGetDistrictListResponse());
        dispatch(resetGetCommuneListResponse());
      }
    },
    [onTextChange]
  );

  const handleSelectedPosition = React.useCallback(
    (inputValue: ListItem) => {
      onSelectPositionValue({
        name: inputValue?.name,
      });
      if (inputValue?.name !== 'Khác') {
        setSupplementaryForm({
          ...supplementaryForm,
          jobTitle: inputValue?.name,
          otherJobTitleInfo: '',
        });
      } else {
        setSupplementaryForm({ ...supplementaryForm, jobTitle: inputValue?.name });
      }
    },
    [onTextChange]
  );

  const handleSelectedOccupation = React.useCallback(
    (inputValue: ListItem) => {
      onSelectOccupationValue({
        name: inputValue?.name,
      });
      if (inputValue?.name !== 'Khác') {
        setSupplementaryForm({
          ...supplementaryForm,
          currentOccupation: inputValue?.name,
          otherOccupationInfo: '',
        });
      } else {
        setSupplementaryForm({ ...supplementaryForm, currentOccupation: inputValue?.name });
      }
    },
    [onTextChange]
  );

  const handleSelectedEconomic = React.useCallback(
    (inputValue: ListItem) => {
      onSelectEconomicValue({
        code: inputValue?.code,
        name: inputValue?.name,
      });
      setSupplementaryForm({ ...supplementaryForm, economicSectorCode: inputValue?.name });
    },
    [onTextChange]
  );

  const handleSelectedClassLevel = React.useCallback(
    (inputValue: ListItem) => {
      onSelectClassLevelValue({
        code: inputValue?.code,
        name: inputValue?.name,
      });
      setSupplementaryForm({ ...supplementaryForm, classLevelCode: inputValue?.name });
    },
    [onTextChange]
  );

  const getDistrictByProvinceCode = React.useCallback((province_code: string) => {
    if (province_code) {
      const params: any = {
        provinceCode: province_code,
      };
      dispatch(GetDistrictListOnly(params));
    }
  }, []);

  const handleSelectedDistrict = React.useCallback(
    (inputValue: ListItem) => {
      onSelectDistrictValue({
        code: inputValue?.code,
        name: inputValue?.name,
      });
      setSupplementaryForm({ ...supplementaryForm, districtCode: inputValue?.name });

      if (inputValue?.code !== '') {
        getCommuneByDistrictCode(inputValue?.code);
      }
    },
    [onTextChange, supplementaryForm?.districtCode]
  );

  const getCommuneByDistrictCode = React.useCallback((district_code: string) => {
    if (district_code) {
      const params: any = {
        districtCode: district_code,
      };
      dispatch(GetCommuneList(params));
    }
  }, []);

  const handleSelectedNationality = React.useCallback(
    (inputValue: ListItem | null) => {
      if (inputValue == null) {
        onSelectNationalityValue({
          code: '',
          name: '',
        });
        setSupplementaryForm({ ...supplementaryForm, nationCode: '' });
        return;
      }
      onSelectNationalityValue({
        code: inputValue?.code,
        name: inputValue?.name,
      });
      setSupplementaryForm({ ...supplementaryForm, nationCode: inputValue?.name });
    },
    [onTextChange]
  );

  const handleSelectedCommune = React.useCallback(
    (communeValue: ListItem) => {
      onSelectCommuneValue({
        code: communeValue?.code,
        name: communeValue?.name,
      });
      setSupplementaryForm({ ...supplementaryForm, communceCode: communeValue?.name });
    },
    [onTextChange]
  );

  useEffect(() => {
    setCombinedValue(
      `${supplementaryForm?.detailedAddress ? supplementaryForm.detailedAddress : paramsFrom}${
        paramsFrom && supplementaryForm?.communceCode ? ', ' : ''
      }${supplementaryForm?.communceCode}${
        supplementaryForm?.communceCode && supplementaryForm?.districtCode ? ', ' : ''
      } ${supplementaryForm?.districtCode}${
        supplementaryForm?.districtCode && supplementaryForm?.provinceCode ? ', ' : ''
      }${supplementaryForm?.provinceCode}`
    );
  }, [supplementaryForm]);

  const handleLandlineChange = React.useCallback(
    (inputValue: string) => {
      onTextChange('landlinePhone', inputValue);
      if (inputValue.trim().length > 0) {
        if (inputValue.startsWith('0')) {
          resetError('landlinePhone');
        } else {
          setSupplementaryFormError({
            ...supplementaryFormError,
            landlinePhone: translate('landlineFormat'),
          });
        }
      } else {
        resetError('landlinePhone');
      }
    },
    [onTextChange, resetError, supplementaryFormError]
  );

  const onLayoutContact = React.useCallback((event: LayoutChangeEvent) => {
    setFieldsPositions((prevState) => ({ ...prevState, top: event.nativeEvent?.layout?.y }));
  }, []);

  const onLayoutOtherInfo = React.useCallback((event: LayoutChangeEvent) => {
    setFieldsPositions((prevState) => ({ ...prevState, bottom: event.nativeEvent?.layout?.y }));
  }, []);

  const addressFieldSectionScroll = React.useCallback(() => {
    refScrollView.current?.scrollTo({
      x: 0,
      y: fieldsPositions?.top || 0,
      animated: true,
    });
  }, [fieldsPositions]);

  const otherEconomicSectionField = React.useCallback(() => {
    fieldsPositions?.bottom === undefined
      ? refScrollView.current?.scrollToEnd({ animated: true })
      : refScrollView.current?.scrollTo({
          x: 0,
          y: fieldsPositions?.bottom || 0,
          animated: true,
        });
  }, [fieldsPositions]);

  const scrollOnError = useCallback(
    (validations: ISupplementaryFormError) => {
      if (
        validations.mobilePhone ||
        validations.landlinePhone ||
        validations.email ||
        validations.provinceCode ||
        validations.districtCode ||
        validations.communceCode ||
        validations.timeAtCurrentAddress ||
        validations.detailedAddress
      ) {
        addressFieldSectionScroll();
      } else {
        otherEconomicSectionField();
      }
    },
    [supplementaryFormError]
  );

  // Function to validate leap years
  const validateMonthYear = (year: string, month: string) => {
    // Create a Date object using the extracted values
    const date = new Date(Number(year), Number(month) - 1, 1);
    // Check if the year is a leap year
    const isLeapYear =
      (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) ||
      date.getFullYear() % 400 === 0;
    return isLeapYear;
  };

  function validateForm() {
    setSupplementaryForm({
      ...supplementaryForm,
      currentAddress: `${paramsFrom}${paramsFrom && supplementaryForm?.communceCode ? ', ' : ''}${
        supplementaryForm?.communceCode
      }${supplementaryForm?.communceCode && supplementaryForm?.districtCode ? ', ' : ''} ${
        supplementaryForm?.districtCode
      }${supplementaryForm?.districtCode && supplementaryForm?.provinceCode ? ', ' : ''}${
        supplementaryForm?.provinceCode
      }`,
    });
    let validations: ISupplementaryFormError = {
      transactionId: '',
      mobilePhone: '',
      registrationPriority: '',
      landlinePhone: '',
      email: '',
      currentAddress: '',
      provinceCode: '',
      districtCode: '',
      communceCode: '',
      detailedAddress: '',
      timeAtCurrentAddress: '',
      currentOccupation: '',
      otherOccupationInfo: '',
      jobTitle: '',
      otherJobTitleInfo: '',
      nationCode: '',
      foreignAddress: '',
      statusOfResidence: '',
      termOfResidenceInVietnam: '',
      taxCode: '',
      economicSectorCode: '',
      classLevelCode: '',
    };
    let hasError = false;
    const currentDateArray = supplementaryForm
      ? supplementaryForm?.timeAtCurrentAddress?.split('/')
      : [];
    const termsDateArray = !(
      supplementaryForm?.termOfResidenceInVietnam ||
      supplementaryForm?.termOfResidenceInVietnam?.length === 0
    )
      ? supplementaryForm?.termOfResidenceInVietnam?.split('/')
      : [];

    if (supplementaryForm.mobilePhone?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, mobilePhone: translate('errorPhone') };
    }
    if (
      supplementaryForm.mobilePhone?.trim().length > 0 &&
      supplementaryForm.mobilePhone?.trim().length < 10
    ) {
      hasError = true;
      validations = { ...validations, mobilePhone: translate('errorMessagePhone') };
    }

    const sanitizedPhoneNumber = supplementaryForm.mobilePhone?.replace(/\s/g, '');

    // Kiểm tra xem số điện thoại chỉ chứa các chữ số và không có kí tự đặc biệt
    const regex = /^[0-9]+$/;
    if (!regex.test(sanitizedPhoneNumber)) {
      hasError = true;
      validations = { ...validations, mobilePhone: translate('errorPhoneSpecialCharacters') };
    }
    if (
      supplementaryForm.email &&
      supplementaryForm.email?.trim().length > 0 &&
      // eslint-disable-next-line no-useless-escape
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(supplementaryForm.email)
    ) {
      hasError = true;
      validations = { ...validations, email: translate('emailFormatError') };
    }
    if (
      supplementaryForm.landlinePhone &&
      supplementaryForm.landlinePhone?.trim().length > 0 &&
      supplementaryForm.landlinePhone?.trim().length < 9
    ) {
      hasError = true;
      validations = { ...validations, landlinePhone: translate('landlineError') };
    }
    if (supplementaryForm.email?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, email: translate('emailError') };
    }
    if (supplementaryForm.provinceCode?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, provinceCode: translate('cityError') };
    }

    if (supplementaryForm.districtCode?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, districtCode: translate('districtError') };
    }
    if (supplementaryForm.communceCode?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, communceCode: translate('communeError') };
    }
    if (supplementaryForm.detailedAddress?.trim().length === 0 && paramsFrom === '') {
      hasError = true;
      validations = { ...validations, detailedAddress: translate('detailAddressError') };
    }
    if (supplementaryForm.timeAtCurrentAddress?.trim().length === 0) {
      hasError = true;
      validations = {
        ...validations,
        timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
      };
    }
    if (currentDateArray && Number(currentDateArray[1]) > new Date().getFullYear()) {
      hasError = true;
      validations = {
        ...validations,
        timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
      };
    }
    if (
      currentDateArray?.length === 2 &&
      !isValidMonthYear(currentDateArray[0], currentDateArray[1])
    ) {
      hasError = true;
      validations = {
        ...validations,
        timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
      };
    }

    if (
      currentDateArray?.length === 2 &&
      Number(currentDateArray[1]) === new Date().getFullYear() &&
      Number(currentDateArray[0]) > new Date().getMonth() + 1
    ) {
      hasError = true;
      validations = {
        ...validations,
        timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
      };
    }
    if (currentDateArray && currentDateArray[1]?.length < 4) {
      hasError = true;
      validations = {
        ...validations,
        timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
      };
    }

    if (currentDateArray && String(currentDateArray[1])?.startsWith('0')) {
      hasError = true;
      validations = {
        ...validations,
        timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
      };
    }

    if (supplementaryForm.currentOccupation?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, currentOccupation: translate('occupationError') };
    } else if (
      supplementaryForm.currentOccupation === 'Khác' &&
      (supplementaryForm.otherOccupationInfo ?? '').trim().length === 0
    ) {
      hasError = true;
      validations = { ...validations, otherOccupationInfo: translate('occupationOtherError') };
    }
    if (supplementaryForm.jobTitle?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, jobTitle: translate('jobTitle') };
    } else if (
      supplementaryForm.jobTitle === 'Khác' &&
      (supplementaryForm.otherJobTitleInfo ?? '').trim().length === 0
    ) {
      hasError = true;
      validations = { ...validations, otherJobTitleInfo: translate('jobTitleOtherError') };
    }
    if (supplementaryForm.nationCode && supplementaryForm.foreignAddress?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, foreignAddress: translate('foreignAddressError') };
    }
    if (isHomeless && supplementaryForm.termOfResidenceInVietnam?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, termOfResidenceInVietnam: translate('termsResidence') };
    }
    if (
      !(!Array.isArray(termsDateArray) || termsDateArray.length === 0) &&
      termsDateArray[1] === '2' &&
      termsDateArray[0] > '29' &&
      !validateMonthYear(termsDateArray[2]?.toString(), termsDateArray[1]?.toString())
    ) {
      hasError = true;
      validations = { ...validations, termOfResidenceInVietnam: translate('termsResidence') };
    }
    if (
      !(!Array.isArray(termsDateArray) || termsDateArray.length === 0) &&
      !isValidDate(termsDateArray[2], termsDateArray[1], termsDateArray[0])
    ) {
      hasError = true;
      validations = { ...validations, termOfResidenceInVietnam: translate('termsResidence') };
    }
    if (
      !(!Array.isArray(termsDateArray) || termsDateArray.length === 0) &&
      Number(termsDateArray[2]) > Number(new Date().getFullYear() + 50)
    ) {
      hasError = true;
      validations = { ...validations, termOfResidenceInVietnam: translate('termsResidence') };
    }
    if (
      !(!Array.isArray(termsDateArray) || termsDateArray.length === 0) &&
      String(termsDateArray[2]).startsWith('0')
    ) {
      hasError = true;
      validations = { ...validations, termOfResidenceInVietnam: translate('termsResidence') };
    }
    if (supplementaryForm.economicSectorCode?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, economicSectorCode: translate('economicSectorError') };
    }
    if (supplementaryForm.classLevelCode?.trim().length === 0) {
      hasError = true;
      validations = { ...validations, classLevelCode: translate('classLevelCodeError') };
    }
    if (combinedValue.trim().length > 80) {
      hasError = true;
      validations = {
        ...validations,
        currentAddress: translate('address_80_chars_max'),
        detailedAddress: translate('address_80_chars_max'),
      };
    }

    if (hasError) {
      setSupplementaryFormError(validations);
      scrollOnError(validations);
    } else {
      hasError = false;
      setSupplementaryFormError(noErrorState);
      if (supplementaryForm?.currentAddress !== '' || combinedValue.trim().length > 0) {
        const params: ISupplementaryForm = {
          transactionId: transaction_id,
          mobilePhone: supplementaryForm?.mobilePhone || '',
          registrationPriority: supplementaryForm?.registrationPriority || '',
          landlinePhone: supplementaryForm?.landlinePhone || null,
          email: supplementaryForm?.email || null,
          currentAddress: combinedValue ? combinedValue : supplementaryForm?.currentAddress,
          provinceCode: provinceCodeSelect?.code
            ? provinceCodeSelect?.code
            : getSupplementalInfo?.response?.supplementalInformation?.provinceCode,
          districtCode: districtCodeSelect?.code
            ? districtCodeSelect?.code
            : getSupplementalInfo?.response?.supplementalInformation?.districtCode,
          communceCode: communeCodeSelect?.code
            ? communeCodeSelect?.code
            : getSupplementalInfo?.response?.supplementalInformation?.communceCode,
          detailedAddress: supplementaryForm?.detailedAddress || paramsFrom,
          timeAtCurrentAddress: supplementaryForm?.timeAtCurrentAddress || null,
          currentOccupation: supplementaryForm?.currentOccupation || null,
          jobTitle: supplementaryForm?.jobTitle || null,
          otherOccupationInfo: supplementaryForm?.otherOccupationInfo || null,
          otherJobTitleInfo: supplementaryForm?.otherJobTitleInfo || null,
          nationCode: nationCodeSelect?.code
            ? nationCodeSelect?.code
            : getSupplementalInfo?.response?.supplementalInformation?.nationCode || null,
          foreignAddress: supplementaryForm?.foreignAddress || null,
          statusOfResidence: supplementaryForm?.statusOfResidence
            ? supplementaryForm?.statusOfResidence
            : 'Resident' || null,
          termOfResidenceInVietnam: supplementaryForm?.termOfResidenceInVietnam || null,
          taxCode: supplementaryForm?.taxCode || null,
          economicSectorCode: economicCodeSelect?.code
            ? economicCodeSelect?.code
            : getSupplementalInfo?.response?.supplementalInformation?.economicSectorCode || null,
          classLevelCode: classLevelCodeSelect?.code
            ? classLevelCodeSelect?.code
            : getSupplementalInfo?.response?.supplementalInformation?.classLevelCode || 'A21101',
        };

        if (props?.route?.params?.update === 'updateSupplementaryInfo') {
          dispatch(UpdateSupplementaryDetailRequest(params));
        } else {
          if (getSupplementalInfo?.response?.supplementalInformation) {
            dispatch(SaveSupplementaryDetailRequest(params, 'UPDATE'));
          } else {
            dispatch(SaveSupplementaryDetailRequest(params, 'CREATE'));
          }
        }
      }
    }
  }

  function isValidDate(year: string, month: string, date: string) {
    // Create a new Date object with the given year, month, and date
    const d = new Date(`${year}-${month}-${date}`);
    // Check if the year, month, and date match the input values, and that the Date object is still valid
    return (
      d.getFullYear() === Number(year) &&
      d.getMonth() + 1 === Number(month) &&
      d.getDate() === Number(date) &&
      !isNaN(d.getTime())
    );
  }

  function isValidMonthYear(month: string, year: string) {
    const d = new Date(`${year}-${month}-01`);
    return (
      d.getFullYear() === Number(year) && d.getMonth() + 1 === Number(month) && !isNaN(d.getTime())
    );
  }

  const handleMonthYearChange = (text: string) => {
    let formattedDate = '';
    // Remove any non-numeric characters from the input string
    const cleanedText = text.replace(/[^0-9]/g, '');
    // Format the cleaned string as dd/mm/yyyy
    if (cleanedText.length > 0) {
      formattedDate = cleanedText.slice(0, 2);
      if (cleanedText.length > 2) {
        formattedDate += `/${cleanedText.slice(2, 6)}`;
      }
    } else {
      setSupplementaryForm({ ...supplementaryForm, timeAtCurrentAddress: '' });
      setDate('');
    }
    setDate(formattedDate);
    const myArray = formattedDate.split('/');
    if (myArray?.length === 2) {
      if (isValidMonthYear(myArray[0], myArray[1])) {
        if (Number(myArray[0]) < 10) {
          const final_date = myArray[0].includes('0')
            ? myArray[0] + '/' + myArray[1]
            : '0' + myArray[0] + '/' + myArray[1];
          // if (Number(myArray[1]) > new Date().getFullYear()) {
          //   setSupplementaryFormError({
          //     ...supplementaryFormError,
          //     timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
          //   });
          // } else {
          //   setSupplementaryFormError({
          //     ...supplementaryFormError,
          //     timeAtCurrentAddress: '',
          //   });
          // }
          setSupplementaryFormError({
            ...supplementaryFormError,
            timeAtCurrentAddress: '',
          });
          setSupplementaryForm({ ...supplementaryForm, timeAtCurrentAddress: final_date });
          setDate(final_date);
        } else {
          const final_date = myArray[0] + '/' + myArray[1];
          setSupplementaryFormError({
            ...supplementaryFormError,
            timeAtCurrentAddress: '',
          });
          setSupplementaryForm({ ...supplementaryForm, timeAtCurrentAddress: final_date });
          setDate(final_date);
          // if (Number(myArray[1]) > new Date().getFullYear()) {
          //   setSupplementaryFormError({
          //     ...supplementaryFormError,
          //     timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
          //   });
          // }
        }
      } else if (myArray[1]?.length === 4) {
        setSupplementaryForm({
          ...supplementaryForm,
          timeAtCurrentAddress: date,
        });
        setSupplementaryFormError({
          ...supplementaryFormError,
          timeAtCurrentAddress: translate('timeAtCurrentAddressError'),
        });
      }
    }
  };

  const formatTheDate = (numericValue: string) => {
    // convert the numericValue to a formatted date string
    let day = numericValue.slice(0, 2);
    let month = numericValue.slice(2, 4);
    const year = numericValue.slice(4, 8);
    // add spaces to separate day, month, and year
    if (numericValue.length > 4) {
      day = day + '/';
      month = month + '/';
    } else if (numericValue.length > 2) {
      day = day + '/';
      month = ' ' + month;
    }
    return day + month + year;
  };

  const handleDateChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const formattedDate = formatTheDate(numericValue);
    if (numericValue.length > 0) {
      setDateCalender(formattedDate);
      const myArray = formattedDate.split('/');
      if (myArray?.length === 3) {
        setSupplementaryFormError({
          ...supplementaryFormError,
          termOfResidenceInVietnam: '',
        });
        if (isValidDate(myArray[2], myArray[1], myArray[0])) {
          setSupplementaryForm({ ...supplementaryForm, termOfResidenceInVietnam: formattedDate });
          setDateCalender(formattedDate);
        } else {
          setSupplementaryForm({ ...supplementaryForm, termOfResidenceInVietnam: formattedDate });
        }
      }
    } else {
      setSupplementaryForm({ ...supplementaryForm, termOfResidenceInVietnam: '' });
      setDateCalender('');
    }
  };
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <View style={Style.headerView}>
        <BackButtonHeaderForSupplementary
          onPress={() => navigation.goBack()}
          rightHeading
          testId={TestIds.step5_progress_bar}
          transactionId={`#${transaction_id}`}
          rightHeadingText={translate('stopExecution')}
          navigation={navigation}
          style={styles.marginTop}
        />
      </View>
      <View style={Style.container}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={{ flex: 1, width: '100%' }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
        >
          <ScrollView keyboardShouldPersistTaps="handled" style={Style.scroll} ref={refScrollView}>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={Style.mainHeading}>{translate('additional_info')}</Text>
              {getSupplementalInfo && getSupplementalInfo?.loading ? (
                <GlobalLoading isLoading />
              ) : (
                <>
                  <View onLayout={onLayoutContact} style={Style.itemsView}>
                    <Contact
                      leftHeading
                      leftHeadingText={translate('contact')}
                      valueLandline={supplementaryForm.landlinePhone}
                      valueMobile={supplementaryForm.mobilePhone}
                      valueEmail={supplementaryForm.email}
                      onChangeEmail={(text: string) => onTextChange('email', text)}
                      onChangeMobile={(text: string) => handleMobileChange(text)}
                      onChangeLandline={(text: string) => handleLandlineChange(text)}
                      errorMessageMobile={supplementaryFormError.mobilePhone}
                      errorMessageEmail={supplementaryFormError.email}
                      errorMessageLandline={supplementaryFormError.landlinePhone}
                    />
                  </View>
                  <View style={Style.itemsView}>
                    <Address
                      leftHeading
                      leftHeadingText={translate('address')}
                      bottomHeading={translate('belowheading')}
                      dataCity={provinceList?.response?.provinces || []}
                      dataDistrict={districtList?.response?.districts || []}
                      dataWard={communelist?.response?.communces || []}
                      valueCity={supplementaryForm.provinceCode}
                      valueWard={supplementaryForm.communceCode}
                      valueDistrict={supplementaryForm.districtCode}
                      foreignAddressValue={supplementaryForm.foreignAddress}
                      currentAdddress={
                        combinedValue.trim().length > 0
                          ? combinedValue
                          : paramsFrom
                          ? paramsFrom
                          : ''
                      }
                      onPressCalender={() => setOpen(true)}
                      onPressStyle={changed}
                      valueTextInput={date ? date : supplementaryForm?.timeAtCurrentAddress}
                      errorMessageCity={supplementaryFormError.provinceCode}
                      errorMessageDistrict={supplementaryFormError.districtCode}
                      errorMessageCommune={supplementaryFormError.communceCode}
                      errorMessageDetailAddress={supplementaryFormError.detailedAddress}
                      errorMessageCurrentAddress={supplementaryFormError.currentAddress}
                      errorMessageCurrentAddressTime={supplementaryFormError.timeAtCurrentAddress}
                      valueDetailAddress={supplementaryForm.detailedAddress || paramsFrom}
                      onChangeCity={(item: ListItem) => handleSelectedProvinceCity(item)}
                      onChangeDistrict={(item: ListItem) => handleSelectedDistrict(item)}
                      onChangeWard={(item: ListItem) => handleSelectedCommune(item)}
                      foreignAddressChange={(text: string) => onTextChange('foreignAddress', text)}
                      onChangeDetailAddress={(text: string) =>
                        onTextChange('detailedAddress', text)
                      }
                      handleDateChange={handleMonthYearChange}
                    />
                  </View>
                  <View style={Style.itemsView}>
                    <Job
                      leftHeading
                      leftHeadingText={translate('job')}
                      dataOccupation={Occupation}
                      dataPosition={JobTitle}
                      isVisible={selectOccupation}
                      valuePosition={supplementaryForm.jobTitle}
                      valueOccupation={supplementaryForm.currentOccupation}
                      valueOtherOccupation={supplementaryForm.otherOccupationInfo}
                      valueOtherJobTitle={supplementaryForm.otherJobTitleInfo}
                      taxCodeValue={supplementaryForm.taxCode}
                      selectOccupation={() => openOccupationModal()}
                      onBackdropPress={() => closeOccupationModal()}
                      onChangePosition={(item: ListItem) => handleSelectedPosition(item)}
                      onChangeOccupation={(item: ListItem) => handleSelectedOccupation(item)}
                      onChangeTaxCode={(text: string) => onTextChange('taxCode', text)}
                      errorMessageOccupation={supplementaryFormError.currentOccupation}
                      errorMessageJobTitle={supplementaryFormError.jobTitle}
                      errorMessageOtherOccupation={supplementaryFormError.otherOccupationInfo}
                      errorMessageOtherJobTitle={supplementaryFormError.otherJobTitleInfo}
                      onChangeOtherJobTitle={(text: string) =>
                        onTextChange('otherJobTitleInfo', text)
                      }
                      onChangeOtherOccupation={(text: string) =>
                        onTextChange('otherOccupationInfo', text)
                      }
                    />
                  </View>
                  <View style={Style.itemsView}>
                    <Nationality
                      leftHeading
                      leftHeadingText={translate('informationResident')}
                      data={
                        // filter out VIETNAM, code 001
                        nationList?.response?.nations.filter(
                          (item: ListItem) => item.code !== '001'
                        ) || []
                      }
                      isHomeless={isHomeless}
                      isSelected={selectResidence}
                      placeholder={translate('select_nationality')}
                      onPressUnselect={() => onPressUnselect()}
                      onPressSelected={() => onPressSelected()}
                      value={supplementaryForm?.nationCode}
                      onPressCalender={() => setOpenCalender(true)}
                      valuetermOfResidence={
                        dateCalender ? dateCalender : supplementaryForm?.termOfResidenceInVietnam
                      }
                      valueForeignAddress={supplementaryForm?.foreignAddress}
                      onChangeForeignAddress={(text: string) =>
                        onTextChange('foreignAddress', text)
                      }
                      onChangeText={(item: ListItem | null) => handleSelectedNationality(item)}
                      errorMessageForeignAddress={supplementaryFormError.foreignAddress}
                      errorMessageTermOfResidence={supplementaryFormError.termOfResidenceInVietnam}
                      handleDateChange={handleDateChange}
                    />
                  </View>
                  <View onLayout={onLayoutOtherInfo} style={Style.itemsView}>
                    <OtherInformation
                      leftHeading
                      leftHeadingText={translate('otherInfo')}
                      classData={classList?.response?.classLevels || []}
                      data={economicList?.response?.economicSectors || []}
                      economicValue={supplementaryForm?.economicSectorCode}
                      classValue={supplementaryForm?.classLevelCode}
                      taxCode={supplementaryForm?.taxCode}
                      onChangeText={(item: ListItem) => handleSelectedEconomic(item)}
                      onChangeTextClassData={(item: ListItem) => handleSelectedClassLevel(item)}
                      onChangeTaxCode={(text: string) => onTextChange('taxCode', text)}
                      errorMessageEconomicSector={supplementaryFormError.economicSectorCode}
                      errorMessageClassLevel={supplementaryFormError.classLevelCode}
                    />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={Style.buttonStyle}>
          <GradientButton
            buttonText={
              props?.route?.params?.update === 'updateSupplementaryInfo'
                ? translate('update')
                : translate('next')
            }
            disabled={false}
            toggleView={true}
            onPress={() => validateForm()}
            right_icon
            buttonStyle={Style.button_style}
            isLoading={saveSupplementaryDetails.loading || updateSupplementary.loading}
          />
        </View>
        {/* Modal to open calender when user input 'Thời gian ở địa chỉ hiện tại (từ tháng)' */}
        <DatePickerModal
          open={openCalender}
          onConfirm={(date) => {
            formatDate(date);
          }}
          onCancel={() => {
            setOpenCalender(false);
          }}
          maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 50))}
        />
        {/* Modal to open calender when user input 'Thời gian cư trú tại Việt Nam' */}
        <DatePickerModal
          open={open}
          onConfirm={(date) => {
            formatDateAddress(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          maximumDate={new Date()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 12,
  }
});

export default AddSupplementaryInformation;
