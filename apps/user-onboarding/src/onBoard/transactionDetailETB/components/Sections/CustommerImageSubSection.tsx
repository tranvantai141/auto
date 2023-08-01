import { RouteNames } from '@routeNames';
import Images from '@screens/transactionDetail/assets/Images';
import ContentSection from '@screens/transactionDetail/components/common/ContentSection';
import GeneralInfoItem from '@screens/transactionDetail/components/common/GeneralInfoItem';
import StatusChip from '@screens/transactionDetail/components/common/StatusChip';
import { useCustommerInfoSectionContext } from '@screens/transactionDetailETB/contexts/CustommerInfoSectionContext';
import { IdCardImageResponse } from '@screens/transactionDetailETB/hooks/useEtbCustomerInfoSection';
import {
  StatusUpdated,
  TransactionDetailIDCardImageInfoResultDTO,
  TransactionDetailTabletSignatureInfoResultDTO,
  TransactionDetailWetSignatureInfoResultDTO,
} from '@screens/transactionDetailETB/types/GetTransactionDetailLibraryImageDTO';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from 'src/common/utils/Colors';
import { transactionStatusName } from 'src/common/utils/transactionStatusName';
import useRootNavigation from 'src/navigation/hooks/useRootNavigation';

// get props of Image
type ImageProps = React.ComponentProps<typeof Image>;

const ImageView = ({
  uri,
  placeholder,
  ...rest
}: { uri: string; placeholder: any } & ImageProps) => {
  const { navigate } = useRootNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigate(RouteNames.webView.name, {
          title: '',
          url: uri,
        });
      }}
    >
      <Image
        {...rest}
        style={Styles.image}
        source={
          uri.length === 0
            ? placeholder
            : {
                uri: uri,
              }
        }
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

type Props = {
  idCardImageResponse: IdCardImageResponse;
};

export function CustommerImageSubSection({ idCardImageResponse }: Props) {
  const { selectedButton } = useCustommerInfoSectionContext();

  //MARK: render Chip status view (bắt các trạng thái trả về từ server)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderChipStatus = (
    status: StatusUpdated,
    errCode?: string,
    errMess?: string,
    isImage?: boolean
  ) => {
    switch (status) {
      case 'COMPLETE':
      case 'SUCCESS':
        return <StatusChip status="green" title={transactionStatusName[status]} />;
      case 'MANUAL':
        return <StatusChip status="purple" title={transactionStatusName[status]} />;
      case 'PROCESSING':
      case 'PENDING':
      case 'SUBMITTED':
        return <StatusChip status="yellow" title={transactionStatusName[status]} />;
      case 'FAILED':
      case 'FAIL':
      case 'ERROR':
        return (
          <View style={Styles.valueContainer}>
            <StatusChip
              status="red"
              title={isImage && isImage === true ? 'Lỗi' : transactionStatusName[status]}
            />
            <View style={{ height: 8 }} />
            <Text style={{ color: Colors.error_red, fontSize: 14, fontWeight: '400' }}>
              {(errCode && `${errCode ?? ''} - ${errMess ?? ''}`) || ''}
            </Text>
          </View>
        );
      case 'CANCEL':
        return <StatusChip status="yellow" title={transactionStatusName[status]} />;
      case 'OPEN':
        return <StatusChip status="gray" title={transactionStatusName[status]} />;
      default:
        return <StatusChip status="red" title={'Lỗi không xác định' ?? ''} />;
    }
  };

  //MARK: render status view (render view trạng thái cập nhật và trạng thái xoá ảnh bị thay thế)

  const renderStatusView = useCallback(
    (
      statusUpdate?: StatusUpdated,
      statusDeleteChanged?: StatusUpdated,
      updateStatusCode?: string,
      updateStatusMess?: string,
      deleteStatusCode?: string,
      deleteStatusMess?: string
    ) => {
      return (
        <View>
          {(statusUpdate && statusUpdate !== 'NOT_REGISTERED' && (
            <View>
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={'Trạng thái cập nhật'} />}
                right={renderChipStatus(statusUpdate, updateStatusCode, updateStatusMess, true)}
                style={{ borderBottomWidth: 0 }}
              />
            </View>
          )) || <View />}

          {(statusDeleteChanged && statusDeleteChanged !== 'NOT_REGISTERED' && (
            <View>
              <GeneralInfoItem
                left={<GeneralInfoItem.Label label={'Trạng thái xoá ảnh bị thay thế'} />}
                right={renderChipStatus(
                  statusDeleteChanged,
                  deleteStatusCode,
                  deleteStatusMess,
                  true
                )}
                style={{ borderBottomWidth: 0 }}
              />
            </View>
          )) || <View />}
        </View>
      );
    },
    [renderChipStatus]
  );

  //MARK: render id card image view (render view ảnh chứng minh thư)
  const renderIdCardImageView = useCallback(() => {
    let imageFont: TransactionDetailIDCardImageInfoResultDTO | undefined;
    let imageBack: TransactionDetailIDCardImageInfoResultDTO | undefined;

    if (selectedButton === 'updated') {
      imageFont = idCardImageResponse?.idCardImageInfo?.imageList.find(
        (item) => item.imageOrigin === 'ON_BOARDING' && item.imageKind === 'FRONT'
      );
      imageBack = idCardImageResponse?.idCardImageInfo?.imageList.find(
        (item) => item.imageOrigin === 'ON_BOARDING' && item.imageKind === 'BACK'
      );
    } else {
      imageFont = idCardImageResponse?.idCardImageInfo?.imageList.find(
        (item) => item.imageOrigin === 'CORE_BANKING' && item.imageKind === 'DEFAULT'
      );
      imageBack = undefined;
    }

    if (
      (selectedButton === 'updated' && !imageFont && !imageBack) ||
      (selectedButton === 'old' && !imageFont)
    ) {
      return <View />;
    }

    return (
      <View style={Styles.container}>
        {selectedButton === 'updated' ? (
          <GeneralInfoItem
            leftRightRatio="1:2"
            left={<GeneralInfoItem.Label label={'Ảnh CCCD'} />}
            right={
              <View style={{}}>
                <ImageView uri={imageFont?.imageUrl ?? ''} placeholder={Images.dummy.id_front} />
                <ImageView uri={imageBack?.imageUrl ?? ''} placeholder={Images.dummy.id_back} />
              </View>
            }
            style={{ borderBottomWidth: 0 }}
          />
        ) : (
          <GeneralInfoItem
            leftRightRatio="1:2"
            left={<GeneralInfoItem.Label label={'Ảnh CCCD'} />}
            right={
              <View style={{}}>
                <ImageView uri={imageFont?.imageUrl ?? ''} placeholder={Images.dummy.id_front} />
              </View>
            }
            style={{ borderBottomWidth: 0 }}
          />
        )}
        {(selectedButton === 'updated' &&
          idCardImageResponse?.idCardImageInfo?.addingNewIdCardImageStatus !== 'NOT_REGISTERED' &&
          renderStatusView(
            idCardImageResponse?.idCardImageInfo?.addingNewIdCardImageStatus,
            idCardImageResponse?.idCardImageInfo?.deletingNewIdCardImageStatus,
            idCardImageResponse?.idCardImageInfo?.addingNewIdCardImageCode,
            idCardImageResponse?.idCardImageInfo?.addingNewIdCardImageMessage,
            idCardImageResponse?.idCardImageInfo?.deletingNewIdCardImageCode,
            idCardImageResponse?.idCardImageInfo?.deletingNewIdCardImageMessage
          )) || <View />}
      </View>
    );
  }, [selectedButton, idCardImageResponse, renderStatusView]);

  //MARK: render wet signature image view (render view ảnh chữ ký tươi)

  const renderWetSignatureImageView = useCallback(() => {
    let imageUpdate: TransactionDetailWetSignatureInfoResultDTO | undefined;
    let imageOld: TransactionDetailWetSignatureInfoResultDTO | undefined;

    if (selectedButton === 'updated') {
      imageUpdate = idCardImageResponse?.getWetSignatureInfo?.imageList.find(
        (item) => item.imageOrigin === 'ON_BOARDING'
      );
    } else {
      imageOld = idCardImageResponse?.getWetSignatureInfo?.imageList.find(
        (item) => item.imageOrigin === 'CORE_BANKING'
      );
    }

    if (
      idCardImageResponse?.getWetSignatureInfo?.addingNewWetSignatureStatus === 'NOT_REGISTERED'
    ) {
      return <View />;
    }

    return (
      <View style={Styles.container}>
        <GeneralInfoItem
          leftRightRatio="1:2"
          left={<GeneralInfoItem.Label label={'Ảnh chữ ký tươi'} />}
          right={
            <View style={Styles.view_image}>
              <ImageView
                uri={
                  (selectedButton === 'updated' ? imageUpdate?.imageUrl : imageOld?.imageUrl) ?? ''
                }
                placeholder={Images.dummy.sign_image}
              />
            </View>
          }
          style={{ borderBottomWidth: 0 }}
        />
        {(selectedButton === 'updated' &&
          renderStatusView(
            idCardImageResponse?.getWetSignatureInfo?.addingNewWetSignatureStatus,
            idCardImageResponse?.getWetSignatureInfo?.deletingOldWetSignatureStatus,
            idCardImageResponse?.getWetSignatureInfo?.addingNewWetSignatureCode,
            idCardImageResponse?.getWetSignatureInfo?.addingNewWetSignatureMessage,
            idCardImageResponse?.getWetSignatureInfo?.deletingOldWetSignatureCode,
            idCardImageResponse?.getWetSignatureInfo?.deletingOldWetSignatureMessage
          )) || <View />}
      </View>
    );
  }, [selectedButton, idCardImageResponse, renderStatusView]);

  //MARK: render signature in tablet view (render view chữ ký trên tablet)

  const renderSignatureInTabletView = useCallback(() => {
    let imageUpdate: TransactionDetailTabletSignatureInfoResultDTO | undefined;
    let imageOld: TransactionDetailTabletSignatureInfoResultDTO | undefined;
    if (
      idCardImageResponse?.tabletSignatureImageInfo?.tabletSignatureImage?.imageOrigin ===
      'ON_BOARDING'
    ) {
      imageUpdate =
        idCardImageResponse?.tabletSignatureImageInfo?.tabletSignatureImage ?? undefined;
    } else {
      imageOld = idCardImageResponse?.tabletSignatureImageInfo?.tabletSignatureImage ?? undefined;
    }

    if (
      (selectedButton === 'updated' && imageUpdate === undefined) ||
      (selectedButton === 'old' && imageOld === undefined)
    ) {
      return <View />;
    }

    return (
      <View style={Styles.container}>
        <GeneralInfoItem
          leftRightRatio="1:2"
          left={<GeneralInfoItem.Label label={'Chữ ký trên tablet'} />}
          right={
            <View style={Styles.view_image}>
              <ImageView
                uri={
                  (selectedButton === 'updated' ? imageUpdate?.imageUrl : imageOld?.imageUrl) ?? ''
                }
                placeholder={Images.dummy.sign_draw}
              />
            </View>
          }
          style={{ borderBottomWidth: 0 }}
        />
        {(selectedButton === 'updated' && (
          <View>
            {(idCardImageResponse?.tabletSignatureImageInfo?.addingTabletSignatureStatus &&
              idCardImageResponse?.tabletSignatureImageInfo?.addingTabletSignatureStatus !==
                'NOT_REGISTERED' && (
                <GeneralInfoItem
                  left={<GeneralInfoItem.Label label={'Trạng thái cập nhật'} />}
                  right={renderChipStatus(
                    idCardImageResponse?.tabletSignatureImageInfo?.addingTabletSignatureStatus ??
                      'ERROR',
                    idCardImageResponse?.tabletSignatureImageInfo?.addingTabletSignatureCode,
                    idCardImageResponse?.tabletSignatureImageInfo?.addingTabletSignatureMessage,
                    true
                  )}
                  style={{ borderBottomWidth: 0 }}
                />
              )) || <View />}
          </View>
        )) || <View />}
      </View>
    );
  }, [selectedButton, idCardImageResponse, renderChipStatus]);

  //MARK: render portrait photo in card view (render view ảnh chân dung trong thẻ)

  const renderFaceImage = useCallback(() => {
    if (
      idCardImageResponse?.customerImages?.images?.portrait === null ||
      idCardImageResponse?.customerImages?.images?.portrait === undefined ||
      idCardImageResponse?.customerImages?.images?.portrait === ''
    ) {
      return <View />;
    }
    return (
      <View style={Styles.container}>
        <GeneralInfoItem
          leftRightRatio="1:2"
          left={<GeneralInfoItem.Label label={'Ảnh chân dung trong thẻ'} />}
          right={
            <View style={Styles.view_image}>
              <ImageView
                uri={idCardImageResponse?.customerImages?.images.portrait ?? ''}
                placeholder={Images.dummy.id_portrait}
              />
            </View>
          }
          style={{ borderBottomWidth: 0 }}
        />
      </View>
    );
  }, [idCardImageResponse]);

  //MARK: render face photo  (render ảnh chụp khuôn mặt)

  const renderFacePhoto = useCallback(() => {
    if (
      idCardImageResponse?.customerImages?.images?.faceImage === null ||
      idCardImageResponse?.customerImages?.images?.faceImage === undefined ||
      idCardImageResponse?.customerImages?.images?.faceImage === ''
    ) {
      return <View />;
    }
    return (
      <View style={Styles.container}>
        <GeneralInfoItem
          leftRightRatio="1:2"
          left={<GeneralInfoItem.Label label={'Ảnh chụp khuôn mặt'} />}
          right={
            <View style={Styles.view_image}>
              <ImageView
                uri={idCardImageResponse?.customerImages?.images.faceImage ?? ''}
                placeholder={Images.dummy.real_portrait}
              />
            </View>
          }
          style={{ borderBottomWidth: 0 }}
        />
      </View>
    );
  }, [idCardImageResponse]);

  //MARK: render component

  return (
    <ContentSection title="Thư viện hình ảnh">
      {renderIdCardImageView()}
      {renderWetSignatureImageView()}
      {renderSignatureInTabletView()}
      {(selectedButton === 'updated' && renderFaceImage()) || <View />}
      {(selectedButton === 'updated' && renderFacePhoto()) || <View />}
    </ContentSection>
  );
}

const Styles = StyleSheet.create({
  image: {
    width: 200,
    minHeight: 125,
  },
  container: {
    backgroundColor: Colors.gray_10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  view_image: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  valueContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  valueText: {
    marginBottom: 8,
  },
});
