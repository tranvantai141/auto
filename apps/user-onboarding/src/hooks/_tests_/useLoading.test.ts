import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useLoading } from '../useLoading';

describe('useLoading', () => {
  it('should return loading and startTransition', async () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current).toEqual([false, expect.any(Function)]);
  });

  it('should return loading true when startTransition is called', async () => {
    const { result } = renderHook(() => useLoading());
    act(() => {
      result.current[1](Promise.resolve());
    });
    waitFor(() => {
      expect(result.current).toEqual([true, expect.any(Function)]);
    });
  });
});
