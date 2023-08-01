import { IconPrintGreen } from '@assets/images';
import { widthPercentageToDP } from '@assets/sizes/Sizes';
import PreviewFormModal from '@screens/printApplicationForm/components/PreviewFormModal';
import { PrintFormModel } from '@screens/transactionDetail/typings';
import Colors from '@screens/transactionDetailETB/assets/Colors';
import { AutoFillFormInterface } from '@screens/transactionDetailETB/hooks/useEtbTransactionDetailAutoFillForm';
import { SideBarItemID } from '@screens/transactionDetailETB/types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNPrint from 'react-native-print';
import { translate } from '../../assets/translations/translate';
import ContentSection from '../common/ContentSection';
import GeneralInfoItem from '../common/GeneralInfoItem';
import StatusChip from '../common/StatusChip';
import TermItem from '../common/TermItem';
import ErrorAction from '../common/ErrorAction';
import { useAppDispatch } from 'src/redux/hooks';
import {
  markContractAsManualHandle,
  retryContract,
} from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';

type Props = {
  sideBarItemID?: SideBarItemID;
  data?: AutoFillFormInterface;
};
const FormSection = (props: Props) => {
  const dispatch = useAppDispatch();
  const [previewForm, setPreviewForm] = React.useState<PrintFormModel | null>(null);
  const formData = props?.data?.autoFillForms ?? [];

  return (
    <ContentSection title={translate('form_title')}>
      <PreviewFormModal
        isVisible={previewForm !== null}
        onClosePress={() => setPreviewForm(null)}
        onBackdropPress={() => setPreviewForm(null)}
        pdfUrl={previewForm?.file ?? ''}
        rawFormTitle={previewForm?.title ?? ''}
        formTitle=""
        onPrintPress={() => {
          RNPrint.print({ filePath: previewForm?.file ?? '' });
        }}
      />
      {formData?.map((item, index) => (
        <>
          <TermItem
            key={index}
            action={
              <TouchableOpacity style={Styles.actionTouchable} onPress={() => setPreviewForm(item)}>
                <IconPrintGreen height={22} width={22} style={{ marginRight: 6 }} />
                <Text style={Styles.printText}>{translate('form_print')}</Text>
              </TouchableOpacity>
            }
            title={item?.title ?? ''}
            onPress={() => {
              if (item?.file) {
                setPreviewForm(item);
              }
            }}
          />
          <View
            style={{
              backgroundColor: Colors.gray_10,
              paddingHorizontal: 10,
              borderRadius: 10,
            }}
          >
            {item?.formNo ? (
              <GeneralInfoItem
                leftRightRatio="2:2"
                left={
                  <GeneralInfoItem.Label
                    label={translate('ci_image_electronic_contract_num')}
                    labelLeftStyle={{ fontSize: 14, fontWeight: '600' }}
                  />
                }
                right={
                  <GeneralInfoItem.Value
                    value={item?.status === 'SUCCESS' ? item?.formNo : '-'}
                    valueRightStyle={{ fontSize: 14, fontWeight: '400' }}
                  />
                }
              />
            ) : null}
            {index !== formData.length - 1 && <View style={Styles.itemContainer} />}
            {item?.status ? (
              <GeneralInfoItem
                leftRightRatio="2:2"
                left={
                  <GeneralInfoItem.Label
                    label={translate('form_esign_status_label')}
                    labelLeftStyle={{ fontSize: 14, fontWeight: '600' }}
                  />
                }
                right={
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {item?.status === 'SUCCESS' ? (
                      <StatusChip status="green" title="Thành công" />
                    ) : item?.status === 'MANUAL' ? (
                      <StatusChip status="purple" title="Xử lý thủ công" />
                    ) : item?.status === 'PENDING' ? (
                      <StatusChip status="yellow" title="Chờ xử lý" />
                    ) : item?.status === 'ERROR' ? (
                      <View style={{ width: 100, marginVertical: 5 }}>
                        <StatusChip status="red" title={'Lỗi'} style={{ maxWidth: 35 }} />
                        <View style={{ width: 230, marginVertical: 5 }}>
                          <Text style={Styles.errorText}>
                            {item?.errorCode + ' - ' + item?.errorMessage ?? 'Unknown error'}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                }
              />
            ) : null}
          </View>
        </>
      ))}
    </ContentSection>
  );
};
const Styles = StyleSheet.create({
  actionTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.grey_40,
    borderRadius: 8,
    width: 126.29,
    height: 39,
    justifyContent: 'center',
  },
  printText: { color: Colors.app_green, fontSize: 14, fontWeight: '600' },
  bottomView: {
    borderColor: Colors.gray_10,
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 20,
  },
  errorText: {
    color: Colors.error_red,
    width: widthPercentageToDP(26),
    marginTop: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  itemContainer: {
    borderColor: Colors.gray_10,
    borderWidth: 1,
    marginHorizontal: 5,
  },
});
export default FormSection;
