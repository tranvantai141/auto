import { IconPrintGreen } from '@assets/images';
import PreviewFormModal from '@screens/printApplicationForm/components/PreviewFormModal';
import Colors from '@screens/transactionDetail/assets/Colors';
import {
  markContractAsManualHandle,
  retryContract,
} from '@screens/transactionDetail/redux/actions/GetTransactionDetailAction';
import { PrintFormModel } from '@screens/transactionDetail/typings';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPrint from 'react-native-print';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { translate } from '../../assets/translations/translate';
import ContentSection from '../common/ContentSection';
import ErrorAction from '../common/ErrorAction';
import GeneralInfoItem from '../common/GeneralInfoItem';
import StatusChip from '../common/StatusChip';
import SubSection from '../common/SubSection';
import TermItem from '../common/TermItem';

const FormSection = () => {
  const { response } = useAppSelector((state: RootState) => state.transactionDetail);
  const forms = response?.printedForms ?? [];
  const [previewForm, setPreviewForm] = React.useState<PrintFormModel | null>(null);
  const dispatch = useAppDispatch();

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
      {forms.map((item, index) => (
        <TermItem
          key={index}
          action={
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.light_grey,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
              onPress={() => setPreviewForm(item)}
            >
              <IconPrintGreen height={22} width={22} style={{ marginRight: 6 }} />
              <Text style={{ color: Colors.app_green }}>{'In biểu mẫu'}</Text>
            </TouchableOpacity>
          }
          title={item?.title ?? ''}
          onPress={() => {
            if (item?.file?.length) {
              setPreviewForm(item);
            }
          }}
        />
      ))}
      {/* {signatures.map((item) => (
        <SubSection key={item.type}>
          <GeneralInfoItem
            leftRightRatio="1:1"
            left={<GeneralInfoItem.Label label={translate('form_esign_status_label')} />}
            right={item.success ? (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}><StatusChip status="green" title='Thành công' /></View>
            ) : (
              <ErrorAction message={item.errorMessage ?? 'Lỗi'} />
            )}
          />
        </SubSection>
      ))} */}
      {response?.informationForProductRequest?.electronicContract != null &&
        (response.informationForProductRequest.electronicContract.status ?? '').length > 0 && (
          <>
            <View style={{ height: 16 }} />
            <SubSection>
              <GeneralInfoItem
                leftRightRatio={
                  response.informationForProductRequest.electronicContract.status === 'ERROR'
                    ? '1:1'
                    : '2:1'
                }
                left={<GeneralInfoItem.Label label={translate('form_esign_status_label')} />}
                right={
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {response.informationForProductRequest.electronicContract.status ===
                    'SUCCESS' ? (
                      <StatusChip status="green" title="Thành công" />
                    ) : response.informationForProductRequest.electronicContract.status ===
                      'MANUAL' ? (
                      <StatusChip status="purple" title="Xử lý thủ công" />
                    ) : response.informationForProductRequest.electronicContract.status ===
                      'PENDING' ? (
                      <StatusChip status="yellow" title="Chờ xử lý" />
                    ) : response.informationForProductRequest.electronicContract.status ===
                      'ERROR' ? (
                      <ErrorAction
                        message={
                          response.informationForProductRequest.electronicContract?.errorCode +
                            ' - ' +
                            response.informationForProductRequest.electronicContract
                              ?.errorMessage ?? 'Unknown error'
                        }
                        onPressRetry={() => {
                          dispatch(retryContract(response?.transactionDetail.transactionId ?? ''));
                        }}
                        onPressManual={() => {
                          dispatch(
                            markContractAsManualHandle(
                              response?.transactionDetail.transactionId ?? ''
                            )
                          );
                        }}
                      />
                    ) : null}
                  </View>
                }
              />
            </SubSection>
          </>
        )}
    </ContentSection>
  );
};

export default FormSection;
