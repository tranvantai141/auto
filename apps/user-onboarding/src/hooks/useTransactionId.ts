import { useEffect, useState } from 'react';
import { TRANSACTION_ID, getData } from 'src/asyncstorage';

function useTransactionId() {
  const [transactionId, setTransactionId] = useState<string | null>(null);
  useEffect(() => {
    getData(TRANSACTION_ID).then((data) => {
      setTransactionId(data);
    });
  }, []);

  return transactionId;
}
export default useTransactionId;
