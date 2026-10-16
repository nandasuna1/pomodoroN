import {
  loadSettings,
  saveSettings,
  validateSettings,
  DEFAULTS
} from '../../src/utils/persistence';

describe('TimerSettings defaults and persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('defaults are applied when no settings are saved', () => {
    const s = loadSettings();
    expect(s.activityDuration).toBe(DEFAULTS.activityDuration);
    expect(s.restDuration).toBe(DEFAULTS.restDuration);
    expect(s.rounds).toBe(DEFAULTS.rounds);
    expect(s.theme).toBe('light');
  });

  test('defaults are restored after saved settings are cleared', () => {
    saveSettings({ activityDuration: 600, restDuration: 120, rounds: 2 });
    localStorage.clear();

    expect(loadSettings()).toEqual(DEFAULTS);
  });

  test('saveSettings persists validated values', () => {
    const saved = saveSettings({ activityDuration: 120, restDuration: 60, rounds: 3 });
    const loaded = loadSettings();
    expect(loaded.activityDuration).toBe(120);
    expect(loaded.restDuration).toBe(60);
    expect(loaded.rounds).toBe(3);
    expect(saved.rounds).toBe(3);
  });

  test('invalid durations and rounds are clamped to supported bounds', () => {
    expect(
      validateSettings({
        activityDuration: -1,
        restDuration: 999_999,
        rounds: 0
      })
    ).toEqual({
      activityDuration: 60,
      restDuration: 3600,
      rounds: 1,
      theme: 'light'
    });
  });

  test('theme preference is persisted with timer settings', () => {
    saveSettings({ theme: 'dark' });
    expect(loadSettings().theme).toBe('dark');
  });
});
