import { render } from '@testing-library/react-native';
import React from 'react';
import MutilpleCifInfo from '../MutipleCifInfo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

describe('MutilpleCifInfo', () => {
  it('should render correctly', () => {
    render(
      <GestureHandlerRootView>
        <MutilpleCifInfo cifInfos={[]} isHighLine={true} />
      </GestureHandlerRootView>
    );
  });

  it('should render correctly with cifInfos', () => {
    render(
      <GestureHandlerRootView>
        <MutilpleCifInfo
          isHighLine={false}
          cifInfos={[
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
          ]}
        />
      </GestureHandlerRootView>
    );
  });

  it('should render correctly with 3 cifInfos', () => {
    render(
      <GestureHandlerRootView>
        <MutilpleCifInfo
          isHighLine={false}
          cifInfos={[
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
          ]}
        />
      </GestureHandlerRootView>
    );
  });
});
