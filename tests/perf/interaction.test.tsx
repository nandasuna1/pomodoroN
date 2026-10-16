/** @jest-environment jsdom */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Timer } from '../../src/components/Timer';
import { saveSettings } from '../../src/utils/persistence';

jest.mock('../../src/utils/sound', () => ({
  playBell: jest.fn().mockResolvedValue(true)
}));

describe('timer interaction performance', () => {
  afterEach(() => {
    jest.useRealTimers();
    localStorage.clear();
  });

  test('start responds within 100ms', () => {
    render(<Timer />);
    const start = performance.now();
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(100);
  });

  test('pause and reset each respond within 100ms', () => {
    render(<Timer />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    const pauseStarted = performance.now();
    fireEvent.click(screen.getByRole('button', { name: 'Pause' }));
    const pauseElapsed = performance.now() - pauseStarted;
    expect(pauseElapsed).toBeLessThan(100);

    const resetStarted = performance.now();
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    const resetElapsed = performance.now() - resetStarted;
    expect(resetElapsed).toBeLessThan(100);
  });

  test('mascot switches to rest within 500ms of a phase transition', async () => {
    jest.useFakeTimers({ doNotFake: ['hrtime', 'performance'] });
    saveSettings({ activityDuration: 60, restDuration: 60, rounds: 1 });
    render(<Timer />);
    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    const start = performance.now();
    await act(async () => {
      jest.advanceTimersByTime(60_000);
      await Promise.resolve();
    });
    const elapsed = performance.now() - start;

    expect(screen.getByRole('img', { name: /during your break/i })).toBeTruthy();
    expect(elapsed).toBeLessThan(500);
  });
});
