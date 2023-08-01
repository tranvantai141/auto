import {
  GetTransactionDetailIDCardImageInfoDTO,
  GetTransactionDetailWetSignatureInfoDTO,
  GetTransactionDetailTabletSignatureInfoDTO,
  GetTransactionDetailImagesDTO,
} from '../types/GetTransactionDetailLibraryImageDTO';
import {
  GET_TRANSACTION_DETAIL_ID_CARD_IMAGE_INFO,
  GET_TRANSACTION_DETAIL_WET_SIGNATURE_INFO,
  GET_TRANSACTION_DETAIL_TABLET_SIGNATURE_INFO,
  GET_TRANSACTION_DETAIL_CUSTOMER_IMAGES,
} from './endpoints';
import axiosTokenInstance from 'src/service/network/axios';

// {
//     "code": "SUCCESS",
//     "message": "Success",
//     "addingNewIdCardImageStatus": "SUCCESS",
//     "addingNewIdCardImageCode": "200",
//     "addingNewIdCardImageMessage": "Success",
//     "deletingNewIdCardImageStatus": "SUCCESS",
//     "deletingNewIdCardImageCode": "200",
//     "deletingNewIdCardImageMessage": "Success",
//     "imageList": [
//       {
//         "imageUrl": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?",
//         "imageType": "ID_CARD_IMAGE",
//         "imageKind": "BACK",
//         "imageOrigin": "ON_BOARDING"
//       }
//     ]
//   }

export async function getTransactionDetailIDCardImageInfo(
  transactionId: string
): Promise<GetTransactionDetailIDCardImageInfoDTO> {
  const response = await axiosTokenInstance.post<GetTransactionDetailIDCardImageInfoDTO>(
    GET_TRANSACTION_DETAIL_ID_CARD_IMAGE_INFO,
    {
      transactionId,
    }
  );
  return response.data;

  return {
    code: 'SUCCESS',
    message: 'Success',
    addingNewIdCardImageStatus: 'SUCCESS',
    addingNewIdCardImageCode: '200',
    addingNewIdCardImageMessage: 'Success',
    deletingNewIdCardImageStatus: 'SUCCESS',
    deletingNewIdCardImageCode: '200',
    deletingNewIdCardImageMessage: 'Success',
    imageList: [
      {
        imageUrl:
          'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?',
        imageType: 'ID_CARD_IMAGE',
        imageKind: 'FRONT',
        imageOrigin: 'ON_BOARDING',
      },
      {
        imageUrl:
          'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?',
        imageType: 'ID_CARD_IMAGE',
        imageKind: 'BACK',
        imageOrigin: 'ON_BOARDING',
      },
      {
        imageUrl:
          'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?',
        imageType: 'ID_CARD_IMAGE',
        imageKind: 'FRONT',
        imageOrigin: 'CORE_BANKING',
      },
      {
        imageUrl:
          'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?',
        imageType: 'ID_CARD_IMAGE',
        imageKind: 'BACK',
        imageOrigin: 'CORE_BANKING',
      },
    ],
  };
}

// {
//     "code": "SUCCESS",
//     "message": "Success",
//     "addingNewWetSignatureStatus": "SUCCESS",
//     "addingNewWetSignatureCode": "200",
//     "addingNewWetSignatureMessage": "Success",
//     "deletingOldWetSignatureStatus": "SUCCESS",
//     "deletingOldWetSignatureCode": "200",
//     "deletingOldWetSignatureMessage": "Success",
//     "imageList": [
//       {
//         "imageUrl": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?",
//         "imageType": "WET_SIGNATURE_IMAGE",
//         "imageKind": "DEFAULT",
//         "imageOrigin": "ON_BOARDING"
//       }
//     ]
//   }

export async function getTransactionDetailWetSignatureInfo(
  transactionId: string
): Promise<GetTransactionDetailWetSignatureInfoDTO> {
  const response = await axiosTokenInstance.post<GetTransactionDetailWetSignatureInfoDTO>(
    GET_TRANSACTION_DETAIL_WET_SIGNATURE_INFO,
    {
      transactionId,
    }
  );
  return response.data;

  return {
    code: 'SUCCESS',
    message: 'Success',
    addingNewWetSignatureStatus: 'SUCCESS',
    addingNewWetSignatureCode: '200',
    addingNewWetSignatureMessage: 'Success',
    deletingOldWetSignatureStatus: 'SUCCESS',
    deletingOldWetSignatureCode: '200',
    deletingOldWetSignatureMessage: 'Success',
    imageList: [
      {
        imageUrl:
          'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?',
        imageType: 'WET_SIGNATURE_IMAGE',
        imageKind: 'DEFAULT',
        imageOrigin: 'ON_BOARDING',
      },
    ],
  };
}

// {
//     "code": "SUCCESS",
//     "message": "Success",
//     "addingTabletSignatureStatus": "SUCCESS",
//     "addingTabletSignatureCode": "200",
//     "addingTabletSignatureMessage": "Success",
//     "tabletSignatureImage": {
//       "imageUrl": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?",
//       "imageType": "TABLET_SIGNATURE_IMAGE",
//       "imageKind": "DEFAULT",
//       "imageOrigin": "ON_BOARDING"
//     }
//   }

export async function getTransactionDetailTabletSignatureInfo(
  transactionId: string
): Promise<GetTransactionDetailTabletSignatureInfoDTO> {
  const response = await axiosTokenInstance.post<GetTransactionDetailTabletSignatureInfoDTO>(
    GET_TRANSACTION_DETAIL_TABLET_SIGNATURE_INFO,
    {
      transactionId,
    }
  );
  return response.data;

  return {
    code: 'SUCCESS',
    message: 'Success',
    addingTabletSignatureStatus: 'SUCCESS',
    addingTabletSignatureCode: '200',
    addingTabletSignatureMessage: 'Success',
    tabletSignatureImage: {
      imageUrl:
        'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072304280001/customer-id-card-FRONT.png?',
      imageType: 'TABLET_SIGNATURE_IMAGE',
      imageKind: 'DEFAULT',
      imageOrigin: 'ON_BOARDING',
    },
  };
}

// {
//     "code": "SUCCESS",
//     "message": "Success",
//     "images": {
//       "faceImage": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-face-image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230622T071333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIA4D67LPEWKJ5Q75XZ%2F20230622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=cb8b01d7700820bf15053b03a311620a188f9c4e8b592041e538fd852b9b48fa",
//       "idCardBack": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-id-card-BACK.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230622T071333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIA4D67LPEWKJ5Q75XZ%2F20230622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=42e37cc3be7ea17629d895c7d70a13d013aef29f9f5fe599c36df7e2156613c3",
//       "idCardFront": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-id-card-FRONT.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230622T071333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIA4D67LPEWKJ5Q75XZ%2F20230622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=27bae8886f7fad8c7e8b3bfd9b0a2820776ad686148c021df497488a2838415b",
//       "signaturePaper": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-signature-PAPER.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230622T071333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIA4D67LPEWKJ5Q75XZ%2F20230622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=0f8bab9cc572446e1884404f8db7e7d65756f3b84feaa0d2359036d4f40e6ef1",
//       "signatureTablet": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-signature-TABLET.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230622T071333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIA4D67LPEWKJ5Q75XZ%2F20230622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=a12b702a996c9092a6b38227a7718ea5ba16fc796cae5549bbb1b48009d92ac3",
//       "portrait": "https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-face-image/ec1446f6-9dc8-4de0-b4dd-241b4dd99108/faceImage.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230622T071333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=AKIA4D67LPEWKJ5Q75XZ%2F20230622%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=5692adbbc69d6160e9126a29f5ec6ed0398d7e6b88ed382b19e2b233bb4561dd"
//     }
//   }

type ImageType =
  | 'faceImage'
  | 'idCardBack'
  | 'idCardFront'
  | 'signaturePaper'
  | 'signatureTablet'
  | 'portrait';
export async function getTransactionDetailCustomerImages(
  transactionId: string,
  imageTypes?: ImageType[]
): Promise<GetTransactionDetailImagesDTO> {
  const response = await axiosTokenInstance.post<GetTransactionDetailImagesDTO>(
    GET_TRANSACTION_DETAIL_CUSTOMER_IMAGES,
    {
      transactionId,
    }
  );
  return response.data;

  return {
    code: 'SUCCESS',
    message: 'Success',
    images: {
      faceImage: 'https://smilemedia.vn/wp-content/uploads/2022/09/cach-chup-hinh-the-dep.jpeg',
      idCardBack: 'https://bffmedia.vn/wp-content/uploads/2021/05/chup-anh-the-4.jpg',
      idCardFront: 'https://bffmedia.vn/wp-content/uploads/2021/05/chup-anh-the-4.jpg',
      signaturePaper:
        'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-signature-PAPER.png',
      signatureTablet:
        'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-signature-TABLET.png',
      portrait:
        'https://vcb-onboarding-ms-onboarding.s3.ap-southeast-1.amazonaws.com/0396072306050002/customer-face-image/ec1446f6-9dc8-4de0-b4dd-241b4dd99108/faceImage.png',
    },
  };
}
