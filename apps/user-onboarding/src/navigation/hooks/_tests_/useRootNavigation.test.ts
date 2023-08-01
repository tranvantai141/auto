import { renderHook } from '@testing-library/react-native';

import useRootNavigation from '../useRootNavigation';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('useRootNavigation', () => {
  it('should return navigation', () => {
    const navigation = {
      navigate: jest.fn(),
      addListener: jest.fn(),
      canGoBack: jest.fn(),
      dangerouslyGetParent: jest.fn(),
      dangerouslyGetState: jest.fn(),
      dispatch: jest.fn(),
      goBack: jest.fn(),
      isFocused: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
      setParams: jest.fn(),
      toggleDrawer: jest.fn(),
    };
    (useNavigation as jest.Mock).mockReturnValue(navigation);

    const { result } = renderHook(() => useRootNavigation());

    expect(result.current).toEqual(navigation);
  });
});
