import { render } from '@testing-library/react-native';

import { ImageInformation, ImageInformationProps } from '../ImageInformation';

import React from 'react';

const propImageInformationNonCif: ImageInformationProps = {
  text_id: 'some',
  image_id: 'some',
  imageUri: 'some',
  onChangeText: jest.fn(),
  value: 'some',
  cifs: [],
};

const propImageInformationOneCif: ImageInformationProps = {
  text_id: 'some',
  image_id: 'some',
  imageUri: 'some',
  onChangeText: jest.fn(),
  value: 'some',
  cifs: [
    {
      cifNumber: '14379839',
      idNumber: '14379839',
      oldIdNumber: '14379839',
      fullName: 'Phạm Hoàng Hà',
      dob: '577439557000',
      gender: 'Nam',
      nationality: 'Việt Nam',
      hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
      resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
      expiredDate: '1684147000596',
      validDate: '1684147000596',
      ddnd: 'Sẹo chấm ở đuôi lông mày phải',
      otherIdNumber: '14379839',
    },
  ],
};

const propImageInformationTwoCif: ImageInformationProps = {
  text_id: 'some',
  image_id: 'some',
  imageUri: 'some',
  onChangeText: jest.fn(),
  value: 'some',
  cifs: [
    {
      cifNumber: '14379839',
      idNumber: '14379839',
      oldIdNumber: '14379839',
      fullName: 'Phạm Hoàng Hà',
      dob: '577439557000',
      gender: 'Nam',
      nationality: 'Việt Nam',
      hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
      resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
      expiredDate: '1684147000596',
      validDate: '1684147000596',
      ddnd: 'Sẹo chấm ở đuôi lông mày phải',
      otherIdNumber: '14379839',
    },
    {
      cifNumber: '14379839',
      idNumber: '14379839',
      oldIdNumber: '14379839',
      fullName: 'Phạm Hoàng Hà1',
      dob: '577439557000',
      gender: 'Nam',
      nationality: 'Việt Nam',
      hometown: 'Trường Sơn, Đức Thọ, Hà Tĩnh',
      resident: 'Khối Tân Thành 1, Lê Mao, Thành phố Vinh, Nghệ An',
      expiredDate: '1684147000596',
      validDate: '1684147000596',
      ddnd: 'Sẹo chấm ở đuôi lông mày phải',
      otherIdNumber: '14379839',
    },
  ],
};

describe('Test ImageInformation', () => {
  it('Test render ImageInformation with non cif', () => {
    const { toJSON } = render(<ImageInformation {...propImageInformationNonCif} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Test render ImageInformation with one cif', () => {
    const { toJSON } = render(<ImageInformation {...propImageInformationOneCif} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Test render ImageInformation with two cif', () => {
    const { toJSON } = render(<ImageInformation {...propImageInformationTwoCif} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
