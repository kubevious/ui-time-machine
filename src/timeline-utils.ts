import { ISharedState } from '@kubevious/ui-framework/dist'
import moment, { Moment } from 'moment'

export class TimelineUtils {
    private _sharedState: ISharedState;
    
    constructor(sharedState: ISharedState) {
        this._sharedState = sharedState
    }

    getActualRange()
    {
        const time_machine_date_to = this._sharedState.tryGet<string>('time_machine_date_to')

        let to = moment()
        if (time_machine_date_to) {
            to = moment(time_machine_date_to)
        } else {
            const time_machine_timeline_preview_last_date = this._sharedState.tryGet<Moment>(
                'time_machine_timeline_preview_last_date',
            )
            if (time_machine_timeline_preview_last_date) {
                to = time_machine_timeline_preview_last_date.clone()
            }
        }

        const durationSec = this.getActualDuration();

        let from = to.clone().subtract(durationSec, 'seconds')

        to = moment(to.toDate()) // Needed to swap moment internal _d and _i values
        from = moment(from.toDate())

        return {
            to,
            from,
        }
    }

    getActualDuration(): number {

        const durationInSharedState = this._sharedState.tryGet<number>('time_machine_duration');

        if (durationInSharedState) {
            return durationInSharedState;
        }

        return this.getDefaultDuration();
    }

    getDefaultDuration() {
        return 12 * 60 * 60;
    }
}
