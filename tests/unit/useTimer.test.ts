import { Timer } from '../../src/hooks/useTimer';

describe('Timer (deterministic)', () => {
  test('start moves from idle to active and sets remainingSeconds', () => {
    const t = new Timer({ activityDuration: 5, restDuration: 2, rounds: 2 });
    expect(t.currentPhase).toBe('idle');
    t.start();
    expect(t.currentPhase).toBe('active');
    expect(t.remainingSeconds).toBe(5);
  });

  test('tick decrements remainingSeconds and transitions to rest', () => {
    const t = new Timer({ activityDuration: 2, restDuration: 3, rounds: 1 });
    t.start();
    t.tick(); // 1
    expect(t.remainingSeconds).toBe(1);
    t.tick(); // 0 -> should transition to rest
    expect(t.currentPhase).toBe('rest');
    expect(t.remainingSeconds).toBe(3);
  });

  test('rest completion decrements rounds and completes when rounds reach 0', () => {
    const t = new Timer({ activityDuration: 1, restDuration: 1, rounds: 1 });
    t.start();
    t.tick(); // activity -> rest
    expect(t.currentPhase).toBe('rest');
    t.tick(); // rest -> rounds -> 0 -> completed
    expect(t.currentPhase).toBe('completed');
    expect(t.roundsRemaining).toBe(0);
  });
});
