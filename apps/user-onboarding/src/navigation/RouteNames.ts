import SelectAndReplaceImageScreen from '@screens/SelectAndReplaceImageScreen/container/SelectAndReplaceImageScreen';
import WebViewScreen from '@screens/WebView/container/WebViewScreen';
import AddSupplementaryInformation from '@screens/addSupplementaryInfo/container/AddSupplementaryInformation';
import CaptureSupportingDocuments from '@screens/captureSupportingDocument/container/CaptureSupportingDocuments';
import CaptureWetSignatureScreen from '@screens/captureWetSignature/container/CaptureWetSignatureScreen';
import CheckExistence from '@screens/checkExistence/container/CheckExistence';
import CustomerImageScanner from '@screens/customerImageScanner/container/CustomerImageScanner';
import CustomerInfo from '@screens/customerInfo/container/CustomerInfo';
import CustomerInformation from '@screens/customerInformation/container/CustomerInformation';
import EtbCaptureIdScreen from '@screens/etbCaptureIdScreen/container/EtbCaptureIdScreen';
import EtbCaptureNewWetSignScreen from '@screens/etbCaptureNewWetSignfromPaper/container/EtbCaptureNewWetSignScreen';
import EtbCustomerSignonTablet from '@screens/etbCustomerSignonTablet/container/EtbCustomerSignonTablet';
import EtbFatcaInformation from '@screens/etbFatcaInformation/container/EtbFatcaInformation';
import EtbShowWetSignature from '@screens/etbShowWetSignature/container/EtbShowWetSignature';
import EtbSignatureUpdateScreen from '@screens/etbSignUpdateReqScreen/container/etbSignUpdateReqScreen';
import ExistingUserDetail from '@screens/existingUserDetail/container/ExistingUserDetail';
import Home from '@screens/home/container/Home';
import IdCardScanner from '@screens/idCardScanner/container/IdCardScanner';
import Login from '@screens/logIn/container/Login';
import UserInformationETB from '@screens/onBoardingProcess/OnBoardingETBStep4/container/UserInformation';
import OnBoardingStep1 from '@screens/onBoardingProcess/OnBoardingStep1/container/OnBoardingStep1';
import SelectDocumentStep from '@screens/onBoardingProcess/OnBoardingStep2/container/SelectDocumentStep';
import ProgressInstructionsStep from '@screens/onBoardingProcess/OnBoardingStep3/container/ProgressInstructionsStep';
import UserInformation from '@screens/onBoardingProcess/OnBoardingStep4/container/UserInformation';
import UserService from '@screens/onBoardingProcess/OnBoardingStep5/container/UserService';
import CaptureSignature from '@screens/onBoardingProcess/OnBoardingStep8/container/CaptureSignature';
import OnBoardingSuccessResult from '@screens/onBoardingProcess/onBoardingSuccess/container/OnBoardingSuccessResult';
import TermsConditions from '@screens/onBoardingProcess/termsConditions/container/TermsConditions';
import OnBoardingReader from '@screens/onBoardingReader/container/OnBoardingReader';
import onBoardingStepOptions from '@screens/onBoardingStepOptions/container/onBoardingStepOptions';
import OnboardingHome from '@screens/onboardingHome/container/OnboardingHome';
import OtpScreen from '@screens/phoneNumberCheck/container/OtpScreen';
import PrintApplicationScreen from '@screens/printApplicationForm/container/PrintApplicationFormScreen';
import PrintFromETBScreen from '@screens/printApplicationForm/container/PrintFromETBScreen';
import ProductAndService from '@screens/productAndService/container/ProductAndService';
import ProductService from '@screens/productServices/container/ProductService';
import ReviewETBInformation from '@screens/reviewETBInformation/container/ReviewETBInformation';
import ReviewInformation from '@screens/reviewInformation/container/ReviewInformation';
import ServiceRating from '@screens/serviceRating/container/ServiceRating';
import Splash from '@screens/splash/container/Splash';
import { TransactionDetailWrapper } from '@screens/transactionDetailETB/container/TransactionDetailETB';
import TransactionList from '@screens/transactionList/container/TransactionList';
import ExistingCustomers from 'src/onBoard/existingCustomers/container/ExistingCustomers';
import AdditionalInformation from '../onBoard/onBoardingProcess/OnBoardingStep6/container/AdditionalInformation';
import ValidateInformation from '../onBoard/onBoardingProcess/OnBoardingStep7/container/ValidateInformation';
import RegistrationSuccess from '../onBoard/registrationSuccess/container/registrationSuccess';
import AuthStackNavigator from './stack/AuthStackNavigator';
import UnAuthStackNavigator from './stack/UnAuthStackNavigator';

export const unAuthStack = {
  name: 'unAuthStack' as never,
  component: UnAuthStackNavigator,
};

export const AuthStack = {
  name: 'AuthStack' as never,
  component: AuthStackNavigator,
};

export const RouteNames = {
  splash: {
    name: 'splash',
    component: Splash,
  },
  signIn: {
    name: 'signIn',
    component: Login,
  },
  home: {
    name: 'home',
    component: Home,
  },
  termsCondition: {
    name: 'termsCondition',
    component: TermsConditions,
  },
  userInformation: {
    name: 'userInfo',
    component: UserInformation,
  },
  userInformationETB: {
    name: 'userInfo',
    component: UserInformationETB,
  },
  customerImageScanner: {
    name: 'customerImageScanner',
    component: CustomerImageScanner,
  },
  onboardingHome: {
    name: 'onboardingHome',
    component: OnboardingHome,
  },
  userService: {
    name: 'userService',
    component: UserService,
  },
  onBoardingStep1: {
    name: 'onBoardingStep1',
    component: OnBoardingStep1,
  },
  onBoardingStep3: {
    name: 'onBoardingStep3',
    component: ProgressInstructionsStep,
  },
  onBoardingStep2: {
    name: 'onBoardingStep2',
    component: SelectDocumentStep,
  },
  onBoardingOptions: {
    name: 'onBoardingOptions',
    component: onBoardingStepOptions,
  },
  validateInformation: {
    name: 'validateInformation',
    component: ValidateInformation,
  },
  additionalInfo: {
    name: 'additionalInfo',
    component: AdditionalInformation,
  },
  serviceRating: {
    name: 'serviceRating',
    component: ServiceRating,
  },
  captureSignature: {
    name: 'captureSignature',
    component: CaptureSignature,
  },
  registrationSuccess: {
    name: 'registrationSuccess',
    component: RegistrationSuccess,
  },
  existingUserDetail: {
    name: 'existingUserDetail',
    component: ExistingUserDetail,
  },
  existingCustomers: {
    name: 'existingCustomers',
    component: ExistingCustomers,
  },
  onBoardingReader: {
    name: 'onBoardingReader',
    component: OnBoardingReader,
  },
  onBoardingSuccessResult: {
    name: 'onBoardingSuccessResult',
    component: OnBoardingSuccessResult,
  },
  customerInformation: {
    name: 'customerInformation',
    component: CustomerInformation,
  },
  checkExistence: {
    name: 'checkExistence',
    component: CheckExistence,
  },
  idCardScanner: {
    name: 'idCardScanner',
    component: IdCardScanner,
  },
  productAndService: {
    name: 'productAndService',
    component: ProductAndService,
  },
  reviewInformation: {
    name: 'reviewInformation',
    component: ReviewInformation,
  },
  reviewETBInformation: {
    name: 'reviewETBInformation',
    component: ReviewETBInformation,
  },
  supplementaryInfo: {
    name: 'supplementaryInfo',
    component: AddSupplementaryInformation,
  },
  otpScreen: {
    name: 'otpScreen',
    component: OtpScreen,
    options: { gestureEnabled: false },
  },
  captureWetSignatureScreen: {
    name: 'captureWetSignatureScreen',
    component: CaptureWetSignatureScreen,
  },
  printApplicationScreen: {
    name: 'printApplicationScreen',
    component: PrintApplicationScreen,
    options: { gestureEnabled: false },
  },
  transactionList: {
    name: 'transactionList',
    component: TransactionList,
  },
  transactionDetail: {
    name: 'transactionDetail',
    component: TransactionDetailWrapper,
  },
  webView: {
    name: 'webView',
    component: WebViewScreen,
  },
  customerInfo: {
    name: 'customerInfo',
    component: CustomerInfo,
  },
  printFromETBScreen: {
    name: 'printFromETBScreen',
    component: PrintFromETBScreen,
  },
  productService: {
    name: 'productService',
    component: ProductService,
  },
  captureSupporingDocuments: {
    name: 'captureSupporingDocuments',
    component: CaptureSupportingDocuments,
  },
  etbFatcaInformation: {
    name: 'etbFatcaInformation',
    component: EtbFatcaInformation,
  },
  etbShowWetSignature: {
    name: 'etbShowWetSignature',
    component: EtbShowWetSignature,
  },
  etbCaptureWetSignScreen: {
    name: 'etbCaptureWetSignScreen',
    component: EtbCaptureNewWetSignScreen,
  },
  etbCaptureIdScreen: {
    name: 'etbCaptureIdScreen',
    component: EtbCaptureIdScreen,
  },
  etbSignatureUpdateScreen: {
    name: 'etbSignatureUpdateScreen',
    component: EtbSignatureUpdateScreen,
  },
  selectAndReplaceImageScreen: {
    name: 'selectAndReplaceImageScreen',
    component: SelectAndReplaceImageScreen,
  },
  etbCustomerSignonTablet: {
    name: 'etbCustomerSignonTablet',
    component: EtbCustomerSignonTablet,
  },
};

type RouteNamesType = (typeof RouteNames)[keyof typeof RouteNames];
export type RouteNamesKeys = RouteNamesType['name'];
