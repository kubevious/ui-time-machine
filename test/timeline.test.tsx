import 'jest'

import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { Timeline } from '../src'

const renderComponent = (): RenderResult => render(<Timeline />)

describe('Timeline', () => {
    test('should check that the component Timeline is rendered', async () => {
        const { findByTestId } = renderComponent()

        const timeline = await findByTestId('timeline')

        expect(timeline).toBeTruthy()
    })
})
