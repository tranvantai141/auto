import React from 'react';
import { ContentView } from '../ContentView';
import { render } from '@testing-library/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SideBarItemID } from '@screens/transactionDetail/typings';

// mock useQueryClient() function
// jest.mock('@tanstack/react-query', () => ({
//   useQueryClient: jest.fn(() => ({
//     clear: jest.fn(),
//   })),
// }));

// mock useSafeAreaInsets() function
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    bottom: 0,
  })),
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// mock useRootNavigation() function
jest.mock('src/navigation/hooks/useRootNavigation', () => () => ({
  navigate: jest.fn(),
}));

describe('ErrorView', () => {
  // All side bar item ID from union type SideBarItemID
  // export type SideBarItemID =
  // | 'transaction_info'
  // | 'customer_info'
  // | 'customer_info_moc'
  // | 'customer_info_addition'
  // | 'customer_info_image'
  // | 'compliance_info'
  // | 'product_info'
  // | 'product_info_customer_file'
  // | 'product_info_current_account'
  // | 'product_info_ebank'
  // | 'product_info_debit_ecard'
  // | 'product_info_debit_card'
  // | 'terms_info'
  // | 'document';
  const allIds = [
    'transaction_info',
    'customer_info',
    'customer_info_moc',
    'customer_info_addition',
    'customer_info_image',
    'compliance_info',
    'product_info',
    'product_info_customer_file',
    'product_info_current_account',
    'product_info_ebank',
    'product_info_debit_ecard',
    'product_info_debit_card',
    'terms_info',
    'document',
  ] as SideBarItemID[];

  it('should render correctly', async () => {
    allIds.forEach((id) => {
      render(
        <GestureHandlerRootView>
          <ContentView sideBarItemID={id} />
        </GestureHandlerRootView>
      );
    });
  });
});
