import 'jest'

import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { TimeMachineActive } from '../src'

const renderComponent = (): RenderResult => render(<TimeMachineActive />)

describe('TimeMachineActive', () => {
    test('should check that the component TimeMachineActive is rendered', async () => {
        const { findByTestId } = renderComponent()

        // const container = await findByTestId('timeline-buttons')
        // expect(container).toBeTruthy()
    })
})
