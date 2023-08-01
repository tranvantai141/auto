import { configureStore } from '@reduxjs/toolkit';
import GetDistrictListSlice from '@screens/addSupplementaryInfo/redux/slices/DistrictListSlice';
import GetEconomicListSlice from '@screens/addSupplementaryInfo/redux/slices/EconomicListSlice';
import GetClassLevelListSlice from '@screens/addSupplementaryInfo/redux/slices/GetClassLevelListSlice';
import GetCommuneListSlice from '@screens/addSupplementaryInfo/redux/slices/GetCommuneListSlice';
import GetNationListingSlice from '@screens/addSupplementaryInfo/redux/slices/GetNationListSlice';
import GetSupplementaryDetailSlice from '@screens/addSupplementaryInfo/redux/slices/GetSupplementalDetailSlice';
import SaveSupplementaryDetailSlice from '@screens/addSupplementaryInfo/redux/slices/SaveSupplementaryDetailSlice';
import UpdateSupplementaryDetailSlice from '@screens/addSupplementaryInfo/redux/slices/UpdateSupplementaryDetailSlice';
import SaveFaceImageSlice from '@screens/customerImageScanner/redux/slices/saveImageSlice';
import CustomerExistenceSlice from '@screens/customerInformation/redux/slices/CustomerExistenceSlice';
import GetFaceImageSlice from '@screens/customerInformation/redux/slices/GetFaceImageSlice';
import SaveMocResultSlice from '@screens/customerInformation/redux/slices/SaveMocResultSlice';
import SaveTransactionSlice from '@screens/customerInformation/redux/slices/SaveTransactionSlice';
import GetCustomerInfoSlice from '@screens/etbCaptureNewWetSignfromPaper/redux/slices/GetCustomerInfoSlice';
import getEtbFatcaInfoSlice from '@screens/etbFatcaInformation/redux/slices/GetEtbFatcaInfoSlice';
import GetCustomerInfoForSignSlice from '@screens/etbShowWetSignature/redux/slices/GetCustomerInfoForSignSlice';
import UpdateWetSignFlagSlice from '@screens/etbShowWetSignature/redux/slices/UpdateWetSignFlagSlice';
import getWetSignatureSlice from '@screens/etbShowWetSignature/redux/slices/getWetSignatureSlice';
import CreateTransactionSlice from '@screens/home/redux/slices/CreateTransactionSlice';
import GetDepartmentSlice from '@screens/home/redux/slices/GetDepartmentSlice';
import GetPendingTransactionsSlice from '@screens/home/redux/slices/GetPendingTransactionsSlice';
import GetUser from '@screens/home/redux/slices/GetUser';
import RegisterDevicesSlice from '@screens/home/redux/slices/RegisterDevicesSlice';
import SignOutSlice from '@screens/home/redux/slices/SignOutSlice';
import CheckAMLSlice from '@screens/idCardScanner/redux/slices/CheckAMLSlice';
import RejectAMLSlice from '@screens/idCardScanner/redux/slices/RejectAmlSlice';
import SaveImageSlice from '@screens/idCardScanner/redux/slices/SaveImageSlice';
import GetBranchValidateSlice from '@screens/logIn/redux/slices/validateBranchService/ValidateBranchServiceSlice';
import createFatcaInfoSlice from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/CreateFatcaInfoSlice';
import getFatcaInfoSlice from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/GetFatcaInfoSlice';
import GetNationListSlice from '@screens/onBoardingProcess/OnBoardingStep4/redux/slices/GetNationListSlice';
import saveSignatureSlice from '@screens/onBoardingProcess/OnBoardingStep8/redux/slices/saveSignatureSlice';
import GetDebitAccFormInfoSlice from '@screens/onBoardingProcess/onBoardingSuccess/redux/slices/GetDebitAccFormInfoSlice';
import GetRegAccFormSlice from '@screens/onBoardingProcess/onBoardingSuccess/redux/slices/GetRegAccFormSlice';
import GetRegEBankFormInfoSlice from '@screens/onBoardingProcess/onBoardingSuccess/redux/slices/GetRegEBankFormInfoSlice';
import GetSlipSlice from '@screens/onBoardingProcess/onBoardingSuccess/redux/slices/GetSkipToHandoverSice';
import GetTransactionResultSlice from '@screens/onBoardingProcess/onBoardingSuccess/redux/slices/GetTransactionResultSlice';
import ProductRegistrationSlice from '@screens/phoneNumberCheck/redux/slices/ProductRegistrationSlice';
import SendOtpSlice from '@screens/phoneNumberCheck/redux/slices/SendOtpSlice';
import VerifyOtpSlice from '@screens/phoneNumberCheck/redux/slices/VerifyOtpSlice';
import GetDebitAccFormToPrintSlice from '@screens/printApplicationForm/redux/slices/GetDebitAccFormToPrintSlice';
import GetFatcaFormToPrintSlice from '@screens/printApplicationForm/redux/slices/GetFatcaFormToPrintSlice';
import GetRegAccFormToPrintSlice from '@screens/printApplicationForm/redux/slices/GetRegCustomerAccFormSlice';
import GetRegEBankFormToPrintSlice from '@screens/printApplicationForm/redux/slices/GetRegEBankFormToPrintSlice';
import GetUpdateInfoFormToPrintSlice from '@screens/printApplicationForm/redux/slices/GetUpdateInfoFormToPrintSlice';
import GetPrintFormSlice from '@screens/printApplicationForm/redux/slices/getFormSlice';
import DeliveryMethodSlice from '@screens/productAndService/redux/slices/DeliveryMethodSlice';
import GetDistrictDeliverListSlice from '@screens/productAndService/redux/slices/DistrictListSlice';
import GetCardListSlice from '@screens/productAndService/redux/slices/GetCardListSlice';
import GetCityDeliverListSlice from '@screens/productAndService/redux/slices/GetCityListSlice';
import GetCommuneDeliverListSlice from '@screens/productAndService/redux/slices/GetCommuneListSlice';
import GetPhoneEBankingSlice from '@screens/productAndService/redux/slices/GetPhoneEBankingSlice';
import GetProductListSlice from '@screens/productAndService/redux/slices/GetProductListSlice';
import ProductAndServiceSliceSlice from '@screens/productAndService/redux/slices/ProductAndServiceSlice';
import RegisterOpenAccountSlice from '@screens/productAndService/redux/slices/RegisterProductAndServiceSlice';
import CheckRegisterDigibankSlice from '@screens/productServices/redux/slices/CheckRegisterDigibankSlice';
import deleteDebitCardSlice from '@screens/productServices/redux/slices/DeleteDebitCard';
import DeleteOpenAccountRequestSlice from '@screens/productServices/redux/slices/DeleteOpenAccountRequestSlice';
import GenerateEcontractFormSlice from '@screens/productServices/redux/slices/GenerateEcontractFormSlice';
import GetAccountListSlice from '@screens/productServices/redux/slices/GetAccountListSlice';
import GetCardsProductListSlice from '@screens/productServices/redux/slices/GetCardsProductListSlice';
import GetDigibankRegInfoSlice from '@screens/productServices/redux/slices/GetDigibankRegisteredInfoSlice';
import GetExistingPhysicalCardSlice from '@screens/productServices/redux/slices/GetExistingPhysicalCardSlice';
import GetPendingAccountSlice from '@screens/productServices/redux/slices/GetPendingAccountSlice';
import GetProductTypeListSlice from '@screens/productServices/redux/slices/GetProductListSlice';
import GetRequestedDebitCardSlice from '@screens/productServices/redux/slices/GetRequestedDebitCardSlice';
import OpenAccountRequestSlice from '@screens/productServices/redux/slices/OpenAccountRequestSlice';
import saveAdditionalInfoSlice from '@screens/productServices/redux/slices/SaveAddionalInfoSlice';
import SaveDebitCardSlice from '@screens/productServices/redux/slices/SaveDebitCardSlice';
import saveAddressRequestSlice from '@screens/productServices/redux/slices/SaveDeliveryAddressSlice';
import SupplementaryDetailSlice from '@screens/productServices/redux/slices/SupplementaryDetailSlice';
import updateAdditionalInfoSlice from '@screens/productServices/redux/slices/UpdateAdditionalInfoSlice';
import UpdateAddressSlice from '@screens/productServices/redux/slices/UpdateAddressSlice';
import GetAdditionalCardInfoSlice from '@screens/reviewETBInformation/redux/slices/GetAdditionalCardInfo';
import GetFatcaFormSlice from '@screens/reviewETBInformation/redux/slices/GetFatcaFormSlice';
import GetRegCustomerAccFormSlice from '@screens/reviewETBInformation/redux/slices/GetRegCustomerAccFormSlice';
import GetRegDebitAccFormSlice from '@screens/reviewETBInformation/redux/slices/GetRegDebitAccFormSlice';
import GetRegDigibankAccFormSlice from '@screens/reviewETBInformation/redux/slices/GetRegDigibankAccFormSlice';
import GetContractFormSlice from '@screens/reviewETBInformation/redux/slices/getContractFormSlice';
import GetTransactionDetailSlice from '@screens/transactionDetail/redux/slices/GetTransactionDetailSlice';
import GetTransactionListSlice from '@screens/transactionList/redux/slices/GetTransactionListSlice';
import { createLogger } from 'redux-logger';
import SignInSlice from '../onBoard/logIn/redux/slices/signInKeycloak/SignInSlice';
import GetUserRoleSlice from '../onBoard/logIn/redux/slices/userRole/UserRole';
import GetAdditionalGlobalInfoSlice from './slices/additonalGlobalInfo/AdditionalGlobalInfo';
import GetAuthInfoSlice from './slices/authState/AuthState';
import CancelTransactionSlice from './slices/cancelTransaction/CancelTransactionSlice';
import LogoutSlice from './slices/cancelTransaction/LogoutSlice';
import AmlGlobalInfoSlice from './slices/checkingAmlGlobalInfo/checkingAmlGlobalInfo';
import CustomerInfoDataSlice from './slices/customerInfoData/CustomerInfoDataSlice';
import ETBUpdatedInfoSlice from './slices/mocResultInfo/ETBUpdatedInfoSlice';
import GetMoCResultInfoSlice from './slices/mocResultInfo/MoCResultInfo';
import GetMoCResultSlice from './slices/mocResultInfo/MocResultInfoSlice';
import GetSupplementalInfoSlice from './slices/mocResultInfo/SupplementalInfo';
import GetNavStateSlice from './slices/navState/NavStateSlice';
import GetPhoneNumberSlice from './slices/phoneNumberForOtp/PhoneNumberForOtp';
import GetUserProfileSlice from './slices/userProfile/UserProfile';
import GetUserProfilePayloadSlice from './slices/userProfile/UserProfilePayload';
import updateDeliveryInfoSlice from '@screens/productServices/redux/slices/UpdateDeliveryInfoSlice';
import GetCityListSlice from '@screens/productAndService/redux/slices/GetCityListSlice';
import GlobalLoadingSlice from '@screens/home/redux/slices/GlobalLoadingSlice';

const logger = createLogger({
  // ...options
});
export const store = configureStore({
  reducer: {
    createTransaction: CreateTransactionSlice,
    signIn: SignInSlice,
    pendingTransactionList: GetPendingTransactionsSlice,
    userProfile: GetUserProfileSlice,
    userRole: GetUserRoleSlice,
    createFatcaInfo: createFatcaInfoSlice,
    getFatcaInfo: getFatcaInfoSlice,
    getSignOutInfo: SignOutSlice,
    profilePayload: GetUserProfilePayloadSlice,
    checkAMLInfo: CheckAMLSlice,
    SaveImageResponse: SaveImageSlice,
    getMoCResults: GetMoCResultInfoSlice,
    SaveFaceImageResponse: SaveFaceImageSlice,
    getUser: GetUser,
    saveSignatureResult: saveSignatureSlice,
    getDepartment: GetDepartmentSlice,
    rejectAml: RejectAMLSlice,
    authenticationState: GetAuthInfoSlice,
    customerExistence: CustomerExistenceSlice,
    getNationList: GetNationListSlice,
    sendOtp: SendOtpSlice,
    saveMocResult: SaveMocResultSlice,
    getClassLevel: GetClassLevelListSlice,
    getEconomicList: GetEconomicListSlice,
    getDistrictList: GetDistrictListSlice,
    getCommunelist: GetCommuneListSlice,
    saveDetails: SaveSupplementaryDetailSlice,
    saveTransaction: SaveTransactionSlice,
    nationlisting: GetNationListingSlice,
    getSupplementaryDetail: GetSupplementaryDetailSlice,
    cancelTransaction: CancelTransactionSlice,
    LogoutSlice: LogoutSlice,
    RegisterDevicesSlice: RegisterDevicesSlice,
    getFaceImage: GetFaceImageSlice,
    productService: ProductAndServiceSliceSlice,
    updateSupplementaryInfo: UpdateSupplementaryDetailSlice,
    GetTransactionResult: GetTransactionResultSlice,
    verifyOtp: VerifyOtpSlice,
    printForm: GetPrintFormSlice,
    getProductList: GetProductListSlice,
    getCardList: GetCardListSlice,
    registerOpenAccountSlice: RegisterOpenAccountSlice,
    getPhoneEBankingSlice: GetPhoneEBankingSlice,
    getMocResult: GetMoCResultSlice,
    triggerProductRegistration: ProductRegistrationSlice,
    GetSlipResponse: GetSlipSlice,
    getPhoneNumberState: GetPhoneNumberSlice,
    branchServiceValidation: GetBranchValidateSlice,
    transactionDetail: GetTransactionDetailSlice,
    GetNavState: GetNavStateSlice,
    transactionList: GetTransactionListSlice,
    deliveryMethod: DeliveryMethodSlice,
    getAdditionalGlobalInfo: GetAdditionalGlobalInfoSlice,
    amlGlobalInfo: AmlGlobalInfoSlice,
    getProvinceDeliverList: GetCityDeliverListSlice,
    getDistrictDeliverList: GetDistrictDeliverListSlice,
    getCommuneDeliverList: GetCommuneDeliverListSlice,
    getAccountList: GetAccountListSlice,
    supplementaryDetail: SupplementaryDetailSlice,
    checkRegisterDigibank: CheckRegisterDigibankSlice,
    openAccount: OpenAccountRequestSlice,
    getProductType: GetProductTypeListSlice,
    deleteOpenAccountRequest: DeleteOpenAccountRequestSlice,
    pendingAccountList: GetPendingAccountSlice,
    getSupplementalInfoSlice: GetSupplementalInfoSlice,
    getCardProductList: GetCardsProductListSlice,
    saveDebitCardSlice: SaveDebitCardSlice,
    deleteDebitCardRequest: deleteDebitCardSlice,
    requestedDebitCardSlice: GetRequestedDebitCardSlice,
    saveAddionalInfoSlice: saveAdditionalInfoSlice,
    getRegDigibankInfo: GetDigibankRegInfoSlice,
    existingDebitCardRequest: GetExistingPhysicalCardSlice,
    getEtbFatcaInfo: getEtbFatcaInfoSlice,
    etbUpdatedInfo: ETBUpdatedInfoSlice,
    getAdditionalCardInfo: GetAdditionalCardInfoSlice,
    saveAddressRequest: saveAddressRequestSlice,
    updateAdditionalInfo: updateAdditionalInfoSlice,
    updateDeliveryInfoSlice: updateDeliveryInfoSlice,
    GetCustomerInfo: GetCustomerInfoSlice,
    getCustomerInfoForWetSign: GetCustomerInfoForSignSlice,
    GetContractFormSlice: GetContractFormSlice,
    getWetSignature: getWetSignatureSlice,
    UpdateWetSignFlagResult: UpdateWetSignFlagSlice,
    generateEcontractForm: GenerateEcontractFormSlice,
    getRegCustomerAccFormResult: GetRegCustomerAccFormSlice,
    getRegDigibankAccFormResult: GetRegDigibankAccFormSlice,
    getRegDebitAccFormResult: GetRegDebitAccFormSlice,
    getFatcaInfoFormResult: GetFatcaFormSlice,
    getRegAccFormToPrintResult: GetRegAccFormToPrintSlice,
    getRegEBankFormToPrintResult: GetRegEBankFormToPrintSlice,
    getDebitAccFormToPrintResult: GetDebitAccFormToPrintSlice,
    getUpdateInfoFormToPrintResult: GetUpdateInfoFormToPrintSlice,
    getFatcaFormToPrintResult: GetFatcaFormToPrintSlice,
    customerInfoData: CustomerInfoDataSlice,
    getRegAccFormInfoResult: GetRegAccFormSlice,
    getRegEBankFormInfoResult: GetRegEBankFormInfoSlice,
    getDebitAccFormInfoResult: GetDebitAccFormInfoSlice,
    updateAddress: UpdateAddressSlice,
    getProvinceList: GetCityListSlice,
    globalLoading: GlobalLoadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      // .concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
