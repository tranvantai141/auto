import { ReactNativeStartOptions } from './schema';
import executor from './executor';

const options: ReactNativeStartOptions = {};

describe('Start Executor', () => {
  it('can run', async () => {
    const output = await executor(options, {} as any);
    expect(output.success).toBe(true);
  });
});
