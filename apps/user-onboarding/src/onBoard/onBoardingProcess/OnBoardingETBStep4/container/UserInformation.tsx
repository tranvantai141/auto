import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, KeyboardAvoidingView, Platform, View } from 'react-native';
import GradientButton from 'src/common/components/Button/GradientButton';
import Style from './Style';
import ComplianceModal from '../components/ComplianceModal';
import OnboardingProgressbar from 'src/common/components/onboarding/OnboardingProgressbar';
import { translate } from '../assets/translations/translate';
import { TestIds } from '../assets/TestIds';
import { RouteNames } from '@routeNames';
import InstructionsBox from '../components/InstructionsBox';
import InformationList from '../components/InformationList';
import { IPurposeInfo, user_item } from '@interfaces/I_UserInfo';
import PurposeOptionList from '../components/PurposeOptionList';
import PDFModal from '../components/PDFModal';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getFatcaInfoRequest } from '../redux/actions/GetFatcaInfo';
import { getData, TRANSACTION_ID } from 'src/asyncstorage';
import {
  aggreementInitState,
  citizenInitState,
  EditMultiNationalItem,
  fixedKey,
  GefFatcaInfoParam,
  LegalAgreementFieldItem,
  TinSsnItem,
} from '../typings/FatcaInfoParams';
import { RootState } from 'src/redux/store';
import {
  BeneficialOwnerParams,
  CreateFatcaInfoParam,
  NationalityParams,
} from '../typings/CreateFatcaInfoParams';
import { createFatcaInfoRequest } from '../redux/actions/CreateFatcaInfo';
import { resetGetFatcaInfoResponse } from '../redux/slices/GetFatcaInfoSlice';
import { resetcreateFatcaInfoResponse } from '../redux/slices/CreateFatcaInfoSlice';
import { GetNationList } from '../redux/actions/GetNationList';
import AddBeneficiaryModal from '../components/AddBeneficiaryModal';
import { setNavigationState } from 'src/redux/slices/navState/NavStateSlice';
import { heightPercentageToDP as hp } from '@assets/sizes/Sizes';

const UserInformationETB = (props: any) => {
  const { navigation } = props;
  const [data, setData] = useState<Array<user_item>>([]);
  const [transaction_id, setTransaction_id] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [addPurposeErr, showAddPurposeErr] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [addPurpose, showAddPurpose] = useState(false);
  const [otherPurpose, setOtherPurpose] = useState('');
  const [notAdded, setNotAdded] = useState(false);
  const [showPDF, setShowPdf] = useState(false);
  const [purposeInfo, setPurposeInfo] = useState<Array<IPurposeInfo>>([
    { id: 0, name: translate('payment'), selected: false },
    { id: 1, name: translate('saving'), selected: false },
    { id: 2, name: translate('borrowing_capital'), selected: false },
    { id: 3, name: translate('domestic_money_transfers'), selected: false },
    { id: 4, name: translate('foreign_money_transfer'), selected: false },
    { id: 5, name: translate('other'), selected: false },
  ]);
  const dispatch = useAppDispatch();
  const fatcaInfoResult = useAppSelector((state: RootState) => state.getFatcaInfo);
  const navState = useAppSelector((state: RootState) => state.GetNavState);
  const createFatcaInfoResult = useAppSelector((state: RootState) => state.createFatcaInfo);
  const nationList = useAppSelector((state: RootState) => state.getNationList);
  const [visaNumber, setVisaNumber] = useState('');
  const [visaAuthority, setVisaAuthority] = useState('');
  const [multiNationalData, setMultiNationalData] = useState<Array<EditMultiNationalItem>>([
    fixedKey,
  ]);
  const [addBeneficiary, showAddBeneficiary] = useState(false);
  const [beneficiaryItems, setBeneficiaryItem] = useState<Array<BeneficialOwnerParams>>([]);
  const [itemToEdit, setItemToEdit] = useState<BeneficialOwnerParams>();
  const [editableIndex, setEditableIndex] = useState<number | null>();
  const [test, setTest] = useState(false);
  const [optionToValidate, setOptiontoValidate] = useState<number>();
  const [citizenInfo, setCitizenInfo] = useState<TinSsnItem>(citizenInitState);

  const [aggreementItem, setAggreementItem] =
    useState<LegalAgreementFieldItem>(aggreementInitState);

  useEffect(() => {
    dispatch(resetGetFatcaInfoResponse());
    getFatcaInformation();
    getNationList();
  }, []);

  const saveAllBeneficiaryData = (item: BeneficialOwnerParams, type: string) => {
    if (type === 'edit' && editableIndex != undefined) {
      const arr = [...beneficiaryItems];
      const itemToEdit = item;
      arr[editableIndex] = itemToEdit;
      setBeneficiaryItem(arr);
      setItemToEdit(undefined);
      setEditableIndex(null);
    } else {
      const arr = [...beneficiaryItems];
      arr?.push(item);
      setBeneficiaryItem(arr);
    }
  };

  const updateValue = useCallback(() => {
    // Updating fatca information
    const savedFatcaInfo: CreateFatcaInfoParam = fatcaInfoResult?.response?.fatcaInformation;
    const savedItems = [
      {
        id: 0,
        name: translate('stateless_person'),
        isSelected: false,
      },
      {
        id: 1,
        name: translate('multinational'),
        isSelected: false,
      },
      {
        id: 2,
        name: translate('US_citizen_or_resident_of_US'),
        isSelected: false,
      },
      {
        id: 3,
        name: translate('beneficial_owner'),
        isSelected: false,
      },
      {
        id: 4,
        name: translate('entering_into__legal_agreement'),
        isSelected: false,
      },
    ];
    if (savedFatcaInfo?.customerIsStateless) {
      savedItems[0].isSelected = savedFatcaInfo?.customerIsStateless;
      setVisaNumber(savedFatcaInfo?.visaNumber || '');
      setVisaAuthority(savedFatcaInfo?.immigrationVisaAuthority || '');
    }
    if (savedFatcaInfo?.customerIsMultiNational) {
      savedItems[1].isSelected = savedFatcaInfo?.customerIsMultiNational;
      const arr: Array<EditMultiNationalItem> = [];
      savedFatcaInfo?.nationalities?.map((res, index) => {
        const item: EditMultiNationalItem = {
          index: index,
          value: res?.registeredAddressIn,
          nationality: {
            nationCode: res?.nationCode,
            registeredAddressIn: res?.nationName || res?.registeredAddressIn || '',
          },
          isValueEmpty: false,
          isNationalityEmpty: false,
        };
        arr.push(item);
      });
      setMultiNationalData(arr);
    }
    if (savedFatcaInfo?.customerIsUSCitizenOrResident) {
      savedItems[2].isSelected = savedFatcaInfo?.customerIsUSCitizenOrResident;
      const item: TinSsnItem = {
        haveTin: savedFatcaInfo?.hasTINOrSSN ? true : false,
        reason: savedFatcaInfo?.reasonOfNotHavingTINOrSSN || '',
        tinssn: savedFatcaInfo?.usTINOrSSN || '',
      };
      setCitizenInfo(item);
    }
    if (savedFatcaInfo?.customerHasBeneficialOwners) {
      savedItems[3].isSelected = savedFatcaInfo?.customerHasBeneficialOwners;
      const arr: Array<BeneficialOwnerParams> = [];
      savedFatcaInfo?.beneficialOwners?.map((res: BeneficialOwnerParams) => {
        const beneficial_nation = {
          nationCode: res.nationCode,
          nationName: res.nationName,
          registeredAddressIn: res.nationName || '',
        };
        arr.push({ ...res, beneficial_nation });
      });
      setBeneficiaryItem(arr || []);
    }
    if (savedFatcaInfo?.customerParticipatesInLegalAgreements) {
      savedItems[4].isSelected = savedFatcaInfo?.customerParticipatesInLegalAgreements;
      const item: LegalAgreementFieldItem = {
        name_of_orgainization: savedFatcaInfo?.nameOfOrganizationOrIndividual || '',
        date_of_authorization: savedFatcaInfo?.authorizationDocumentDate || '',
        content_of_authorization: savedFatcaInfo?.contentsOfEntrustment || '',
        country_nationality: {
          nationCode: savedFatcaInfo?.nationCode || '',
          nationName: savedFatcaInfo?.nationName || '',
          registeredAddressIn: savedFatcaInfo?.nationName || '',
        },
        country_of_orgainization: savedFatcaInfo?.nationCode || '',
        id_num_of_authorization: savedFatcaInfo?.identificationNumber || '',
        information_of_individuals: savedFatcaInfo?.beneficiariesInformation || '',
      };
      setAggreementItem(item);
    }
    setData([...savedItems]);

    // Updating main Purpose Information
    const purpose_info = purposeInfo;
    if (savedFatcaInfo?.paymentPurpose) {
      purpose_info[0].selected = savedFatcaInfo?.paymentPurpose;
    }
    if (savedFatcaInfo?.savingPurpose) {
      purpose_info[1].selected = savedFatcaInfo?.savingPurpose;
    }
    if (savedFatcaInfo?.lendingPurpose) {
      purpose_info[2].selected = savedFatcaInfo?.lendingPurpose;
    }
    if (savedFatcaInfo?.domesticRemittancePurpose) {
      purpose_info[3].selected = savedFatcaInfo?.domesticRemittancePurpose;
    }
    if (savedFatcaInfo?.overseasRemittancePurpose) {
      purpose_info[4].selected = savedFatcaInfo?.overseasRemittancePurpose;
    }
    if (savedFatcaInfo?.otherPurpose) {
      showAddPurpose(true);
      purpose_info[5].selected = savedFatcaInfo?.otherPurpose;
    }
    setOtherPurpose(savedFatcaInfo?.otherSpecification || otherPurpose);
    setPurposeInfo(purpose_info as any);
  }, [fatcaInfoResult, setPurposeInfo]);

  useEffect(() => {
    updateValue();
  }, [fatcaInfoResult, setPurposeInfo]);

  const getFatcaInformation = () => {
    getData(TRANSACTION_ID).then((data) => {
      if (data != null) {
        setTransactionId(data);
        const params = {
          transactionId: data,
        } as GefFatcaInfoParam;
        setTransaction_id(data);
        dispatch(getFatcaInfoRequest(params));
      }
    });
  };
  const getNationList = () => {
    dispatch(GetNationList());
  };

  useEffect(() => {
    //Checking the create fatca info API result
    if (createFatcaInfoResult?.response?.fatcaInformation) {
      dispatch(resetcreateFatcaInfoResponse());
      dispatch(setNavigationState(null));
      if (!navState?.isComingFrom) {
        navigation.navigate(RouteNames.reviewETBInformation.name);
      } else if (navState?.isComingFrom === RouteNames.reviewInformation.name) {
        handleGoback();
      }
    } else if (createFatcaInfoResult?.error) {
      //factInfo error
    }
  }, [createFatcaInfoResult?.response]);

  const onSelectOption = (item: user_item) => {
    const old_options = data;
    const index = item?.id;
    const selected_item = old_options[index];
    if (item?.isSelected === true) {
      selected_item.isSelected = false;
    } else if (item?.isSelected === false) {
      selected_item.isSelected = true;
    } else if (item?.isSelected === undefined) {
      selected_item.isSelected = true;
    }
    setData([...old_options]);
  };

  const isPurposeSelected = purposeInfo.some((element) => {
    return element.selected;
  });
  const isOptionSelected = data.some((element) => {
    return element.isSelected;
  });

  const CreateFatcaInfo = () => {
    const nationalityArr: NationalityParams[] = [];
    multiNationalData.map((res) => {
      const item = {
        nationCode: res?.nationality?.nationCode,
        registeredAddressIn: res?.value,
      };
      nationalityArr.push(item);
    });

    const params: CreateFatcaInfoParam = {
      transactionId: transaction_id,
      customerIsStateless: data[0]?.isSelected || false,
      visaNumber: data[0]?.isSelected ? visaNumber : null,
      immigrationVisaAuthority: data[0]?.isSelected ? visaAuthority : null,
      customerIsMultiNational: data[1]?.isSelected || false,
      nationalities: data[1]?.isSelected ? nationalityArr : [],
      customerIsUSCitizenOrResident: data[2]?.isSelected || false,
      hasTINOrSSN: data[2]?.isSelected ? citizenInfo?.haveTin || null : null,
      usTINOrSSN: data[2]?.isSelected && citizenInfo?.haveTin ? citizenInfo?.tinssn : null,
      reasonOfNotHavingTINOrSSN: (data[2]?.isSelected && citizenInfo?.reason) || null,
      customerHasBeneficialOwners: data[3]?.isSelected || false,
      beneficialOwners: data[3]?.isSelected ? beneficiaryItems : [],
      customerParticipatesInLegalAgreements: data[4]?.isSelected || false,
      nameOfOrganizationOrIndividual: data[4]?.isSelected
        ? aggreementItem?.name_of_orgainization || null
        : null,
      authorizationDocumentDate: data[4]?.isSelected ? aggreementItem?.date_of_authorization : null,
      contentsOfEntrustment: data[4]?.isSelected ? aggreementItem?.content_of_authorization : null,
      nationCode: data[4]?.isSelected ? aggreementItem.country_nationality?.nationCode : null,
      identificationNumber: data[4]?.isSelected ? aggreementItem?.id_num_of_authorization : null,
      beneficiariesInformation: data[4]?.isSelected
        ? aggreementItem?.information_of_individuals
        : null,
      paymentPurpose: purposeInfo[0]?.selected,
      savingPurpose: purposeInfo[1]?.selected,
      lendingPurpose: purposeInfo[2]?.selected,
      domesticRemittancePurpose: purposeInfo[3]?.selected,
      overseasRemittancePurpose: purposeInfo[4]?.selected,
      otherPurpose: purposeInfo[5]?.selected,
      otherSpecification: (purposeInfo[5]?.selected && otherPurpose) || null,
    };
    const TYPE = fatcaInfoResult?.response?.fatcaInformation ? 'UPDATE' : 'CREATE';
    dispatch(createFatcaInfoRequest(params, TYPE));
  };

  function checkIfAnyValueEmpty(isAnyValueEmpty: boolean) {
    if (isAnyValueEmpty) {
      const arr = [...multiNationalData];
      arr.map((res) => {
        if (res.value === '') {
          res.isValueEmpty = true;
        } else {
          res.isValueEmpty = false;
        }
      });
      setMultiNationalData(arr);
    } else {
      const arr = [...multiNationalData];
      arr.map((res) => {
        res.isValueEmpty = false;
      });
      setMultiNationalData(arr);
    }
  }

  function checkifAnyNationalityempty(isAnyNationalityEmpty: boolean) {
    if (isAnyNationalityEmpty) {
      const arr = [...multiNationalData];
      arr.map((res) => {
        if (Object.values(res.nationality['nationCode'])?.length === 0) {
          res.isNationalityEmpty = true;
        } else {
          res.isNationalityEmpty = false;
        }
      });
      setMultiNationalData(arr);
    } else {
      const arr = [...multiNationalData];
      arr.map((res) => {
        res.isNationalityEmpty = false;
      });
      setMultiNationalData(arr);
    }
  }

  function checkIfTinAdded() {
    let type = false;
    if (data[2]?.isSelected) {
      if (citizenInfo?.haveTin === true && citizenInfo?.tinssn) {
        type = false;
      } else if (citizenInfo?.haveTin === false && citizenInfo?.reason) {
        type = false;
      } else {
        type = true;
      }
    }
    return type;
  }

  function checkInformationValid() {
    showAddPurposeErr(false);
    if (!purposeInfo[5].selected) showAddPurpose(false);
    setOptiontoValidate(undefined);
    setNotAdded(false);
    setTest(false);
    const nationalIndex = multiNationalData?.findIndex(
      (x) => Object.values(x.nationality['nationCode'])?.length === 0
    );
    const isAnyNationalityEmpty = nationalIndex >= 0 ? true : false;
    const valueIndex = multiNationalData?.findIndex((x) => x?.value === '');
    const isAnyValueEmpty = valueIndex >= 0 ? true : false;
    if (!isPurposeSelected) {
      showAddPurposeErr(true);
    } else if (data[0].isSelected && (!visaNumber || !visaAuthority)) {
      setOptiontoValidate(0);
      setTest(true);
    } else if (data[1].isSelected && (isAnyValueEmpty || isAnyNationalityEmpty)) {
      setOptiontoValidate(1);
      checkIfAnyValueEmpty(isAnyValueEmpty);
      checkifAnyNationalityempty(isAnyNationalityEmpty);
    } else if (checkIfTinAdded()) {
      setOptiontoValidate(2);
    } else if (data[3].isSelected && beneficiaryItems?.length === 0) {
      setOptiontoValidate(3);
    } else if (
      data[4].isSelected
        ? aggreementItem?.date_of_authorization === '' ||
          aggreementItem?.content_of_authorization === '' ||
          aggreementItem?.country_nationality?.nationCode === ''
        : false
    ) {
      setTest(true);
      setOptiontoValidate(4);
    } else {
      showAddPurposeErr(false);
      if (purposeInfo[5].selected) {
        if (addPurpose && otherPurpose.length === 0) {
          setNotAdded(true);
        } else {
          CreateFatcaInfo();
        }
        showAddPurpose(true);
      } else {
        CreateFatcaInfo();
      }
    }
  }

  const removeOwnerBeneficiary = (index: number) => {
    const arr = [...beneficiaryItems];
    arr.splice(index, 1);
    setBeneficiaryItem(arr);
  };

  const editOwnerBeneficiary = (index: number, item: BeneficialOwnerParams) => {
    setEditableIndex(index);
    setItemToEdit(item);
    showAddBeneficiary(true);
  };

  function bottomView() {
    return (
      <View style={Style.buttonView}>
        <GradientButton
          testIdValue={TestIds.step5_user_info}
          buttonText={translate('continue')}
          disabled={false}
          toggleView={true}
          onPress={() => checkInformationValid()}
          buttonStyle={Style.buttonStyle}
          isLoading={createFatcaInfoResult?.loading || false}
          right_icon
        />
      </View>
    );
  }

  function onAgree() {
    setModalVisible(false);
    navigation.navigate(RouteNames.home.name);
  }

  function modal() {
    return (
      <ComplianceModal
        testIdValue={TestIds.user_info_modal}
        modalClose={() => setModalVisible(false)}
        isVisible={isModalVisible}
        headingMain={translate('alert')}
        headingBelow={translate('alert_content_compliance')}
        onPressAgree={() => onAgree()}
      />
    );
  }

  const selectItem = (index: number) => {
    const arr = purposeInfo;
    if (arr[index].selected === true) {
      arr[index].selected = false;
      if (index === 5) {
        showAddPurpose(false);
        setOtherPurpose('');
      }
    } else {
      arr[index].selected = true;
      if (index === 5) {
        showAddPurpose(true);
      }
    }
    setPurposeInfo([...arr]);
  };

  const saveOtherPurposeInfo = (text: string) => {
    setOtherPurpose(text);
    setNotAdded(false);
  };

  const saveCitizenInfo = (haveTin: boolean, tin: string | null, reason: string | null) => {
    const item: TinSsnItem = {
      haveTin: haveTin,
      tinssn: tin,
      reason: reason,
    };
    setCitizenInfo(item);
  };

  function returnErr(value: string | undefined, type: string) {
    if (test === true) {
      return value === '' || value === undefined ? translate('please_input') + type : '';
    }
  }

  const onChangeAgreementInfo = (type: keyof LegalAgreementFieldItem, text: string) => {
    if (aggreementItem) {
      setAggreementItem({
        ...aggreementItem,
        [type]: text,
      });
    }
  };

  const handleGoback = () => {
    if (navState?.isComingFrom === RouteNames.reviewInformation.name) {
      navigation.replace(RouteNames?.reviewInformation.name);
    } else {
      navigation.goBack();
    }
  };
  return (
    <>
      <View style={Style.headerView}>
        <OnboardingProgressbar
          testId={TestIds.step5_progress_bar}
          onPress={() => handleGoback()}
          percentage={'40%'}
          cancel_registration
          onclickRightIcon={() => handleGoback()}
          right_heading={translate('stop_execution')}
          transaction_id={`#${transaction_id}`}
          navigation={navigation}
        />
      </View>
      <SafeAreaView style={Style.container}>
        <View style={Style.mainContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            style={{ flex: 1, width: '100%' }}
            keyboardVerticalOffset={hp(7)}
          >
            <ScrollView keyboardShouldPersistTaps="handled" style={Style.scroll}>
              <Text testID={TestIds.heading_text} style={Style.heading_text}>
                {translate('customer_info_for_complaince_purpose')}
              </Text>
              <InstructionsBox
                instruction_id={TestIds.instruction_id}
                info_id={TestIds?.info_id}
                onClick={() => setShowPdf(true)}
              />
              <InformationList
                multiNationalData={multiNationalData}
                setMultiNationalData={setMultiNationalData}
                data={[...data]}
                onPressOption={onSelectOption}
                visaAuthority={visaAuthority}
                visaNumber={visaNumber}
                setVisaNumber={(text: string) => {
                  setVisaNumber(text.replace(/\s+/g, ''));
                }}
                setVisaAuthority={setVisaAuthority}
                nationList={nationList?.response || undefined}
                setCitizenInfo={saveCitizenInfo}
                citizenInfo={citizenInfo || undefined}
                onClick={() => {
                  setItemToEdit(undefined);
                  showAddBeneficiary(!addBeneficiary);
                }}
                beneficiaryItems={[...beneficiaryItems]}
                removeItem={removeOwnerBeneficiary}
                editItem={editOwnerBeneficiary}
                returnErr={returnErr}
                onChangeAgreementInfo={onChangeAgreementInfo}
                aggreementItem={aggreementItem}
                optionToValidate={optionToValidate}
                onChangeDateOnLegalAuth={(item: NationalityParams) => {
                  if (aggreementItem) {
                    setAggreementItem({
                      ...aggreementItem,
                      country_nationality: item,
                      country_of_orgainization: item?.nationCode,
                    });
                  }
                }}
              />
              <PurposeOptionList
                render_item_id={TestIds?.render_item_id}
                showErr={addPurposeErr}
                data={[...purposeInfo]}
                onPressItem={(index) => selectItem(index)}
                addPurpose={addPurpose}
                otherPurpose={otherPurpose}
                setOtherPurpose={saveOtherPurposeInfo}
                notAdded={notAdded}
              />
            </ScrollView>
          </KeyboardAvoidingView>
          {bottomView()}
          {modal()}
          <PDFModal isVisible={showPDF} modalClose={() => setShowPdf(false)} />
          <AddBeneficiaryModal
            saveInfo={saveAllBeneficiaryData}
            isVisible={addBeneficiary}
            modalClose={() => showAddBeneficiary(false)}
            nationList={nationList?.response || undefined}
            itemToEdit={itemToEdit}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default UserInformationETB;
