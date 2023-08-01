import React, { useCallback } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Colors from '../../assets/Colors';
import { translate } from '../../assets/translations/translate';
import {
  IconCardOutline,
  IconPersonCard,
  IconPhoneCard,
  IconVcbGreen,
  IconVcbLine,
} from '@assets/images';
import { MoCResultFlow } from '@screens/customerInfo/hooks/useMocResultFlow';
import {
  AccountDataDTO,
  AccountListDataDTO,
  CardListDataDTO,
  EBankingListDataDTO,
} from '@screens/customerInfo/typings/DTO';
import { useProductionAndServices } from '@screens/customerInfo/hooks/useProductionAndServices';
import { Items } from '@dummy/ListItems';
import { CustomerInforResult } from '@screens/home/hooks/useCustomerInfoResult';

type Props = {
  resultData?: CustomerInforResult;
};

function ProductAndServiceView(props: Props) {
  return (
    // <Suspense>
    <ProductAndServiceContent {...props} />
    // </Suspense>
  );
}

const ProductAndServiceContent = ({ resultData }: Props) => {
  // MARK: - Render Line View

  const fillerCard = useCallback((data: CardListDataDTO[], type: string) => {
    return data.filter((item) => item.physical === type) ?? [];
  }, []);

  const LineView = ({
    isHiddenBottomLine,
    color,
  }: {
    isHiddenBottomLine?: boolean;
    color?: ViewStyle;
  }) => {
    return <View style={[styles.line_view, { height: isHiddenBottomLine ? 0 : 1 }, color]}></View>;
  };

  // MARK: - Render Row View
  const RenderRowView = ({ title, content }: { title?: string; content?: string }) => {
    return (
      <View style={styles.row_view}>
        <View style={{ marginTop: 8 }}>
          <IconVcbLine />
        </View>
        <Text style={[styles.text_title, { marginLeft: 13 }]}>
          {title}
          <Text style={[styles.text_title, { fontWeight: '400' }]}>{content}</Text>
        </Text>
      </View>
    );
  };

  // MARK: - Render Card View
  const RenderCardView = ({
    title,
    data,
    hiddenLine,
  }: {
    title?: string;
    data?: AccountDataDTO[];
    hiddenLine?: boolean;
  }) => {
    return (
      <View>
        <View style={styles.card_view}>
          <IconPersonCard />
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.text_title}>{title}</Text>
            {data &&
              data.map((item, index) => {
                return (
                  <RenderRowView
                    key={index}
                    title={`${'Tài khoản '}${index + 1}: `}
                    content={
                      item.oldAccountNumber && item.accountNumber.trim().length > 0
                        ? `${item.oldAccountNumber.trim()}(Số tài khoản mới: ${
                            item.accountNumber
                          }) - ${item.currency}`
                        : `${item.accountNumber.trim()} - ${item.currency}`
                    }
                  />
                );
              })}
          </View>
        </View>
        {(!hiddenLine && <LineView color={{ backgroundColor: Colors.border_grey }} />) || <View />}
      </View>
    );
  };

  // MARK: - Render EBanking Services View
  const RenderEBankingServicesView = ({
    title,
    data,
    hiddenLine,
  }: {
    title?: string;
    data?: EBankingListDataDTO[];
    hiddenLine?: boolean;
  }) => {
    const content = () => {
      if (resultData?.productErrDetail === 'ebank' || resultData?.productErrDetail === 'all') {
        return (
          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '400', color: Colors.red }}>
            {translate('get_info_fail_message')}
          </Text>
        );
      }

      return (
        <>
          {data &&
            data.map((item, index) => {
              return (
                <RenderRowView
                  key={index}
                  title={translate('digibank_title')}
                  content={`: ${item.mobileNo}${item?.cusEmail ? ' | ' : ''}${
                    item?.cusEmail ?? ''
                  }`}
                />
              );
            })}
        </>
      );
    };

    // if API is OK but data is empty, not show digi section
    if (resultData?.productErrDetail !== 'ebank' && resultData?.productErrDetail !== 'all' && resultData?.result === 'ETB') {
      if (
        resultData.productResult.ebanks == null ||
        resultData.productResult.ebanks.mobileNo == null
      ) {
        return null;
      }
    }

    // If no error and data is empty, dont show this section
    if (
      resultData?.productErrDetail === null &&
      resultData?.result === 'ETB' &&
      resultData.accountList.length === 0 &&
      resultData.productResult.cards.length === 0 &&
      resultData.productResult.ebanks == null
    ) {
      return null;
    }

    return (
      <View>
        <View style={styles.card_view}>
          <IconVcbGreen />
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.text_title}>{title}</Text>
            {content()}
          </View>
        </View>
        {(!hiddenLine && <LineView color={{ backgroundColor: Colors.border_grey }} />) || <View />}
      </View>
    );
  };

  // MARK: - Render RenderNonPhysicalDebitCardView Services View
  const RenderNonPhysicalDebitCardView = ({
    title,
    data,
    hiddenLine,
  }: {
    title?: string;
    data?: CardListDataDTO[];
    hiddenLine?: boolean;
  }) => {
    const content = () => {
      if (resultData?.productErrDetail === 'card' || resultData?.productErrDetail === 'all') {
        return (
          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '400', color: Colors.red }}>
            {translate('get_info_fail_message')}
          </Text>
        );
      }

      return (
        <>
          {data &&
            data.map((item, index) => {
              return (
                <RenderRowView
                  key={index}
                  title={`${item.pdtNumber} - ${
                    item.productDescription ? item.productDescription : item.brandName
                  }${item.productDescription ? '' : ' - '}${
                    item.productDescription ? '' : item.currency
                  }: `}
                  content={item.maskingCardNumber}
                />
              );
            })}
        </>
      );
    };

    // if API is OK but data is empty, not show card section
    if (resultData?.productErrDetail !== 'card' && resultData?.productErrDetail !== 'all' && resultData?.result === 'ETB') {
      if (
        (resultData.productResult.cards ?? []).length === 0 ||
        fillerCard(resultData.productResult.cards, 'N').length === 0
      ) {
        return null;
      }
    }

    return (
      <View>
        <View style={styles.card_view}>
          <IconPhoneCard />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={styles.text_title}>{title}</Text>
            {content()}
          </View>
        </View>
        {(!hiddenLine && <LineView color={{ backgroundColor: Colors.border_grey }} />) || <View />}
      </View>
    );
  };

  // MARK: - Render RenderNonPhysicalDebitCardView Services View
  const RenderPhysicalDebitCardView = ({
    title,
    data,
  }: {
    title?: string;
    data?: CardListDataDTO[];
  }) => {
    const content = () => {
      if (resultData?.productErrDetail === 'card' || resultData?.productErrDetail === 'all') {
        return (
          <Text style={{ marginTop: 12, fontSize: 16, fontWeight: '400', color: Colors.red }}>
            {translate('get_info_fail_message')}
          </Text>
        );
      }

      return (
        <>
          {data &&
            data.map((item, index) => {
              let title = '';
              //MARK : trường hợp thẻ 01 với 6 số đầu là 970436 thì hiển thị tên thẻ là Thẻ Ghi nợ nội địa liên kết Vietcombank – Tekmedi – Thống Nhất Connect24
              const firstSixCharacters = item.maskingCardNumber.slice(0, 6);
              if (item.pdtNumber === '01') {
                title = firstSixCharacters.includes('970436')
                  ? '01 - Thẻ Ghi nợ nội địa liên kết Vietcombank – Tekmedi – Thống Nhất Connect24: '
                  : '01 - Thẻ Ngân hàng Xây dựng (CB): ';
              } else {
                title = `${item.pdtNumber} - ${
                  item.productDescription ? item.productDescription : item.brandName
                }${item.productDescription ? '' : ' - '}${
                  item.productDescription ? '' : item.currency
                }: `;
              }
              return <RenderRowView key={index} title={title} content={item.maskingCardNumber} />;
            })}
        </>
      );
    };

    // if API is OK but data is empty, not show card section
    if (resultData?.productErrDetail !== 'card' && resultData?.productErrDetail !== 'all' && resultData?.result === 'ETB') {
      if (
        (resultData.productResult.cards ?? []).length === 0 ||
        fillerCard(resultData.productResult.cards, 'Y').length === 0
      ) {
        return null;
      }
    }

    return (
      <View>
        <View style={styles.card_view}>
          <IconCardOutline />
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={styles.text_title}>{title}</Text>
            {content()}
          </View>
        </View>
      </View>
    );
  };

  if (resultData?.result !== 'ETB') {
    return null;
  }

  // MARK: - filter account acceppted

  const filterAccounts = resultData.accountList
    ? resultData.accountList.filter(
        (item) => item.acctType == 'D' && ['1', '3', '5', '6', '7', '9'].includes(item.acctStatus)
      )
    : [];

  return (
    <View style={[styles.container]}>
      <Text style={styles.text_header}>{translate('title_production_and_service')}</Text>
      <LineView color={{ backgroundColor: Colors.green_90 }} />
      {(filterAccounts && filterAccounts.length > 0 && (
        <RenderCardView
          title="Dịch vụ Tài khoản thanh toán"
          data={filterAccounts}
          hiddenLine={resultData.productResult.ebanks && resultData.productResult.cards.length == 0}
        />
      )) || <View />}

      <RenderEBankingServicesView
        title="Dịch vụ Ngân hàng điện tử"
        data={[resultData.productResult.ebanks]}
        hiddenLine={
          fillerCard(resultData.productResult.cards, 'N').length == 0 &&
          fillerCard(resultData.productResult.cards, 'Y').length == 0
        }
      />

      <RenderNonPhysicalDebitCardView
        title="Dịch vụ Thẻ ghi nợ phi vật lý"
        data={fillerCard(resultData.productResult.cards, 'N')}
        hiddenLine={fillerCard(resultData.productResult.cards, 'Y').length == 0}
      />

      <RenderPhysicalDebitCardView
        title="Dịch vụ Thẻ ghi nợ vật lý"
        data={fillerCard(resultData.productResult.cards, 'Y')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    borderColor: Colors.border_grey,
    borderRadius: 8,
    // marginLeft: 16,
    marginTop: 16,
    // paddingVertical: 16,
  },
  text_header: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray_100,
    marginLeft: 16,
  },
  line_view: {
    height: 1,
    backgroundColor: Colors.green_90,
    marginTop: 16,
    marginHorizontal: 16,
  },
  card_view: {
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  text_title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray_100,
    lineHeight: 26,
  },
  row_view: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 8,
  },
  text_content: {},
});

export default ProductAndServiceView;
