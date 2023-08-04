import axiosTokenInstance from "src/service/network/axios"
import { setLoading } from '@screens/home/redux/slices/GlobalLoadingSlice';
import { GENERATE_ECONTRACT_FORM, GENERATE_FATCA_FORM } from "@screens/printApplicationForm/api/endpoints";


export const reGetContractForm = async(transactionId: string, dispatch: any) => {
  const param = {
    transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_UPD_INFO',
    contractFormType: 'REVIEW',
    overprinted: false,
  }
  try {
    dispatch(setLoading(true))
    const response = await axiosTokenInstance({
      method: 'POST',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
    })
    if (response) {
      return response?.data?.pdfUrl
    }
  } catch(err) {
    //
  } finally {
    dispatch(setLoading(false))
  }
}

export const reGetFatcaInfoForm = async(transactionId: string, dispatch: any) => {
  const param = {
    transactionId: transactionId,
    step: 'REVIEW_FORM',
    overprinted: false,
  }
  try {
    dispatch(setLoading(true))
    const response = await axiosTokenInstance({
      method: 'POST',
      url: GENERATE_FATCA_FORM,
      data: param,
    })
    if (response) {
      return response?.data?.pdfUrl
    }
  } catch(err) {
    //
  } finally {
    dispatch(setLoading(false))
  }
}
export const reGetRegDebitAccForm = async(transactionId: string, dispatch: any) => {
  const param = {
    transactionId: transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_REG_CUS',
    contractFormType: 'PRINT',
    formats: ['pdf'],
    overprinted: false,
  }
  try {
    dispatch(setLoading(true))
    const response = await axiosTokenInstance({
      method: 'POST',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
    })
    if (response) {
      return response?.data?.pdfUrl
    }
  } catch(err) {
    //
  } finally {
    dispatch(setLoading(false))
  }
}

export const reGetRegDigibankAccForm = async(transactionId: string, dispatch: any) => {
  const param = {
    transactionId: transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_REG_CUS',
    contractFormType: 'PRINT',
    formats: ['pdf'],
    overprinted: false,
  }
  try {
    dispatch(setLoading(true))
    const response = await axiosTokenInstance({
      method: 'POST',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
    })
    if (response) {
      return response?.data?.pdfUrl
    }
  } catch(err) {
    //
  } finally {
    dispatch(setLoading(false))
  }
}

export const reGetRegCustomerAccForm = async(transactionId: string, dispatch: any) => {
    const param = {
      transactionId: transactionId,
      requestType: 'TRIGGER',
      contractType: 'OB_REG_CUS',
      contractFormType: 'PRINT',
      formats: ['pdf'],
      overprinted: true,
    }
    try {
      dispatch(setLoading(true))
      const response = await axiosTokenInstance({
        method: 'POST',
        url: GENERATE_ECONTRACT_FORM,
        data: param,
      })
      if (response) {
        return response?.data?.pdfUrl
      }
    } catch(err) {
      //
    } finally {
      dispatch(setLoading(false))
    }
  }

export const reGetRegisterEbankAccForm = async(transactionId: string, dispatch: any) => {
  const param = {
    transactionId: transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_REG_CUS',
    contractFormType: 'PRINT',
    formats: ['pdf'],
    overprinted: false,
  }
  try {
    dispatch(setLoading(true))
    const response = await axiosTokenInstance({
      method: 'POST',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
    })
    if (response) {
      return response?.data?.pdfUrl
    }
  } catch(err) {
    //
  } finally {
    dispatch(setLoading(false))
  }
}

export const reGetUpdateInformation = async(transactionId: string, dispatch: any) => {
  const param = {
    transactionId: transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_UPD_INFO',
    contractFormType: 'PRINT',
    formats: ['pdf'],
  }
  try {
    dispatch(setLoading(true))
    const response = await axiosTokenInstance({
      method: 'POST',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
    })
    if (response) {
      return response?.data?.pdfUrl
    }
  } catch(err) {
    //
  } finally {
    dispatch(setLoading(false))
  }
}

export const reGetGenerateEContract = async(transactionId: string, dispatch: any) => {
  const param = {
    transactionId: transactionId,
    requestType: 'TRIGGER',
    contractType: 'OB_UPD_INFO',
    contractFormType: 'PRINT',
  }
  try {
    dispatch(setLoading(true))
    const response = await axiosTokenInstance({
      method: 'POST',
      url: GENERATE_ECONTRACT_FORM,
      data: param,
    })
    if (response) {
      return response?.data?.pdfUrl
    }
  } catch(err) {
    //
  } finally {
    dispatch(setLoading(false))
  }
}