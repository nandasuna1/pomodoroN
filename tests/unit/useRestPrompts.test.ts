import { createRestPrompts } from '../../src/hooks/useRestPrompts';

describe('rest prompt rotation', () => {
  test('no repeat until exhaustion (deterministic seed)', () => {
    const mgr = createRestPrompts(42);
    const seen = new Set<string>();
    const total = 15; // we know there are 15 prompts
    let previous = '';
    for (let i = 0; i < total; i++) {
      const cur = mgr.current();
      expect(seen.has(cur)).toBe(false);
      seen.add(cur);
      previous = cur;
      mgr.next();
    }
    const next = mgr.current();
    expect(seen.size).toBe(total);
    expect(next).not.toBe(previous);
  });
});
