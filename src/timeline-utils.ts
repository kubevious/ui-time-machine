import { ISharedState } from '@kubevious/ui-framework/dist'
import moment, { Moment } from 'moment'

export class TimelineUtils {
    private _sharedState: ISharedState;
    // private dayInSec: number
    
    constructor(sharedState: ISharedState) {
        this._sharedState = sharedState
        // this.dayInSec = 12 * 60 * 60
    }

    getActualRange()
    {
        const time_machine_date_to: string = this._sharedState.get('time_machine_date_to')

        let to = moment()
        if (time_machine_date_to) {
            to = moment(time_machine_date_to)
        } else {
            const time_machine_timeline_preview_last_date: Moment = this._sharedState.get(
                'time_machine_timeline_preview_last_date',
            )
            if (time_machine_timeline_preview_last_date) {
                to = time_machine_timeline_preview_last_date.clone()
            }
        }

        // const durationInSharedState: number = this._sharedState.get('time_machine_duration') || this.dayInSec
        // const durationSec: number =
        //     this.getActualDuration() >= this.dayInSec || this.getActualDuration() > durationInSharedState
        //         ? durationInSharedState
        //         : this.getActualDuration()

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

        const durationInSharedState: number = this._sharedState.get('time_machine_duration');

        if (durationInSharedState) {
            return durationInSharedState;
        }

        // let initDuration: number = this.dayInSec
        // this._sharedState.subscribe(
        //     'time_machine_timeline_preview',
        //     (time_machine_timeline_preview: { dateMoment: Moment }[]) => {
        //         const lastDate: Moment = this._sharedState.get('time_machine_timeline_preview_last_date') || moment()
        //         const firstDate: Moment = time_machine_timeline_preview
        //             ? time_machine_timeline_preview[0].dateMoment
        //             : moment()
        //         const previewDuration: number = lastDate.diff(firstDate, 'seconds')
        //         initDuration = Math.min(previewDuration, this.dayInSec)
        //     },
        // )
        return this.getDefaultDuration();
    }

    getDefaultDuration() {
        return 12 * 60 * 60;
    }
}
