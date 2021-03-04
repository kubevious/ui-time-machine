import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { Timeline } from '../src';

function renderTimeline() {
  return render(<Timeline />);
}

describe('Timeline', () => {
  test('Should check that the component Timeline is rendered', async () => {
    const { findByTestId } = renderTimeline();

    const timeline = await findByTestId('timeline');

    expect(timeline);
  });
});
