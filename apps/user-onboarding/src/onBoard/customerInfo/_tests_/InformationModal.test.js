import { render } from '@testing-library/react-native';
import { fireEvent } from '@testing-library/react-native/build/index';
import InformationModal from '../components/Modal/InformationModal';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock('react-native-modal', () => 'react-native-modal');


const mockResult = {
  result: {
    customerInfo: {
      customerId: "14379839",
      fullName: "HA NGOC TU",
      dob: "2001-06-29",
      gender: "F",
      idType: "IC",
      idNumber: "1203248234233",
      oldIdNumber: "123456",
      ddnd: "not ruoi cach mat phai 1cm",
      validDate: "2016-09-05",
      expiredDate: "2016-09-05",
      issuePlace: "2016-09-05",
      nationality: "Viet nam",
      hometown: "Ha Noi",
      resident: "Ha noi, viet nam"
    }
  },
  message : {
    errorMess: {
      cif : 'Không tồn tại CIF tương ứng',
      fullName : undefined,
    },
    successMess: {
      cif : undefined,
      fullName : undefined,
    }
  }
};

const mockResult2 = {
  result: {
    customerInfo: {
      customerId: "14379839",
      fullName: "HA NGOC TU",
      dob: "2001-06-29",
      gender: "F",
      idType: "IC",
      idNumber: "1203248234233",
      oldIdNumber: "123456",
      ddnd: "not ruoi cach mat phai 1cm",
      validDate: "2016-09-05",
      expiredDate: "2016-09-05",
      issuePlace: "2016-09-05",
      nationality: "Viet nam",
      hometown: "Ha Noi",
      resident: "Ha noi, viet nam"
    }
  },
  message : {
    errorMess: {
      cif : 'Không tồn tại CIF tương ứng',
      fullName : undefined,
    },
    successMess: {
      cif : undefined,
      fullName : undefined,
    }
  }
};

describe('should render Information Modal', () => {

  it('should render Information Form', () => {
    const props = { submitForm: jest.fn() };
    const wrapper = render(<InformationModal {...props}></InformationModal>);
  });

  it('should render Information Modal show ', () => {
    render(
      <InformationModal
        modalClose={() => jest.fn()}
        isVisible={true}
        resultSearch={mockResult}
        onBackDropPress={() => jest.fn()}
        onPressOk={() => jest.fn()}
        onPressCancel={() => jest.fn()}
      />
    );
  });

});


// describe('test Register Modal function ', () => {
//
//   it('should render Form', () => {
//     const props = { onChangeText: jest.fn() };
//     const { getByTestId } = render(<RegisterModal
//       modalClose={() => jest.fn()}
//       isVisible={true}
//       accountName="NGUYEN VAN A"
//       onBackDropPress={() => jest.fn()}
//       onChangeText={() => jest.fn()}>
//
//     </RegisterModal>);
//
//
//   });
//
// });
//
//
// describe('test Register Modal function ', () => {
//
//   it('should render Form', () => {
//     const props = { onChangeText: jest.fn() };
//     const { getByTestId , getAllByTestId } = render(<RegisterModal
//       modalClose={() => jest.fn()}
//       isVisible={true}
//       accountName="NGUYEN VAN A"
//       onBackDropPress={() => jest.fn()}
//       onChangeText={() => jest.fn()}>
//
//     </RegisterModal>);
//
//     const currencyDropdown = getAllByTestId(TestIds.drop_down_field);
//     fireEvent.changeText(currencyDropdown[0] , '1');
//     fireEvent.changeText(currencyDropdown[1] , '1');
//     fireEvent.changeText(currencyDropdown[2] , '1');
//
//
//   });
//
// });