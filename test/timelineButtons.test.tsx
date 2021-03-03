import 'jest';

import React from 'react';
import { render } from '@testing-library/react';

import { TimelineButtons } from '../src';

function renderTimelineButtons() {
  return render(<TimelineButtons />);
}

describe('TimelineButtons', () => {
  test('Should check that the component TimelineButtons is rendered', async () => {
    const { findByTestId } = renderTimelineButtons();

    const copyClipboard = await findByTestId('timeline-buttons');

    expect(copyClipboard);
  });
});