import { Timer } from '../../src/hooks/useTimer';

describe('Pomodoro cycle', () => {
  test('runs focus and rest phases until all rounds are complete', () => {
    const timer = new Timer({
      activityDuration: 2,
      restDuration: 1,
      rounds: 2
    });

    timer.start();
    expect(timer.currentPhase).toBe('active');
    timer.tick();
    expect(timer.remainingSeconds).toBe(1);
    timer.tick();
    expect(timer.currentPhase).toBe('rest');
    expect(timer.remainingSeconds).toBe(1);

    timer.tick();
    expect(timer.currentPhase).toBe('active');
    expect(timer.roundsRemaining).toBe(1);

    timer.tick();
    timer.tick();
    expect(timer.currentPhase).toBe('rest');
    timer.tick();

    expect(timer.currentPhase).toBe('completed');
    expect(timer.roundsRemaining).toBe(0);
    expect(timer.isRunning).toBe(false);
  });

  test('pause keeps the remaining time unchanged until resumed', () => {
    const timer = new Timer({ activityDuration: 2, restDuration: 1, rounds: 1 });
    timer.start();
    timer.tick();
    timer.pause();
    timer.tick();
    expect(timer.remainingSeconds).toBe(1);
    timer.start();
    timer.tick();
    expect(timer.currentPhase).toBe('rest');
  });
});
