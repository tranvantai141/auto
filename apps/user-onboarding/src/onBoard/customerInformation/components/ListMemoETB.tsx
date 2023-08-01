import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/Colors';
import { translate } from '../assets/translations/translate';
import {
  IconBottomMemoGray,
  IconBottomMemoRed,
  IconChevronUp,
  IconWarningError,
} from '@assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useCompareMemo, { memoItem } from '@screens/customerInfo/hooks/useCompareMemo';
import { MoCResultFlow, useMocResultFlow } from '@screens/customerInfo/hooks/useMocResultFlow';
import { AccountDataDTO } from '@screens/customerInfo/typings/DTO';
import { acc } from 'react-native-reanimated';
import { MemoDataDTO } from '@screens/customerInfo/typings';

type Props = {
  title?: string;
  resultData?: MoCResultFlow;
};

function ListMemoETB(props: Props) {
  return (
    // <Suspense>
    <ListMemoETBContent {...props} />
    // </Suspense>
  );
}

const ListMemoETBContent = ({ resultData }: Props) => {
  const [isShowMemo, setIsShowMemo] = useState(true);
  // const { sliceArray } = useMocResultFlow();
  const sliceArray = useCallback((data: MemoDataDTO[], type: number) => {
    const desiredChunkSize = Math.ceil(data.length / 2);
    const firstArray = data.slice(0, desiredChunkSize);
    const secondArray = data.slice(desiredChunkSize);
    return type === 1 ? firstArray : secondArray;
  }, []);
  // MARK: - Render Header Memo View
  const RenderHeaderMemoView = () => {
    return (
      <View style={styles.headerMemoView}>
        <Text style={styles.headerMemoText}>{translate('memo')}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log('onPress');
            setIsShowMemo(!isShowMemo);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 24,
            paddingLeft: 16,
          }}
        >
          <Text style={[styles.headerMemoText, { fontWeight: '400', color: Colors.green_90 }]}>
            {!isShowMemo ? translate('detail') : translate('compact')}
          </Text>
          <View style={{ transform: [{ rotate: isShowMemo ? '0deg' : '180deg' }] }}>
            <IconChevronUp />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // MARK: - Render Memo list
  const RenderMemoList = ({ data, index }: { data?: memoItem[]; index?: number }) => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          flex: 1,
        }}
        key={index}
      >
        {(data &&
          data.length > 0 &&
          data.map((item, index) => (
            <View key={item.itemId} style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: 20,
                  marginVertical: 2,
                  color: item.itemClass === 'EKYC' ? Colors.red_60 : Colors.gray_100,
                }}
                key={index}
              >{`• ${item.itemClass} - ${item.message}`}</Text>
              {(item.itemClass === 'EKYC' && <IconWarningError />) || <View />}
            </View>
          ))) || <View />}
      </View>
    );
  };

  const RenderMemoView = ({ data }: { data?: memoItem[] }) => {
    return (
      <View>
        {data && data.length > 0 && (
          <View style={{ flexDirection: 'row' }}>
            <RenderMemoList data={sliceArray(data, 1)} />
            <RenderMemoList data={sliceArray(data, 2)} />
          </View>
        )}
      </View>
    );
  };

  // MARK: - Render account memo view

  const RenderAccountMemoView = ({
    account,
    isShowLine,
    index,
  }: {
    isShowLine?: boolean;
    account?: AccountDataDTO;
    index?: number;
  }) => {
    return (
      <View style={{ marginBottom: isShowLine ? 16 : 0 }}>
        <Text style={{ marginHorizontal: 16 }}>
          <Text style={{ fontWeight: '600' }}>{`${'Tài khoản '}${index}:`}</Text>
          {` ${account?.accountNumber} - ${account?.currency}`}
        </Text>
        <View>
          {account && (account?.memoInfo ?? []).length > 0 && (
            <View style={{ flexDirection: 'row' }}>
              <RenderMemoList data={sliceArray(account.memoInfo ?? [], 1)} />
              <RenderMemoList data={sliceArray(account.memoInfo ?? [], 2)} />
            </View>
          )}
        </View>
        {(isShowLine && <Line />) || <View />}
      </View>
    );
  };

  const Line = () => {
    return (
      <View style={{ height: 1, backgroundColor: Colors.border_grey, marginHorizontal: 16 }} />
    );
  };

  if (resultData?.result !== 'ETB') {
    console.log('resultData?.result', resultData?.result);

    return null;
  }

  const renderAccountHaveMemo = (accountList: AccountDataDTO[]) => {
    let arrAcctHaveMemo: AccountDataDTO[] = [];
    arrAcctHaveMemo = accountList.filter((acc) => (acc.memoInfo ?? []).length > 0);
    return arrAcctHaveMemo.map((acc, index) => (
      <RenderAccountMemoView
        key={acc.accountNumber}
        account={acc}
        isShowLine={index !== arrAcctHaveMemo.length - 1}
        index={index + 1}
      />
    ));
  };

  return (
    <View
      style={[
        styles.container,
        { borderColor: resultData.invalidMemoKyc ? 'red' : Colors.border_grey },
      ]}
    >
      <RenderHeaderMemoView />
      {isShowMemo && (
        <View>
          {(resultData?.cifMemo?.length > 0 && <RenderMemoView data={resultData.cifMemo} />) || (
            <View />
          )}
          {(resultData.accountList &&
            resultData.accountList.length > 0 &&
            resultData.accountList.some((acc) => (acc.memoInfo ?? []).length > 0) && (
              <View style={{ paddingBottom: 16 }}>
                <Line />
              </View>
            )) || <View />}
          {(resultData.accountList &&
            resultData.accountList.length > 0 &&
            resultData.accountList.some((acc) => (acc.memoInfo ?? []).length > 0) &&
            renderAccountHaveMemo(resultData.accountList)) || <View />}
        </View>
      )}

      <View style={{ position: 'absolute', alignSelf: 'flex-end', bottom: -1, right: -1 }}>
        {!resultData.invalidMemoKyc ? <IconBottomMemoGray /> : <IconBottomMemoRed />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 8,
    marginLeft: 16,
  },
  headerMemoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: 16,
    paddingLeft: 16,
    paddingVertical: 16,
  },
  headerMemoText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ListMemoETB;
