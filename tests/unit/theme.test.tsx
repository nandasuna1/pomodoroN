/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeContext, ThemeContextProvider } from '../../src/context/ThemeContext';
import { loadSettings } from '../../src/utils/persistence';
import { coffeeLight, darkPurpleBlue } from '../../src/styles/theme';

function luminance(hex: string) {
  const channels = hex.match(/[A-Fa-f0-9]{2}/g)!.map((channel) => {
    const normalized = parseInt(channel, 16) / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function ThemeProbe() {
  const { darkThemeApp, setAppTheme } = useContext(ThemeContext);

  return (
    <div>
      <span>{darkThemeApp ? 'dark' : 'coffee'}</span>
      <button type="button" onClick={setAppTheme}>Toggle theme</button>
    </div>
  );
}

describe('theme selection', () => {
  beforeEach(() => localStorage.clear());

  test('toggles between coffee and dark themes and persists the choice', () => {
    render(
      <ThemeContextProvider>
        <ThemeProbe />
      </ThemeContextProvider>
    );

    expect(screen.getByText('coffee')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    expect(screen.getByText('dark')).toBeTruthy();
    expect(loadSettings().theme).toBe('dark');
  });

  test('primary text and button labels meet WCAG AA contrast', () => {
    expect(contrastRatio(coffeeLight.text, coffeeLight.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio('#ffffff', '#496232')).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(darkPurpleBlue.text, darkPurpleBlue.background)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio('#ffffff', '#5947B2')).toBeGreaterThanOrEqual(4.5);
  });
});
