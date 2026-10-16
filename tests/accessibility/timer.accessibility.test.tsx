/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Timer } from '../../src/components/Timer';

describe('timer accessibility', () => {
  test('timer screen has no axe violations', async () => {
    const { container } = render(<Timer />);
    const results = await axe(container);

    expect(results.violations).toEqual([]);
  });
});
