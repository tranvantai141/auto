import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPrintForm } from '../api/endpoints';
import useTransactionId from 'src/hooks/useTransactionId';
import RNPrint from 'react-native-print';
import { FormType } from '@screens/reviewETBInformation/typings/ReviewInfoResponse';
import { FormInfoETB, FormTitle } from '../typings/FormInfo';

export function usePrintFormETB() {
  const transactionId = useTransactionId();
  const [hasError, setHasError] = useState(false);
  const [formState, setFormState] = useState<FormInfoETB>();

  //MARK: get Api list print form

  const {
    data: generatedFormURLs,
    refetch: refetchPrintForm,
    error: errPrintForm,
  } = useQuery(
    ['generatedFormPrint', transactionId],
    async () => {
      try {
        const res = await getPrintForm(transactionId ?? '', 'PRINT');
        return res.pdfUrl;
      } catch (error) {
        throw new Error("Can't get print form");
      }
    },
    {
      enabled: transactionId != null,
      useErrorBoundary: false,
    }
  );

  const {
    data: generatedFormReviewURLs,
    refetch: refetchReviewForm,
    error: errReviewForm,
  } = useQuery(
    ['generatedFormReview', transactionId],
    async () => {
      try {
        const res = await getPrintForm(transactionId ?? '', 'REVIEW');
        return res.pdfUrl;
      } catch (error) {
        throw new Error("Can't get review form");
      }
    },
    {
      enabled: transactionId != null,
      useErrorBoundary: false,
    }
  );

  //MARK: retry api
  const actionRetry = useCallback(async () => {
    if (errPrintForm) {
      await refetchPrintForm();
    }
    if (errReviewForm) {
      await refetchReviewForm();
    }
  }, [errPrintForm, errReviewForm, refetchPrintForm, refetchReviewForm]);

  //MARK: handle action print all

  const handleActionPrintAll = useCallback(() => {
    if (generatedFormURLs) {
      printRemotePDF(generatedFormURLs);
      console.log('handleActionPrintAll');
    }
  }, [generatedFormURLs]);

  //MARK: handle action print document

  const handleActionPrintDocument = useCallback((url: string) => {
    url && printRemotePDF(url);
  }, []);

  const printRemotePDF = async (filePath: string) => {
    try {
      await RNPrint.print({ filePath });
    } catch (error) {
      console.log('error', error);
    }
  };

  //MARK: action see detail

  const handleActionSeeDetail = useCallback(
    (type: FormType, urlToShow: string, title: FormTitle) => {
      setFormState({
        isVisible: true,
        formId: type,
        formTitle: title,
        formURL: urlToShow,
      });
    },
    []
  );

  const handleClosePress = useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  const handleModalBackdrop = useCallback(() => {
    setFormState((prevState) => ({ ...prevState, isVisible: false }));
  }, []);

  return useMemo(() => {
    return {
      errPrintForm,
      errReviewForm,
      actionRetry,
      generatedFormURLs,
      generatedFormReviewURLs,
      handleActionPrintAll,
      handleActionPrintDocument,
      handleActionSeeDetail,
      handleClosePress,
      handleModalBackdrop,
      formState,
      hasError,
    };
  }, [
    errPrintForm,
    errReviewForm,
    actionRetry,
    generatedFormURLs,
    generatedFormReviewURLs,
    handleActionPrintAll,
    handleActionPrintDocument,
    handleActionSeeDetail,
    handleClosePress,
    handleModalBackdrop,
    formState,
  ]);
}
