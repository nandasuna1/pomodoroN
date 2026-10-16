import { createRestPrompts } from '../../src/hooks/useRestPrompts';
import restPrompts from '../../src/assets/rest-prompts.json';

describe('rest prompt rotation', () => {
  test('no repeat until exhaustion (deterministic seed)', () => {
    const mgr = createRestPrompts(42, restPrompts);
    const seen = new Set<string>();
    const total = restPrompts.length; 
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
