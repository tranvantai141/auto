import { delay } from '../delay';

describe('delay', () => {
  it('should delay for 1000ms', async () => {
    const start = Date.now();
    await delay(1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });
});
