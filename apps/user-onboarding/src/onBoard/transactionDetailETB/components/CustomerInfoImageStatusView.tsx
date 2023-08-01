import { widthPercentageToDP } from '@assets/sizes/Sizes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GeneralInfoItem from './common/GeneralInfoItem';
import StatusChip from './common/StatusChip';
import Colors from '../assets/Colors';

type Props = {
  updateStatus?: string;
  deletedPhotosStatus?: string;
};

const CustomerInfoImageStatusView = (props: Props) => {
  return (
    <View>
      <GeneralInfoItem
        left={<GeneralInfoItem.Label label={'Trạng thái cập nhật'} />}
        right={
          <View>
            {props?.updateStatus === 'PENDING' ? (
              <View>
                <StatusChip status="yellow" title="Chờ xử lý" />
              </View>
            ) : props?.updateStatus === 'ERROR' ? (
              <View style={{ width: 44, marginVertical: 5 }}>
                <StatusChip status="red" title="Lỗi" />
                <Text
                  style={{
                    color: Colors.error_red,
                    width: widthPercentageToDP(100),
                    marginTop: 5,
                    fontSize: 14,
                    fontWeight: '400',
                  }}
                >
                  999-Timeout
                </Text>
              </View>
            ) : (
              <StatusChip status="green" title="Thành công" />
            )}
          </View>
        }
      />
      {props?.deletedPhotosStatus !== undefined ? (
        <GeneralInfoItem
          left={<GeneralInfoItem.Label label={'Trạng thái xoá ảnh bị thay thế'} />}
          right={
            <View>
              {props?.deletedPhotosStatus === 'PENDING' ? (
                <View>
                  <StatusChip status="yellow" title="Chờ xử lý" />
                </View>
              ) : props?.deletedPhotosStatus === 'ERROR' ? (
                <View style={{ width: 44, marginVertical: 5 }}>
                  <StatusChip status="red" title="Lỗi" />
                  <Text
                    style={{
                      color: Colors.error_red,
                      width: widthPercentageToDP(100),
                      marginTop: 5,
                      fontSize: 14,
                      fontWeight: '400',
                    }}
                  >
                    999-Timeout
                  </Text>
                </View>
              ) : (
                <StatusChip status="green" title="Thành công" />
              )}
            </View>
          }
        />
      ) : null}
    </View>
  );
};

const Styles = StyleSheet.create({});
export default CustomerInfoImageStatusView;
