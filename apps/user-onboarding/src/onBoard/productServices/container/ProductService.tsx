import CancelModal from '@components/modals/CancelModal';
import CommonSuspense from '@components/screen/CommonSuspense';
import ScreenLayout from '@components/screen/ScreenLayout';
import React, { useState } from 'react';
import useTransactionId from 'src/hooks/useTransactionId';
import ProductServiceContent from './ProductServiceContent';

function ProductService(props: any) {
  const transactionId = useTransactionId();
  const [cancelTransaction, setCancelTransaction] = useState<boolean>(false);
  const onPressGoHome = () => setCancelTransaction(true);
  const [isAmlLookUp, setAmlLookUp] = useState<boolean>(false);
  const [isConfirmation, setConfirmation] = useState<boolean>(false);

  return (
    <>
      <ScreenLayout
        appBar={
          <ScreenLayout.Appbar
            left={<ScreenLayout.BackButton disabled={isAmlLookUp || isConfirmation} />}
            center={<ScreenLayout.Title title={`#${transactionId}`} />}
            right={<ScreenLayout.CancelTransactionButton onPress={onPressGoHome} />}
          />
        }
      >
        <CommonSuspense>
          <ProductServiceContent isAmlLookUp={isAmlLookUp} setAmlLookUp={setAmlLookUp} isConfirmation={isConfirmation} setConfirmation={setConfirmation} />
        </CommonSuspense>
        <CancelModal
          visible={cancelTransaction}
          closeModal={() => setCancelTransaction(false)}
          setVisible={setCancelTransaction}
          navigation={props.navigation}
        />
      </ScreenLayout>
    </>
  );
}


export default ProductService;
