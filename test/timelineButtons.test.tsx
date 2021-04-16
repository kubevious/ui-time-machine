import 'jest'

import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { TimelineButtons } from '../src'

const renderComponent = (): RenderResult => render(<TimelineButtons />)

describe('TimelineButtons', () => {
    test('should check that the component TimelineButtons is rendered', async () => {
        const { findByTestId } = renderComponent()

        const timelineButtons = await findByTestId('timeline-buttons')

        expect(timelineButtons).toBeTruthy()
    })
})
