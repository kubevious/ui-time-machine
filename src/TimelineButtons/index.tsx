import React from 'react'
import cx from 'classnames'
import { ClassComponent } from '@kubevious/ui-framework'
import moment from 'moment'
import { TimelineUtils } from '../timeline-utils'
import { TimelineButtonsState } from './types'

import './styles.scss'
// import styles from './styles.module.css';

export class TimelineButtons extends ClassComponent<{}, TimelineButtonsState> {
    _timelineUtils: TimelineUtils
    constructor(props: {} | Readonly<{}>) {
        super(props)

        this._timelineUtils = new TimelineUtils(this.sharedState)

        this.state = {
            time_machine_enabled: false,
        }

        this._toggle = this._toggle.bind(this)
        this._reset = this._reset.bind(this)
    }

    _toggle(): void {
        const { time_machine_enabled } = this.state
        if (time_machine_enabled) {
            this.sharedState.set('time_machine_enabled', false)
        } else {
            this.sharedState.set('time_machine_enabled', true)

            const actual = this._timelineUtils.getActualRange()

            const targetDate = this.sharedState.tryGet('time_machine_target_date');
            if (targetDate) {
                const date = moment(targetDate)
                if (date.isBetween(actual.from, actual.to)) {
                    return
                }
            }

            const diff = actual.to.diff(actual.from) / 2
            const date = moment(actual.from).add(diff)
            this.sharedState.set('time_machine_target_snapshot_id', null)
            this.sharedState.set('time_machine_target_date', date.toISOString())
        }
    }

    _reset(): void {
        const initDuration = this._timelineUtils.getDefaultDuration()

        this.sharedState.set('time_machine_enabled', false)
        this.sharedState.set('time_machine_date_to', null)
        this.sharedState.set('time_machine_duration', initDuration)
        this.sharedState.set('time_machine_target_snapshot_id', null)
        this.sharedState.set('time_machine_target_date', null)
    }

    componentDidMount() {
        this.subscribeToSharedState('time_machine_enabled', (time_machine_enabled) => {
            this.setState({
                time_machine_enabled: time_machine_enabled,
            })
        })
    }

    render() {
        const { time_machine_enabled } = this.state
        return (
            <div data-testid="timeline-buttons" className="tl-interaction">
                <a
                    role="button"
                    id="btnTimelineTimeMachine"
                    className={cx('timemachine', {
                        active: time_machine_enabled,
                    })}
                    onClick={() => this._toggle()}
                >
                    <span className="tooltiptext">Activate Time Machine</span>
                </a>
                <a role="button" id="btnTimelineTimeMachine" className={`reset`} onClick={() => this._reset()}>
                    <span className="tooltiptext">Reset changes</span>
                </a>
            </div>
        )
    }
}
