import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Color from '../assets/Colors';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '@assets/sizes/Sizes';
import { translate } from '../assets/translations/translate';
import Colors from '../assets/Colors';
import PrintFormRow from './PrintFormRow';
import Images from '../assets/Images';
import { FormTitle, GetTransactionResultResult } from '../typings/TransactionResultParams';
import ResultFormModal from './ResultFormModal';
import { GetRegCustomerAccFormStateInterface } from '../redux/slices/GetRegAccFormSlice';

type Props = {
  data: GetTransactionResultResult;
  modalClose?: () => void;
  isVisible?: boolean;
  testIdValue?: string;
  printTheform: (type: FormTitle) => void;
  onPressDocIcon: (type: FormTitle) => void;
  previewModal: boolean;
  selectedOption: FormTitle | '';
  setPreviewModal: (type: boolean) => void;
  pdfUrl: string | undefined;
  getRegAccFormInfoResult?: GetRegCustomerAccFormStateInterface;
  getRegEBankFormInfoResult?: GetRegCustomerAccFormStateInterface;
  getDebitAccFormInfoResult?: GetRegCustomerAccFormStateInterface;
};

const PrintFormsModal = (props: Props) => {
  const checkIfAccStatuIsInProgress = props?.data?.accounts?.some(
    (element) => element.status === 'IN-PROGRESS'
  );
  const checkIfAccStatuIsSuccess = props?.data?.accounts?.some(
    (element) => element.status === 'SUCCESS'
  );
  const checkIfDigibankStatuIsInProgress = props?.data?.digibank?.status === 'IN-PROGRESS';
  const checkIfDigibankStatuIsSuccess = props?.data?.digibank?.status === 'SUCCESS';

  return (
    <Modal
      testID={props.testIdValue}
      isVisible={props.isVisible}
      hasBackdrop={true}
      onBackdropPress={props.modalClose}
    >
      <View style={Style.main_container}>
        <View style={Style.top_view}>
          <Text style={Style.heading_style}>{translate('print_transaction_on_the_form')}</Text>
          <TouchableOpacity onPress={props.modalClose} style={Style.header_view}>
            <Image source={Images.close} style={Style.close_icon} />
          </TouchableOpacity>
        </View>

        {props.data?.accounts?.length > 0 &&
          (checkIfAccStatuIsInProgress || checkIfAccStatuIsSuccess) &&
          props.data.accounts.length > 0 && (
        <PrintFormRow
          onPressDocIcon={() => props?.onPressDocIcon('form_description_banking_services')}
          isPrintDisabled={true}
          isProcessingError={props?.getRegAccFormInfoResult?.error ? true : false}
          onPressPrintForm={() => {
            props?.printTheform('form_description_banking_services');
          }}
          rowTitle={translate('form_description_banking_services')}
          isFormLoading={props?.getRegAccFormInfoResult?.loading || false}
        />
          )}
        {props?.data?.digibank?.registered === true &&
          props?.data?.digibank.opened_by_new_account === true &&
          (checkIfDigibankStatuIsInProgress || checkIfDigibankStatuIsSuccess) && (
        <PrintFormRow
          onPressDocIcon={() => props?.onPressDocIcon('form_description_Ebanking')}
          isPrintDisabled={true}
          onPressPrintForm={() => {
            props?.printTheform('form_description_Ebanking');
          }}
          isProcessingError={props?.getRegEBankFormInfoResult?.error ? true : false}
          rowTitle={translate('form_description_Ebanking')}
          isFormLoading={props.getRegEBankFormInfoResult?.loading || false}
        />
          )}
        {props?.data?.debit_cards?.length > 0 &&
          props?.data?.debit_cards?.some((item) => item?.opened_by_new_account === true) && (
        <PrintFormRow
          onPressDocIcon={() => props?.onPressDocIcon('form_description_debitCard')}
          isPrintDisabled={true}
          onPressPrintForm={() => {
            props?.printTheform('form_description_debitCard');
          }}
          isProcessingError={props?.getDebitAccFormInfoResult?.error ? true : false}
          rowTitle={translate('form_description_debitCard')}
          isFormLoading={props?.getDebitAccFormInfoResult?.loading || false}
        />
          )}
      </View>
      <ResultFormModal
        isVisible={props?.previewModal}
        formTitle={props?.selectedOption}
        onClosePress={() => props?.setPreviewModal(false)}
        pdfUrl={props?.pdfUrl ?? ''}
      />
    </Modal>
  );
};

export default PrintFormsModal;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  main_container: {
    backgroundColor: Colors.white,
    width: wp(70),
    alignSelf: 'center',
    padding: hp(2),
    borderRadius: 12,
  },
  top_view: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: hp(1.5) },
  modal_view: {
    width: wp(70),
    backgroundColor: Color.white,
    alignSelf: 'center',
    borderRadius: 10,
  },
  close_icon: { height: hp(2.2), width: hp(2.2) },
  header_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  heading_style: {
    fontWeight: '600',
    fontSize: hp(2.3),
    color: Colors.black,
  },
});
