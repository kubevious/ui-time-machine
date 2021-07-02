import React, { FC, useState } from 'react';
import { subscribeToSharedState, useSharedState } from '@kubevious/ui-framework/dist';
import moment from 'moment'
import { Button } from '@kubevious/ui-components';

import styles from './styles.module.css';

export const TimeMachineActive: FC<{}> = ({}) => {
    
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const sharedState = useSharedState();

    subscribeToSharedState(['time_machine_enabled', 'time_machine_target_date'], 
        ({
            time_machine_enabled, //: boolean,
            time_machine_target_date, //: Date
        }) => {
            if (time_machine_enabled && time_machine_target_date) {
                setIsEnabled(true);
                setDate(moment(time_machine_target_date).format(
                    'MMM DD hh:mm:ss A'
                ))
            } else {
                setIsEnabled(false);
                setDate('');
            }
        });

    const deactivateTimeMachine = () => {
        sharedState!.set('time_machine_enabled', false);
    }

    return <>
        {isEnabled && <div id="history-info" className={styles.historyInfo}>
            <span>
                Time Machine Active:{' '}
                {date}
            </span>
            <Button
                onClick={deactivateTimeMachine}
            >
                Deactivate
            </Button>
        </div>
        }        
    </>;
};
